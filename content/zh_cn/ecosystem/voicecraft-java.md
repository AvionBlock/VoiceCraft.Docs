# VoiceCraft.Java（Java bridge）

仓库/站点：[VoiceCraft.Java](https://java.voicecraft.chat)

VoiceCraft.Java 是 VoiceCraft 的 Java-side plugin，在文档中替代旧的 GeyserVoice 名称。它通过 McTcp 将 Paper、Velocity 或 BungeeCord 连接到 VoiceCraft backend。

它让 VoiceCraft 成为统一的 proximity voice 层：VoiceCraft Client、Simple Voice Chat、Plasmo Voice，以及 Java cross-play 服务器上的 Bedrock 玩家可以共享同一个语音空间。

## 支持

- Direct Paper mode
- Velocity/BungeeCord proxy mode
- Paper 上的 managed VoiceCraft runtime
- external VoiceCraft backend
- Simple Voice Chat adapter
- Plasmo Voice adapter
- 通过 `/voice bind <key>` 绑定 VoiceCraft client
- config/message templates：`en`、`ru`、`nl`、`ja`

Direct Paper：`Paper -> VoiceCraft.Java -> VoiceCraft`

Proxy network：`Paper backends -> Velocity/BungeeCord -> VoiceCraft`

在 proxy mode 中，每个 Paper backend 和 proxy 都要安装 VoiceCraft.Java。Proxy 持有 McTcp connection；backend 通过 `voicecraft-java:main` 发送 snapshots。

Paper 使用 config version `3`；Velocity 和 BungeeCord 使用 config version `2`。需要 Java 21。
