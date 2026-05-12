# GeyserVoice Proxy-Handbuch

Verwenden Sie diesen Modus, wenn Sie Velocity oder BungeeCord mit einem oder mehreren Backend-Paper-Servern ausführen.

## So funktioniert der Proxy-Modus

- Backend-Paper-Server senden Spieler-Snapshots an den Proxy
- the proxy owns the VoiceCraft-side `McTcp` connection
- Welt-IDs und Dimensionen können mit der Backend-Identität benannt werden

Dies ermöglicht eine zentrale Sprachbrücke für ein Netzwerk mit mehreren Servern.

## Bereitstellungsmuster

GeyserVoice installieren:

- auf dem Proxy
- auf jedem Backend-Paper-Server

## Kernregel

Der Proxy ist die Quelle der Wahrheit für die VoiceCraft-Verbindung.

Backend-Paper-Server sollten als Snapshot-Ersteller und nicht als Haupt-Bridge-Eigentümer behandelt werden.

## Backend Paper-Konfiguration

Auf Back-End-Paper-Servern:

- Aktivieren Sie den Proxy-Modus für den papierseitigen Knoten
- Behandeln Sie Backend-Host/-Port/-Schlüssel nicht als Quelle der Wahrheit

## Proxy-Konfiguration

Auf dem Proxy:

- set the real `host`
- set the real `port`
- set the real `login-token`

## Setup-Ablauf

1. Installieren Sie das Plugin auf Proxy- und Backend-Knoten.
2. Starten Sie alles einmal, um Konfigurationen zu generieren.
3. Konfigurieren Sie den Proxy mit der echten VoiceCraft-Verbindung.
4. Konfigurieren Sie Backend-Knoten für das Proxy-Relay-Verhalten.
5. Plugin neu laden.
6. Validieren Sie die serverübergreifende Bewegung und den Bindungsfluss.

## Validierungscheckliste

- Spieler tritt dem Backend bei
- Backend sendet Snapshots korrekt
- Proxy bleibt mit VoiceCraft verbunden
- Durch den Wechsel der Backend-Server bleibt die erwartete Sprachidentität erhalten

## Fehlermuster

- Das Backend versucht, die Hauptverbindung zu besitzen
- proxy token differs from VoiceCraft `McTcpConfig.LoginToken`
- Der Proxy kann Paper erreichen, aber nicht VoiceCraft
- Die Backend-Topologie verbirgt Plugin-Nachrichten oder schreibt sie neu
