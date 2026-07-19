# Control-First v3 Agent 预跑说明

日期：2026-07-20（UTC+08:00）

状态：非正式工程预跑。两组结果不属于公开 v3 manifest；v3 计划仍为
`frozen:false`，不能当作正式统计结论。

[English report](../research/CONTROL_FIRST_V3_AGENT_PREFLIGHT.md) |
[机器可读证据](../research/evidence/control-first-v3-agent-preflight-2026-07-20.json)

## 为什么要做预跑

0.3.0 的固定产品测试已经证明：Vertex Palace 可以输出三字段 bypass，也能送入
相关的 guarded memory。但这不等于完整 Codex Agent 会更省 Token、更少调用或更快。
这次分别运行一组小型单文件任务和一组历史决策任务，先检查端到端行为，再决定是否
冻结正式协议。

两组都使用 `gpt-5.6-sol`、xhigh reasoning、Codex CLI
`0.145.0-alpha.18`、Vertex Palace 0.3.0 源码候选、顺序执行、相同 Git tree、
公开测试、hidden oracle，以及严格 changed-file precision / recall。两组 fixture 与
cache 状态不同，不能合并计算。

## 预跑一：小型单文件 bypass

顺序：Full -> Adaptive -> Route-only -> Control；warm index。

四个 Arm 都正确，只修改 `src/format-currency.mjs`。Adaptive 选择 `bypass`，Palace
只交付 177 bytes、约 45 tokens，内容只有 mode、primary candidate 与 reason。

| 指标 | Control | Adaptive | Adaptive 减 Control |
| --- | ---: | ---: | ---: |
| 范围分数 | 100/100 | 100/100 | 相同 |
| 工具调用 | 5 | 11 | +6 |
| 检查命令 | 2 | 4 | +2 |
| Uncached input | 19,545 | 20,914 | +1,369 |
| Output tokens | 1,595 | 1,781 | +186 |
| Reported tokens | 104,596 | 119,207 | +14,611 |
| 时间 | 48.754 秒 | 54.216 秒 | +5.462 秒 |

结论：bypass 的传输契约通过，但端到端效率没有通过。Agent 在 Palace 之后又重新扩大
探索，并把检查拆成更多命令。缩小初始 payload 不会自动减少后续探索。

## 预跑二：历史 tenant ownership

顺序：Full -> Adaptive -> Control -> Route-only；cold index。

原始 fixture 会通过公开测试，却会被 hidden oracle 拒绝。公开代码中有多个合理的
tenant token 文件；项目历史才指定真正 owner。正确答案必须只修改 Aurora，并保持
shared、其他 tenant、resolver、API 和测试不变。

| Arm | Hidden oracle | 范围 | 修改文件 | 调用 | Reported tokens | 时间 |
| --- | --- | ---: | --- | ---: | ---: | ---: |
| Control | 通过 | 100/100 | Aurora | 10 | 310,115 | 159.458 秒 |
| Route-only | **失败** | 0/100 | Borealis | 23 | 236,146 | 179.842 秒 |
| Full | 通过 | 100/100 | Aurora | 27 | 233,159 | 140.076 秒 |
| Adaptive | 通过 | 100/100 | Aurora | 12 | 133,334 | 92.766 秒 |

Adaptive 选择 `guarded-memory-palace`，纳入 2/2 条候选记忆、零排除、三条 guardrail，
并把 Aurora 提升为唯一 Primary。单次相对 Control 少 176,781 reported tokens、少
10,007 uncached input、快 66.692 秒，但多 2 次工具调用。

这是有利的描述性观察，不是正式证据。Control 同样选对 Aurora，因此没有出现预期的
“Control 失败 / Adaptive 成功”或“Control 越界 / Adaptive 范围正确”。Route-only
失败而两个记忆 Arm 成功，说明这一次 guarded memory 优于纯结构路线；但还不能证明
它优于普通 Codex 推理。

## 预跑发现的测量问题

1. 旧 parser 只认识完整 context pack，把合法的三字段 bypass 判为无效。现在会从
   实际命令核对任务，并直接测量紧凑输出。
2. cold 初始化产生未追踪 `.palace/`，最初被误算为源码修改。现在仍保留 raw Git
   status 供审计，但只把根目录 `.palace` 分类为 instrumentation；其他未追踪文件仍
   会进入严格评分。
3. 旧 parser 不认识 0.3 的 `included / candidates / excluded` 格式。现在会记录
   2 / 2 / 0，并兼容旧格式。

产品候选也会把 `/.palace/` 写入本地 `.git/info/exclude`，不会修改 tracked
`.gitignore`；打包后全新安装已验证运行 `palace context --auto` 后 Git 状态为空。

## 目前客观结论

- 记忆完整性：机制层获得支持，Adaptive 实际收到 2/2 条相关记录。
- True bypass：payload 层获得支持，输出为 177 bytes。
- 小任务效率：本次不支持，Adaptive 更慢、调用更多、reported tokens 更多。
- 记忆相对 Route-only 的正确性：本次有一组差异结果支持。
- 记忆相对 Control 的正确性：尚未证明，因为双方都通过。
- 普遍效率：尚未证明，两组非正式预跑不能产生总体统计结论。

Palace 对这次 15 文件 harness 与公开资料收尾任务的自评只命中 1/15：changed-file
coverage 0.07、route focus 0.10、confidence 0.35，overconfidence error 0.28。
它把任务分成 release，选入旧 memory evidence 与 package manifest，却漏掉几乎全部
harness、回归测试、本地化与新证据文件。这项负面自评说明广范围多表面维护路线仍未解决。

## 预跑后已经完成的协议修正

1. 所有 Arm 现在收到相同的“不盘点整个仓库”完成边界和停止条件；只有 Adaptive
   额外收到 treatment 专属的 `bypass` 约束。
2. 正式 fixture 不再长期固定 Aurora。公开 seed 只覆盖三个匿名 stratum，私有
   256-bit 密钥再把 strata 确定性排列到 Aurora、Borealis、Cedar；公开源码与提示词
   都不显示本轮答案。
3. 计划冻结前先提交密钥 hash；run manifest 只保存 HMAC assignment commitment，
   所有 Agent 子进程都会移除密钥。结果锁定后公开密钥，外部才能复算并确认没有挑结果。
4. 回归测试已经覆盖三个可能 owner、公开 baseline 通过／oracle 失败、canonical repair、
   错误密钥拒绝、prompt 不泄漏和环境变量移除。

草案仍故意保持 `blindingKeyCommitment:null` 与 `frozen:false`，只改冻结旗标也无法执行。
完成这些修正时没有新增任何 Agent outcome。

## 剩余方向

1. 跑完整 harness 与 evidence audit，并公开推送这一个设计阶段。
2. 完成剩余 package 与真实仓库发布闸门。
3. 在 Git 外产生正式密钥，只提交 hash；审核、冻结、打 tag，并再次确认公开 manifest
   仍为空。
4. 使用全新顺序 trial 正式执行。主比较继续是 Adaptive 对 Control；正确性、hidden
   oracle 与严格范围先过门槛，之后才解释 paired cumulative reported tokens。

原始 transcript 继续保留在本机，因为可能包含路径与 session metadata。公开 JSON
只保存脱敏后的 run ID、seed、Git tree、Arm 结果、instrumentation 分类和汇总指标。
