# Поток пакетов и событий

Эта страница объясняет концептуальный flow, а не перечисляет все packet types. Она полезна, когда setup частично работает: client подключается, но proximity audio нет, или addon подключился, но bind не завершается.

У VoiceCraft две связанные плоскости:

- voice plane:
  player clients отправляют и получают realtime voice data через `VoiceCraft.Server`
- Minecraft state plane:
  Bedrock addons или Java-side plugins отправляют entity, position, world, bind, property и effect updates через `McHttp`, `McWss` или `McTcp`

Обе плоскости должны быть здоровы, чтобы proximity voice работал корректно.

## High-level flow

1. `VoiceCraft.Server` стартует и читает `ServerProperties.json`.
2. Optional NAT port mappings открываются для endpoints с `AutoOpenPort = true`.
3. Player открывает `VoiceCraft.Client` и подключается к UDP endpoint.
4. Minecraft transport consumer проходит auth по token.
5. Minecraft-side создаёт или обновляет entities.
6. Position, world ID, visibility, mute/deafen, bitmask и property updates попадают в server world model.
7. Event subscriptions определяют, какие event categories пересылаются.
8. Server отправляет нужный state connected clients.
9. Clients локально рендерят voice behavior.

Client login и Minecraft transport login — отдельные события. Одно может работать, пока второе сломано.

## Event model 1.7

VoiceCraft `1.7.0` оборачивает low-level events в event request packets:

- `VcEventRequestPacket`
- `McApiEventRequestPacket`

Wrapped event содержит `EventType`, например:

- `OnEntityCreated`
- `OnEntityDestroyed`
- `OnEntityPositionUpdated`
- `OnEntityRotationUpdated`
- `OnEntityPropertyUpdated`
- `OnEntityAudioReceived`
- `OnEntityAudioDataReceived`

Это отделяет event delivery от ordinary request/response packets и позволяет integrations подписываться на нужные events.

## Entity properties

Entity properties — named values на entity. Они используются для custom metadata и effect overrides.

Property packets:

- `VcSetPropertyRequestPacket`
- `VcOnEntityPropertyUpdatedPacket`
- `McApiSetEntityPropertyRequestPacket`
- `McApiOnEntityPropertyUpdatedPacket`

Поддерживаемые value types: `null`, booleans, integer widths, `float`, `double`.

Старый cave/muffle factor packet path удалён. Debug custom effect behavior начинайте с проверки property updates, потом effect processing.

## Bind flow

Bind flow связывает Minecraft player/entity с VoiceCraft-side client identity.

Typical Bedrock flow:

1. Addon подключается к `McHttp` или `McWss`.
2. Player выполняет in-game bind command.
3. Addon отправляет bind data в VoiceCraft.
4. VoiceCraft связывает voice client с in-game entity.
5. Position, world, bitmask и property updates начинают влиять на то, что client слышит.

Typical Java/Geyser flow:

1. Java-side bridge подключается к `McTcp`.
2. Plugin отслеживает player lifecycle и position.
3. Player использует configured voice bind command.
4. Bridge отправляет bind/update data в VoiceCraft.

Если bind не работает, сначала проверяйте token match и transport reachability, затем active VoiceCraft client session.

## Debug by layer

| Симптом | Что проверить первым | Типичная причина |
|---------|----------------------|------------------|
| Client не подключается | Voice plane | неверный host, UDP port закрыт, server не запущен |
| Addon/plugin не подключается | Minecraft state plane | неверный token, wrong binding, blocked TCP/HTTP/WebSocket path |
| Client подключается, но proximity нет | Entity/position state | нет bind, `PositioningType` mismatch, нет position updates |
| Effect overrides не работают | Property/event state | integration шлёт старые cave/muffle packets, нет event subscription, wrong property key/type |
| Audio есть, но range/effects неправильные | Effects/state sync | wrong effect bitmask, stale entity metadata, mismatched client settings |

## Почему это важно

При debugging нужно понимать, где проблема:

- authentication
- transport reachability
- entity creation
- bind association
- metadata, properties и position sync
- audio capture/playback

Чаще всего ломается один слой, пока остальные выглядят рабочими.
