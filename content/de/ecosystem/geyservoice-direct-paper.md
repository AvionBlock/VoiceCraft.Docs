# GeyserVoice Direct Paper Guide

Verwenden Sie diesen Modus, wenn ein Paper/Folia-Server direkt mit VoiceCraft kommunizieren soll.

## Zwei Möglichkeiten, es auszuführen

### Option A: externer VoiceCraft-Server

You already run `VoiceCraft.Server` somewhere and point GeyserVoice at it.

### Option B: Plugin-verwaltete Laufzeit

GeyserVoice kann VoiceCraft für Sie booten:

- Laufzeit herunterladen
- Laufzeit installieren
- Laufzeit starten
- Warten Sie auf die Bereitschaft
- Optional Runtime mit dem Plugin stoppen

Dies ist eine der wichtigsten aktuellen Funktionen für direkte Paper-Benutzer.

## Empfohlene Konfiguration

```yml
config:
  debug: false
  lang: "system"
  auto-reconnect: true

  proxy:
    enabled: false

  voicecraft:
    host: "127.0.0.1"
    port: 9050
    login-token: "replace-with-token"
    auto-start: true
    shutdown-on-disable: true
    ready-timeout-ms: 20000
    install-directory: "voicecraft-runtime"

  voice:
    proximity-distance: 30
    proximity-toggle: true
    voice-effects: true
    send-bind-message: true
    send-disconnect-message: true
    send-voicecraft-disconnect-message: true
    send-connection-lost-message: true
    position-update-interval-ticks: 5
```

## Einrichtungsschritte

1. Installieren Sie GeyserVoice auf Papier.
2. Starten Sie den Server einmal.
3. Edit `plugins/GeyserVoice/config.yml`.
4. Decide whether `auto-start` should be enabled.
5. Ensure the `login-token` matches VoiceCraft `McTcpConfig.LoginToken`.
6. Run `/voice reload`.
7. Testen Sie den Bindungsfluss im Spiel.

## When `auto-start` is a good idea

- Einzelserver-Setup
- Sie möchten weniger bewegliche Teile
- Sie verwalten VoiceCraft noch nicht mit systemd/Docker/panel

## Wenn eine externe Laufzeit besser ist

- Sie verwalten VoiceCraft bereits zentral
- Sie möchten eine andere Neustartrichtlinie oder Protokollierung
- Sie führen mehrere Java-Knoten gegen ein VoiceCraft-Backend aus

## Fehlerbehebung

- Laufzeit wird nie bereit:
  increase `ready-timeout-ms`
- Plugin kann manuell eine Verbindung herstellen, aber nicht beim Start:
  check `auto-start` and `install-directory`
- Spieler treten bei, aber Sprachdaten werden nicht gebunden:
  Überprüfen Sie Token, Host, Port und Bindungsfluss
