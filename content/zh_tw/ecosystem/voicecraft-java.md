# VoiceCraft.Java（Java bridge）

倉庫/站點：[VoiceCraft.Java](https://java.voicecraft.chat)

VoiceCraft.Java 是 VoiceCraft 的 Java-side plugin，在文件中取代舊的 GeyserVoice 名稱。它透過 McTcp 將 Paper、Velocity 或 BungeeCord 連接到 VoiceCraft backend。

它讓 VoiceCraft 成為統一的 proximity voice 層：VoiceCraft Client、Simple Voice Chat、Plasmo Voice，以及 Java cross-play 伺服器上的 Bedrock 玩家可以共享同一個語音空間。

## 支援

- Direct Paper mode
- Velocity/BungeeCord proxy mode
- Paper 上的 managed VoiceCraft runtime
- external VoiceCraft backend
- Simple Voice Chat adapter
- Plasmo Voice adapter
- 透過 `/voice bind <key>` 綁定 VoiceCraft client
- config/message templates：`en`、`ru`、`nl`、`ja`

Direct Paper：`Paper -> VoiceCraft.Java -> VoiceCraft`

Proxy network：`Paper backends -> Velocity/BungeeCord -> VoiceCraft`

在 proxy mode 中，每個 Paper backend 和 proxy 都要安裝 VoiceCraft.Java。Proxy 持有 McTcp connection；backend 透過 `voicecraft-java:main` 傳送 snapshots。

Paper 使用 config version `3`；Velocity 和 BungeeCord 使用 config version `2`。需要 Java 21。
