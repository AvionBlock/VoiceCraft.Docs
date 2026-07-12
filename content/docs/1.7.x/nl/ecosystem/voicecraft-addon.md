# VoiceCraft.Addon (Bedrock Addon)

Repository: [AvionBlock/VoiceCraft.Addon](https://github.com/AvionBlock/VoiceCraft.Addon)

De addon verbindt Bedrock-werelden met VoiceCraft via `McHttp` of `McWss` en biedt bind flow, UI, events en packet helpers.

## Pakketten

| Pakket | Doel |
|--------|------|
| `Basic` | bind flow, settings UI, voice indicators |
| `Core.McHttp` | HTTP transport voor BDS |
| `Core.McWss` | WebSocket/command tunnel voor lokale werelden |

## 1.7 voor addon developers

- low-level events via `EventRequest`
- entity properties voor custom effect values
- cave/muffle factor packets verwijderd
- `OnEntityPropertyUpdated` voor property changes

## Commands

- `voicecraft:vcbind <binding_key>`
- `voicecraft:vcsettings`
- `voicecraft:vcconnect <hostname> <token>`
- `voicecraft:vcconnect_raw <ip> <port> <token>`
- `voicecraft:vcconnect <token>`
- `voicecraft:data_tunnel [max_string_length] [data]`

## `vcconnect_raw`

`voicecraft:vcconnect_raw` is de low-level command voor auto-connect. Deze gebruikt host/IP, poort en token apart:

```text
/voicecraft:vcconnect_raw "<IP_OR_HOST>" <PORT> "<LOGIN_TOKEN>"
```

Voor `Core.McHttp` bouwt dit `http://<ip>:<port>`. Voor `Core.McWss` gaan host, poort en token direct naar het WebSocket-transport. Het `Basic`-pakket gebruikt dit met `autoConnect:ip`, `autoConnect:port` en `autoConnect:loginKey`.

## Validatie

- juist transport package
- behavior/resource packs actief
- token past bij server config
- `vcbind` werkt
- movement update positie
- properties werken bij 1.7 effect overrides
