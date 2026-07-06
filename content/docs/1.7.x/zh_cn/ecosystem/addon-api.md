# Addon API

`VoiceCraft.Addon` 提供用于自定义 world logic 的 McApi 层。

## 1.7 变更

- events 通过 `EventRequest`
- entity properties 替代 cave/muffle factor packets
- `1.6.x` custom integrations 可能需要迁移

## 重要 packets

- `McApiEventRequestPacket`
- `VcEventRequestPacket`
- `McApiSetEntityPropertyRequestPacket`
- `McApiOnEntityPropertyUpdatedPacket`
- `VcSetPropertyRequestPacket`
- `VcOnEntityPropertyUpdatedPacket`

## Entity properties

Properties 是 entity 上的命名值。类型：`null`、`boolean`、integer types、`float`、`double`。

`null` 会删除 property。更新会触发 `OnEntityPropertyUpdated`。

## Effects

1.7 中 effect 使用 per-entity processors，并可读取 properties。

Bitmasks:

- `1`: Visibility
- `2`: Proximity
- `4`: Proximity Echo
- `8`: Proximity Muffle

## Migration

1. 将 cave/muffle packets 替换为 property packets。
2. 处理 `EventRequest`。
3. 订阅需要的 events。
4. 至少用两个玩家测试 effects。
