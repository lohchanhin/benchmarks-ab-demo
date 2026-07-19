# Control-First v3 隐藏分配设计

日期：2026-07-20（UTC+08:00）

状态：只有实现与针对性测试证据。正式计划仍为 `frozen:false`，blinding key
commitment 故意留空，也没有新增任何 Agent Arm。

[English](../research/CONTROL_FIRST_V3_BLINDED_DESIGN.md) |
[机器证据](../research/evidence/control-first-v3-blinded-design-2026-07-20.json)

## 为什么要修改 fixture

第一次 memory-dependent 预跑固定使用 Aurora，适合发现 harness 问题，却也让 Control
有机会把 Aurora 当成惯例答案。只对公开 seed 做 hash 也不够，因为候选只有三个，任何人
都能枚举反推。

Aurora、Borealis、Cedar 只是三个虚构客户／租户，不是模型、难度或实验模式。新版让
三份公开 token 使用相同、同样合理的 baseline；公开任务只说“独立治理的 launch
tenant”，不会指出答案。

## 隐藏分配机制

每个公开 seed 先落到三个匿名 stratum 之一，再由 Git 外保存的 32-byte 私钥，通过
HMAC 排列把三个 strata 对应到三个 tenant。四个草案 trial 的 strata 是
`1、2、0、2`，已经覆盖全部三类；四次分给三个候选，必然有一个重复。

协议冻结前，计划只公开私钥的 SHA-256 commitment。每个 run 只保存 stratum、key
commitment 与 HMAC assignment commitment，不保存 owner 或私钥。有记忆的 Arm 从
项目历史收到真正 owner，hidden oracle 使用同一个内部答案；Control 与 Route-only
不会收到。

Codex、Palace、公开测试和 oracle 子进程都会移除该密钥。正式结果全部锁定后再公开
密钥，外部审查者即可重算每轮答案并验证 commitment，确认没有看到结果后再挑 owner。
单元测试与 fixture checker 中看得到的固定 key 只是公开测试向量，明确禁止用于正式实验。

## 公平的停止条件

四个 Arm 现在都有相同边界：直接证据足够时不要盘点仓库；行为修好、完整测试通过、
Git diff 只有任务必要修改且没有相关冲突时停止。只有 Adaptive 多收到 treatment
专属规则：如果模式为 `bypass`，除非代码、失败测试或 runtime evidence 与 Primary
冲突，否则不得重新扩大探索。

## 当前验证

针对性测试 24/24 通过，覆盖三个 owner、公开 baseline 通过／oracle 失败、单文件
canonical repair、错误密钥拒绝、提示词不泄漏、计划覆盖全部 strata，以及所有 Codex
Arm 都会移除密钥。完整仓库门槛也通过 62/62 单测、五个 fixture 合约、全部历史结果
checksum／隐私审计与 v2.2 分析复算；v3 公开 manifest 仍为 0/16。草案的 commitment
仍为 `null`，因此不能伪装成已冻结计划执行。

## 结论边界与下一步

这项修正只提高实验有效性，不证明 Palace 已节省 Token、时间或调用。旧预跑结论不变：
bypass 很小却比 Control 慢；memory run 较快、Token 较少，但没有出现 Control 失败而
Adaptive 成功。

Palace 对这次广范围收尾的自评仍是负面结果：默认 10 文件路线只命中 6/31，coverage
0.19、focus 0.60、confidence 0.35，结论为 `needs-review`。扩大到 40 文件后命中
15/31，coverage 0.48、focus 0.63，但仍漏掉 scenario 合约、两个 oracle、多个 runner
边界和全部针对性回归测试。context pack 估算较小不能当成端到端 Agent 节省。

下一步是跑完整仓库检查并推送本阶段；完成不可变 Palace 0.3.0 与真实仓库闸门；在 Git
外产生正式密钥，只提交 commitment；冻结、打 tag，并在 manifest 仍为空时开始全新
顺序实验。
