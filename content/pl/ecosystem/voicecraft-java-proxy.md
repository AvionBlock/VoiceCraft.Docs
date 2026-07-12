# VoiceCraft.Java Proxy Guide

Użyj tego trybu dla sieci Velocity albo BungeeCord z Paper backendami.

```text
Paper backends + VoiceCraft.Java -> voicecraft-java:main -> Velocity/BungeeCord + VoiceCraft.Java -> McTcp -> VoiceCraft.Server
```

Proxy posiada VoiceCraft connection. Paper backends wysyłają snapshots i bind updates przez plugin messaging.

Backend config:

```yml
config:
  proxy:
    enabled: true
```

Proxy config ustawia `config.voicecraft.transport.host`, `port` i `login-token`. Token musi pasować do `McTcpConfig.LoginToken`.
