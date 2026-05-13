# Positioneringsmodel

VoiceCraft ondersteunt zowel server- als client-side positioneringsmodellen.

Positionering bepaalt wie de locatiegegevens levert waarvan nabijheidsaudio afhankelijk is. Als de verkeerde modus is geselecteerd, kunnen cliënten succesvol verbinding maken, maar nog steeds de verkeerde mensen horen, niemand horen of afstandswijzigingen negeren.

## `PositioningType`

- `0 = Server`
- `1 = Client`

Deze waarde moet op één lijn liggen tussen de server en de client.

Stel de serverwaarde in:

```text
VoiceCraftConfig.PositioningType
```

Stel de clientwaarde in de clientnetwerkinstellingen in of `Settings.json`.

## Positionering aan de serverzijde

Beste wanneer:

- de server- of integratielaag kan een gezaghebbende wereldstaat bieden
- je wilt meer gecentraliseerd gedrag
- je voert BDS uit met `McHttp`
- je voert Java/Geyser uit met `GeyserVoice`
- u wilt dat personeels-/moderatietools redeneren over de status van de entiteit die eigendom is van de server

In dit model stuurt de integratie aan Minecraft-zijde positie- en wereldupdates naar `VoiceCraft.Server`. De client ontvangt voldoende status om nabijheidsaudio lokaal weer te geven.

Gebruik dit als standaard voor productie-implementaties.

## Positionering aan de klantzijde

Beste wanneer:

- de omgeving is beperkt
- wereldintegratie aan de serverzijde is beperkt
- Sommige hostingbeperkingen blokkeren normale integratiepaden

In dit model wordt van de cliënt verwacht dat hij meer van zijn eigen positioneringscontext aanlevert of ontleent. Het is handig voor beperkte of experimentele omgevingen, maar het is gemakkelijker om het verkeerd te configureren omdat elke client akkoord moet gaan met de serverinstelling.

Gebruik dit alleen als u weet waarom positionering op de server niet praktisch is voor de doelopstelling.

## Een modus kiezen

| Installatie | Aanbevolen modus | Reden |
|-------|------------------|--------|
| Bedrock Dedicated Server + `McHttp` | `0 = Server` | BDS-add-on kan een gezaghebbende wereldstaat rapporteren |
| Lokale gesteentewereld + `McWss` | Meestal `0 = Server` | Addon kan nog steeds de status door de tunnel sturen |
| Java + Geiser/Sluizen + `GeyserVoice` | `0 = Server` | De plug-in houdt de levenscyclus en positie van de speler bij |
| Experimentele, alleen lokale configuratie | Hangt ervan af | Gebruik alleen client-side als de integratie geen status kan bieden |

## Waarom mismatches de audioverwachtingen overtreden

Als de client en server het niet eens zijn over de positioneringsmodus, kunt u symptomen zien zoals:

- spraakclients maken verbinding, maar horen de verwachte nabijheid niet
- entiteiten lijken aanwezig, maar gedragen zich vreemd
- Integratie lijkt deels gezond, terwijl de positionele logica verkeerd is

## Validatie stappen

1. Controleer `VoiceCraftConfig.PositioningType` in `ServerProperties.json`.
2. Controleer de clientnetwerkinstellingen.
3. Start de client opnieuw op nadat u de lokale waarde hebt gewijzigd.
4. Sluit het Minecraft-transport opnieuw aan.
5. Verplaats een speler in het spel en bevestig dat het gedrag van de server/client verandert met de afstand.

Als de installatie nog steeds mislukt, debugt u vervolgens de bindingsstroom. Een correcte positioneringsmodus kan niet helpen als de spraaksessie niet gebonden is aan de in-game entiteit.
