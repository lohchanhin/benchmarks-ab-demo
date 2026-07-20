# Vertex Palace 0.3.0 候选验证：最终报告

状态：**已完成、非正式、预注册的工程验证**。

发布建议：**暂缓 stable npm 发布，继续修正候选版**。这份精确的 0.3.0 包已经证明记忆安全、
可审计路由有实质价值，但没有达到相较普通 Codex 的端到端效率目标。

## 已完成的研究

- 四种合成场景，16/16 个计划 trial。
- 64 个顺序执行的 Agent Arm：Control、Route-only、Full Palace、Adaptive Palace。
- 63 个有效 Arm、58 个成功 Arm。
- 128 个脱敏证据文件全部通过 checksum，未发现 Session ID 或本机私密路径。
- 精确的本地 `vertex-palace@0.3.0` tarball 与源码 provenance 全程不变。
- small-local 的同一次系统休眠事故造成一个 Full timeout 与一个 Adaptive 网络启动无效；
  两项都原样保留，没有补跑替换。
- 正式 Control-first v3 仍未冻结，也完全没有被候选数据污染，继续保持 0/16。

## 各 Arm 结果

| Arm | 尝试 | 有效 | 成功 | 观察到的失败来源 |
| --- | ---: | ---: | ---: | --- |
| Control | 16 | 16 | 15 | Decision-memory 中一次 tenant scope 错误 |
| Route-only | 16 | 16 | 13 | Decision-memory 中三次 tenant scope 错误 |
| Full Palace | 16 | 16 | 15 | 一次保留的基础设施 timeout |
| Adaptive Palace | 16 | 15 | 15 | 一次无效的网络启动 Arm |

15 组有效 Adaptive-Control 配对中，Adaptive 成功 15/15，Control 成功 14/15。唯一的
discordant pair 对 Adaptive 有利，但精确 McNemar p 值是 `1.0`；四个场景经过 Holm 修正的
p 值也全是 `1.0`。这是令人鼓舞的机制证据，不是统计上已成立的正确性效果。

## 各场景发现

| 场景 | 主要观察 | 支持的结论 |
| --- | --- | --- |
| Small local | Adaptive 三个有效 run 全选 `bypass`，只输出 177 bytes；相对 Control 仍多 +14,029 reported tokens、+2 calls | Bypass 相对 Full 缩小 Palace payload，没有降低相对 Control 的总 Agent 成本 |
| Cross-stack | 所有 Arm 都 4/4 正确，Palace Route Recall@K 为 1.0；Adaptive 相对 Control 多 +30,630.5 Token、+3 calls | 路由准确，但没有观察到正确性或效率优势 |
| Decision memory | Adaptive 与 Full 4/4、Control 3/4、Route-only 1/4；避免了一次 Control scope violation | 历史决策能阻止合理却错误的范围修改 |
| Stale memory | 所有 Arm 4/4；Adaptive 没有采用过期建议，但把两条 stale memory 作为受保护警告带入 | Guardrail 能抵抗过期记忆，排除策略与 payload 仍需改进 |

Adaptive 的 15 个有效 mode 是 3 次 `bypass`、4 次 `full-palace`、8 次
`guarded-memory-palace`，符合预期任务类型。但模式选对，并没有消除显式调用 Palace 后
Agent 再次检查仓库的成本。

## 主要比较

效率只纳入 Adaptive 与 Control 双方都成功的 14 组配对。

| 指标 | Adaptive - Control 配对中位差 | 95% bootstrap CI |
| --- | ---: | ---: |
| Reported tokens | **+19,922.5** | +14,029 到 +37,892 |
| 墙钟时间 | **+10.135 秒** | +6.086 到 +14.799 秒 |
| 工具调用 | **+2.5** | +2 到 +4 |

三个区间都在零以上。在这轮候选矩阵里，控制正确性后，Adaptive 相较 Control 仍持续更贵。
因此，数据直接否定“0.3.0 已普遍提高 Agent 速度或节省 Token”的说法。

Adaptive 与 Full 在所有有效配对里都成功。Adaptive - Full 为 -13,389 reported tokens
（CI -19,868 到 +19,881）、-0.802 秒（CI -9.056 到 +6.772）、-2 calls（CI -3 到 +1）。
这些区间也不足以证明相对 Full 有稳定的端到端优势。

## 0.3.0 真正证明有用的部分

1. Router 能以高召回和严格可审计范围找到合成任务所需代码。
2. True bypass 能缩小简单任务的 Palace 自身 context payload。
3. Decision memory 出现一次具体的 Control 失败 / Adaptive 成功范围纠正，Route-only 无法复现。
4. Guardrail 在四个 stale-memory trial 全部阻止过期 v1 记忆造成错误修改。
5. 记忆纳入、候选、排除、guardrail 与 context cost 已变成机器可读，而不是隐含行为。

因此，目前的价值是：**结构化路由、历史决策安全、防过期记忆与可审计性**，不是性能加速。

## 为什么暂缓 npm

发布条件是候选修改在完整 Agent 测试中确实有用，而不只是 unit test 通过。正确性安全闸门
通过了，但 true-bypass 的目标还要求端到端开销接近 Control；实际总 Token、时间与调用数
都更高。现在把 0.3.0 当成效率版本发布，会超出证据支持范围。

精确 tarball 继续保留且可复现，可以诚实描述成一次在 memory safety 上成功的研究候选版；
stable npm 发布则应等修正版与新一轮确认。

## 后续研发方向

1. 对明显的单文件任务取消强制显式 Palace call，或把 bypass 判断移到不输出 packed context
   的 host hook。
2. 限制 cross-stack payload，并阻止 Agent 重复检查路线已经解决的内容。
3. 直接排除明显 stale scope mismatch，只保留精简冲突 metadata 与验证要求。
4. 继续把 memory fidelity 与 changed-file scope 作为发布闸门，同时减少塞进 Agent context
   的 telemetry。
5. 建立新的不可变候选版，使用 fresh seeds 做预注册定向复验；通过后才发布 npm 或冻结
   正式 v3。

## 结论边界

这是小样本、合成任务、单模型、非正式的候选研究。它能诊断受测 package，也能拒绝证据
不支持的发布主张；不能证明真实仓库、团队、语言或未来模型的一般行为。完整脱敏证据与分析
全部公开，任何人都能检查这项决定。
