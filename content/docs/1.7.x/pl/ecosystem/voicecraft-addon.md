# VoiceCraft.Addon (Bedrock Addon)

Repository: [AvionBlock/VoiceCraft.Addon](https://github.com/AvionBlock/VoiceCraft.Addon)

Addon łączy światy Bedrock z VoiceCraft przez `McHttp` albo `McWss` i daje bind flow, UI, events oraz packet helpers.

## Pakiety

| Pakiet | Cel |
|--------|-----|
| `Basic` | bind flow, settings UI, voice indicators |
| `Core.McHttp` | HTTP transport dla BDS |
| `Core.McWss` | WebSocket/command tunnel dla local worlds |

## 1.7 dla addon developers

- low-level events idą przez `EventRequest`
- entity properties są ścieżką dla custom effect values
- cave/muffle factor packets usunięto
- `OnEntityPropertyUpdated` zgłasza property changes

## Commands

- `voicecraft:vcbind <binding_key>`
- `voicecraft:vcsettings`
- `voicecraft:vcconnect <hostname> <token>`
- `voicecraft:vcconnect_raw <ip> <port> <token>`
- `voicecraft:vcconnect <token>`
- `voicecraft:data_tunnel [max_string_length] [data]`

## `vcconnect_raw`

`voicecraft:vcconnect_raw` to low-level command dla auto-connect. Przyjmuje host/IP, port i token osobno:

```text
/voicecraft:vcconnect_raw "<IP_OR_HOST>" <PORT> "<LOGIN_TOKEN>"
```

Dla `Core.McHttp` buduje `http://<ip>:<port>`. Dla `Core.McWss` przekazuje host, port i token do transportu WebSocket. Pakiet `Basic` używa tego z `autoConnect:ip`, `autoConnect:port` i `autoConnect:loginKey`.

## Validation

- właściwy transport package
- behavior/resource packs aktywne
- token pasuje do server config
- `vcbind` działa
- movement aktualizuje pozycję
- properties działają przy 1.7 effect overrides
