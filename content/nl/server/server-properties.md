# ServerProperties.json

Main server config file: `config/ServerProperties.json`.

## Volledig voorbeeld

```json
{
  "TelemetryEnabled": true,
  "TelemetryToken": "replace-with-stable-random-token",
  "VoiceCraftConfig": {
    "Language": "en-US",
    "Port": 9050,
    "MaxClients": 100,
    "Motd": "VoiceCraft Proximity Chat!",
    "PositioningType": 0,
    "EnableVisibilityDisplay": true
  },
  "McWssConfig": {
    "Enabled": false,
    "LoginToken": "replace-with-secure-guid",
    "Hostname": "ws://127.0.0.1:9051/",
    "MaxClients": 1,
    "MaxTimeoutMs": 10000,
    "DataTunnelCommand": "voicecraft:data_tunnel",
    "CommandsPerTick": 3,
    "MaxByteLengthPerCommand": 300,
    "DisabledPacketTypes": []
  },
  "McHttpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-secure-guid",
    "Hostname": "http://127.0.0.1:9050/",
    "MaxClients": 1,
    "MaxTimeoutMs": 10000,
    "DisabledPacketTypes": []
  },
  "McTcpConfig": {
    "Enabled": false,
    "LoginToken": "replace-with-secure-guid",
    "Hostname": "127.0.0.1",
    "Port": 9050,
    "MaxClients": 1,
    "MaxTimeoutMs": 10000,
    "DisabledPacketTypes": []
  },
  "DefaultAudioEffectsConfig": {
    "1": { "EffectType": 1 },
    "2": { "WetDry": 1, "MinRange": 0, "MaxRange": 30, "EffectType": 2 },
    "4": { "WetDry": 1, "Delay": 0.5, "Range": 30, "EffectType": 4 },
    "8": { "WetDry": 1, "EffectType": 6 }
  }
}
```

## Telemetrie

- `TelemetryEnabled`:
  enables anonymous startup, heartbeat, and crash diagnostics from `VoiceCraft.Server`.
- `TelemetryToken`:
  stabiele pseudonieme vingerafdruk die wordt gebruikt om telemetriegebeurtenissen van één serverinstallatie te groeperen.

Als u geen telemetrie wilt, stelt u het volgende in:

```json
{
  "TelemetryEnabled": false
}
```

## VoiceCraftConfig

- `Language`:
  serverlogtaal.
- `Port`:
  UDP-poort voor de kern VoiceCraft-server.
- `MaxClients`:
  maximale VoiceCraft-clientverbindingen.
- `Motd`:
  tekst geretourneerd door ping / info-reacties.
- `PositioningType`:
  positioneringsmodus:
  - `0 = Server`
  - `1 = Client`
- `EnableVisibilityDisplay`:
  of zichtbaarheidsindicatoren naar klanten worden verzonden.

## McWssConfig

Gebruikt voor websocket/commandotunnel Bedrock-stromen.

- `Enabled`:
  McWss in- of uitschakelen.
- `LoginToken`:
  shared auth token, typically used with `/voicecraft:vcconnect <token>`.
- `Hostname`:
  websocket host such as `ws://0.0.0.0:9051/`.
- `MaxClients`:
  maximale McWss-klanten.
- `MaxTimeoutMs`:
  time-out bij inactiviteit.
- `DataTunnelCommand`:
  command name used for the data tunnel, usually `voicecraft:data_tunnel`.
- `CommandsPerTick`:
  hoeveel opdrachtpakketten er per tik worden doorgestuurd.
- `MaxByteLengthPerCommand`:
  payloadbudget (bytes) per opdrachtaanroep.
- `DisabledPacketTypes`:
  pakkettypen geblokkeerd op dit transport.

## McHttpConfig

Gebruikt voor Bedrock Dedicated Server en HTTP-gebaseerde integraties.

- `Enabled`
- `LoginToken`
- `Hostname`
- `MaxClients`
- `MaxTimeoutMs`
- `DisabledPacketTypes`

Typische BDS-binding:

```json
{
  "Enabled": true,
  "LoginToken": "replace-with-token",
  "Hostname": "http://0.0.0.0:9050/",
  "MaxClients": 10,
  "MaxTimeoutMs": 10000,
  "DisabledPacketTypes": []
}
```

## McTcpConfig

Used by Java-side bridges, especially `GeyserVoice`.

- `Enabled`:
  McTcp in- of uitschakelen.
- `LoginToken`:
  gedeeld authentificatietoken voor de TCP-bridge.
- `Hostname`:
  bind hostname, for example `127.0.0.1` or `0.0.0.0`.
- `Port`:
  TCP-luisterpoort.
- `MaxClients`:
  maximale transportklanten.
- `MaxTimeoutMs`:
  time-out bij inactiviteit.
- `DisabledPacketTypes`:
  pakkettypen geblokkeerd op dit transport.

Important differences compared to `McHttp` / `McWss`:

- `Hostname` is a plain host, not a URI
- `Port` is a separate field
- this is the transport most relevant to `GeyserVoice`

## StandaardAudioEffectsConfig

Dictionary key is a `ushort` bitmask, value is an effect JSON object.

Standaardmatrix:

- `1`:
  `Visibility`
- `2`:
  `Proximity`
- `4`:
  `ProximityEcho`
- `8`:
  `ProximityMuffle`

U kunt het woordenboek overschrijven of uitbreiden om het standaardeffectgedrag voor nieuwe entiteiten te wijzigen.

## Uitgeschakelde pakkettypen

Each transport supports `DisabledPacketTypes`.

Gebruik dit zorgvuldig:

- het is bedoeld voor foutopsporing, compatibiliteitsexperimenten of het beperken van noodsituaties
- het uitschakelen van kernpakketten kan het inloggen, de entiteitssynchronisatie of de audiolevering verbreken
- verander dit niet in de productie, tenzij u de pakketstroom begrijpt

## Praktische productiepatronen

### Bedrock speciale server

- `McHttpConfig.Enabled = true`
- `McWssConfig.Enabled = false`
- `McTcpConfig.Enabled = false` unless you also run Java-side bridges

### Lokale wereld / singleplayer

- `McWssConfig.Enabled = true`
- `McHttpConfig.Enabled = false` or optional

### GeyserVoice / Java-brug

- `McTcpConfig.Enabled = true`
- `McHttpConfig.Enabled = false` or optional
- `McWssConfig.Enabled = false` unless also needed elsewhere

## Belangrijke opmerkingen

- always replace generated `LoginToken` values
- with `Hostname: http://0.0.0.0:9050/`, the HTTP listener binds to a wildcard address
- with `McTcpConfig.Hostname = 0.0.0.0`, the TCP bridge becomes remotely reachable
- keep `PositioningType` aligned with the client configuration

Zie ook:

- [Runtime-overschrijvingen] (/server/runtime-overrides)
- [Transportmodi](/server/transports)
