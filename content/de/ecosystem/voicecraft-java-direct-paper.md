# VoiceCraft.Java Direct Paper Guide

Nutzen Sie diesen Modus, wenn ein Paper server direkt mit VoiceCraft sprechen soll. Das Plugin kann ein externes VoiceCraft backend verwenden oder VoiceCraft selbst aus GitLab releases herunterladen und starten.

```text
Paper + VoiceCraft.Java -> McTcp -> VoiceCraft.Server
VoiceCraft Client / SVC / Plasmo -> shared VoiceCraft audio bridge
```

## Runtime-Optionen

External backend: `VoiceCraft.Server` selbst betreiben, `config.voicecraft.transport.*` setzen und `auto-start: false` verwenden.

Managed runtime: `config.voicecraft.auto-start: true` setzen. Dateien landen in `config.voicecraft.install-directory`; das Plugin kann die Runtime beim Disable stoppen.

## Minimaler Config-Block

```yml
config:
  proxy:
    enabled: false
  voicecraft:
    transport:
      host: "127.0.0.1"
      port: 9050
      login-token: "replace-with-token"
    voice:
      port: 1111
    auto-start: true
    shutdown-on-disable: true
    install-directory: "voicecraft-runtime"
```

Aktivieren Sie `config.adapters.simple-voice-chat.enabled` oder `config.adapters.plasmo.enabled` nur, wenn Spieler diese Mods verwenden. Öffnen Sie dann die passenden UDP-Ports.
