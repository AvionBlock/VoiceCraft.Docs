# 生产蓝图

本页总结了合理的生产方法，而不是原始功能列表。

当您决定要标准化的拓扑时，请使用这些蓝图。他们故意固执己见：目标是减少移动部件，而不是一次暴露所有可能的传输。

## 蓝图 1：Bedrock 专用服务器

用途：

- `VoiceCraft.Server`
- `McHttp`
- `VoiceCraft.Addon.Core.McHttp`

为什么：

- 最干净稳定的Bedrock部署
- 最容易监控
- 最容易向服务员解释

推荐形状：

```text
BDS addon -> McHttp -> VoiceCraft.Server
players -> VoiceCraft UDP endpoint
```

保持 `McWss` 和 `McTcp` 处于禁用状态，除非您有特定原因要运行它们。

## 蓝图 2：本地社区/带 Geyser 的 SMP

用途：

- `VoiceCraft.Server`
- `McTcp`
- `VoiceCraft.Java` Direct Paper 模式

可选：

- 如果您更喜欢单个 Java 端安装流程，请让 VoiceCraft.Java 管理 VoiceCraft 运行时

推荐形状：

```text
Paper/Folia + VoiceCraft.Java -> McTcp -> VoiceCraft.Server
players -> VoiceCraft UDP endpoint
```

当一个 Java 端服务器是玩家位置的主要权威时，这是一个很好的选择。

## 蓝图 3：大型 Java 网络

用途：

- 外部 `VoiceCraft.Server`
- `McTcp`
- 代理上的 `VoiceCraft.Java`
- 后端节点上的 `VoiceCraft.Java`

为什么：

- 中央控制
- 更干净的结垢
- 更轻松地重新启动，无需触及每个后端

推荐形状：

```text
backend Paper nodes -> proxy relay -> proxy VoiceCraft.Java -> McTcp -> VoiceCraft.Server
players -> VoiceCraft UDP endpoint
```

将代理保留为唯一的 VoiceCraft 连接所有者。后端节点应该生成快照，而不是竞争主 `McTcp` 连接。

## 蓝图 4：构建器/测试环境

用途：

- `McWss`
- `Core.McWss`
- 本地 VoiceCraft 实例

为什么：

- 快速本地循环
- 适合测试插件自动化

推荐形状：

```text
local Bedrock world -> McWss -> local VoiceCraft.Server
local client -> local VoiceCraft UDP endpoint
```

不要将此视为公共Bedrock服务器的默认生产设计。当世界变得长时间运行或共享时，移至 `McHttp`。

## 选择蓝图

| 需要 | 选择 |
|------|--------|
| 稳定的Bedrock产量 | 蓝图1 |
| 一台 Java/Geyser 服务器 | 蓝图2 |
| 速度/蹦极网络 | 蓝图3 |
| 本地测试或插件开发 | 蓝图4 |

## 操作建议

- 尽可能将 VoiceCraft 日志与游戏日志分开存储
- 在大型升级之前轮换或存档配置
- 保持传输令牌的秘密
- 每次拓扑更改后测试绑定流程
- 仅公开所选蓝图所需的传输
- 在更改端口或令牌之前保留 `ServerProperties.json` 的回滚副本
- 记录您的环境中哪个服务拥有 VoiceCraft 进程
