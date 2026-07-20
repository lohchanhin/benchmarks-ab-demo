# 候选验证：Stale-Memory 区块

状态：**stale-memory 完成 4/4 trial；16/16 Arm 全部有效且成功**。

这一组完成了整轮非正式候选研究：16/16 trial、64 个尝试 Arm。全研究共有 63 个有效、
58 个成功；唯一无效 Arm 仍是先前已公开的 small-local 网络启动事故。

## 完整性与基础设施

- 所有预注册 ID、seed、cache state 与 Williams 顺序都照计划执行。
- 防休眠守卫在整个区块保持 active，结束后正常释放。
- 128 个公开证据文件全部通过 checksum 与隐私审计。
- 所有 Arm 都顺序执行，没有同时运行影响比较。

## 正确性与过期记忆行为

Control、Route-only、Full、Adaptive 四次都通过公开测试与隐藏 Oracle。每个 Arm 都只修改
scheduler loader，changed-file precision 与 recall 均为 `1.0 / 1.0`，没有修改保留的 v1
compatibility data。

Adaptive 四次都选择 `guarded-memory-palace`，也从未采用过期的 v1 指示。每次 payload
包含两条 v1 记忆、两条 guardrail、零条排除记忆。上下文明确把记忆范围标成
`scheduler-v1`，要求 Agent 把 stale/legacy 证据当成警告，并以当前代码与测试解决冲突。

这是行为安全上的成功，但机制必须说清楚：0.3.0 没有删除 stale memory，而是把它们作为
受 guardrail 保护的警告带入。未来版本可以直接排除明显的 scope mismatch，只保留精简的
机器可读冲突提示，以同时降低风险与 payload。

## 路由与 Payload

12 个 Palace Arm 的 Route Recall@K 与 Precision@K 都是 `0.75`。它们找到了 active runtime
configuration、legacy configuration、scheduler loader 与测试，但四文件 ground truth 中的
migration document 没有进入路线。任务仍能完成，因为当前代码与测试已暴露正确 contract。

Adaptive 每次输出 4,427 bytes（约 1,107 个估计 Token）；传统 Full 是 2,882 bytes，
Route-only 是 2,082 bytes。Guarded memory 与审计 telemetry 在这里增加了 Palace 自身 payload。

## 配对结果

| 比较 | 成功率 | Reported Token 配对中位差 | 工具调用配对中位差 | 墙钟时间配对中位差 |
| --- | ---: | ---: | ---: | ---: |
| Adaptive - Control | 4/4 对 4/4 | +26,937.5（95% bootstrap CI +16,418 到 +39,316） | +3（CI 0 到 +7） | +14.920 秒（CI +9.838 到 +20.449） |
| Adaptive - Full | 4/4 对 4/4 | -13,455（CI -32,287 到 +2,111） | -1（CI -2 到 0） | +0.051 秒（CI -9.056 到 +4.465） |

这组数据支持 stale-memory resistance，不支持相较 Control 的效率优势。Adaptive 相对
Control 持续更贵；相对 Full 的差异则落在很宽的区间内。

## 区块决定

过期记忆安全闸门通过：Palace Arm 没有照做过期 v1 建议，也没有 wrong-memory adoption。
效率与 payload 闸门没有通过。这些结果会进入完整候选结论，不会单独触发 npm 发布。
