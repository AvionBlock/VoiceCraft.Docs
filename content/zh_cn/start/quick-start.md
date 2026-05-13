# 快速入门

本指南是获得可用的 VoiceCraft 堆栈的最快方法。

它有意地遍历整个路径：服务器、生成的配置、客户端、Minecraft 传输和验证。服务器二进制文件启动后不要停止；此时语音后端已存在，但 Minecraft 尚未连接。

## 首先选择您的拓扑

VoiceCraft 可以通过多种方式部署：

- 基岩专用服务器：`VoiceCraft.Server` + `VoiceCraft.Addon.Core.McHttp`
- 本地基岩世界/单人游戏：`VoiceCraft.Server` 或本地运行时 + `Core.McWss`
- 带有 Geyser/Floodgate 的 Java 服务器：`GeyserVoice` + `VoiceCraft.Server`
- Direct Paper 服务器：`GeyserVoice` 还可以在后台下载并运行 VoiceCraft 运行时

如果您不确定，请从以下之一开始：

- 基岩专用服务器：阅读 [McHttp for BDS](/minecraft/mchttp-bds)
- Java + Geyser 服务器：读取 [GeyserVoice](/ecosystem/geyservoice)

对于第一个设置，选择一个拓扑并仅公开其所需的传输。在基本绑定和邻近流程工作后，您可以稍后添加混合设置。

## 1.下载服务器

1. 打开 [download page](/download)。
2. 下载适合您平台的服务器存档：
   - `VoiceCraft.Server.Windows.x64.zip`
   - `VoiceCraft.Server.Windows.x86.zip`
   - `VoiceCraft.Server.Windows.arm64.zip`
   - `VoiceCraft.Server.Linux.x64.zip`
   - `VoiceCraft.Server.Linux.arm.zip`
   - `VoiceCraft.Server.Linux.arm64.zip`

如果您从源代码构建，请参阅 [VoiceCraft repository and build](/ecosystem/voicecraft-repository)。

## 2. 运行一次服务器

从您希望 `config/ServerProperties.json` 所在的文件夹运行。

### Windows

```powershell
./VoiceCraft.Server.exe
```

### Linux

```bash
chmod +x ./VoiceCraft.Server
./VoiceCraft.Server
```

首次启动后，VoiceCraft 会生成 `config/ServerProperties.json`。

编辑此文件之前停止服务器。

## 3. 保护生成的配置

在连接 Minecraft 或玩家之前，更改每个生成的共享令牌：

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

您通常希望每个环境有不同的值。

您稍后使用的令牌必须与传输匹配：

- BDS `McHttp` 插件使用 `McHttpConfig.LoginToken`
- 本地基岩 `McWss` 插件使用 `McWssConfig.LoginToken`
- `GeyserVoice` 使用 `McTcpConfig.LoginToken`

## 4. 选择 Minecraft 交通工具

VoiceCraft 目前有 3 种面向 Minecraft 的传输：

- `McHttp`：
  最适合 Bedrock 专用服务器和最稳定的 Bedrock 自动化。
- `McWss`：
  最适合本地世界、测试和命令隧道场景。
- `McTcp`：
  最适合 Java 端桥，例如 `GeyserVoice`。

请参阅 [Transport Modes](/server/transports) 了解完整比较。

确保所选传输已启用并绑定到 Minecraft 端运行时可以到达的地址。

## 5.下载客户端

从 [download page](/download) 中，下载适合您的播放器的软件包：

- Windows：`VoiceCraft.Client.Windows.<arch>.zip`
- Linux：`VoiceCraft.Client.Linux.<arch>.zip`
- macOS：`VoiceCraft.Client.MacOS.<arch>.dmg` 或 `.pkg`
- Android：`VoiceCraft.Client.Android.arm64.zip`（APK 内）
- iOS：`VoiceCraft.Client.iOS.arm64.ipa`

## 6.在客户端添加服务器

1. 打开客户端。
2. 选择麦克风和播放设备。
3. 在 UI 中添加服务器条目。
4. 使用 `VoiceCraftConfig.Port` 中的 VoiceCraft UDP 端点。
5. 确认客户端 `Positioning Type` 与 `VoiceCraftConfig.PositioningType` 匹配。

典型的本地设置：

- 主持人：`127.0.0.1`
- 端口：`9050`

## 7.连接Minecraft端

- 对于基岩专用服务器，请使用 [McHttp for BDS](/minecraft/mchttp-bds)。
- 对于本地基岩世界，请使用 [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer)。
- 对于 Java + Geyser/Floodgate，请使用 [GeyserVoice](/ecosystem/geyservoice)。

此步骤为 VoiceCraft 提供了接近音频所需的游戏内状态：玩家身份、绑定数据、世界 ID、位置更新和效果状态。

如果您要在基岩上部署，请将这两个页面放在附近：

- [Download Page](/download) 用于原始客户端/服务器/插件发布文件
- [Addon Configurator](/addon-configurator) 用于准备解压世界档案

## 8. 验证堆栈

如果一切配置正确：

- VoiceCraft 服务器启动时没有配置或端口错误
- 客户端连接无传输错误
- Minecraft 集成使用预期令牌进行身份验证
- 实体创建和绑定流程工作
- 玩家在范围内时会听到接近声音

如果客户端已连接但邻近不起作用，请在更改音频设置之前调试 Minecraft 传输和绑定流。

## 推荐下一篇阅读

- [Server Installation](/server/installation)
- [First Server Run](/server/first-run)
- [ServerProperties.json](/server/server-properties)
- [Runtime Overrides](/server/runtime-overrides)
- [Transport Modes](/server/transports)
- [Download Page](/download)
- [Addon Configurator](/addon-configurator)
