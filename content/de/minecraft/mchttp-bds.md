# McHttp für Bedrock Dedicated Server

`McHttp` is the recommended VoiceCraft integration mode for BDS.

## Why `McHttp` is recommended

- Besser geeignet für dedizierte Serverumgebungen
- einfacher als Befehlstunnel-basierte Setups
- leichter nachvollziehbar in der Produktion
- aligns well with the Bedrock addon package `VoiceCraft.Addon.Core.McHttp`

## Anforderungen

1. Running `VoiceCraft.Server`
2. `McHttpConfig.Enabled = true`
3. `VoiceCraft.Addon.Core.McHttp.zip` from releases, or a ready world archive from the [Addon Configurator](/addon-configurator)
4. BDS mit erforderlichen Modulen und Skript-API-Unterstützung

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

- Verwenden Sie einen echten Token, behalten Sie den generierten niemals in der Produktion
- Stellen Sie sicher, dass der BDS-Host den konfigurierten Endpunkt erreichen kann

## Add-on-Installation

Schnellster Weg:

- [Addon-Konfigurator](/addon-configurator), wenn Sie ein sofort entpackbares Weltarchiv wünschen
- [Download-Seite](/download), wenn Sie das Roh-Add-on-Release-Paket möchten

Manueller Pfad:

1. Extract `VoiceCraft.Addon.Core.McHttp.zip`.
2. Put `RP` into `<MCServer>/resource_packs/`.
3. Put `BP` into `<MCServer>/behavior_packs/`.

## Modulberechtigungen

Open `<MCServer>/config/default/permissions.json` and ensure it contains the required modules:

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

## Im Spiel verbinden

Ausführen:

```text
/voicecraft:vcconnect "http://<VOICECRAFT_HOST>:<PORT>" <LOGIN_TOKEN>
```

Beispiel:

```text
/voicecraft:vcconnect "http://127.0.0.1:9050" e4ad1f7e-4f90-4b21-bc15-6febe580bf1c
```

Use the token from `McHttpConfig.LoginToken`.

## Was passiert nach der Verbindung?

Nach erfolgreicher Verbindung:

- Das Addon authentifiziert sich bei VoiceCraft
- Die Welt kann über McApi Entitäten erstellen/aktualisieren
- bind flow becomes available through `voicecraft:vcbind`
- Effekt-Benutzeroberfläche und paketgesteuerte Statussynchronisierung werden verfügbar

## Empfohlener Validierungsablauf

1. connect the world with `vcconnect`
2. Stellen Sie sicher, dass kein Authentifizierungsfehler angezeigt wird
3. Lassen Sie eine VoiceCraft-Entität erscheinen
4. use `voicecraft:vcbind <key>`
5. Bestätigen Sie, dass der Player gebunden und in VoiceCraft sichtbar ist

## Häufige Probleme

- `HttpListenerException` on Windows:
  you may need `netsh http add iplisten 127.0.0.1`
- Container- oder VM-Netzwerk:
  use `http://0.0.0.0:9050/` or the correct LAN address
- Hosting-Anbieter blockiert ausgehendes HTTP von BDS:
  Dieser Transport funktioniert dort möglicherweise nicht

## Lesen Sie weiter

- [VoiceCraft.Addon](/ecosystem/voicecraft-addon)
- [Add-on-API](/ecosystem/addon-api)
- [Download-Seite](/download)
- [Addon-Konfigurator](/addon-configurator)
