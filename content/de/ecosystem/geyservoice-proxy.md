# GeyserVoice Proxy-Handbuch

Verwenden Sie diesen Modus, wenn Sie Velocity oder BungeeCord mit einem oder mehreren Backend-Paper-Servern ausführen.

Im Proxy-Modus bleibt eine zentrale VoiceCraft-Verbindung auf dem Proxy, während Back-End-Paper-Server Spieler-Snapshots über Plugin-Messaging streamen.

Zielform:

```text
Backend Paper + GeyserVoice -> proxy relay -> Velocity/Bungee + GeyserVoice -> McTcp -> VoiceCraft.Server
VoiceCraft.Client -> VoiceCraft UDP endpoint
```

## So funktioniert der Proxy-Modus

- Backend-Paper-Server senden Spieler-Snapshots an den Proxy
- Der Proxy besitzt die VoiceCraft-seitige `McTcp`-Verbindung
- Welt-IDs und Dimensionen können mit der Backend-Identität benannt werden

Dies ermöglicht eine zentrale Sprachbrücke für ein Netzwerk mit mehreren Servern.

## Bereitstellungsmuster

GeyserVoice installieren:

- auf dem Proxy
- auf jedem Backend-Paper-Server

## Kernregel

Der Proxy ist die Quelle der Wahrheit für die VoiceCraft-Verbindung.

Backend-Paper-Server sollten als Snapshot-Ersteller und nicht als Haupt-Bridge-Eigentümer behandelt werden.

## Backend-Paper-Konfiguration

Auf Back-End-Paper-Servern:

- Aktivieren Sie den Proxy-Modus für den Paper-seitigen Knoten
- Behandeln Sie Backend-Host/-Port/-Schlüssel nicht als Quelle der Wahrheit

Beispiel für ein Paper-Backend:

```yml
config:
  proxy:
    enabled: true
```

Das Backend muss weiterhin GeyserVoice installiert haben, damit es Spieler beobachten und Snapshots senden kann, es sollte jedoch nicht Eigentümer der Hauptverbindung von VoiceCraft sein.

## Proxy-Konfiguration

Auf dem Proxy:

- setze den echten `config.voicecraft.transport.host`
- setze den echten `config.voicecraft.transport.port`
- setze den echten `config.voicecraft.transport.login-token`

Geschwindigkeits-/Bungee-Beispiel:

```yml
config:
  voicecraft:
    transport:
      host: "127.0.0.1"
      port: 9050
      login-token: "replace-with-token"
    voice:
      port: 1111
```

Das Token muss mit `McTcpConfig.LoginToken` auf `VoiceCraft.Server` übereinstimmen.

## Einrichtungsablauf

1. Installieren Sie das Plugin auf Proxy- und Backend-Knoten.
2. Starten Sie alles einmal, um Konfigurationen zu generieren.
3. Konfigurieren Sie den Proxy mit der echten VoiceCraft-Verbindung.
4. Konfigurieren Sie Backend-Knoten für das Proxy-Relay-Verhalten.
5. Plugin neu laden.
6. Validieren Sie die serverübergreifende Bewegung und den Bindungsfluss.

Beginnen Sie zunächst mit einem Backend-Server. Nachdem die Bindungs- und Positionsaktualisierungen dort funktionieren, fügen Sie weitere Backend-Knoten hinzu.

## Checkliste für die Validierung

- Der Spieler tritt dem Backend bei
- Backend sendet Snapshots korrekt
- Der Proxy bleibt mit VoiceCraft verbunden
- Durch den Wechsel der Backend-Server bleibt die erwartete Sprachidentität erhalten
- VoiceCraft-Serverprotokolle zeigen einen einzelnen Proxy-eigenen `McTcp`-Konsumenten
- Backend-Welt-IDs/Dimensionen sind nach Serverwechseln stabil

## Fehlermuster

- Das Backend versucht, die Hauptverbindung zu besitzen
- Proxy-Token unterscheidet sich von VoiceCraft `McTcpConfig.LoginToken`
- Der Proxy kann Paper erreichen, aber nicht VoiceCraft
- Die Backend-Topologie verbirgt Plugin-Nachrichten oder schreibt sie neu
- Das Plugin ist auf dem Proxy installiert, fehlt aber in einem Backend
- Backend `config.proxy.enabled` ist in einer Proxy-Relay-Bereitstellung falsch

## Betriebshinweise

- Halten Sie VoiceCraft nach Möglichkeit in der Nähe des Proxys, um die Bridge-Latenz zu reduzieren.
- Starten Sie die Backend-Knoten neu oder laden Sie sie neu, nachdem Sie die Proxy-Relay-Konfiguration geändert haben.
- Behalten Sie Token in der Proxy-Konfiguration und duplizieren Sie sie nicht zufällig in jedem Backend.
- Validieren Sie den Bindungsfluss erneut, nachdem Sie einen neuen Backend-Server hinzugefügt haben.
