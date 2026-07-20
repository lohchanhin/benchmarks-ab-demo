# Control-First v3 最终报告

状态：正式执行完成，属于预注册的探索性研究。16 项 trial、64 个 Agent Arm
都已发布到 `results/control-first-v3/`。

[English](../research/CONTROL_FIRST_V3_FINAL.md) | [中文协议](PROTOCOL_V3.md) | [机器分析](../../results/control-first-v3/analysis.json) | [揭盲记录](../../results/control-first-v3/blinding-reveal.json)

## 一句话结论

Vertex Palace 0.3.0 显示出有意义的**合成历史决策记忆信号**，但没有证明普遍性能
优势。Adaptive Palace 完成 16/16，Control 完成 13/16。三个不同结果全部出现在
隐藏租户所有权场景：Control 选择了局部看来合理、但违反历史治理范围的修改；
Adaptive 使用相关历史决策后选择正确范围。

这个正确性差异还没有达到统计显著：原始精确配对 p=0.25，四场景 Holm 校正后
p=1.00。在双方都成功的 13 对中，整体 Token、墙钟时间与工具调用区间都跨越 0。
因此不能宣称 Vertex Palace 已经普遍更快或更省。

## 冻结设计

- 产品：公开 `vertex-palace@0.3.0`，固定 npm SHA-1 与 integrity。
- 协议：`3.0.0`，所有 Agent 结果产生前已标记 `protocol-v3.0.0`。
- 规模：4 个场景，每场景 4 个 seed，每次顺序运行 4 个 Arm。
- Arm：Control、Route-only、Full Palace、Adaptive Palace。
- 顺序：四臂 Williams 平衡；每场景两次 warm、两次 cold index。
- 正确性：公开测试、隐藏 Oracle、精确修改范围与禁止文件检查。
- 盲化：历史决策 owner 由 256-bit 私钥决定；全部结果在提交
  `0c81fb268ed3f4c856fd33e11612a82b769fd7b3` 锁定后才揭盲。

## 主要结果

差值定义为 `Adaptive - Control`。资源指标为负时偏向 Adaptive。效率只统计双方
都成功的配对。

| 场景 | Control 成功 | Adaptive 成功 | Reported Token 差值与 95% CI | 时间差值与 95% CI | 调用差值与 95% CI |
| --- | ---: | ---: | ---: | ---: | ---: |
| 小型单文件 bug | 4/4 | 4/4 | -1,443.5 [-37,997, 38] | -3.7 秒 [-25.9, 3.0] | +0.5 [-2, 2] |
| 跨栈回归 | 4/4 | 4/4 | -13,822.5 [-27,995, 2,429] | +0.1 秒 [-10.0, 10.7] | -1 [-1, 0] |
| 历史决策记忆 | 1/4 | 4/4 | -97,299 [n=1] | -79.2 秒 [n=1] | -16 [n=1] |
| 过期记忆对抗 | 4/4 | 4/4 | +36,954 [22,498, 52,473] | +22.6 秒 [11.9, 25.0] | +4.5 [3, 6] |

历史决策场景只有一对双方都成功，因此该行的效率数字只是描述，不能当成稳定效果。

## 整体结果

- 16 对 Adaptive-Control 全部有效。
- Adaptive 成功率 100%，Control 成功率 81.25%。
- Adaptive 独有成功 3 次，Control 独有成功 0 次。
- 成功率差 +18.75 个百分点，95% bootstrap 区间 [0, 37.5]；精确配对 p=0.25。
- 13 对双方成功结果中，reported tokens 配对中位差 -806，区间
  [-14,743, 22,498]。
- 同一批配对的时间差 +3.0 秒，区间 [-6.1, 11.9]；调用差 0，区间 [-1, 3]。
- Adaptive 的修改文件 precision／recall 中位数均为 100%，禁止修改为 0；Control
  有 3 次禁止范围违反，全部来自历史决策场景。

整体数字会掩盖场景差异：bypass 与跨栈任务大致持平或方向上有利；过期记忆防护
则有明确固定成本，因为这个场景的 Control 本来就能完成任务。

## 记忆结果

历史决策场景中，Control 与 Route-only 各成功 1/4，Adaptive 与 Full Palace 都是
4/4。Route-only 在 3/4 中踩到历史治理范围错误；两个带记忆模式都是 0/4。
这是目前最强的证据：当源码存在多个合理方向时，项目历史能帮助 Agent 选择正确范围。

过期记忆场景中，Adaptive 四次都没有纳入错误旧记忆、没有采用错误建议，并完成
4/4。安全护栏有效；但相对 Control 的中位成本为 +36,954 reported tokens、
+22.6 秒与 +4.5 次调用。

## 揭盲审计

私钥只在 16 项正式结果全部提交后公开。揭盲文件能重现冻结前的 SHA-256 commitment、
四项 HMAC assignment commitment 与三个 owner stratum。每项公开 trial 证据继续保留
匿名占位符；独立揭盲文件提供第三方复算所需资料。

```sh
npm run audit:control-first:v3
npm run analysis:control-first:v3
npm run verify:reveal:control-first:v3
```

预期审计结果为 16/16 trial、64/64 有效 Arm、58 个成功 Arm、128 份 checksum
验证通过的公开证据文件。

## 结论边界

本研究支持：结构化历史记忆能在一个答案不充分公开的合成任务中防止特定范围错误，
0.3.0 也能拒绝过期记忆。本研究不支持：Vertex Palace 普遍省 Token、加速、减少调用，
或已在真实仓库证明正确性优势。

下一轮应另建预注册 v4 协议，使用真实 issue、Git 历史、架构决策、TypeScript 与
Python 项目，并采用客观隐藏 Oracle。不能把 v3 数据重新包装成下一代新证据。
