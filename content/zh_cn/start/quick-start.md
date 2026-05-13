# 快速入门

本指南是获得可用的 VoiceCraft 堆栈的最快方法。

本指南会按顺序走完整个流程：服务器、生成的配置、客户端、Minecraft 传输和验证。服务器二进制文件启动后不要就此停止；此时语音后端已经存在，但 Minecraft 尚未连接。

## 首先选择您的拓扑

VoiceCraft 可以通过多种方式部署：

- Bedrock 专用服务器：`VoiceCraft.Server` + `VoiceCraft.Addon.Core.McHttp`
- 本地 Bedrock 世界/单人游戏：`VoiceCraft.Server` 或本地运行时 + `Core.McWss`
- 带有 Geyser/Floodgate 的 Java 服务器：`GeyserVoice` + `VoiceCraft.Server`
- Direct Paper 服务器：`GeyserVoice` 还可以在后台下载并运行 VoiceCraft 运行时

如果您不确定，请从以下之一开始：

- Bedrock 专用服务器：阅读 [McHttp for BDS](/minecraft/mchttp-bds)
- Java + Geyser 服务器：阅读 [GeyserVoice](/ecosystem/geyservoice)

首次设置时，选择一个拓扑，并只开放它需要的传输。等基本绑定和距离感语音流程正常后，再添加混合设置。

## 1.下载服务器

1. 打开 [下载页面](/download)。
2. 下载适合您平台的服务器存档：
   - `VoiceCraft.Server.Windows.x64.zip`
   - `VoiceCraft.Server.Windows.x86.zip`
   - `VoiceCraft.Server.Windows.arm64.zip`
   - `VoiceCraft.Server.Linux.x64.zip`
   - `VoiceCraft.Server.Linux.arm.zip`
   - `VoiceCraft.Server.Linux.arm64.zip`

如果您从源代码构建，请参阅 [VoiceCraft 仓库和构建](/ecosystem/voicecraft-repository)。

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
- 本地 Bedrock `McWss` 插件使用 `McWssConfig.LoginToken`
- `GeyserVoice` 使用 `McTcpConfig.LoginToken`

## 4. 选择 Minecraft 传输

VoiceCraft 目前有 3 种面向 Minecraft 的传输：

- `McHttp`：
  最适合 Bedrock 专用服务器和最稳定的 Bedrock 自动化。
- `McWss`：
  最适合本地世界、测试和命令隧道场景。
- `McTcp`：
  最适合 Java 端桥，例如 `GeyserVoice`。

请参阅 [传输模式](/server/transports) 了解完整比较。

确保所选传输已启用并绑定到 Minecraft 端运行时可以到达的地址。

## 5.下载客户端

从 [下载页面](/download) 下载适合玩家的软件包：

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

- 主机：`127.0.0.1`
- 端口：`9050`

## 7.连接Minecraft端

- 对于Bedrock 专用服务器，请使用 [McHttp for BDS](/minecraft/mchttp-bds)。
- 对于本地 Bedrock 世界，请使用 [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer)。
- 对于 Java + Geyser/Floodgate，请使用 [GeyserVoice](/ecosystem/geyservoice)。

此步骤会向 VoiceCraft 提供距离感音频所需的游戏内状态：玩家身份、绑定数据、世界 ID、位置更新和效果状态。

如果您要在 Bedrock 上部署，请将这两个页面放在手边：

- [下载页面](/download) 用于客户端、服务器和附加包的发布文件
- [附加包配置器](/addon-configurator) 用于可直接解压的世界归档

## 8. 验证堆栈

如果一切配置正确：

- VoiceCraft 服务器启动时没有配置或端口错误
- 客户端连接无传输错误
- Minecraft 集成使用预期令牌进行身份验证
- 实体创建和绑定流程正常工作
- 玩家在范围内时会听到距离感语音

如果客户端已连接但距离感音频不起作用，请先调试 Minecraft 传输和绑定流程，再更改音频设置。

## 推荐下一篇阅读

- [服务器安装](/server/installation)
- [服务器首次运行](/server/first-run)
- [ServerProperties.json](/server/server-properties)
- [运行时覆盖](/server/runtime-overrides)
- [传输模式](/server/transports)
- [下载页面](/download)
- [附加包配置器](/addon-configurator)
