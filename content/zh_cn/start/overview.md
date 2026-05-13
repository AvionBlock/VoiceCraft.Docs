# 概述

VoiceCraft 是适用于 Minecraft 基岩版和相关桥梁场景的近距离语音平台。

它允许玩家运行单独的语音客户端，而 Minecraft 端自动化告诉语音服务器每个玩家在哪里、他们位于哪个世界以及应应用哪些效果或可见性规则。

当您想要近距离语音而不依赖于一种确切的 Minecraft 服务器形状时，VoiceCraft 非常有用。相同的核心运行时可以与 Bedrock 插件、Java/Geyser 桥或代理部署相结合。

## 您正在设置什么

大多数部署都具有三个移动部分：

1. `VoiceCraft.Client`
   每个玩家安装的桌面和移动应用程序
2. `VoiceCraft.Server`
   用于语音流量、状态同步、审核和传输端点的独立后端
3. 面向 Minecraft 的运输
   `McHttp`、`McWss` 和 `McTcp`

生态系统集成将 Minecraft 连接到这些传输：

- `VoiceCraft.Addon` 适用于基岩世界和 BDS
- `GeyserVoice` 用于 Java / Geyser / 代理堆栈

## 它是如何运作的

1. 客户端通过 UDP 连接到 `VoiceCraft.Server`。
2. 服务器跟踪语音会话、实体、位置、世界 ID、效果位掩码和审核状态。
3. Minecraft 端集成会更新服务器的游戏状态：
   - BDS 的 `McHttp`
   - `McWss` 适用于本地基岩世界
   - `McTcp` 用于 `GeyserVoice`
4. 客户端根据服务器状态和选定的本地设置呈现邻近音频。

语音连接和 Minecraft 传输连接是分开的。如果仅连接一侧，设置可能看起来部分正常，但接近行为仍然不完整。

## 支持的客户端平台

- Windows（`x86`、`x64`、`arm64`）
- Linux（`x64`、`arm32`、`arm64`）
- macOS（`x64`、`arm64`）
- Android (`arm64`)
- iOS（`arm64`、`.ipa`）

## 是什么让 VoiceCraft 变得灵活

- 多种 Minecraft 运输工具
- 基岩插件 API 表面
- 通过 `GeyserVoice` 的 Java 端桥
- 可配置的效果和实体元数据
- 服务器端和客户端两种定位模式

这种灵活性还意味着第一个决定很重要：首先选择拓扑，然后遵循该传输的指南。

## 常见的拓扑选择

| 如果你跑... | 从...开始 | 为什么 |
|---------------|---------------|-----|
| 基岩专用服务器 | [McHttp for BDS](/minecraft/mchttp-bds) | BDS可以调用稳定的HTTP端点 |
| 当地基岩世界 | [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer) | 通过本地 websocket/命令隧道流工作 |
| 带有 Geyser/Floodgate 的 Java 服务器 | [GeyserVoice](/ecosystem/geyservoice) | Java 端插件通过 `McTcp` 桥接至 VoiceCraft |
| Direct Paper服务器 | [GeyserVoice Direct Paper](/ecosystem/geyservoice-direct-paper) | 插件可以使用外部服务器或管理运行时 |

## 接下来读什么

- [Quick Start](/start/quick-start)
- [Download](/download)
- [Transport Modes](/server/transports)
- [System Architecture](/architecture/system-architecture)
- [Ecosystem Overview](/ecosystem/overview)
