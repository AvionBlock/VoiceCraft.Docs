# VoiceCraft.Java Proxy Guide

ใช้กับ Velocity หรือ BungeeCord network ที่มี Paper backends

```text
Paper backends + VoiceCraft.Java -> voicecraft-java:main -> Velocity/BungeeCord + VoiceCraft.Java -> McTcp -> VoiceCraft.Server
```

Proxy เป็นเจ้าของ VoiceCraft connection ส่วน Paper backends ส่ง snapshots และ bind updates ผ่าน plugin messaging

Backend config:

```yml
config:
  proxy:
    enabled: true
```

Proxy config ต้องตั้ง `config.voicecraft.transport.host`, `port`, `login-token`; token ต้องตรงกับ `McTcpConfig.LoginToken`
