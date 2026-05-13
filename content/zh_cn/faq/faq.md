# 常见问题解答

有关 VoiceCraft 的常见问题。

## 是否每个玩家都需要 VoiceCraft 客户端应用程序？

是的。玩家需要客户端应用程序。服务器本身不使用客户端应用程序。

客户端捕获麦克风输入并播放附近的语音音频。 Minecraft 插件或插件仅提供游戏状态，例如玩家位置和绑定数据。

## VoiceCraft 可以在移动设备上运行吗？

是的。支持 Android 和 iOS。

移动用户仍然需要可访问的 VoiceCraft 服务器端点和麦克风权限。

## VoiceCraft 可以在主机上运行吗？

如今，不能直接在控制台硬件上作为本机 VoiceCraft 客户端。

当堆栈的其余部分配置正确时，控制台玩家仍然可以参与某些服务器端场景，但直接的本机客户端支持与桌面或移动设备不同。

## VoiceCraft 可以在 Realms 上使用吗？

它可以在有限的场景中工作，特别是在使用客户端定位时，但 Realms 是一个比专用服务器更受限制的环境。

如果您想要可预测的生产设置，请使用带有 `McHttp` 的 BDS 或带有 `GeyserVoice` 的 Java/Geyser 拓扑。

## 我应该使用哪种交通工具？

- 基岩专用服务器：
  `McHttp`
- 当地基岩世界：
  `McWss`
- Java + Geyser/水闸：
  `McTcp` 到 `GeyserVoice`

该传输用于 Minecraft 端状态。播放器客户端仍连接到 VoiceCraft UDP 端点。

## GeyserVoice 是否需要单独管理的 VoiceCraft 服务器？

并非总是如此。

在直接 Paper 模式下，GeyserVoice 可以使用以下命令在后台引导并运行 VoiceCraft 运行时：

- `config.voicecraft.auto-start`
- `config.voicecraft.shutdown-on-disable`
- `config.voicecraft.ready-timeout-ms`
- `config.voicecraft.install-directory`

如果您愿意，它还可以指向已经运行的外部 VoiceCraft 服务器。

在当前配置中，外部连接值位于 `config.voicecraft.transport.*` 下。

## 我可以将 VoiceCraft 与 Apex、Aternos 或类似的托管提供商一起使用吗？

这取决于您的提供商是否允许游戏服务器和 VoiceCraft 服务器之间所需的网络路径。

示例：

- 具有 `McHttp` 的 BDS 需要出站可访问 VoiceCraft HTTP 端点
- Java + GeyserVoice 需要可访问 VoiceCraft `McTcp` 端点

某些提供商会阻止您所需的确切网络行为。

在购买托管之前，请询问是否允许自定义 UDP 端口、出站 HTTP/TCP、sidecar 进程和所需的 Bedrock 脚本模块。

## 我可以在游戏服务器所在的同一台计算机上托管 VoiceCraft 吗？

是的。这对于以下情况很常见：

- 本地测试
- 小社区
- 直接 Paper + GeyserVoice 设置

仅当消费者真正在同一台机器上运行时才使用环回地址，例如`127.0.0.1`。

## 我可以只运行一种交通工具吗？

是的。您可以通过以下方式限制运行时传输：

- `ServerProperties.json` 中的配置切换
- 运行时覆盖，例如 `--transport-mode`

建议用于生产。仅公开您的拓扑使用的传输。

## 即使客户端已连接，为什么我听不到任何人的声音？

按顺序检查这些：

1. 客户端中正确的 VoiceCraft 服务器 IP 和端口
2. 匹配 `PositioningType`
3. 正确的 Minecraft 运输令牌
4. 成功绑定流程
5. 接收位置和世界更新的实体

如果 `list --clientsOnly` 显示播放器，但 `list` 不显示更改的实体位置，请调试 Minecraft 集成而不是麦克风设置。

## `McWss` 适合生产吗？

通常不是较大公共环境的首选。

它最适合本地世界、测试和轻量级设置。 `McHttp` 通常是更好的基岩生产运输。

## 服务器静音和本地静音有什么区别？

- 服务器静音：
  由目标实体或客户端的后端强制执行
- 本地静音：
  作为个人偏好存储在玩家的 `Settings.json` 中

## 每个用户的音量和本地静音存储在哪里？

在 `UserSettings.Users` 下的 `Settings.json` 中。

## 我用 Geyser 运行 Java。我还需要基岩插件吗？

不会。在 Java + Geyser 拓扑中，桥通常是 `GeyserVoice`，而不是 Bedrock 插件。

使用基岩世界/BDS 的基岩插件。当 Java 端基础设施是玩家状态的来源时，请使用 GeyserVoice。

## VoiceCraft 是第三方托管语音服务吗？

不需要。VoiceCraft 不需要第三方托管服务。您可以自己运行服务器/运行时，或者让 GeyserVoice 在直接 Paper 模式下管理运行时。

## VoiceCraft 只是 Minecraft 的一个模组吗？

不。VoiceCraft 是客户端应用程序、服务器运行时、Bedrock 插件包和 Java 端桥接工具的集合。工作设置需要适合您的拓扑的正确组合。
