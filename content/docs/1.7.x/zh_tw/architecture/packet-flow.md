# Packet 與 Event Flow

VoiceCraft 有兩層：

- voice plane：clients 透過 `VoiceCraft.Server` 傳送音訊
- Minecraft state plane：addon/plugin 透過 `McHttp`、`McWss` 或 `McTcp` 傳送 entities、positions、world IDs、bind、properties、effects

## Flow

1. Server 載入 `ServerProperties.json`。
2. 可選地由 `AutoOpenPort` 開啟 NAT mappings。
3. Client 透過 UDP 連線。
4. Minecraft transport 認證。
5. Entities 建立或更新。
6. State 進入 server world model。
7. Event subscriptions 選擇 events。
8. Clients 渲染 voice behavior。

## 1.7 Event model

- `VcEventRequestPacket`
- `McApiEventRequestPacket`

重要 events:

- `OnEntityCreated`
- `OnEntityDestroyed`
- `OnEntityPositionUpdated`
- `OnEntityPropertyUpdated`
- `OnEntityAudioReceived`

## Entity properties

- `VcSetPropertyRequestPacket`
- `VcOnEntityPropertyUpdatedPacket`
- `McApiSetEntityPropertyRequestPacket`
- `McApiOnEntityPropertyUpdatedPacket`

舊 cave/muffle factor path 已移除。

## Debug

| Symptom | Check |
|---------|-------|
| Client 無法連線 | UDP endpoint、host、firewall |
| Addon 無法連線 | token、host、port |
| 沒有 proximity | bind、PositioningType、position updates |
| Effects 不生效 | properties、subscription、types |
