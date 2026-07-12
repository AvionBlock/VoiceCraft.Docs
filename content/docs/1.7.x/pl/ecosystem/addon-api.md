# Addon API

`VoiceCraft.Addon` udostępnia McApi dla własnej logiki świata.

## Zmiany 1.7

- events są przeniesione przez `EventRequest`
- entity properties zastępują cave/muffle factor packets
- custom integrations z `1.6.x` mogą wymagać migracji

## Ważne pakiety

- `McApiEventRequestPacket`
- `VcEventRequestPacket`
- `McApiSetEntityPropertyRequestPacket`
- `McApiOnEntityPropertyUpdatedPacket`
- `VcSetPropertyRequestPacket`
- `VcOnEntityPropertyUpdatedPacket`

## Entity properties

Properties to nazwane wartości na encji. Typy: `null`, `boolean`, integer types, `float`, `double`.

`null` usuwa property. Zmiany emitują `OnEntityPropertyUpdated`.

## Efekty

Efekty w 1.7 używają procesorów per entity i mogą czytać properties.

Bitmasks:

- `1`: Visibility
- `2`: Proximity
- `4`: Proximity Echo
- `8`: Proximity Muffle

## Migracja

1. Zamień cave/muffle packets na property packets.
2. Obsłuż `EventRequest`.
3. Subskrybuj potrzebne events.
4. Testuj effects z co najmniej dwoma graczami.
