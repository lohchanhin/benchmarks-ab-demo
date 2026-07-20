# 修订版 Bypass 工程确认

状态：**3 次探索性试验完成，12 个 Agent arm 全部有效且成功**。

[英文报告](../research/REVISED_BYPASS_CONFIRMATION.md) |
[机器可读摘要](../../results/revised-confirmation/exact-command-summary.json) |
[证据清单](../../results/revised-confirmation/manifest.json)

## 为什么要做这组确认

已经完成的 16 次候选研究证明 Adaptive Palace 能保持正确性与修改范围，
但相对 Control 仍消耗更多调用、时间与 reported tokens。逐条检查 transcript
后，发现两个可以直接修复的行为：为了找测试命令而重读 `package.json`，
以及把最终 Git 检查拆成多次调用。

这组资料属于候选研究之后的工程证据，不会改写已完成的候选研究，也不会
加入 formal v3 的观察值。

## 研发顺序

第一次试验只提供了更严格的执行指引，并写成「已知或惯用测试命令」。
Adaptive 仍然打开 `package.json`。它虽然正确且有效，但比 Control 多 1 次
调用、多 14,812 reported tokens，并慢 14.964 秒。

下一版改成由 Palace 在同一次调用内部解析仓库测试命令，再把 `run npm test`
写入原本只有三个字段的 bypass 输出。测试 artifact 绑定源码提交
`4b0440cd32270c951b13e83e0d18fd5038e1108f`，SHA-1 为
`19c8f5452050959ae6a7beb18dc71199a2174a76`。

## 精确命令的两个配对

两个试验的所有 arm 都通过公开测试、hidden oracle、严格修改范围、任务忠实度
与 runtime 有效性检查。

| 试验 | 顺序前两项 | Adaptive - Control 时间 | 调用 | Reported tokens | 检索命令 | 引用路径 |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| `exact-command-small-local-02` | Adaptive -> Control | -2.313 秒 | +1 | +26 | -1 | -2 |
| `exact-command-small-local-03` | Control -> Adaptive | +2.141 秒 | +2 | +13,315 | -1 | -4 |
| **配对中位数** | 顺序平衡 | **-0.086 秒** | **+1.5** | **+6,670.5** | **-1** | **-3** |

时间为负代表 Adaptive 较快；调用或 token 为正代表 Adaptive 使用更多。

## 已经确认的好发展

- 两个配对中 Adaptive 都选择 `bypass`，输出只有约 64 tokens。
- Adaptive 两次都没有再读取 `package.json`。
- Adaptive 两次都只引用 `src/format-currency.mjs`；Control 分别引用 3 与 5 条路径。
- Adaptive 两次都少 1 个检索命令。
- 配对中位时间差约 0.086 秒，实际可视为持平。

## 仍未解决的问题

Agent 没有稳定遵守「合并最终检查」的文字指令。一次把 `git diff` 与
`git status` 拆成两次，另一次把 `git diff --check`、`git status` 与目标 diff
拆成三次。因此即使 package 重读已经消失，仍保留多 1 到 2 次调用的成本，
目前也还不能声称节省 reported tokens。

下一项产品实验应直接输出一条可执行的最终检查命令，而不是继续增加说明文字。
只有两个配对不足以支持发布层级的性能结论，exact-command 版本仍是工程候选。
