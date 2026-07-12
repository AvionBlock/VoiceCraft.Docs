# McHttp für Bedrock Dedicated Server

`McHttp` ist der empfohlene VoiceCraft-Integrationsmodus für BDS.

Verwenden Sie diese Anleitung, wenn Sie einen Bedrock Dedicated Server betreiben und möchten, dass das serverseitige Add-on den Spielerstatus an `VoiceCraft.Server` sendet.

Zielform:

```text
VoiceCraft.Client -> VoiceCraft UDP endpoint
BDS + VoiceCraft.Addon.Core.McHttp -> VoiceCraft McHttp endpoint
```

## Warum `McHttp` empfohlen wird

- besser geeignet für dedizierte Serverumgebungen
- einfacher als Befehlstunnel-basierte Setups
- in der Produktion leichter nachzuvollziehen
- Passt gut zum Bedrock-Add-on-Paket `VoiceCraft.Addon.Core.McHttp`
- Hängt nicht vom lokalen `/connect`-Websocket-Workflow ab, der von `McWss` verwendet wird.

## Anforderungen

1. Ausführen von `VoiceCraft.Server`
2. `McHttpConfig.Enabled = true`
3. `VoiceCraft.Addon.Core.McHttp.zip` aus Veröffentlichungen oder ein fertiges Weltarchiv aus dem [Add-on-Konfigurator](/addon-configurator)
4. BDS mit erforderlichen Modulen und Skript-API-Unterstützung
5. Netzwerkerreichbarkeit vom BDS-Gerät zum VoiceCraft `McHttpConfig.Hostname`
6. Von Spielern installierte VoiceCraft-Clients

## Serverseitige VoiceCraft-Konfiguration

Minimalbeispiel:

```json
{
  "McHttpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-token",
    "Hostname": "http://0.0.0.0:9050/",
    "MaxClients": 10,
    "MaxTimeoutMs": 10000,
    "DisabledPacketTypes": []
  }
}
```

Wichtig:

- Verwenden Sie einen echten Token und behalten Sie niemals den generierten Token in der Produktion
- Stellen Sie sicher, dass der BDS-Host den konfigurierten Endpunkt erreichen kann
- Verwenden Sie `http://127.0.0.1:9050/` nur, wenn BDS und VoiceCraft auf demselben Host ausgeführt werden
- Verwenden Sie eine LAN-/öffentliche Adresse oder eine `0.0.0.0`-Bindung, wenn BDS eine Verbindung von einem anderen Computer herstellt

## Addon-Installation

Schnellster Weg:

- [Add-on-Konfigurator](/addon-configurator), wenn Sie ein sofort entpackbares Weltarchiv wünschen
- [Download-Seite](/download), wenn Sie das Roh-Add-on-Release-Paket wünschen

Manueller Pfad:

1. Extrahieren Sie `VoiceCraft.Addon.Core.McHttp.zip`.
2. Fügen Sie `RP` in `<MCServer>/resource_packs/` ein.
3. Fügen Sie `BP` in `<MCServer>/behavior_packs/` ein.
4. Befestigen Sie beide Pakete an der Zielwelt.
5. Starten Sie BDS neu, nachdem Sie Pakete oder Berechtigungen geändert haben.

Das Ressourcenpaket stellt für den Client sichtbare Elemente wie Symbole bereit. Das Verhaltenspaket führt die Skripte und Befehle aus, die BDS mit VoiceCraft verbinden.

## Modulberechtigungen

Öffnen Sie `<MCServer>/config/default/permissions.json` und stellen Sie sicher, dass es die erforderlichen Module enthält:

```json
{
  "allowed_modules": [
    "@minecraft/server-gametest",
    "@minecraft/server",
    "@minecraft/server-ui",
    "@minecraft/server-admin",
    "@minecraft/server-editor",
    "@minecraft/server-net"
  ]
}
```

Das Add-on benötigt netzwerkbezogene Skriptberechtigungen, da es den VoiceCraft-HTTP-Endpunkt von der BDS-Laufzeit aus aufruft.

## Befestige Packs an der Welt

In `<MCServer>/worlds/<YourWorld>/world_behavior_packs.json`:

