# 生产蓝图

本页总结了合理的生产方法，而不是原始功能列表。

## 蓝图 1：基岩专用服务器

用途：

- `VoiceCraft.Server`
- `McHttp`
- `VoiceCraft.Addon.Core.McHttp`

为什么：

- 最干净稳定的基岩部署
- 最容易监控
- 最容易向服务员解释

## 蓝图 2：当地社区/带有 Geyser 的 SMP

用途：

- `VoiceCraft.Server`
- `McTcp`
- `GeyserVoice` direct Paper mode

可选：

- 如果您更喜欢单个 Java 端安装流程，请让 GeyserVoice 管理 VoiceCraft 运行时

## 蓝图 3：大型 Java 网络

用途：

- external `VoiceCraft.Server`
- `McTcp`
- `GeyserVoice` on proxy
- `GeyserVoice` on backend nodes

为什么：

- 中央控制
- 更干净的缩放
- 更轻松地重新启动，无需触及每个后端

## 蓝图 4：构建器/测试环境

用途：

- `McWss`
- `Core.McWss`
- 本地 VoiceCraft 实例

为什么：

- 快速本地循环
- 适合测试插件自动化

## 操作建议

- 尽可能将 VoiceCraft 日志与游戏日志分开存储
- 在大规模升级之前轮换或存档配置
- 保持传输 token的秘密
- 每次拓扑更改后测试绑定流
