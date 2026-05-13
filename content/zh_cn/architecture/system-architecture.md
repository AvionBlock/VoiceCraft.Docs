# 系统架构

VoiceCraft 是一个近距离语音堆栈，而不是单个 Minecraft 模组。客户端携带麦克风音频，服务器拥有语音会话和共享状态，Minecraft 集成层告诉服务器玩家在哪里以及他们应该如何表示。

这种分离是有意为之的：只要连接了正确的面向 Minecraft 的传输，同一语音服务器就可以与基岩专用服务器、本地基岩世界、直接 Paper 服务器和代理网络一起使用。

## 主要层

| 图层 | 主要职责 | 典型安装位置 |
|-------|---------------------|--------------------------|
| `VoiceCraft.Client` | 捕获麦克风输入、发送语音数据包、播放附近的声音、存储本地音频首选项。 | 播放器设备 |
| `VoiceCraft.Server` | 接受语音客户端、存储实体状态、应用审核标志和音频效果默认值、公开 Minecraft 传输。 | VPS、游戏主机、本地 PC 或插件管理的运行时 |
| 我的世界集成 | 将玩家/实体位置和生命周期数据从 Minecraft 发送到 VoiceCraft。 | Bedrock 插件、Paper 插件或代理插件 |

### 客户端层

`VoiceCraft.Client` 处理：

- 麦克风捕获和预处理
- 一键通、静音、聋、输入/输出设备选择
- 与 `VoiceCraft.Server` 的 UDP 连接
- 根据服务器状态播放附近的语音
- 本地每用户音量和本地静音首选项

在正常的服务器端模型中，客户端不会自行发现 Minecraft 玩家的位置。它依赖于服务器和 Minecraft 集成来提供实体和世界状态。

### 服务器层

`VoiceCraft.Server` 处理：

- VoiceCraft UDP 客户端会话
- 网络实体状态和绑定状态
- 服务器端审核标志
- 效果位掩码和音频效果默认值
- 面向 Minecraft 的传输：`McHttp`、`McWss` 和 `McTcp`
- `config/ServerProperties.json` 中的持久配置

服务器是玩家客户端和 Minecraft 端集成必须达成一致的共享运行时。如果客户端已连接但 Minecraft 未连接，则玩家可能会显示为没有有用的世界位置数据的语音会话。

### Minecraft 集成层

这取决于拓扑：

- `VoiceCraft.Addon.Core.McHttp` 用于基岩专用服务器
- `VoiceCraft.Addon.Core.McWss` 用于本地基岩世界和命令隧道设置
- `GeyserVoice` 适用于 Java、Geyser/Floodgate、Paper、Velocity 和 BungeeCord 拓扑

集成层负责将游戏事件转换为 VoiceCraft 状态：玩家加入、玩家离开、位置更新、世界标识符、绑定请求、虚假实体、效果更改和连接生命周期。

## 核心数据概念

VoiceCraft 围绕实体而不仅仅是原始套接字。

实体携带状态，例如：

- 姓名
- 标题
- 描述
- 位置
- 旋转
- 世界ID
- 静音/聋状态
- 效果位掩码

网络客户端可以表示为实体，并且 Minecraft 集成也可以创建或更新实体。该模型让 VoiceCraft 通过相同的状态管道描述真实玩家、虚假/显示实体和自定义世界驱动的语音目标。

## 为什么运输是分开的

VoiceCraft 语音流量和 Minecraft 自动化并不总是存在于同一环境中。

这就是为什么：

- 玩家客户端与核心UDP语音服务器对话
- Bedrock 或 Java 集成通过 Minecraft 传输进行对话
- 每个传输可以有自己的令牌、主机绑定和最大客户端限制

这种分离可以让您在更改 Minecraft 集成的同时保持语音服务器的稳定。例如，仅基岩部署可以使用 `McHttp`，而 Java/Geyser 网络可以保留相同的核心语音服务器，但将 Minecraft 端切换到 `McTcp`。

## 典型连接形状

### 基岩专用服务器

```text
VoiceCraft.Client -> VoiceCraft UDP server
BDS + VoiceCraft.Addon.Core.McHttp -> McHttp endpoint
```

当 Bedrock 服务器可以到达 `VoiceCraft.Server` 公开的 HTTP 端点时使用此选项。

### 当地基岩世界

```text
VoiceCraft.Client -> VoiceCraft UDP server
Minecraft local world + Core.McWss -> McWss websocket endpoint
```

将此用于本地测试或可以接受命令隧道的单人游戏世界。

### Java + Geyser/水闸

```text
VoiceCraft.Client -> VoiceCraft UDP server
GeyserVoice -> McTcp endpoint
```

当 Java 端基础设施是玩家位置和生命周期状态的来源时，请使用此选项。

## 首先要配置什么

1. 配置 `VoiceCraft.Server` 并确认其正常启动。
2. 选择与拓扑匹配的 Minecraft 传输。
3. 确保客户端连接到 `VoiceCraftConfig.Port`。
4. 确保 Minecraft 集成使用匹配的传输令牌进行身份验证。
5. 在添加更多自定义行为之前验证绑定流和位置更新。
