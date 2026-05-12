# Positioneringsmodel

VoiceCraft ondersteunt zowel server- als client-side positioneringsmodellen.

## `PositioningType`

- `0 = Server`
- `1 = Client`

Deze waarde moet op één lijn liggen tussen de server en de client.

## Positionering aan de serverzijde

Beste wanneer:

- de server- of integratielaag kan een gezaghebbende wereldstaat bieden
- je wilt meer gecentraliseerd gedrag

## Positionering aan de klantzijde

Beste wanneer:

- de omgeving is beperkt
- wereldintegratie aan de serverzijde is beperkt
- sommige hostingbeperkingen blokkeren normale integratiepaden

## Waarom mismatches de verwachtingen van audio overtreden

Als de client en server het niet eens zijn over de positioneringsmodus, kunt u symptomen zien zoals:

- Spraakclients maken verbinding, maar horen de verwachte nabijheid niet
- entiteiten lijken aanwezig maar gedragen zich vreemd
- Integratie lijkt deels gezond, terwijl de positionele logica verkeerd is
