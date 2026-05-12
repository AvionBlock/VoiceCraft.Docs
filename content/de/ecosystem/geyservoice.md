# GeyserVoice (Java / Geyser Bridge)

Repository: [AvionBlock/GeyserVoice](https://github.com/AvionBlock/GeyserVoice)

`GeyserVoice` connects Java-side infrastructure to `VoiceCraft.Server` through the `McTcp` transport.

Es unterstützt:

- Direkter Paper/Folia-Einsatz
- Velocity-Proxy-Bereitstellung
- BungeeCord-Proxy-Bereitstellung
- Gemischte Proxy- und Backend-Topologien

## Was GeyserVoice macht

`GeyserVoice` bridges player state from Java-side servers into VoiceCraft:

- Spielerlebenszyklus
- Positions-/Weltschnappschüsse
- Fluss binden
- Proxy-Relaying für Netzwerke mit mehreren Servern

Es ist nicht nur ein einfacher Paketweiterleiter. Im direkten Paper-Modus kann auch eine lokale VoiceCraft-Laufzeit verwaltet werden.

## Sehr wichtig: GeyserVoice kann VoiceCraft unter der Haube ausführen

Bei direkten Paper-Installationen kann das Plugin automatisch:

- Laden Sie die VoiceCraft-Laufzeit herunter
- Installieren Sie es in einem konfigurierten Verzeichnis
- Starten Sie den Vorgang
- Warten Sie, bis es fertig ist
– Stoppen Sie es optional, wenn das Plugin deaktiviert wird

This behavior is controlled through the `config.voicecraft.*` block.

Dadurch eignet sich GeyserVoice sowohl für:

- using an already-managed external `VoiceCraft.Server`
- Lassen Sie das Plugin VoiceCraft für Sie booten und ausführen

## Unterstützte Plugin-Plattformen

Aus dem aktuellen Quellcode:

- Papier/Folie
- Geschwindigkeit
- BungeeCord

## Laufzeitpfade

Derzeit unterstützte Pfade:

- `Paper -> McTcp -> VoiceCraft`
- `Paper -> Proxy relay -> McTcp -> VoiceCraft`

## `config.yml` layout

Aktuelle Paper-Konfigurationsstruktur:

### `config.debug`

Aktivieren Sie den Plugin-Debug-Modus.

### `config.lang`

Plugin language, for example `system`.

### `config.auto-reconnect`

Ob das Plugin die Verbindung automatisch wiederherstellen soll.

### `config.proxy.enabled`

Ob der aktuelle Knoten auf der Papierseite hinter einem vom Proxy verwalteten Relay betrieben wird.

### `config.voicecraft.*`

Verbindungs- und Laufzeitverwaltungsblock:

- `host`
- `port`
- `login-token`
- `auto-start`
- `shutdown-on-disable`
- `ready-timeout-ms`
- `install-directory`

Bedeutung:

- `host` / `port` / `login-token`
  target `VoiceCraft.Server` / `McTcp`
- `auto-start`
  Lassen Sie das Plugin die VoiceCraft-Laufzeit automatisch starten
- `shutdown-on-disable`
  Stoppen Sie die verwaltete Laufzeit, wenn das Plugin entladen wird
- `ready-timeout-ms`
  wie lange das Plugin darauf wartet, dass die Laufzeit bereit ist
- `install-directory`
  wo die verwaltete Laufzeit installiert ist

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

From `BaseVoiceCommand`:

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

## Direktpapiermodus

Am besten, wenn:

- Sie betreiben einen Papierserver
- Sie möchten das einfachste Java-seitige Setup
- Sie möchten, dass GeyserVoice die VoiceCraft-Laufzeit für Sie verwaltet

Siehe [Direct Paper Guide](/ecosystem/geyservoice-direct-paper).

## Proxy-Modus

Am besten, wenn:

- Du verwendest Velocity oder BungeeCord
- Sie haben mehrere Backend-Paper-Server
- Sie möchten eine zentrale VoiceCraft-Verbindung auf dem Proxy

Siehe [Proxy-Anleitung](/ecosystem/geyservoice-proxy).

## Technische Hinweise

- plugin messaging channel: `geyservoice:main`
– Im Proxy-Modus können Welt-IDs mit der Backend-Identität benannt werden
- the plugin currently uses `McTcp` as the VoiceCraft-facing bridge

## Aktuelle Code-Einschränkungen

- `updatefake` is still a placeholder
- `settings` exists but currently has minimal practical logic

## Produktionscheckliste

1. Entscheiden Sie, ob Paper die VoiceCraft-Laufzeit selbst verwalten soll.
2. If yes, configure `auto-start`, `install-directory`, and `ready-timeout-ms`.
3. If no, point `host`, `port`, and `login-token` at an external VoiceCraft server.
4. Beschränken Sie Befehle, die nur dem Personal vorbehalten sind.
5. Testen Sie den Bindungsfluss und Positionsaktualisierungen, bevor Sie es für Spieler öffnen.
