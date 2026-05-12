# GeyserVoice Direct Paper 指南

当一台 Paper / Folia 服务器应直接与 VoiceCraft 对话时，请使用此模式。

## 两种运行方式

### 选项 A：外部 VoiceCraft 服务器

You already run `VoiceCraft.Server` somewhere and point GeyserVoice at it.

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
    host: "127.0.0.1"
    port: 9050
    login-token: "replace-with-token"
    auto-start: true
    shutdown-on-disable: true
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

## 设置步骤

1. 在 Paper 上安装 GeyserVoice。
2. 启动一次服务器。
3. Edit `plugins/GeyserVoice/config.yml`.
4. Decide whether `auto-start` should be enabled.
5. Ensure the `login-token` matches VoiceCraft `McTcpConfig.LoginToken`.
6. Run `/voice reload`.
7.测试游戏中的绑定流程。

## When `auto-start` is a good idea

- 单服务器设置
- 你想要更少的移动部件
- 您尚未使用 systemd / Docker / panel 管理 VoiceCraft

## 当外部运行时更好时

- 您已经集中管理 VoiceCraft
- 您想要不同的重启策略或日志记录
- 您针对一个 VoiceCraft 后端运行多个 Java 节点

## 故障排除

- 运行时永远不会准备好：
  increase `ready-timeout-ms`
- 插件可以手动连接，但不能在启动时连接：
  check `auto-start` and `install-directory`
- 玩家加入但语音数据不绑定：
  验证令牌、主机、端口和绑定流
