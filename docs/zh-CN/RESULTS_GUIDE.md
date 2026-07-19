# Adaptive v2.2 结果阅读指南

这份说明帮助读者正确解释已完成的 v2.2 研究，不替代
[英文最终报告](../research/ADAPTIVE_V2_2_FINAL.md)、
[冻结协议](../research/PROTOCOL_V2_2.md)或机器可读
[`analysis.json`](../../results/adaptive-pilot-v2.2/analysis.json)。

[中文文档索引](./README.md) | [快速验证指南](./QUICKSTART.md) | [项目中文首页](../../README.zh-CN.md)

## 先看结论

- 16/16 trial、64/64 Arm 全部有效并正确完成，未观察到四种 treatment 的正确性差异。
- Adaptive 相对 Full Palace 稳定缩小 Palace 自身 payload。
- Adaptive 相对 Full 的端到端 Token、调用与时间差异没有建立稳定方向。
- Adaptive 相对 Control 的工具调用明显更多；reported tokens 与时间的中位数也更高。
- 因此不能说 Vertex Palace 在本研究中普遍省 Token、提速或提高正确率。
- 可支持的价值是路线覆盖、可审计上下文和过期记忆防护语；这些仍不能替代测试与工程验证。

## 主要数字

差值定义为 `Adaptive - baseline`。对 Token、调用、时间与 payload 这类资源指标，
负值偏向 Adaptive，正值偏向 baseline。

| 指标 | Adaptive - Full | 95% 配对 bootstrap 区间 | 解读 |
| --- | ---: | ---: | --- |
| Reported tokens | -16,522.5 | [-38,931, +24,588] | 区间跨 0 |
| Uncached input tokens | -4,393 | [-13,145, +2,850] | 区间跨 0 |
| 工具调用 | -2.5 | [-6, +2] | 区间跨 0 |
| 墙钟时间 | -6.553 秒 | [-13.525, +0.336] 秒 | 区间跨 0 |
| Palace output bytes | -898.5 | [-1,972, -550.5] | 区间未跨 0，支持 payload 缩小 |

| 指标 | Adaptive - Control | 95% 配对 bootstrap 区间 | 解读 |
| --- | ---: | ---: | --- |
| Reported tokens | +30,147 | [-1,518.5, +39,219] | 中位数较高，区间跨 0 |
| Uncached input tokens | -1,720.5 | [-11,290, +2,952] | 区间跨 0 |
| 工具调用 | +4.5 | [+2.5, +6.5] | 区间完全高于 0 |
| 墙钟时间 | +10.919 秒 | [-1.433, +31.043] 秒 | 中位数较慢，区间跨 0 |

不能因为 Adaptive 相对 Full 的中央值较低，就省略相对 Control 的额外调用与
时间。Full Palace 本身也可能有较高固定成本，因此两种 baseline 回答的是不同
问题。

## 指标分别代表什么

| 指标 | 代表 | 不代表 |
| --- | --- | --- |
| 正确完成 | 公开测试、隐藏 Oracle、范围与禁止文件全部通过 | 在所有真实项目都正确 |
| Palace output bytes | Palace 最终送出的序列化 payload | Codex 总上下文或总 Token |
| Estimated Palace tokens | 对 Palace payload 的本地估算 | API 账单 |
| Reported tokens | Codex transcript 中的累计计数 | 精确账单金额 |
| Uncached input | transcript 提供的非缓存输入计数 | 完整服务端 cache 审计 |
| Tool calls | Agent 记录到的工具调用次数 | 每次调用成本相同 |
| Wall time | 当次端到端时间 | 排除服务负载与网络噪声后的纯处理时间 |
| Route Recall@K | ground-truth 文件是否进入路线 | Agent 实际读取了全部内容 |
| Transcript path strings | transcript 出现的不同路径文字 | 操作系统级文件读取记录 |

## 为什么看配对差值

同一 trial 的四个 Arm 使用相同任务、fixture seed 与 Git tree。分析先计算同一
trial 内的 treatment 减 baseline，再汇总配对差值。这样比直接相减两个独立组
中位数更符合实验设计，也能减少 fixture 难度差异的影响。

95% 配对 bootstrap 区间跨越 0，表示这组探索性样本没有建立稳定方向；它既不
等于“证明没有任何差异”，也不应该被写成确定的节省。每场景只有四组配对，
区间仍然很粗。

## 四个场景告诉了什么

| 场景 | Adaptive 模式 | 主要发现 | 边界 |
| --- | --- | --- | --- |
| `small-local-bug` | `route-lite` 4/4 | Palace payload 较小，但相对 Control 仍有固定调用成本 | 单文件任务可能不值得路由 |
| `cross-stack-regression` | `full-palace` 4/4 | 路线覆盖 client/server ground truth | Control 也全部成功 |
| `tenant-memory-pitfall` | `full-palace` 4/4 | v0.2.1 Adaptive 四次遗漏已播种记忆 | apparent savings 不是等内容比较 |
| `stale-memory-adversarial` | `guarded-memory-palace` 4/4 | 四次带入旧记忆与 current-code-first guardrail | 所有 Arm 都拒绝旧建议，比较优势未证明 |

## 记忆遗漏如何处理

useful-memory 场景发现 Vertex Palace 0.2.1 的 Adaptive 在选择 `full-palace` 时，
四次都报告 0 个 memory item 与 0 个 guardrail；Full 则四次都送入两条 Aurora
记录。因此该区块仍是有效的 v0.2.1 产品行为证据，但不是“同样记忆、只改变
Adaptive 选择器”的等内容效率比较。

后续 Vertex Palace 版本已修复这个问题，但不能改写冻结结果。修复后的效果需要
新的 protocol、版本 pin、trial id 与 seed；不能把产品修复倒推成 v2.2 已经验证。

## 可以与不可以说什么

可以说：

- 在四个合成场景中，所有 Palace Arm 的路线都覆盖 ground truth。
- Adaptive 相对 Full 稳定缩小 Palace 自身 payload。
- guarded stale-memory 模式稳定加入明确防护语。
- 本研究公开负面、无差异、无效与基础设施噪声记录。

不可以说：

- Vertex Palace 普遍节省 Codex Token 或墙钟时间。
- Vertex Palace 在这些场景提高了正确率。
- 较少路径等于较少文件读取或较低总成本。
- v0.2.1 的 Adaptive 与 Full 在 useful-memory 场景接收了相同记忆。
- 64 个合成仓库 Arm 足以代表所有语言、模型、机器与大型真实项目。

## 继续审核

- [最终报告](../research/ADAPTIVE_V2_2_FINAL.md)
- [威胁与限制](../research/THREATS_TO_VALIDITY.md)
- [数据字典](../research/DATA_DICTIONARY.md)
- [完整 v2.2 evidence](../../results/adaptive-pilot-v2.2/)
- [快速复现与 checksum 审核](./QUICKSTART.md)
