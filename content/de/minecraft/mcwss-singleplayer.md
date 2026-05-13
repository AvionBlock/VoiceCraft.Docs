# McWss für Einzelspieler-Welten

`McWss` ist der Websocket-/Befehlstunnel-Transport, der hauptsächlich für lokale Welten und leichte Bedrock-Setups verwendet wird.

Verwenden Sie diese Anleitung, wenn Sie keinen vollständigen dedizierten Bedrock-Server betreiben und eine lokale Bedrock-Welt benötigen, um über den `/connect`-Websocket-Flow mit VoiceCraft zu kommunizieren.

Zielform:

```text
VoiceCraft.Client -> VoiceCraft UDP endpoint
Local Bedrock world + VoiceCraft.Addon.Core.McWss -> McWss websocket endpoint
```

## Wann sollte man es verwenden?

Verwenden Sie `McWss`, wenn:

- Du spielst in einer lokalen Bedrock-Welt
- Sie möchten ein schnelles Einzelspieler-Setup
- Sie testen die Add-on-Logik ohne einen dedizierten BDS-Host

Wenn Sie einen echten Bedrock Dedicated Server betreiben, verwenden Sie stattdessen [McHttp for BDS](/minecraft/mchttp-bds).

## Wichtige Einschränkungen

- normalerweise weniger stabil als `McHttp`
- Befehlsdurchsatz und Nutzlastgröße sind von großer Bedeutung
- Dies ist nicht die Standardempfehlung für große öffentliche Produktionsumgebungen
- hängt davon ab, ob der Bedrock-Websocket und das Befehlsverhalten in Ihrer Umgebung verfügbar sind

## Anforderungen

1. `VoiceCraft.Server` mit `McWssConfig.Enabled = true`
2. `VoiceCraft.Addon.Core.McWss.zip`
3. Bedrock-Build, der die erforderliche Websocket-/Skriptfunktionalität unterstützt
4. VoiceCraft-Client installiert und konfiguriert
5. Passend zu `McWssConfig.LoginToken` für die Add-on-Authentifizierung

Hilfreiche Links:

- [Download-Seite](/download) für das Rohversionspaket `Core.McWss`
- [Add-on-Konfigurator](/addon-configurator) für ein sofort entpackbares Weltarchiv

## VoiceCraft-Serverkonfiguration

Typisches Setup:

```json
{
  "McWssConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-token",
    "Hostname": "ws://127.0.0.1:9051/",
    "MaxClients": 1,
    "MaxTimeoutMs": 10000,
    "DataTunnelCommand": "voicecraft:data_tunnel",
    "CommandsPerTick": 3,
    "MaxByteLengthPerCommand": 300,
    "DisabledPacketTypes": []
  }
}
```

Halten Sie `DataTunnelCommand` am Add-on-Paket ausgerichtet. Wenn Sie es in der Serverkonfiguration ändern, muss das Add-on denselben Befehlsnamen verwenden.

Behalten Sie für lokale Einzelspielertests den Websocket-Host auf `127.0.0.1`. Verwenden Sie eine breitere Bindung nur, wenn die Bedrock-Welt von einer anderen Maschine aus verbunden wird.

## Installation

### Option 1: Import als `.mcaddon`

1. Benennen Sie das Archiv in `VoiceCraft.Addon.Core.McWss.mcaddon` um.
2. Öffne es, damit Minecraft das Addon importiert.
3. Aktivieren Sie das Verhaltenspaket und das Ressourcenpaket weltweit.

### Option 2: manuelles Kopieren

1. Extrahieren Sie das Archiv.
2. Kopieren Sie `RP` und `BP` in die Bedrock-Verzeichnisse.
3. Aktivieren Sie beide Pakete in der Zielwelt.

Das Ressourcenpaket stellt sichtbare Assets bereit. Das Verhaltenspaket stellt Befehle, Skripte und Brückenlogik bereit.

## Verbindungsfluss

### Schritt 1: Verbinden Sie den World WebSocket

```text
/connect <VOICECRAFT_HOST>:<MCWSS_PORT>
```

Beispiel:

```text
/connect 127.0.0.1:9051
```

Dies verbindet die Bedrock-Welt mit dem VoiceCraft-Websocket-Transport. Das Add-on wird noch nicht authentifiziert.

### Schritt 2: Authentifizieren Sie das Add-on

```text
/voicecraft:vcconnect <LOGIN_TOKEN>
```

Verwenden Sie `McWssConfig.LoginToken`.

Nach der Authentifizierung kann das Add-on Entitäts- und Bindungsdaten über den Befehlstunnel senden.

## Datentunnel

Das Addon verwendet:

- `voicecraft:data_tunnel`

Dies muss mit `McWssConfig.DataTunnelCommand` übereinstimmen.

Wenn Sie eine Seite umbenennen und die andere nicht, bricht die Brücke.

Der Befehl trägt derzeit Folgendes:

- optionales Argument für die maximale Zeichenfolgenlänge
- Argument für gepackte Nutzdaten

Der Tunnel reagiert empfindlich auf den Befehlsdurchsatz. Große Mengen an Entitäts- oder Effektaktualisierungen können zu Verzögerungen oder instabiler Übermittlung führen, insbesondere auf Low-End-Rechnern.

## Abstimmung

Wenn Sie Verzögerungen oder Paketinstabilität feststellen:

- niedriger `CommandsPerTick`
- Rezension `MaxByteLengthPerCommand`
- Vermeiden Sie große Burst-Updates
- Testen Sie mit weniger aktiven Einheiten
- Behalten Sie das Setup während des Tunings lokal bei
- Wechseln Sie zu `McHttp`, wenn die Welt zu einem gemeinsam genutzten Server mit langer Laufzeit wird

## Wann sollte auf einen anderen Transport umgestiegen werden?

Wechseln Sie zu `McHttp`, wenn:

- Sie betreiben einen echten dedizierten Bedrock-Server
- Sie möchten eine sauberere Produktionsbereitstellung
- Die Instabilität des Befehlstunnels wird zum Problem

Fahren Sie in diesem Fall mit [McHttp for BDS](/minecraft/mchttp-bds) fort.

## Checkliste für die Validierung

- `McWssConfig.Enabled = true`
- Die Welt kann `/connect <host>:<port>` ausführen
- `/voicecraft:vcconnect <LOGIN_TOKEN>` ist erfolgreich
- Der VoiceCraft-Client stellt eine Verbindung zum UDP-Endpunkt her
- `PositioningType` stimmt überein zwischen Client und Server
- Bindungsablauf funktioniert im Spiel
- Durch Bewegen des Spielers ändert sich das Proximity-Verhalten

## Häufige Probleme

- `/connect` schlägt fehl:
  Überprüfen Sie Host/Port und ob Bedrock WebSocket-Verbindungen in Ihrer Umgebung zulässt.
- `vcconnect` schlägt fehl:
  Bestätigen Sie, dass Sie `McWssConfig.LoginToken` verwendet haben.
- Datentunnelfehler:
  Bestätigen Sie, dass `DataTunnelCommand` mit dem Add-on-Paket übereinstimmt.
- Audio stellt eine Verbindung her, aber die Nähe ist falsch:
  Überprüfen Sie den Bindungsfluss, den Positionierungsmodus und ob Positionsaktualisierungen eintreffen.
