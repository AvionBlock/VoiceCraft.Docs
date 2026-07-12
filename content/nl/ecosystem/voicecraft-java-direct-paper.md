# VoiceCraft.Java Direct Paper Guide

Gebruik dit wanneer één Paper server direct met VoiceCraft moet praten. De plugin kan een externe VoiceCraft backend gebruiken of VoiceCraft zelf downloaden en starten.

```text
Paper + VoiceCraft.Java -> McTcp -> VoiceCraft.Server
VoiceCraft Client / SVC / Plasmo -> shared VoiceCraft audio bridge
```

External backend: beheer `VoiceCraft.Server` zelf, stel `config.voicecraft.transport.*` in en gebruik `auto-start: false`.

Managed runtime: zet `config.voicecraft.auto-start: true`; bestanden komen in `config.voicecraft.install-directory`.

Activeer `config.adapters.simple-voice-chat.enabled` of `config.adapters.plasmo.enabled` alleen wanneer spelers die mods gebruiken.
