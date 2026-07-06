# Packet 与 Event Flow

VoiceCraft 有两层：

- voice plane：clients 通过 `VoiceCraft.Server` 发送音频
- Minecraft state plane：addon/plugin 通过 `McHttp`、`McWss` 或 `McTcp` 发送 entities、positions、world IDs、bind、properties、effects

## Flow

1. Server 加载 `ServerProperties.json`。
2. 可选地由 `AutoOpenPort` 打开 NAT mappings。
3. Client 通过 UDP 连接。
4. Minecraft transport 认证。
5. Entities 创建或更新。
6. State 进入 server world model。
7. Event subscriptions 选择 events。
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

旧 cave/muffle factor path 已移除。

## Debug

| Symptom | Check |
|---------|-------|
| Client 无法连接 | UDP endpoint、host、firewall |
| Addon 无法连接 | token、host、port |
| 没有 proximity | bind、PositioningType、position updates |
| Effects 不生效 | properties、subscription、types |
