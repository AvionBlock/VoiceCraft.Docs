# VoiceCraft.Java (Java bridge)

Repository/site: [VoiceCraft.Java](https://java.voicecraft.chat)

VoiceCraft.Java is de Java-side plugin voor VoiceCraft. De oudere naam GeyserVoice wordt hiermee in de docs vervangen. De plugin verbindt Paper, Velocity of BungeeCord via McTcp met de VoiceCraft backend.

De plugin maakt van VoiceCraft één gedeelde proximity-voice laag voor VoiceCraft Client, Simple Voice Chat, Plasmo Voice en Bedrock-spelers op Java cross-play servers.

## Ondersteuning

- Direct Paper mode
- Velocity/BungeeCord proxy mode
- managed VoiceCraft runtime op Paper
- externe VoiceCraft backend
- Simple Voice Chat adapter
- Plasmo Voice adapter
- bind flow met `/voice bind <key>`
- config/message templates: `en`, `ru`, `nl`, `ja`

## Modi

Direct Paper: `Paper -> VoiceCraft.Java -> VoiceCraft`

Proxy-netwerk: `Paper backends -> Velocity/BungeeCord -> VoiceCraft`

In proxy mode staat VoiceCraft.Java op elke Paper backend en op de proxy. De proxy bezit de McTcp connection; backends sturen snapshots via `voicecraft-java:main`.

## Belangrijk

Paper gebruikt config version `3`; Velocity en BungeeCord gebruiken config version `2`. Java 21 is vereist.
