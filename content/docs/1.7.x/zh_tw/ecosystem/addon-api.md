# Addon API

`VoiceCraft.Addon` 提供用於自訂 world logic 的 McApi 層。

## 1.7 變更

- events 透過 `EventRequest`
- entity properties 替代 cave/muffle factor packets
- `1.6.x` custom integrations 可能需要遷移

## 重要 packets

- `McApiEventRequestPacket`
- `VcEventRequestPacket`
- `McApiSetEntityPropertyRequestPacket`
- `McApiOnEntityPropertyUpdatedPacket`
- `VcSetPropertyRequestPacket`
- `VcOnEntityPropertyUpdatedPacket`

## Entity properties

Properties 是 entity 上的命名值。型別：`null`、`boolean`、integer types、`float`、`double`。

`null` 會刪除 property。更新會觸發 `OnEntityPropertyUpdated`。

## Effects

1.7 中 effect 使用 per-entity processors，並可讀取 properties。

Bitmasks:

- `1`: Visibility
- `2`: Proximity
- `4`: Proximity Echo
- `8`: Proximity Muffle

## Migration

1. 將 cave/muffle packets 替換為 property packets。
2. 處理 `EventRequest`。
3. 訂閱需要的 events。
4. 至少用兩個玩家測試 effects。
