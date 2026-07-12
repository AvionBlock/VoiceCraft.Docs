# Integrationsrezepte

Dies sind praktische Bereitstellungsmuster für die gängigsten VoiceCraft-Szenarien.

Verwenden Sie diese Seite, nachdem Sie die Grundkomponenten verstanden haben und ein konkretes Topologierezept benötigen. In jedem Szenario werden der Stack, der Hauptgrund für die Auswahl, die Konfiguration, die am wichtigsten ist, und der Validierungspunkt, der beweist, dass er funktioniert, aufgeführt.

## Szenario A: Dedizierter Bedrock-Server

Stapel:

- `VoiceCraft.Server`
- `VoiceCraft.Addon.Core.McHttp`
- VoiceCraft-Kunden

Wählen Sie dies, wenn:

- BDS ist der Hauptspielserver
- BDS kann einen VoiceCraft-HTTP-Endpunkt erreichen
- Sie möchten den stabilsten Bedrock-Produktionspfad

Empfohlene Konfiguration:

- `McHttpConfig.Enabled = true`
- `McWssConfig.Enabled = false`
- `McTcpConfig.Enabled = false`, sofern nicht auch erforderlich

Durchfluss:

1. Bereitstellen von `VoiceCraft.Server`
2. sicher `McHttpConfig.LoginToken`
3. Stellen Sie sicher, dass BDS `McHttpConfig.Hostname` erreichen kann.
4. `Core.McHttp` installieren
5. Führen Sie `voicecraft:vcconnect <hostname> <token>` aus
6. validieren `voicecraft:vcbind <key>`
7. Verbinden Sie einen Client und bestätigen Sie Proximity-Änderungen durch Bewegung

## Szenario B: Lokale/Einzelspieler-Bedrock-Welt

Stapel:

- lokaler VoiceCraft-Stack
- `VoiceCraft.Addon.Core.McWss`

Wählen Sie dies, wenn:

- Sie testen lokal
- Sie führen kein BDS aus
- Der Websocket-Flow `/connect` ist verfügbar

Durchfluss:

1. `McWss` aktivieren
2. `DataTunnelCommand = voicecraft:data_tunnel` behalten
3. `Core.McWss` installieren
4. verwenden Sie `/connect`
5. Führen Sie `voicecraft:vcconnect <token>` aus
6. Validieren Sie Bindung und Bewegung

## Szenario C: Direct Paper mit von VoiceCraft.Java verwalteter Laufzeit

Stapel:

- Paper/Folia
- `VoiceCraft.Java`
- Plug-in-verwaltete VoiceCraft-Laufzeitumgebung

Wählen Sie dies, wenn:

- Ein Paper/Folia-Server sollte über eine Sprachintegration verfügen
- Sie möchten weniger externe Dienste
- VoiceCraft.Java sollte VoiceCraft herunterladen und starten

Durchfluss:

1. `VoiceCraft.Java` installieren
2. setze `config.proxy.enabled = false`
3. konfigurieren Sie `config.voicecraft.transport.login-token`
4. `config.voicecraft.auto-start` aktivieren
5. Bindungsfluss neu laden und validieren

Dies ist das einfachste Java-seitige Setup, wenn Sie möchten, dass das Plugin VoiceCraft unter der Haube ausführt.

## Szenario D: Direct Paper mit externem VoiceCraft

Stapel:

- Paper/Folia
- `VoiceCraft.Java`
- extern verwaltet `VoiceCraft.Server`

Wählen Sie dies, wenn:

- Sie führen VoiceCraft bereits mit systemd, Docker oder einem Panel aus
- Mehrere Komponenten benötigen möglicherweise dasselbe Backend
- Sie möchten externe Protokolle und Neustartrichtlinien

Durchfluss:

1. Aktivieren Sie `McTcp` auf VoiceCraft
2. Legen Sie `config.voicecraft.transport.host`, `config.voicecraft.transport.port` und `config.voicecraft.transport.login-token` in VoiceCraft.Java fest
3. Deaktivieren Sie die Plugin-Laufzeitverwaltung, wenn sie nicht benötigt wird
4. Verbindung neu laden und validieren

## Szenario E: Geschwindigkeits- oder Bungee-Netzwerk

Stapel:

- `VoiceCraft.Java` auf Proxy
- `VoiceCraft.Java` auf Backend-Paper-Servern
- `VoiceCraft.Server` mit `McTcp`

Wählen Sie dies, wenn:

- Velocity oder BungeeCord leiten Spieler über Backend-Server weiter
- Der Proxy sollte Eigentümer der VoiceCraft-Verbindung sein
- Backend-Server sollten nur Snapshots senden

Durchfluss:

1. Konfigurieren Sie den Proxy als VoiceCraft-Eigentümer
2. Konfigurieren Sie Backend-Paper-Knoten für den Proxy-Modus
3. Plugin auf allen Knoten neu laden
4. Validieren Sie serverübergreifende Spielerbewegungen

## Minimales Fragment der Produktionskonfiguration

```json
{
  "VoiceCraftConfig": {
    "Port": 9050,
    "MaxClients": 250,
    "PositioningType": 0
  },
  "McHttpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-strong-token",
    "Hostname": "http://0.0.0.0:9050/",
    "MaxClients": 10
  },
  "McTcpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-strong-token",
    "Hostname": "0.0.0.0",
    "Port": 9052,
    "MaxClients": 10
  },
  "McWssConfig": {
    "Enabled": false,
    "LoginToken": "replace-with-strong-token",
    "Hostname": "ws://0.0.0.0:9051/",
    "DataTunnelCommand": "voicecraft:data_tunnel"
  }
}
```

Dieses Fragment zeigt eine gemischte HTTP + TCP-Bereitstellung. Binden Sie `McHttp` und `McTcp` nicht an denselben TCP-Port. Der VoiceCraft UDP-Client-Port kann die Nummer `9050` gemeinsam nutzen, da es sich um UDP handelt, aber HTTP- und Raw-TCP-Listener benötigen unterschiedliche TCP-Bindungen.

## Reihenfolge der Fehlerbehebung

1. Überprüfen Sie die Token-Übereinstimmung
2. Überprüfen Sie die Erreichbarkeit des Hosts/Ports
3. Überprüfen Sie, ob der ausgewählte Transport aktiviert ist
4. Überprüfen Sie, ob die Add-on- oder Plugin-Topologie mit der Konfiguration übereinstimmt
5. Untersuchen Sie erst dann Probleme auf Paketebene

## Was „arbeiten“ bedeutet

Ein Rezept ist erst dann vollständig, wenn alle diese Punkte zutreffen:

- `VoiceCraft.Server` startet ohne Listener-Fehler
- Mindestens ein VoiceCraft-Client stellt eine Verbindung her
- Der Minecraft-seitige Transport wird authentifiziert
- Der Bindungsfluss ist abgeschlossen
- Sich im Spiel zu bewegen verändert das Proximity-Verhalten
- Mitarbeiter können verbundene Clients/Entitäten zur Fehlerbehebung identifizieren
