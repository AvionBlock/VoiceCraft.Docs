# Packet- en event-flow

VoiceCraft heeft twee lagen:

- voice plane: clients sturen audio via `VoiceCraft.Server`
- Minecraft state plane: addon/plugin stuurt entities, positions, world IDs, bind, properties en effects via `McHttp`, `McWss` of `McTcp`

## Flow

1. Server laadt `ServerProperties.json`.
2. Optioneel opent `AutoOpenPort` NAT mappings.
3. Client verbindt via UDP.
4. Minecraft transport authenticeert.
5. Entities worden gemaakt of bijgewerkt.
6. State gaat naar server world model.
7. Event subscriptions kiezen events.
8. Clients renderen voice behavior.

## Event model 1.7

- `VcEventRequestPacket`
- `McApiEventRequestPacket`

Belangrijke events:

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

Het oude cave/muffle factor path is verwijderd.

## Debug

| Symptom | Controleer |
|---------|------------|
| Client verbindt niet | UDP endpoint, host, firewall |
| Addon verbindt niet | token, host, port |
| Geen proximity | bind, PositioningType, position updates |
| Effects reageren niet | properties, subscription, types |
