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
- `voicecraft:vcconnect <token>`
- `voicecraft:data_tunnel [max_string_length] [data]`

## Validation

- właściwy transport package
- behavior/resource packs aktywne
- token pasuje do server config
- `vcbind` działa
- movement aktualizuje pozycję
- properties działają przy 1.7 effect overrides
