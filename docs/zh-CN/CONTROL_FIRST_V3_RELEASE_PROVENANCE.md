# Control-First v3 发布来源闸门

日期：2026-07-20

机器证据：[control-first-v3-release-provenance-2026-07-20.json](../research/evidence/control-first-v3-release-provenance-2026-07-20.json)

## 当前状态

正式 v3 研究仍刻意保持未冻结：16 个 trial、64 个 Agent Arm 都尚未执行。本阶段
只增加可执行的安装包来源校验，不算 Agent 结果，也不宣称已经提高效率。

Vertex Palace 实现提交固定为
`97d1736f971438f7f2913f0b731633b0bab8441d`，发布候选 HEAD 为
`8328ea29d55260e34e2e6170bd420e4c659af39e`；两者之间只多了不进入 npm 包的机器
证据 JSON。多次 `npm pack --dry-run` 都产生相同的 7 文件 `vertex-palace@0.3.0`：

- SHA-1：`4f4f7843cbfebaec0a9f3aade31fac24d96d1133`
- integrity：`sha512-wfxQUxLKk1kQxQm8X1eGKbRaXX/yxIla8KO6PAxj83Fx+7ofwQSzla6tTVvLIlBOxchGy0OmopFdS684GDz9RA==`

发布前已经通过产品 lint、89 项测试、build、MCP smoke、干净安装包验证，以及固定
Zod／Requests 仓库验证。

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

单元测试证明正确安装会通过，篡改 integrity 会失败。完整 benchmark check 通过
63/63 测试、5 个 fixture contract、所有历史 evidence audit、v2.2 分析重现；v3
公开 manifest 仍为 0/16。

## 路由自评

Vertex Palace 命中 7 个实际改动中的 5 个，coverage 与 focus 均为 0.71，confidence
为 0.35；它漏掉根目录简体中文 README 和核心 `src/commands/study.mjs`，所以仍是
`needs-review`。99.6% repository-to-pack 缩减只代表选择的上下文较小，不能当作
Agent 总 Token 或执行时间下降的证据。

## 下一道闸门

等使用者在场时重新完成 npm 官方浏览器授权，再从 registry 核对 shasum 与 integrity，
把本仓库升级到精确 0.3.0，以干净 `npm ci` 重跑完整检查。之后才生成私密盲测密钥、
提交 commitment、冻结计划并打协议 tag；冻结 tag 之前不能执行任何正式 Arm。
