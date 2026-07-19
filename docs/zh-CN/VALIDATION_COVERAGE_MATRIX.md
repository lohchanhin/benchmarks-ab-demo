# 验证覆盖矩阵

日期：2026-07-20

[English](../research/VALIDATION_COVERAGE_MATRIX.md) | [机器可读矩阵](../research/evidence/validation-coverage-matrix-2026-07-20.json)

## 为什么需要这份矩阵

Vertex Palace 目前有不同层级的证据：确定性路由闸门不等于 Agent A/B，fixture 预跑
不等于真实仓库结果，旧版探索性研究也不等于尚未发布的 0.3.0 结论。这份矩阵把边界
直接呈现给评审，也防止后续开发把工程 smoke 包装成性能胜利。

Palace 为这份矩阵规划的路线在 7 个实际文件中命中 `0/7`（coverage `0`、focus `0`、
confidence `0.35`）。路线停留在 fixture 源码，漏掉双语矩阵、机器证据、导航入口与直接
测试，因此属于过度自信的 `needs-review`。这项负结果继续公开，说明文档与 claim
inventory 类任务仍是明显弱项。

## 研究如何一路演进

### 第一次研究：固定 Palace treatment（v1.0.0）

第一次预注册研究使用 4 个确定性合成仓库，每个场景 5 个配对 trial，每个 trial 顺序
执行 Control、Route-only、Full Palace 三个 Arm。协议、seed、model、timeout、评分规则
和隐藏 Oracle 都在看到结果前冻结；只有配对双方都有效且成功时才比较效率。

20 个 trial、60 个 Arm 全部通过，因此没有观察到正确性下降。但 Full Palace 相对
Control 的配对中位数多 67,223.5 reported tokens（95% 区间 25,362.5 到 112,437.5）、
8.5 次工具调用（6 到 16）和 29.8 秒（16.4 到 49.2）。记忆没有提高租户任务正确性，
因为 Control 与 Route-only 也避开了陷阱。Full 在 5/5 过期记忆任务中拒绝旧建议，
属于安全价值，不是效率胜利。

### 第二次研究：Adaptive Palace（v2.2）

第二次加入 Adaptive 第四组，研究模式选择能否避免 Full Palace 的固定成本。4 个场景
各 4 个 trial，采用平衡 Williams 顺序、每场景 2 次 warm 与 2 次 cold index、顺序执行、
公开测试、隐藏 Oracle，并在 `protocol-v2.2.0` 先冻结。较早的 v2.0 因 PowerShell 把
三个任务文字中的 `$0.00` 改写而无效；v2.1 又因 Windows split writable roots 导致
patch verification 失败而停止。两次失败都没有删除。

v2.2 的 16 个 trial、64 个 Arm 全部有效且成功。Adaptive 相对 Full 的 Palace 自身
输出少 898.5 bytes，区间完全低于 0；但端到端 Token、调用与时间区间都跨 0。相对
Control，Adaptive 中位数多 30,147 reported tokens 与 10.919 秒，两者区间跨 0；工具
调用多 4.5 次，95% 区间为 2.5 到 6.5。研究也发现 0.2.1 Adaptive 在 useful-memory
场景 4/4 都漏掉记忆。被支持的价值是更小且可审计的路由输出与过期记忆防护，不是
普遍速度或 Token 优势。

### 当前方向：修正后的 0.3.0 与 Control-first v3

这些负结果直接推动 0.3.0 加入 true bypass、明确记忆 telemetry、范围化 guardrail、
执行边界、置信度校准和精确安装包来源。下一版协议把 Adaptive 对 Control 设为主比较，
使用带私密 commitment 的隐藏租户归属，并在 npm 公开 metadata、干净安装、freeze
commit 与 Git tag 全部一致前禁止正式 Arm。现在仍是 `frozen:false`、0/16 trial、
0/64 Arm。

## 当前覆盖

