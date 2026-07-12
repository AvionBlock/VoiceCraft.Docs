# VoiceCraft.Java Proxy Guide

用于带 Paper backends 的 Velocity 或 BungeeCord network。

```text
Paper backends + VoiceCraft.Java -> voicecraft-java:main -> Velocity/BungeeCord + VoiceCraft.Java -> McTcp -> VoiceCraft.Server
```

Proxy 持有 VoiceCraft connection。Paper backends 通过 plugin messaging 发送 snapshots 和 bind updates。

Backend config：

```yml
config:
  proxy:
    enabled: true
```

Proxy config 设置 `config.voicecraft.transport.host`、`port`、`login-token`；token 必须匹配 `McTcpConfig.LoginToken`。
