# VoiceCraft.Addon (Bedrock Addon)

Repository: [AvionBlock/VoiceCraft.Addon](https://github.com/AvionBlock/VoiceCraft.Addon)

Dieses Repository enthält praktische Bedrock-Add-on-Pakete und die skriptseitige McApi-Oberfläche für benutzerdefinierte Weltlogik.

Quicklinks:

- [Download-Seite](/download)
- [Addon-Konfigurator](/addon-configurator)
- [Add-on-Releases](https://github.com/AvionBlock/VoiceCraft.Addon/releases/latest)

## Pakete

1. `Basic`
   gebrauchsfertiges Add-on mit Bindungsfluss, Einstellungs-Benutzeroberfläche und Sprachanzeigen im Spiel
2. `Core.McHttp`
   Bedrock-Transportpaket für HTTP-basierte Integration
3. `Core.McWss`
   Websocket/Command-Tunnel-Transportpaket

## Versionsausrichtung

VoiceCraft `v1.6.1` requires updating the addon packages together with the client/server release. This release includes in-game voice icons, auto connection quality-of-life, broadcasted events, and McHttp/McWss disconnect fixes that depend on the matching addon-side packages.

## Namespace

Paketübergreifend:

- `VoiceCraft.Namespace = "voicecraft"`

## Befehle

### Grundlegend

- `voicecraft:vcbind <binding_key>`
  permission: `Any`
- `voicecraft:vcsettings`
  permission: `GameDirectors`

### Core.McHttp

- `voicecraft:vcconnect <hostname> <token>`
  permission: `GameDirectors`

### Core.McWss

- `voicecraft:vcconnect <token>`
  permission: `Host`
- `voicecraft:data_tunnel [max_string_length] [data]`
  permission: `Host`

## Was Ihnen das Basic-Paket bietet

- Fluss binden / entbinden
- Benutzeroberfläche für Spielereinstellungen
- Effekt schaltet um
- Skriptereignisse zur Automatisierung

## Flussdetails binden

Aus der aktuellen Implementierung:

1. Eine neue Netzwerkeinheit erhält einen zufälligen 5-stelligen Bindungsschlüssel
2. Die Entitätsbeschreibung wird mit der Schlüsselaufforderung aktualisiert
3. player runs `voicecraft:vcbind <key>`
4. Entität bindet an den Spieler
5. Im Urlaub wird die Bindung aufgehoben und ein neuer Schlüssel generiert

Skriptereignisse:

- `voicecraft:onPlayerBind`
- `voicecraft:onPlayerUnbind`

VoiceCraft `v1.6.1` also broadcasts more addon-side lifecycle and packet events so custom worlds can react without polling the transport layer directly.

## Effekte-Benutzeroberfläche

`voicecraft:vcsettings` currently exposes:

- Sichtbarkeit
- Nähe
- Richtungsabhängig
- Näherecho
- Echo
- Annäherungsmuffel
- Muffel

Effects are sent through `McApiSetEffectRequestPacket`.

## Was Sie anpassen können

- Richtlinie binden/entbinden
- Rollen- oder Tag-basierte Einschränkungen
- Welt-ID-Regeln
- Verhalten bei der Positions-/Rotationsaktualisierung
- staff forms through `@minecraft/server-ui`
- Pakethandler rund um die McApi-Oberfläche

## Aktuelle Einschränkungen

- `Core.McWss` stability depends on command and payload limits

## Empfohlenes Setup: BDS

1. enable `McHttpConfig.Enabled = true`
2. ensure BDS can reach `McHttpConfig.Hostname`
3. copy the `Core.McHttp` package
4. run `voicecraft:vcconnect <hostname> <token>`
5. validate bind with `voicecraft:vcbind <key>`

## Empfohlenes Setup: lokale Welt

1. enable `McWss`
2. install `Core.McWss`
3. run `/connect`
4. run `voicecraft:vcconnect <token>`
5. keep `voicecraft:data_tunnel` aligned with server config

## Lesen Sie weiter

- [Add-on-API](/ecosystem/addon-api)
- [McHttp für BDS](/minecraft/mchttp-bds)
- [McWss für Einzelspieler-Welten](/minecraft/mcwss-singleplayer)
