# VoiceCraft.Java Proxy Guide

Gebruik dit voor Velocity of BungeeCord netwerken met Paper backends.

```text
Paper backends + VoiceCraft.Java -> voicecraft-java:main -> Velocity/BungeeCord + VoiceCraft.Java -> McTcp -> VoiceCraft.Server
```

De proxy bezit de VoiceCraft connection. Paper backends sturen snapshots en bind updates via plugin messaging.

Backend config:

```yml
config:
  proxy:
    enabled: true
```

Proxy config gebruikt `config.voicecraft.transport.host`, `port` en `login-token`; het token moet overeenkomen met `McTcpConfig.LoginToken`.
