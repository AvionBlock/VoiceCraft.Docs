# McWss für Einzelspieler-Welten

`McWss` is the websocket / command-tunnel transport mostly used for local worlds and lightweight Bedrock setups.

## Wann man es verwenden sollte

Use `McWss` when:

- Du spielst in einer lokalen Bedrock-Welt
- Sie möchten ein schnelles Einzelspieler-Setup
- Sie testen die Add-on-Logik ohne einen dedizierten BDS-Host

## Wichtige Einschränkungen

- usually less stable than `McHttp`
- Befehlsdurchsatz und Nutzlastgröße sind sehr wichtig
– Nicht die Standardempfehlung für große öffentliche Produktionsumgebungen

## Anforderungen

1. `VoiceCraft.Server` with `McWssConfig.Enabled = true`
2. `VoiceCraft.Addon.Core.McWss.zip`
3. Grundgerüst-Build, der die erforderliche Websocket-/Skriptfunktionalität unterstützt

Hilfreiche Links:

- [Download Page](/download) for the raw `Core.McWss` release package
- [Addon-Konfigurator](/addon-configurator) für ein sofort entpackbares Weltarchiv

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

## Installation

### Option 1: import as `.mcaddon`

1. Rename archive to `VoiceCraft.Addon.Core.McWss.mcaddon`.
2. Öffnen Sie es, damit Minecraft das Add-on importiert.
3. Aktivieren Sie das Verhaltenspaket und das Ressourcenpaket in der Welt.

### Option 2: manuelles Kopieren

1. Extrahieren Sie das Archiv.
2. Copy `RP` and `BP` to the Bedrock directories.
3. Aktivieren Sie beide Pakete in der Zielwelt.

## Verbindungsfluss

### Schritt 1: Verbinden Sie den World WebSocket

```text
/connect <VOICECRAFT_HOST>:<MCWSS_PORT>
```

Beispiel:

```text
/connect 127.0.0.1:9051
```

### Schritt 2: Authentifizieren Sie das Add-on

```text
/voicecraft:vcconnect <LOGIN_TOKEN>
```

Use `McWssConfig.LoginToken`.

## Datentunnel

Das Addon verwendet:

- `voicecraft:data_tunnel`

This must stay aligned with `McWssConfig.DataTunnelCommand`.

Wenn Sie eine Seite umbenennen und die andere nicht, bricht die Brücke.

Der Befehl trägt derzeit Folgendes:

– optionales Argument für die maximale Stringlänge
- Argument für gepackte Nutzdaten

## Tuning

Wenn Sie Verzögerungen oder Paketinstabilität feststellen:

- lower `CommandsPerTick`
- review `MaxByteLengthPerCommand`
- Vermeiden Sie große Burst-Updates
- Testen Sie mit weniger aktiven Einheiten

## Wann auf einen anderen Transport umsteigen sollte

Move to `McHttp` when:

- Sie betreiben einen echten dedizierten Bedrock-Server
- Sie eine sauberere Produktionsbereitstellung wünschen
- Die Instabilität des Befehlstunnels wird zum Problem

Fahren Sie in diesem Fall mit [McHttp für BDS](/minecraft/mchttp-bds) fort.
