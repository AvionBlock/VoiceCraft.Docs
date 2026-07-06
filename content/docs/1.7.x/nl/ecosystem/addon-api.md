# Addon API

`VoiceCraft.Addon` biedt een McApi-laag voor eigen wereldlogica.

## Wijzigingen in 1.7

- events via `EventRequest`
- entity properties vervangen cave/muffle factor packets
- custom integrations van `1.6.x` moeten mogelijk migreren

## Belangrijke packets

- `McApiEventRequestPacket`
- `VcEventRequestPacket`
- `McApiSetEntityPropertyRequestPacket`
- `McApiOnEntityPropertyUpdatedPacket`
- `VcSetPropertyRequestPacket`
- `VcOnEntityPropertyUpdatedPacket`

## Entity properties

Properties zijn benoemde waarden op een entity. Types: `null`, `boolean`, integer types, `float`, `double`.

`null` verwijdert een property. Updates geven `OnEntityPropertyUpdated`.

## Effecten

Effecten in 1.7 gebruiken processors per entity en kunnen properties lezen.

Bitmasks:

- `1`: Visibility
- `2`: Proximity
- `4`: Proximity Echo
- `8`: Proximity Muffle

## Migratie

1. Vervang cave/muffle packets door property packets.
2. Verwerk `EventRequest`.
3. Abonneer op benodigde events.
4. Test effects met minstens twee spelers.
