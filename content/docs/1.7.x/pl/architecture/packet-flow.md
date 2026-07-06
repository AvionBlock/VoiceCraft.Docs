# Przepływ pakietów i eventów

VoiceCraft ma dwie płaszczyzny:

- voice plane: klienci wysyłają audio przez `VoiceCraft.Server`
- Minecraft state plane: addon/plugin wysyła entities, positions, world IDs, bind, properties i effects przez `McHttp`, `McWss` albo `McTcp`

## Flow

1. Server ładuje `ServerProperties.json`.
2. Opcjonalnie `AutoOpenPort` otwiera NAT mappings.
3. Client łączy się UDP.
4. Minecraft transport przechodzi auth.
5. Entities są tworzone lub aktualizowane.
6. State trafia do server world model.
7. Event subscriptions wybierają eventy.
8. Clients renderują voice behavior.

## Event model 1.7

- `VcEventRequestPacket`
- `McApiEventRequestPacket`

Ważne events:

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

Stary cave/muffle factor path usunięto.

## Debug

| Symptom | Sprawdź |
|---------|---------|
| Client nie łączy | UDP endpoint, host, firewall |
| Addon nie łączy | token, host, port |
| Brak proximity | bind, PositioningType, position updates |
| Effects nie reagują | properties, subscription, typy |
