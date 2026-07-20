# Control-First v3 发布来源闸门

日期：2026-07-20

机器证据：[control-first-v3-release-provenance-2026-07-20.json](../research/evidence/control-first-v3-release-provenance-2026-07-20.json)

## 当前状态

正式 v3 研究仍刻意保持未冻结：16 个 trial、64 个 Agent Arm 都尚未执行。本阶段
只增加可执行的安装包来源校验，不算 Agent 结果，也不宣称已经提高效率。

Vertex Palace 最终包内容源码固定为
`e901c1739c5aa907bc44ebcbd25bbdd7abd75e7a`，已核对的发布证据提交为
`f2e0ccabb0f5a7af77a72b971524122469f47172`；后续提交只加入不在 npm 文件清单内的
研究资产。多次 `npm pack --dry-run` 都产生相同的 7 文件 `vertex-palace@0.3.0`：

- SHA-1：`04602918f8e661a57c8286fb7b6d344baf9fb3aa`
- integrity：`sha512-muQvR5KxELoxhFKCUfnASJW58g9xdWp3+u6UJxtzAtiCpz8nh2GWDSm6UNmVIMeFt+qY7IdQ/s5yWrCcwgPRvg==`

发布前已经通过产品 lint、90 项测试、build、MCP smoke、干净安装包验证，以及固定
Zod／Requests 仓库验证。旧候选继续保留在非正式 preflight 记录中；重新绑定最终候选前
没有产生正式 v3 结果。

## 真实仓库来源证据

