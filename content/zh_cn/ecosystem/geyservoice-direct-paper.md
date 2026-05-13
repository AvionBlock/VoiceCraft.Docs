# GeyserVoice Direct Paper 指南

当一台 Paper / Folia 服务器应直接与 VoiceCraft 对话时，请使用此模式。

Direct Paper 模式是最简单的 Java 端拓扑：Paper 服务器要么连接到外部 `VoiceCraft.Server`，要么让 GeyserVoice 下载并启动本地 VoiceCraft 运行时。

目标形状：

```text
Paper/Folia + GeyserVoice -> McTcp/McApi TCP -> VoiceCraft.Server
VoiceCraft.Client -> VoiceCraft UDP endpoint
```

## 两种运行方式

### 选项 A：外部 VoiceCraft 服务器

您已经在某处运行 `VoiceCraft.Server` 并将 GeyserVoice 指向它。

### 选项 B：插件管理的运行时

GeyserVoice 可以为您引导 VoiceCraft：

- 下载运行时
- 安装运行时
- 启动运行时
- 等待准备就绪
- 可选择使用插件停止运行时

对于直接 Paper 用户来说，这是当前最重要的功能之一。

## 推荐配置

```yml
config:
  debug: false
  lang: "system"
  auto-reconnect: true

  proxy:
    enabled: false

  voicecraft:
    transport:
      host: "127.0.0.1"
      port: 9050
      login-token: "replace-with-token"
    voice:
      port: 1111
    auto-start: true
    shutdown-on-disable: true
    invariant-globalization: true
    ready-timeout-ms: 20000
    install-directory: "voicecraft-runtime"

  voice:
    proximity-distance: 30
    proximity-toggle: true
    voice-effects: true
    send-bind-message: true
    send-disconnect-message: true
    send-voicecraft-disconnect-message: true
    send-connection-lost-message: true
    position-update-interval-ticks: 5
```

将 `config.voicecraft.transport.host`、`config.voicecraft.transport.port` 和 `config.voicecraft.transport.login-token` 用于 VoiceCraft `McTcp` 连接。当您使用外部运行时时，这些必须与 VoiceCraft 服务器端匹配。

## 设置步骤

1. 在 Paper 上安装 GeyserVoice。
2. 启动服务器一次。
3. 编辑 `plugins/GeyserVoice/config.yml`。
4. 决定是否应启用 `auto-start`。
5. 确保 `config.voicecraft.transport.login-token` 与 VoiceCraft `McTcpConfig.LoginToken` 匹配。
6. 运行 `/voice reload`。
7. 测试游戏中的绑定流程。

如果 `auto-start` 是 `true`，请确保 `install-directory` 可由 Paper 进程写入。如果 `auto-start` 是 `false`，请确保外部 VoiceCraft 服务器已在运行且可访问。

## 当 `auto-start` 是个好主意时

- 单服务器设置
- 你想要更少的移动部件
- 您尚未使用 systemd / Docker / panel 管理 VoiceCraft

## 当外部运行时更好时

- 您已经集中管理 VoiceCraft
- 您需要不同的重启策略或日志记录
- 您针对一个 VoiceCraft 后端运行多个 Java 节点
- 您希望进程管理器（例如 systemd、Docker 或托管面板）来负责重新启动

## 故障排除

- 运行时永远不会准备好：
  增加 `ready-timeout-ms`
- 插件可以手动连接，但不能在启动时连接：
  检查 `auto-start` 和 `install-directory`
- 玩家加入但语音数据未绑定：
  验证令牌、主机、端口和绑定流程
- 外部 VoiceCraft 永远不会看到该插件：
  确认 `McTcpConfig.Enabled = true`、主机绑定、防火墙和 `config.voicecraft.transport.*`
- 客户端已连接，但 Java 状态不影响邻近度：
  检查`/voice bind`、位置更新间隔、服务器端定位模式

## 验证清单

- Paper 日志显示 GeyserVoice 已启用
- VoiceCraft 运行时正在运行或自动启动
- `McTcpConfig.LoginToken` 匹配 `config.voicecraft.transport.login-token`
- 玩家可以连接 VoiceCraft 客户端
- 玩家可以完成 `/voice bind <key>`
- 游戏中的移动会改变邻近行为
