# Systeemarchitectuur

VoiceCraft is een proximity voice stack: client, server en Minecraft-integratie.

## Lagen

| Laag | Rol |
|------|-----|
| `VoiceCraft.Client` | microfoon, voice packets, playback, lokale settings |
| `VoiceCraft.Server` | sessions, entities, moderation, effects, transports |
| Minecraft integration | positions en lifecycle uit Minecraft |

## Client

De client gebruikt UDP naar de VoiceCraft server. In `1.7.0` zijn native desktop/mobile clients ondersteund; web client is verwijderd.

## Server

De server beheert:

- client sessions
- entity state en bind state
- entity properties
- effect bitmasks
- `McHttp`, `McWss`, `McTcp`
- optional NAT port mapping

## Minecraft integration

- `Core.McHttp` voor BDS
- `Core.McWss` voor lokale werelden
- Java bridges via `McTcp`

## Audio effects 1.7

Effects maken `IAudioEffectProcessor` per entity, cachen values en kunnen entity properties lezen. Properties vervangen oude cave/muffle factor packets.

## Eerst configureren

1. Server en config.
2. Juiste transport.
3. `AutoOpenPort`.
4. Client naar `VoiceCraftConfig.Port`.
5. Transport token.
6. Bind en position updates.
