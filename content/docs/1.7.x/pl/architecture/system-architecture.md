# Architektura systemu

VoiceCraft to stack proximity voice: client, server i Minecraft integration.

## Warstwy

| Warstwa | Rola |
|---------|------|
| `VoiceCraft.Client` | mikrofon, voice packets, playback, lokalne settings |
| `VoiceCraft.Server` | sessions, entities, moderation, effects, transports |
| Minecraft integration | positions i lifecycle z Minecraft |

## Client

Client używa UDP do VoiceCraft server. W `1.7.0` wspierane są natywne desktop/mobile clients; web client usunięto.

## Server

Server zarządza:

- client sessions
- entity state i bind state
- entity properties
- effect bitmasks
- `McHttp`, `McWss`, `McTcp`
- optional NAT port mapping

## Minecraft integration

- `Core.McHttp` dla BDS
- `Core.McWss` dla local worlds
- Java bridges przez `McTcp`

## Audio effects 1.7

Effects tworzą `IAudioEffectProcessor` per entity, cache'ują values i mogą czytać entity properties. Properties zastępują stare cave/muffle factor packets.

## Najpierw skonfiguruj

1. Server i config.
2. Właściwy transport.
3. `AutoOpenPort`.
4. Client do `VoiceCraftConfig.Port`.
5. Transport token.
6. Bind i position updates.