```json
{
  "pack_id": "71ebb3ba-e9db-4546-9520-05f20b17dcb6",
  "version": [1, 6, 0]
}
```

In `world_resource_packs.json`:

```json
{
  "pack_id": "30b512be-77d1-4a61-bdb7-6c2f4062f889",
  "version": [1, 0, 0]
}
```

## Verbinde dich im Spiel

Ausführen:

```text
/voicecraft:vcconnect "http://<VOICECRAFT_HOST>:<PORT>" <LOGIN_TOKEN>
```

Beispiel:

```text
/voicecraft:vcconnect "http://127.0.0.1:9050" e4ad1f7e-4f90-4b21-bc15-6febe580bf1c
```

Verwenden Sie das Token von `McHttpConfig.LoginToken`.

Für geskriptetes Auto-Connect stellt das Add-on auch die Raw-Form bereit:

```text
/voicecraft:vcconnect_raw "<VOICECRAFT_HOST>" <PORT> <LOGIN_TOKEN>
```

In `Core.McHttp` wird daraus intern `http://<VOICECRAFT_HOST>:<PORT>` gebaut. Für manuelle Einrichtung verwenden Sie normalerweise `vcconnect`, außer Ihr Welt-Skript speichert Host und Port getrennt.

Wenn BDS auf einem anderen Host als VoiceCraft ausgeführt wird, ersetzen Sie `127.0.0.1` durch die Adresse des VoiceCraft-Servers, wie sie vom BDS-Computer aus gesehen wird.

## Was passiert nach der Verbindung?

Nach erfolgreicher Verbindung:

- Das Add-on authentifiziert sich bei VoiceCraft
- Die Welt kann über McApi Entitäten erstellen/aktualisieren
- Der Bindungsfluss wird über `voicecraft:vcbind` verfügbar.
- Die Benutzeroberfläche für Effekte und die paketgesteuerte Statussynchronisierung werden verfügbar

Zu diesem Zeitpunkt ist die Übertragung verbunden, aber jeder Spieler benötigt weiterhin den VoiceCraft-Client und einen funktionierenden Bindungsfluss für Proximity-Audio.

## Empfohlener Validierungsablauf

1. Starten Sie `VoiceCraft.Server` und bestätigen Sie `McHttpConfig.Enabled = true`.
2. Starten Sie BDS mit dem angehängten Add-on.
3. Verbinden Sie die Welt mit `vcconnect`.
4. Bestätigen Sie, dass kein Authentifizierungsfehler angezeigt wird.
5. Verbinden Sie einen VoiceCraft-Client mit `VoiceCraftConfig.Port`.
6. Verwenden Sie `voicecraft:vcbind <key>`.
7. Bewegen Sie den Spieler im Spiel und bestätigen Sie, dass sich Positionsaktualisierungen auf die Nähe auswirken.
8. Stellen Sie sicher, dass andere Spieler in der erwarteten Reichweite hören können.

## Häufige Probleme

- `HttpListenerException` unter Windows:
  Möglicherweise benötigen Sie `netsh http add iplisten 127.0.0.1`
- Container- oder VM-Netzwerk:
  Verwenden Sie `http://0.0.0.0:9050/` oder die richtige LAN-Adresse
- Hosting-Anbieter blockiert ausgehendes HTTP von BDS:
  Dieser Transport funktioniert dort möglicherweise nicht
- Authentifizierung schlägt fehl:
  Bestätigen Sie, dass der Befehl `McHttpConfig.LoginToken` und nicht das Token `McWss` oder `McTcp` verwendet
- Addon wird geladen, aber Befehle fehlen:
  Bestätigen Sie, dass sowohl Verhaltens- als auch Ressourcenpakete mit der Welt verbunden sind und BDS neu gestartet wurde
- Client verbindet sich, aber keine Nähe:
  Bestätigen Sie den Bindungsfluss, `PositioningType` und Aktualisierungen der Spielerposition

## Lesen Sie weiter

- [VoiceCraft.Addon](/ecosystem/voicecraft-addon)
- [Addon API](/ecosystem/addon-api)
- [Download-Seite](/download)
- [Add-on-Konfigurator](/addon-configurator)
