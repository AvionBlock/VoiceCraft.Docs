# VoiceCraft.Java (Java Bridge)

Repository/Website: [VoiceCraft.Java](https://java.voicecraft.chat)

VoiceCraft.Java ist das Java-side Plugin für VoiceCraft. Es ersetzt in der Dokumentation die ältere GeyserVoice-Bezeichnung und verbindet Paper, Velocity oder BungeeCord über McTcp mit dem VoiceCraft backend.

Das Plugin macht VoiceCraft zu einer gemeinsamen proximity-voice Schicht: VoiceCraft Client, Simple Voice Chat, Plasmo Voice und Bedrock-Spieler auf Java-Crossplay-Servern können denselben Voice-Raum nutzen.

## Unterstützung

- Direct Paper mode für einzelne Server
- Velocity/BungeeCord proxy mode für Netzwerke
- managed VoiceCraft runtime auf Paper
- externe VoiceCraft backend Verbindung
- Simple Voice Chat adapter auf Paper
- Plasmo Voice adapter auf Paper
- Bind flow mit `/voice bind <key>`
- config/message templates: `en`, `ru`, `nl`, `ja`

## Client-Pfade

| Client | Pfad |
| --- | --- |
| VoiceCraft Client | verbindet sich mit VoiceCraft backend und wird im Spiel per `/voice bind <key>` gebunden |
| Simple Voice Chat | Paper adapter spricht das SVC-Protokoll und leitet Opus audio an VoiceCraft weiter |
| Plasmo Voice | Paper adapter spricht Plasmo TCP/UDP und leitet Opus audio an VoiceCraft weiter |
| Bedrock auf Java-Crossplay | Spieler nutzt VoiceCraft Client, Plugin liefert Java-side position/state |

## Modi

Direct Paper: `Paper -> VoiceCraft.Java -> VoiceCraft`

Proxy-Netzwerk: `Paper backends -> Velocity/BungeeCord -> VoiceCraft`

Im proxy mode wird VoiceCraft.Java auf jedem Paper backend und auf dem Proxy installiert. Der Proxy besitzt die McTcp connection; Paper backends senden snapshots über `voicecraft-java:main`.

## Anforderungen

- Java 21
- Paper, Velocity oder BungeeCord
- VoiceCraft backend, außer Paper managed runtime ist aktiv
- erreichbare UDP-Ports für Simple Voice Chat oder Plasmo Voice adapters

Paper nutzt config version `3`; Velocity und BungeeCord nutzen config version `2`.
