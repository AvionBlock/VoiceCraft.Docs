# GeyserVoice Direct Paper Guide

Verwenden Sie diesen Modus, wenn ein Paper/Folia-Server direkt mit VoiceCraft kommunizieren soll.

Der Direct Paper-Modus ist die einfachste Java-seitige Topologie: Der Paper-Server stellt entweder eine Verbindung zu einem externen `VoiceCraft.Server` her oder lässt GeyserVoice eine lokale VoiceCraft-Laufzeit herunterladen und starten.

Zielform:

```text
Paper/Folia + GeyserVoice -> McTcp/McApi TCP -> VoiceCraft.Server
VoiceCraft.Client -> VoiceCraft UDP endpoint
```

## Zwei Möglichkeiten, es auszuführen

### Option A: externer VoiceCraft-Server

Sie führen `VoiceCraft.Server` bereits irgendwo aus und richten GeyserVoice darauf.

### Option B: Plugin-verwaltete Laufzeit

GeyserVoice kann VoiceCraft für Sie booten:

- Laufzeit herunterladen
- Laufzeit installieren
- Laufzeit starten
- warte auf die Bereitschaft
- Stoppen Sie optional die Laufzeit mit dem Plugin

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
    transport:
      host: "127.0.0.1"
      port: 9050
      login-token: "replace-with-token"
    voice:
      port: 1111
    auto-start: true
    shutdown-on-disable: true
    invariant-globalization: true
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

Verwenden Sie `config.voicecraft.transport.host`, `config.voicecraft.transport.port` und `config.voicecraft.transport.login-token` für die VoiceCraft-Verbindung `McTcp`. Diese müssen mit der VoiceCraft-Serverseite übereinstimmen, wenn Sie eine externe Laufzeit verwenden.

## Einrichtungsschritte

1. Installieren Sie GeyserVoice auf Paper.
2. Starten Sie den Server einmal.
3. Bearbeiten Sie `plugins/GeyserVoice/config.yml`.
4. Entscheiden Sie, ob `auto-start` aktiviert werden soll.
5. Stellen Sie sicher, dass `config.voicecraft.transport.login-token` mit VoiceCraft `McTcpConfig.LoginToken` übereinstimmt.
6. Führen Sie `/voice reload` aus.
7. Testen Sie den Bindungsfluss im Spiel.

Wenn `auto-start` gleich `true` ist, stellen Sie sicher, dass `install-directory` vom Paper-Prozess beschreibbar ist. Wenn `auto-start` gleich `false` ist, stellen Sie sicher, dass der externe VoiceCraft-Server bereits läuft und erreichbar ist.

## Wenn `auto-start` eine gute Idee ist

- Einzelserver-Setup
- Sie möchten weniger bewegliche Teile
- Sie verwalten VoiceCraft noch nicht mit systemd / Docker / Panel

## Wenn eine externe Laufzeit besser ist

- Sie verwalten VoiceCraft bereits zentral
- Sie möchten eine andere Neustartrichtlinie oder Protokollierung
- Sie führen mehrere Java-Knoten gegen ein VoiceCraft-Backend aus
- Sie möchten, dass ein Prozessmanager wie systemd, Docker oder ein Hosting-Panel Neustarts übernimmt

## Fehlerbehebung

- Laufzeit wird nie bereit:
  erhöhen `ready-timeout-ms`
- Das Plugin kann manuell eine Verbindung herstellen, jedoch nicht beim Start:
  Überprüfen Sie `auto-start` und `install-directory`
- Spieler treten bei, aber Sprachdaten werden nicht gebunden:
  Überprüfen Sie Token, Host, Port und Bindungsfluss
- externes VoiceCraft sieht das Plugin nie:
  Bestätigen Sie `McTcpConfig.Enabled = true`, Hostbindung, Firewall und `config.voicecraft.transport.*`
- Der Client stellt eine Verbindung her, aber der Java-Status hat keinen Einfluss auf die Nähe:
  Überprüfen Sie `/voice bind`, das Positionsaktualisierungsintervall und den serverseitigen Positionierungsmodus

## Checkliste für die Validierung

- Paper-Logs zeigen, dass GeyserVoice aktiviert ist
- Die VoiceCraft-Laufzeit wird ausgeführt oder automatisch gestartet
- `McTcpConfig.LoginToken` entspricht `config.voicecraft.transport.login-token`
- Der Spieler kann sich mit dem VoiceCraft-Client verbinden
- Spieler kann `/voice bind <key>` abschließen
- Sich im Spiel zu bewegen verändert das Näherungsverhalten