| 验证面 | 状态 | 证据 | 客观解释 |
| --- | --- | --- | --- |
| 本地干净安装、CLI 与 MCP | **产品闸门已验证** | 0.3.0 的 7 文件 tarball、干净安装、10 个 MCP 工具、跨平台 CI | 候选包在发布前可运行，但不是 Agent 对照实验。 |
| TypeScript monorepo 路由 | **产品闸门已验证** | 固定 Zod，重复两次边界一致，recall 1.000、严格 precision 1.000 | 只证明这一个固定 issue 任务能找对实现与测试。 |
| Python 仓库路由 | **产品闸门已验证** | 固定 Requests，重复两次边界一致，recall 1.000、严格 precision 1.000 | 只证明这一个固定 issue 任务能找对实现与测试。 |
| 独立 small-OSS 分层 | **尚未单独测试** | Requests 有 123 个索引文件，但没有预注册尺寸阈值 | 不能看完结果后才把 Requests 改称 small OSS；未来需独立定义。 |
| 真实仓库 issue 型任务 | **产品闸门已验证** | 仅 Zod／Requests 检索 | 已证明两个固定任务的路由；尚未运行端到端 Agent 修复。 |
| 真实仓库历史决策任务 | **尚未测试** | 无 | Palace 记忆在真实项目中的正确性价值仍未知。 |
| 真实仓库 architecture/refactor | **尚未测试** | 无 | 跨模块架构覆盖仍未知。 |
| 真正 Adaptive bypass 契约 | **产品闸门已验证** | 连续四次都是 3 字段、200 bytes | 工具可以不打包源码，但 Agent 后续仍可能自行扩大探索。 |
| 记忆依赖租户 fixture | **工程预跑** | 一次顺序预跑：Route-only 失败；Full、Adaptive、Control 通过 | 记忆胜过纯结构路由一次，但正确性没有胜过 Control。 |
| 过期记忆抵抗 | **旧版探索性证据** | v2.2：4 trial、16 个有效成功 Arm，没有采用错误记忆 | 0.2.1 在这组合成案例中安全；0.3.0 v3 尚未复验。 |
| Adaptive 对 Control 效率 | **旧版探索性证据** | v2.2：16 对共同成功；Adaptive +30,147 tokens、+10.919 秒、+4.5 次调用 | Token 与时间区间跨 0；工具调用额外成本没有跨 0，未证明效率优势。 |
| Control-first v3 正式研究 | **阻塞，尚未执行** | `frozen:false`；0/16 trial；0/64 Arm | 目前没有 0.3.0 正式 Agent 结果。 |
| npm 公共安装 | **阻塞** | registry latest 仍为 0.2.3；浏览器授权曾过期 | 本地 0.3.0 证据不能代替不可变的公共 registry metadata。 |

## 目前可以说

- 打包后的 0.3.0 候选在固定 Zod 与 Requests 任务中，能稳定只返回已知实现和聚焦测试。
- 候选版具有紧凑的真正 bypass 契约，也能审计记忆纳入与排除原因。
- 已保留的 v2.2 说明 Adaptive 相对 Full 缩小 Palace 自身 payload，但没有证明相对
  Control 的端到端 Token 或时间下降。
- 一次记忆依赖预跑中，Route-only 选错租户而 Adaptive 成功；不过 Control 也成功。

## 目前不能说

- Vertex Palace 普遍节省 Agent Token、时间或工具调用。
- Vertex Palace 在真实仓库上比普通 Codex 更正确。
- 当前已经覆盖独立预注册的 small-OSS、真实历史决策或 architecture/refactor 任务。
- `vertex-palace@0.3.0` 已可从 npm 公共安装。

## 下一批证据

1. 发布 npm 0.3.0，并回读不可变版本、SHA-1 与 integrity。
2. 从干净 clone 安装精确 0.3.0，通过 release gate，冻结 v3 并建立
   `protocol-v3.0.0` tag。
3. 顺序执行预注册的 16 个 Control-first trial。
4. 在未来独立协议中，先定义 small-OSS 尺寸阈值再选仓库，并加入带隐藏客观 Oracle
   的真实历史决策与 architecture/refactor 任务。
