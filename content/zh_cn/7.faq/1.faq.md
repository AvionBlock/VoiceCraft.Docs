# 常见问题解答

有关 VoiceCraft 的常见问题。

## 每个玩家都需要 VoiceCraft 客户端应用程序吗？

是的。玩家需要客户端应用程序。服务器本身不使用客户端应用程序。

## VoiceCraft 可以在移动设备上运行吗？

是的。支持 Android 和 iOS。

## VoiceCraft 可以在主机上运行吗？

如今，不能直接在控制台硬件上作为本机 VoiceCraft 客户端。

当堆栈的其余部分配置正确时，控制台玩家仍然可以参与某些服务器端场景，但直接的本机客户端支持与桌面或移动设备不同。

## VoiceCraft 可以在 Realms 上运行吗？

它可以在有限的场景中工作，特别是在使用客户端定位时，但 Realms 是一个比专用服务器更受限制的环境。

## 我应该使用哪种交通工具？

- 基岩专用服务器：
  `McHttp`
- 当地基岩世界：
  `McWss`
- Java + 间歇泉/水闸：
  `McTcp` through `GeyserVoice`

## GeyserVoice 是否需要单独管理的 VoiceCraft 服务器？

并非总是如此。

在直接 Paper 模式下，GeyserVoice 可以使用以下命令在后台引导并运行 VoiceCraft 运行时：

- `config.voicecraft.auto-start`
- `shutdown-on-disable`
- `ready-timeout-ms`
- `install-directory`

如果您愿意，它还可以指向已经运行的外部 VoiceCraft 服务器。

## 我可以将 VoiceCraft 与 Apex、Aternos 或类似的托管提供商一起使用吗？

这取决于您的提供商是否允许游戏服务器和 VoiceCraft 服务器之间所需的网络路径。

示例：

- BDS with `McHttp` needs outbound reachability to the VoiceCraft HTTP endpoint
- Java + GeyserVoice needs reachability to the VoiceCraft `McTcp` endpoint

某些提供商会阻止您所需的确切网络行为。

## 我可以将 VoiceCraft 托管在游戏服务器所在的同一台计算机上吗？

是的。这对于以下情况很常见：

- 本地测试
- 小社区
- 直接 Paper + GeyserVoice 设置

## 我可以只运行一种交通工具吗？

是的。您可以通过以下方式限制运行时传输：

- config toggles in `ServerProperties.json`
- runtime overrides such as `--transport-mode`

## 为什么即使客户端已连接，我也听不到任何人的声音？

按顺序检查这些：

1.客户端中正确的VoiceCraft服务器IP和端口
2. matching `PositioningType`
3.正确的Minecraft传输令牌
4.成功绑定流程
5. 接收位置和世界更新的实体

## Is `McWss` good for production?

通常不是较大公共环境的首选。

It is best for local worlds, testing, and lightweight setups. `McHttp` is usually a better Bedrock production transport.

## 服务器静音和本地静音有什么区别？

- 服务器静音：
  由目标实体或客户端的后端强制执行
- 本地静音：
  stored in a player's `Settings.json` as a personal preference

## 每用户音量和本地静音存储在哪里？

In `Settings.json` under `UserSettings.Users`.

## 我使用 Geyser 运行 Java。我还需要基岩插件吗？

No. In Java + Geyser topologies, the bridge is typically `GeyserVoice`, not the Bedrock addon.
