# VoiceCraft.Java Direct Paper Guide

Użyj tego trybu, gdy jeden Paper server ma bezpośrednio rozmawiać z VoiceCraft. Plugin może użyć zewnętrznego backendu albo sam pobrać i uruchomić VoiceCraft.

```text
Paper + VoiceCraft.Java -> McTcp -> VoiceCraft.Server
VoiceCraft Client / SVC / Plasmo -> shared VoiceCraft audio bridge
```

External backend: uruchamiasz `VoiceCraft.Server`, ustawiasz `config.voicecraft.transport.*` i używasz `auto-start: false`.

Managed runtime: ustaw `config.voicecraft.auto-start: true`; pliki trafiają do `config.voicecraft.install-directory`.

Adaptery `simple-voice-chat` i `plasmo` włączaj tylko wtedy, gdy gracze używają tych modów.
