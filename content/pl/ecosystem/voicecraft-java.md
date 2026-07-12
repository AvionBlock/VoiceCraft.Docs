# VoiceCraft.Java (Java bridge)

Repozytorium/strona: [VoiceCraft.Java](https://java.voicecraft.chat)

VoiceCraft.Java to Java-side plugin dla VoiceCraft. Zastępuje starszą nazwę GeyserVoice w dokumentacji i łączy Paper, Velocity albo BungeeCord z backendem VoiceCraft przez McTcp.

Plugin tworzy wspólną warstwę proximity voice dla VoiceCraft Client, Simple Voice Chat, Plasmo Voice oraz graczy Bedrock na Java cross-play serverach.

## Obsługa

- Direct Paper mode
- Velocity/BungeeCord proxy mode
- managed VoiceCraft runtime na Paper
- zewnętrzny VoiceCraft backend
- Simple Voice Chat adapter
- Plasmo Voice adapter
- bind flow przez `/voice bind <key>`
- config/message templates: `en`, `ru`, `nl`, `ja`

Direct Paper: `Paper -> VoiceCraft.Java -> VoiceCraft`

Proxy network: `Paper backends -> Velocity/BungeeCord -> VoiceCraft`

W proxy mode VoiceCraft.Java działa na każdym Paper backend i na proxy. Proxy posiada McTcp connection; backendy wysyłają snapshots przez `voicecraft-java:main`.

Paper używa config version `3`; Velocity i BungeeCord używają config version `2`. Wymagane jest Java 21.
