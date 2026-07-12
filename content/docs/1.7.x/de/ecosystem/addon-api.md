# Addon API

`VoiceCraft.Addon` bietet eine scriptgesteuerte McApi-Schicht für eigene Weltlogik.

## Änderungen in 1.7

- Events werden in `EventRequest`-Paketen übertragen.
- Entity-Properties ersetzen Cave/Muffle-Factor-Pakete.
- Custom Integrationen für `1.6.x` müssen eventuell migriert werden.

## Wichtige Pakete

- `McApiEventRequestPacket`
- `VcEventRequestPacket`
- `McApiSetEntityPropertyRequestPacket`
- `McApiOnEntityPropertyUpdatedPacket`
- `VcSetPropertyRequestPacket`
- `VcOnEntityPropertyUpdatedPacket`

Entfernt oder ersetzt:

- Cave-Factor-Pakete
- Muffle-Factor-Pakete

## Entity-Properties

Properties sind benannte Werte auf einer Entity. Unterstützt werden `null`, `boolean`, Integer-Typen, `float` und `double`.

`null` entfernt eine Property. Änderungen erzeugen `OnEntityPropertyUpdated`.

## Effektanpassung

Der 1.7 Effekt-Stack nutzt Prozessoren pro Entity. Effekte können Properties lesen und unterstützte Werte clampen.

Default-Bitmasks:

- `1`: Visibility
- `2`: Proximity
- `4`: Proximity Echo
- `8`: Proximity Muffle

## Migration

1. Cave/Muffle-Pakete durch Property-Pakete ersetzen.
2. `EventRequest` beim Lesen von Events berücksichtigen.
3. Benötigte Events abonnieren.
4. Effekte mit mindestens zwei Spielern testen.
