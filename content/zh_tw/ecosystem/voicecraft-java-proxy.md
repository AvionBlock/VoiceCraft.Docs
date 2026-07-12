# VoiceCraft.Java Proxy Guide

用於帶 Paper backends 的 Velocity 或 BungeeCord network。

```text
Paper backends + VoiceCraft.Java -> voicecraft-java:main -> Velocity/BungeeCord + VoiceCraft.Java -> McTcp -> VoiceCraft.Server
```

Proxy 持有 VoiceCraft connection。Paper backends 透過 plugin messaging 傳送 snapshots 和 bind updates。

Backend config：

```yml
config:
  proxy:
    enabled: true
```

Proxy config 設定 `config.voicecraft.transport.host`、`port`、`login-token`；token 必須匹配 `McTcpConfig.LoginToken`。