真实仓库闸门现已使用精确发布源码
`e901c1739c5aa907bc44ebcbd25bbdd7abd75e7a` 和上方完全相同的 7 文件 tarball
重新生成。已核对的证据提交为
[`f2e0ccabb0f5a7af77a72b971524122469f47172`](https://github.com/lohchanhin/vertex-palace/commit/f2e0ccabb0f5a7af77a72b971524122469f47172)，
后续 [CI 29743726827](https://github.com/lohchanhin/vertex-palace/actions/runs/29743726827)
已通过 Ubuntu、Windows、macOS 与 npm package dry-run。

Zod 是固定的 TypeScript monorepo 案例，Requests 是固定的 Python 案例。每个仓库都在
精确 commit 上重新克隆，并使用干净安装的候选包、6,000-token 上限重复路由两次。
四次运行都只返回已知实现与聚焦测试：目标召回率 `1.000`、严格目标精度 `1.000`、
边界稳定性 `2/2`、已选路线与 Excluded 路径重叠集为空，tracked worktree 也保持干净。完整任务、预期／实际路径、仓库 commit
和执行命令已经复制到机器证据，评审不需要跨仓库猜测。但这仍是没有 Control Arm 的
产品路由闸门，时间只能用于诊断，不能证明 Agent 更快或更省 Token。

benchmark 侧同步任务的 Palace 路线在 5 个实际改动中只命中 `test/docs.test.mjs`，
coverage 为 `0.20`、focus 为 `0.10`、confidence 为 `0.35`。机器 JSON 与三份发布／
preflight 说明都被漏掉；这个 `needs-review` 结果与通过项一起保留，直接说明证据到双语
文档的路由仍需改进。

## npm 发布尝试

`npm whoami` 已确认账号为 `lohchanhin`。0.3.0 发布进入 npm 官方浏览器授权页后，
授权没有在 CLI endpoint 过期前完成，因此返回 `E404`。Registry 回读仍找不到
`vertex-palace@0.3.0`，所以没有半发布或来源不明的 0.3.0。Benchmark 依赖会继续
保留 0.2.1，直到新的互动授权成功并完成 registry 回读。

## 新增防线

v3 计划 schema 升为 6。除了版本与源码提交，它还预注册发布提交、tarball SHA-1
和 npm integrity。任何正式 Agent Arm 启动前，runner 都会核对：

1. `package.json` 是否要求精确版本；
2. `package-lock.json` 的根依赖和包记录是否都是该版本；
3. resolved URL 是否指向预期 npm tarball；
4. lock integrity 是否与计划完全相同；
5. 实际安装包是否报告精确版本。

单元测试证明正确安装会通过，篡改 integrity 会失败。加入可执行闸门前，完整
benchmark check 已通过 63/63 测试、5 个 fixture contract、所有历史 evidence audit、
v2.2 分析重现；v3 公开 manifest 仍为 0/16。

后续新增 `npm run gate:control-first:v3`，以及先跑全套检查的
`npm run check:release-ready`。第一次真实执行通过 11/19，失败的 8 项都符合现状：
registry 没有 0.3.0，`package.json` 与 lockfile 的版本、tarball URL、integrity 仍属于
0.2.1；但本机 `node_modules` 却显示 0.3.0。这证明只检查本机安装目录会错误判断为已就绪。
闸门不会启动 Codex，也不会输出 npm 授权网址或 registry 错误正文。
它会显式查询 `https://registry.npmjs.org`，并从 npm 子进程环境移除盲测情境密钥。
加入两项闸门测试后，完整套件再次通过 65/65，fixture、历史证据与空 manifest 保证不变。

## 路由自评

Vertex Palace 命中 7 个实际改动中的 5 个，coverage 与 focus 均为 0.71，confidence
为 0.35；它漏掉根目录简体中文 README 和核心 `src/commands/study.mjs`，所以仍是
`needs-review`。99.6% repository-to-pack 缩减只代表选择的上下文较小，不能当作
Agent 总 Token 或执行时间下降的证据。

可执行闸门的后续自评进一步暴露 release 路由缺口：默认路线只命中 3/11，coverage
0.27、focus 0.30；把 route limit 扩到 40 也只命中 4/11，coverage 0.36，focus 反而
降到 0.17。两者 confidence 都是 0.35，校准没有虚高，但都漏掉新的核心
`src/lib/release-gate.mjs` 和大部分双语证据。扩大上限主要加入无关 fixture 与旧记忆
证据，因此后续产品方向应是源码、测试、脚本、文档的 sibling／provenance 路由，不能
把较小 context pack 当成“已经足够”的证明。

## 下一道闸门

等使用者在场时重新完成 npm 官方浏览器授权，再从 registry 核对 shasum 与 integrity，
把本仓库升级到精确 0.3.0，以干净 `npm ci` 重跑完整检查。之后才生成私密盲测密钥、
提交 commitment、冻结计划并打协议 tag；冻结 tag 之前不能执行任何正式 Arm。

## 冻结与 Git tag 执行闸门

Harness 现在会强制执行最后顺序，而不是依赖人工记忆。`npm run freeze:control-first:v3`
先要求干净工作区并通过完整 release-ready；所有子进程结束后才读取 32-byte 私钥。
默认只预览，追加 `-- --write` 才把 commitment 写入计划并设为 frozen。返回对象、终端
输出、计划和子进程环境都不会包含私钥。

任何 v3 Agent Arm 前，`study --execute` 都会检查 Git。首次执行必须是
`protocol-v3.0.0` 精确指向的干净 commit。续跑可以位于该 commit 或其后代，但已提交
文件只能是 `results/control-first-v3/` 下且不能是 `plan.json`，工作区也只能修改 v3
manifest；这样既能恢复中断，也不能偷偷改源码或协议。

第一次续跑测试确实抓到解析缺陷：共用 line helper 在切路径前移除了 Git porcelain
前缀，导致 `results/...` 变成 `esults/...`。改用保留前缀的专用解析器后，聚焦套件
17/17 通过，覆盖缺失 tag、脏工作区、错误 HEAD、仅结果续跑、私钥不落盘与错误冻结输入。
完整 benchmark check 为 70/70，既有 fixture 与证据审计保持通过，正式 v3 manifest
仍是 0/16。

Palace 自评命中 5/14，coverage 0.36、focus 0.50、confidence 0.35，属于校准合理但
`needs-review`。它找到了三个核心实现文件，却漏掉 wrapper script、两项直接回归测试和
多数双语证据；这继续证明源码到测试／脚本的 sibling 路由仍需加强，不是效率结果。
