# Ekosystem VoiceCraft

VoiceCraft to client, server i integracje Minecraft współpracujące jako jeden stack.

Gracze używają `VoiceCraft.Client`, backend uruchamia `VoiceCraft.Server`, a integracja Minecraft wysyła state do serwera.

## Repositories

| Repository | Rola |
|------------|------|
| `VoiceCraft` | client, server, protocol, transports |
| `VoiceCraft.Java` / Java bridge | Paper, Geyser/Floodgate, proxy |
| `VoiceCraft.Addon` | Bedrock addons i McApi |

Główne development repo jest na GitLab. GitHub jest public mirror i miejscem release.

## Nowości 1.7

- nowy event/property model
- audio effect processors
- NAT port mapping
- iOS privacy manifest
- usunięty browser/web client

## Typowe stosy

- BDS: `VoiceCraft.Server` + `Core.McHttp`
- lokalny Bedrock: `Core.McWss`
- Java/Geyser: Java bridge + `McTcp`

## Dalej

- [VoiceCraft repository](/ecosystem/voicecraft-repository)
- [VoiceCraft.Addon](/ecosystem/voicecraft-addon)
- [Addon API](/ecosystem/addon-api)
- [Transport modes](/server/transports)
