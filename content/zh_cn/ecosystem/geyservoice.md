# GeyserVoice（Java / Geyser桥）

存储库：[AvionBlock/GeyserVoice](https://github.com/AvionBlock/GeyserVoice)

`GeyserVoice` 通过 `McTcp` 传输将 Java 端基础结构连接到 `VoiceCraft.Server`。

在 GeyserVoice 项目中，该路径也被描述为 `McApi TCP`。在 VoiceCraft 服务器配置中，它对应于 `McTcpConfig`。

它支持：

- 直接 Paper/Folia 部署
- 速度代理部署
- BungeeCord 代理部署
- 混合代理+后端拓扑

## GeyserVoice 的作用

`GeyserVoice` 将玩家状态从 Java 端服务器桥接到 VoiceCraft：

- 玩家生命周期
- 位置/世界快照
- 绑定流
- 多服务器网络的代理中继

它不仅仅是一个简单的数据包转发器。在直接 Paper 模式下，它还可以管理本地 VoiceCraft 运行时。

## 非常重要：GeyserVoice 可以在后台运行 VoiceCraft

在直接 Paper 安装中，该插件可以自动：

- 下载 VoiceCraft 运行时
- 将其安装到配置的目录中
- 启动进程
- 等到它准备好
- 当插件禁用时可选择停止它

此行为是通过 `config.voicecraft.*` 块控制的。

这使得 GeyserVoice 适合：

- 使用已管理的外部 `VoiceCraft.Server`
- 让插件引导并为您运行 VoiceCraft

如果 GeyserVoice 管理运行时，它仍然通过相同的 `McTcp`/`McApi TCP` 路径进行连接。区别在于由谁启动 VoiceCraft 进程。

## 支持的插件平台

从当前源代码来看：

- Paper/Folia
- 速度
- 弹力绳

## 运行时路径

当前支持的路径：

- `Paper -> McTcp -> VoiceCraft`
- `Paper -> Proxy relay -> McTcp -> VoiceCraft`

## `config.yml` 布局

当前 Paper 配置结构：

### `config.debug`

启用插件调试模式。

### `config.lang`

插件语言，例如 `system`。

### `config.auto-reconnect`

插件是否应自动重新连接。

### `config.proxy.enabled`

当前Paper-side节点是否在代理管理的中继后面运行。

### `config.voicecraft.*`

连接和运行时管理块。

当前嵌套形状：

```yml
config:
  voicecraft:
    transport:
      host: "127.0.0.1"
      port: 9050
      login-token: "__GENERATED_LOGIN_TOKEN__"
    voice:
      port: 1111
    auto-start: true
    shutdown-on-disable: true
    invariant-globalization: true
    ready-timeout-ms: 20000
    install-directory: "voicecraft-runtime"
```

- `transport.host`
- `transport.port`
- `transport.login-token`
- `voice.port`
- `auto-start`
- `shutdown-on-disable`
- `invariant-globalization`
- `ready-timeout-ms`
- `install-directory`

含义：

- `transport.host` / `transport.port` / `transport.login-token`
  目标 `VoiceCraft.Server` / `McTcp`
- `voice.port`
  托管运行时路径使用的 VoiceCraft 运行时语音端口
- `auto-start`
  让插件自动启动 VoiceCraft 运行时
- `shutdown-on-disable`
  插件卸载时停止托管运行时
- `invariant-globalization`
  运行时全球化选项对于托管服务器启动很有用
- `ready-timeout-ms`
  插件等待运行时准备就绪的时间
- `install-directory`
  托管运行时的安装位置

在 Velocity 和 BungeeCord 上，配置保留 `config.voicecraft.transport.*` 和 `config.voicecraft.voice.*` 形状，但不使用仅 Paper 托管运行时字段。

### `config.voice.*`

面对玩家的行为：

- `proximity-distance`
- `proximity-toggle`
- `voice-effects`
- `not-in-voice-symbol`
- `in-voice-symbol`
- `send-bind-message`
- `send-disconnect-message`
- `send-voicecraft-disconnect-message`
- `send-connection-lost-message`
- `position-update-interval-ticks`

### `config.players`

存储自动绑定/播放器端缓存数据。

### `config.player-links`

插件使用的附加链接/缓存结构。

## 命令

来自`BaseVoiceCommand`：

- `connect <host> <port> <key>`
- `reconnect [true|false]`
- `disconnect`
- `settings`
- `bind <key>`
- `bindfake <key> <name>`
- `updatefake <key>`
- `clearautobind`
- `reload`

## 权限

典型权限：

- `voice.cmd`
- `voice.connect`
- `voice.reconnect`
- `voice.disconnect`
- `voice.settings`
- `voice.bind`
- `voice.bindfake`
- `voice.reload`

## Direct Paper模式

最佳时间：

- 您运行一台 Paper 服务器
- 您想要最简单的 Java 端设置
- 您希望 GeyserVoice 为您管理 VoiceCraft 运行时

请参阅 [Direct Paper Guide](/ecosystem/geyservoice-direct-paper)。

## 代理模式

最佳时间：

- 您运行 Velocity 或 BungeeCord
- 你有几个后端Paper服务器
- 您需要代理上有一个中央 VoiceCraft 连接

请参阅 [Proxy Guide](/ecosystem/geyservoice-proxy)。

在代理模式下，后端 Paper 服务器不应被视为中央 VoiceCraft 连接所有者。代理拥有 `McTcp` 连接，后端节点提供玩家快照。

## 技术说明

- 插件消息通道：`geyservoice:main`
- 在代理模式下，世界 ID 可以使用后端身份进行命名空间
- 该插件当前使用 `McTcp` 作为面向 VoiceCraft 的桥

## 当前代码限制

- `updatefake` 仍然是占位符
- `settings` 存在，但目前具有最少的实用逻辑

## 生产清单

1. 决定 Paper 是否应管理 VoiceCraft 运行时本身。
2. 如果是，请配置`auto-start`、`install-directory`和`ready-timeout-ms`。
3. 如果否，请将 `config.voicecraft.transport.host`、`config.voicecraft.transport.port` 和 `config.voicecraft.transport.login-token` 指向外部 VoiceCraft 服务器。
4. 限制仅限员工的命令。
5. 在向玩家开放之前测试绑定流程和位置更新。
6. 在 VoiceCraft 端确认 `McTcpConfig.Enabled = true`。
7. 确认令牌与 `McTcpConfig.LoginToken` 匹配。
