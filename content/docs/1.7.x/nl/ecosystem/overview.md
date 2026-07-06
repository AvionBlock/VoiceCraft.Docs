# VoiceCraft-ecosysteem

VoiceCraft bestaat uit client, server en Minecraft-integraties.

Spelers gebruiken `VoiceCraft.Client`, backend draait `VoiceCraft.Server`, en Minecraft-integratie stuurt game state naar de server.

## Repositories

| Repository | Rol |
|------------|-----|
| `VoiceCraft` | client, server, protocol, transports |
| `GeyserVoice` / Java bridge | Paper, Geyser/Floodgate, proxy |
| `VoiceCraft.Addon` | Bedrock addons en McApi |

GitLab is de primaire ontwikkelplek. GitHub is public mirror en releaseplek.

## Nieuw in 1.7

- nieuw event/property model
- audio effect processors
- NAT port mapping
- iOS privacy manifest
- browser/web client verwijderd

## Typische stacks

- BDS: `VoiceCraft.Server` + `Core.McHttp`
- lokale Bedrock: `Core.McWss`
- Java/Geyser: Java bridge + `McTcp`

## Verder lezen

- [VoiceCraft repository](/ecosystem/voicecraft-repository)
- [VoiceCraft.Addon](/ecosystem/voicecraft-addon)
- [Addon API](/ecosystem/addon-api)
- [Transport modes](/server/transports)
