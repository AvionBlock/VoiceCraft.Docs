# Системная архитектура

VoiceCraft — proximity voice stack, а не один Minecraft mod. Client передаёт microphone audio, server владеет voice sessions и shared state, а Minecraft integration сообщает server, где находятся players и как они должны быть представлены.

Разделение намеренное: один voice server может работать с Bedrock Dedicated Server, local Bedrock worlds, direct Paper servers и proxy networks, если подключён правильный Minecraft-facing transport.

## Основные слои

| Layer | Ответственность | Где установлен |
|-------|-----------------|----------------|
| `VoiceCraft.Client` | microphone input, voice packets, playback nearby voices, local audio preferences | устройство игрока |
| `VoiceCraft.Server` | voice clients, entity state, moderation flags, audio effect defaults, Minecraft transports | VPS, game host, local PC, hosted dashboard runtime или plugin-managed runtime |
| Minecraft integration | отправляет player/entity position и lifecycle data в VoiceCraft | Bedrock addon, Paper plugin, proxy plugin |

## Client layer

`VoiceCraft.Client` отвечает за:

- microphone capture и preprocessing
- push-to-talk, mute, deafen, input/output device selection
- UDP connection к `VoiceCraft.Server`
- playback nearby voices по server state
- local per-user volume и local mute preferences

В `1.7.0` поддерживаемый путь — native desktop/mobile clients. Browser/web client project удалён.

## Server layer

`VoiceCraft.Server` отвечает за:

- VoiceCraft UDP client sessions
- network entity state и bind state
- server-side moderation flags
- entity properties
- effect bitmasks и audio effect defaults
- per-entity audio effect processors
- Minecraft-facing transports: `McHttp`, `McWss`, `McTcp`
- optional NAT port mapping
- persistent config в `config/ServerProperties.json`

Если client подключается, но Minecraft нет, игроки могут быть voice sessions без полезного world position data.

## Minecraft integration layer

Зависит от topology:

- `VoiceCraft.Addon.Core.McHttp` для Bedrock Dedicated Server
- `VoiceCraft.Addon.Core.McWss` для local Bedrock worlds и command tunnel
- Java-side bridge integrations для Paper, Geyser/Floodgate, Velocity, BungeeCord через `McTcp`

Integration layer переводит game events в VoiceCraft state: joins, leaves, position updates, world identifiers, bind requests, fake entities, effect changes, property changes и connection lifecycle.

## Core data concepts

VoiceCraft строится вокруг entities, а не только raw sockets.

Entities несут:

- name
- title
- description
- position
- rotation
- world ID
- mute / deafen state
- effect bitmasks
- custom properties

Network clients могут быть представлены entities, и Minecraft integrations тоже могут создавать/обновлять entities. Это позволяет описывать real players, fake/display entities и custom world-driven voice targets через один state pipeline.

## Audio effects in 1.7

Audio effect stack переписан в `1.7.0`.

Effects теперь:

- хранят configured bitmask
- создают `IAudioEffectProcessor` instances для entities
- cache'ят values перед audio processing
- могут читать supported entity property overrides

Поэтому cave/muffle factor packets заменены property model. Server хранит custom world state на entity, а active effect решает, как его интерпретировать.

## Почему transports отдельные

Voice traffic и Minecraft automation часто живут в разных окружениях.

Поэтому:

- player client говорит с core UDP voice server
- Bedrock или Java integration говорит через Minecraft transport
- каждый transport имеет свой token, host binding, max clients и optional port mapping behavior

Это позволяет менять Minecraft integration, не меняя voice server.

## Typical connection shapes

### Bedrock Dedicated Server

```text
VoiceCraft.Client -> VoiceCraft UDP server
BDS + VoiceCraft.Addon.Core.McHttp -> McHttp endpoint
```

### Local Bedrock world

```text
VoiceCraft.Client -> VoiceCraft UDP server
Minecraft local world + Core.McWss -> McWss websocket endpoint
```

### Java + Geyser/Floodgate

```text
VoiceCraft.Client -> VoiceCraft UDP server
Java-side bridge -> McTcp endpoint
```

## Что настроить первым

1. Настройте `VoiceCraft.Server` и убедитесь, что он стартует cleanly.
2. Выберите Minecraft transport под topology.
3. Решите, должен ли `AutoOpenPort` остаться выключенным.
4. Убедитесь, что client подключается к `VoiceCraftConfig.Port`.
5. Убедитесь, что Minecraft integration auth проходит по matching transport token.
6. Проверьте bind flow и position updates до custom properties/effect overrides.
