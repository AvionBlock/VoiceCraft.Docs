# Integrationsszenarien

Dies sind praktische Bereitstellungsmuster für die gängigsten VoiceCraft-Szenarien.

## Szenario A: Dedizierter Bedrock-Server

Stapel:

- `VoiceCraft.Server`
- `VoiceCraft.Addon.Core.McHttp`
- VoiceCraft-Kunden

Empfohlene Konfiguration:

- `McHttpConfig.Enabled = true`
- `McWssConfig.Enabled = false`
- `McTcpConfig.Enabled = false` unless also needed

Durchfluss:

1. deploy `VoiceCraft.Server`
2. secure `McHttpConfig.LoginToken`
3. ensure BDS can reach `McHttpConfig.Hostname`
4. install `Core.McHttp`
5. run `voicecraft:vcconnect <hostname> <token>`
6. validate `voicecraft:vcbind <key>`

## Szenario B: Lokale/Einzelspieler-Bedrock-Welt

Stapel:

- lokaler VoiceCraft-Stack
- `VoiceCraft.Addon.Core.McWss`

Durchfluss:

1. enable `McWss`
2. keep `DataTunnelCommand = voicecraft:data_tunnel`
3. install `Core.McWss`
4. use `/connect`
5. run `voicecraft:vcconnect <token>`

## Szenario C: Direct Paper mit von GeyserVoice verwalteter Laufzeit

Stapel:

- Papier/Folie
- `GeyserVoice`
- Plugin-verwaltete VoiceCraft-Laufzeitumgebung

Durchfluss:

1. install `GeyserVoice`
2. set `config.proxy.enabled = false`
3. configure `config.voicecraft.login-token`
4. enable `config.voicecraft.auto-start`
5. Laden Sie den Bindungsfluss neu und validieren Sie ihn

Dies ist das einfachste Java-seitige Setup, wenn Sie möchten, dass das Plugin VoiceCraft unter der Haube ausführt.

## Szenario D: Direct Paper mit externem VoiceCraft

Stapel:

- Papier/Folie
- `GeyserVoice`
- externally managed `VoiceCraft.Server`

Durchfluss:

1. enable `McTcp` on VoiceCraft
2. set `host`, `port`, `login-token` in GeyserVoice
3. Deaktivieren Sie die Plugin-Laufzeitverwaltung, wenn sie nicht benötigt wird
4. Verbindung neu laden und validieren

## Szenario E: Geschwindigkeits- oder Bungee-Netzwerk

Stapel:

- `GeyserVoice` on proxy
- `GeyserVoice` on backend Paper servers
- `VoiceCraft.Server` with `McTcp`

Durchfluss:

1. Konfigurieren Sie den Proxy als VoiceCraft-Eigentümer
2. Backend-Paper-Knoten für den Proxy-Modus konfigurieren
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
    "Port": 9050,
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

## Fehlerbehebungsreihenfolge

1. Überprüfen Sie die Token-Übereinstimmung
2. Überprüfen Sie die Erreichbarkeit des Hosts/Ports
3. Überprüfen Sie, ob der ausgewählte Transport aktiviert ist
4. Überprüfen Sie, ob die Add-on- oder Plugin-Topologie mit der Konfiguration übereinstimmt
5. Untersuchen Sie erst dann Probleme auf Paketebene
