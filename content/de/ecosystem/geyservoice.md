# GeyserVoice (Java / Geyser Bridge)

Repository: [AvionBlock/GeyserVoice](https://github.com/AvionBlock/GeyserVoice)

`GeyserVoice` verbindet die Java-seitige Infrastruktur über den `McTcp`-Transport mit `VoiceCraft.Server`.

Im GeyserVoice-Projekt wird dieser Pfad auch als `McApi TCP` beschrieben. In der VoiceCraft-Serverkonfiguration entspricht es `McTcpConfig`.

Es unterstützt:

- direkte Paper/Folia-Bereitstellung
- Velocity-Proxy-Bereitstellung
- BungeeCord-Proxy-Bereitstellung
- gemischte Proxy- und Backend-Topologien

## Was GeyserVoice macht

`GeyserVoice` überbrückt den Spielerstatus von Java-seitigen Servern in VoiceCraft:

- Lebenszyklus des Spielers
- Positions-/Weltschnappschüsse
- Bindungsfluss
- Proxy-Relaying für Netzwerke mit mehreren Servern

Es ist nicht nur ein einfacher Paketweiterleiter. Im direkten Paper-Modus kann auch eine lokale VoiceCraft-Laufzeit verwaltet werden.

## Ganz wichtig: GeyserVoice kann VoiceCraft unter der Haube ausführen

Bei direkten Paper-Installationen kann das Plugin automatisch:

- Laden Sie die VoiceCraft-Laufzeit herunter
- Installieren Sie es in einem konfigurierten Verzeichnis
- Starten Sie den Prozess
- warten Sie, bis es fertig ist
- Stoppen Sie es optional, wenn das Plugin deaktiviert wird

Dieses Verhalten wird durch den Block `config.voicecraft.*` gesteuert.

Dadurch eignet sich GeyserVoice sowohl für:

- Verwendung eines bereits verwalteten externen `VoiceCraft.Server`
- Lassen Sie das Plugin VoiceCraft für Sie booten und ausführen

Wenn GeyserVoice die Laufzeit verwaltet, wird die Verbindung weiterhin über denselben `McTcp`/`McApi TCP`-Pfad hergestellt. Der Unterschied besteht darin, wer den VoiceCraft-Prozess startet.

## Unterstützte Plugin-Plattformen

Aus dem aktuellen Quellcode:

- Paper/Folia
- Geschwindigkeit
- BungeeCord

## Laufzeitpfade

Derzeit unterstützte Pfade:

- `Paper -> McTcp -> VoiceCraft`
- `Paper -> Proxy relay -> McTcp -> VoiceCraft`

## `config.yml`-Layout

Aktuelle Paper-Konfigurationsstruktur:

### `config.debug`

Aktivieren Sie den Plugin-Debug-Modus.

### `config.lang`

Plugin-Sprache, zum Beispiel `system`.

### `config.auto-reconnect`

Ob das Plugin die Verbindung automatisch wiederherstellen soll.

### `config.proxy.enabled`

Ob der aktuelle Knoten auf der Paper-Seite hinter einem vom Proxy verwalteten Relay betrieben wird.

### `config.voicecraft.*`

Verbindungs- und Laufzeitverwaltungsblock.

Aktuelle verschachtelte Form:

```yml
config:
  voicecraft:
    transport:
      host: "127.0.0.1"
      port: 9050
      login-token: "__GENERATED_LOGIN_TOKEN__"
    voice:
      port: 1111
    auto-start: true
    shutdown-on-disable: true
    invariant-globalization: true
    ready-timeout-ms: 20000
    install-directory: "voicecraft-runtime"
```

- `transport.host`
- `transport.port`
- `transport.login-token`
- `voice.port`
- `auto-start`
- `shutdown-on-disable`
- `invariant-globalization`
- `ready-timeout-ms`
- `install-directory`

Bedeutung:

- `transport.host` / `transport.port` / `transport.login-token`
  Ziel `VoiceCraft.Server` / `McTcp`
- `voice.port`
  VoiceCraft-Laufzeit-Sprachport, der vom verwalteten Laufzeitpfad verwendet wird
- `auto-start`
  Lassen Sie das Plugin die VoiceCraft-Laufzeit automatisch starten
- `shutdown-on-disable`
  Stoppen Sie die verwaltete Laufzeit, wenn das Plugin entladen wird
- `invariant-globalization`
  Option zur Laufzeitglobalisierung, nützlich für den Start verwalteter Server
- `ready-timeout-ms`
  wie lange das Plugin darauf wartet, dass die Laufzeit bereit ist
- `install-directory`
  wo die verwaltete Laufzeit installiert ist

Auf Velocity und BungeeCord behält die Konfiguration die Form `config.voicecraft.transport.*` und `config.voicecraft.voice.*` bei, verwendet jedoch nicht die nur auf Paper verwalteten Laufzeitfelder.

### `config.voice.*`

Verhalten gegenüber dem Spieler:

- `proximity-distance`
- `proximity-toggle`
- `voice-effects`
- `not-in-voice-symbol`
- `in-voice-symbol`
- `send-bind-message`
- `send-disconnect-message`
- `send-voicecraft-disconnect-message`
- `send-connection-lost-message`
- `position-update-interval-ticks`

### `config.players`

Gespeicherte Autobind-/playerseitige Cache-Daten.

### `config.player-links`

Zusätzliche Link-/Cache-Struktur, die vom Plugin verwendet wird.

## Befehle

Von `BaseVoiceCommand`:

- `connect <host> <port> <key>`
- `reconnect [true|false]`
- `disconnect`
- `settings`
- `bind <key>`
- `bindfake <key> <name>`
- `updatefake <key>`
- `clearautobind`
- `reload`

## Berechtigungen

Typische Berechtigungen:

- `voice.cmd`
- `voice.connect`
- `voice.reconnect`
- `voice.disconnect`
- `voice.settings`
- `voice.bind`
- `voice.bindfake`
- `voice.reload`

## Direkter Paper-Modus

Am besten, wenn:

- Sie betreiben einen Paper-Server
- Sie möchten das einfachste Java-seitige Setup
- Sie möchten, dass GeyserVoice die VoiceCraft-Laufzeit für Sie verwaltet

Siehe [Direct Paper Guide](/ecosystem/geyservoice-direct-paper).

## Proxy-Modus

Am besten, wenn:

- Sie verwenden Velocity oder BungeeCord
- Sie haben mehrere Backend-Paper-Server
- Sie möchten eine zentrale VoiceCraft-Verbindung auf dem Proxy

Siehe [Proxy Guide](/ecosystem/geyservoice-proxy).

Im Proxy-Modus sollten Backend-Paper-Server nicht als zentraler VoiceCraft-Verbindungseigentümer behandelt werden. Der Proxy besitzt die `McTcp`-Verbindung und Backend-Knoten stellen Spieler-Snapshots bereit.

## Technische Hinweise

- Plugin-Messaging-Kanal: `geyservoice:main`
- Im Proxy-Modus können Welt-IDs mit der Backend-Identität benannt werden
- Das Plugin verwendet derzeit `McTcp` als VoiceCraft-zugewandte Brücke

## Aktuelle Code-Einschränkungen

- `updatefake` ist immer noch ein Platzhalter
- `settings` existiert, verfügt aber derzeit nur über minimale praktische Logik

## Checkliste für die Produktion

1. Entscheiden Sie, ob Paper die VoiceCraft-Laufzeit selbst verwalten soll.
2. Wenn ja, konfigurieren Sie `auto-start`, `install-directory` und `ready-timeout-ms`.
3. Wenn nein, richten Sie `config.voicecraft.transport.host`, `config.voicecraft.transport.port` und `config.voicecraft.transport.login-token` auf einen externen VoiceCraft-Server.
4. Beschränken Sie Befehle nur für Mitarbeiter.
5. Testen Sie den Bindungsfluss und Positionsaktualisierungen, bevor Sie es für Spieler öffnen.
6. Bestätigen Sie `McTcpConfig.Enabled = true` auf der VoiceCraft-Seite.
7. Bestätigen Sie, dass das Token mit `McTcpConfig.LoginToken` übereinstimmt.
