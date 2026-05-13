# Pakket- en gebeurtenisstroom

Op deze pagina wordt de conceptuele stroom uitgelegd in plaats van elk pakkettype op te sommen. Het is handig als een installatie gedeeltelijk werkt: de client maakt bijvoorbeeld verbinding maar er wordt geen nabijheidsaudio afgespeeld, of de add-on maakt verbinding maar de binding wordt nooit voltooid.

VoiceCraft heeft twee gerelateerde vlakken:

- stemvlak:
  spelerclients verzenden en ontvangen realtime spraakgegevens via `VoiceCraft.Server`
- Minecraft-staatsvliegtuig:
  Bedrock-add-ons of plug-ins aan Java-zijde verzenden updates van entiteiten, posities, werelden, bindingen en effecten via `McHttp`, `McWss` of `McTcp`

Beide vlakken moeten gezond zijn om de nabijheidsstem correct te laten voelen.

## Stroom op hoog niveau

1. `VoiceCraft.Server` start en laadt `ServerProperties.json`.
2. Een speler opent `VoiceCraft.Client` en maakt verbinding met het UDP-eindpunt van de server.
3. Een Minecraft-transportconsument authenticeert met zijn geconfigureerde token.
4. De Minecraft-kant creëert, ontdekt of updatet entiteiten.
5. Updates voor positie, wereld-ID, zichtbaarheid, dempen/verdoven en effecten vloeien voort in het serverwereldmodel.
6. De server verzendt de status die nodig is voor verbonden clients.
7. Klanten geven het resulterende stemgedrag lokaal weer.

De volgorde kan per topologie enigszins variëren, maar het belangrijke punt is dat clientaanmelding en Minecraft-transportaanmelding afzonderlijke gebeurtenissen zijn. De een kan slagen terwijl de ander nog steeds kapot is.

## Typische evenementencategorieën

- inloggen / uitloggen
- pingen/info
- entiteit creëren / vernietigen
- metadata-updates
- moderatie-updates
- effect-updates
- gebeurtenissen voor audio-overdracht

## Bind stroom

Bindflow koppelt een Minecraft-speler of -entiteit aan een clientidentiteit aan VoiceCraft-zijde.

Typische bodemstroming:

1. De add-on maakt verbinding met `McHttp` of `McWss`.
2. De speler voert het in-game bindcommando uit of ontvangt het.
3. De add-on verzendt bindingsgerelateerde gegevens naar VoiceCraft.
4. VoiceCraft koppelt de stemclient aan de in-game entiteit.
5. Positie- en wereldupdates beginnen te beïnvloeden wat de cliënt hoort.

Typische Java-/geiserstroom:

1. `GeyserVoice` maakt verbinding met `McTcp`.
2. De plug-in volgt de levenscyclus en positie van de Java-speler.
3. De speler gebruikt de geconfigureerde spraakbindopdracht.
4. `GeyserVoice` verzendt de bind-/updategegevens naar VoiceCraft.

Als de binding mislukt, controleer dan eerst de tokenmatch en de bereikbaarheid van het transport en controleer vervolgens of de speler een actieve VoiceCraft-clientsessie heeft.

## Foutopsporing per laag

| Symptoom | Laag om eerst te controleren | Typische oorzaak |
|---------|----------------------|---------------|
| Klant kan geen verbinding maken | Stem vlak | Verkeerde serverhost, UDP-poort gesloten, server draait niet |
| Add-on/plug-in kan geen verbinding maken | Minecraft staatsvliegtuig | Verkeerd transporttoken, verkeerde binding, geblokkeerd TCP/HTTP/WebSocket-pad |
| Client maakt verbinding, maar hoort geen nabijheid | Entiteit/positiestatus | Bind ontbreekt, `PositioningType` komt niet overeen, geen positie-updates |
| Audio bestaat, maar bereik/effecten voelen verkeerd aan | Effecten/statussynchronisatie | Verkeerd effect-bitmasker, verouderde metadata van de entiteit, niet-overeenkomende clientinstellingen |

## Waarom dit ertoe doet

Bij het debuggen helpt het om te weten of uw probleem:

- authenticatie
- bereikbaarheid van vervoer
- entiteit creatie
- vereniging binden
- metadata en positiesynchronisatie
- audio-opname/weergave

De meeste echte mislukkingen gebeuren omdat een van die lagen kapot is terwijl de andere er nog steeds gezond uitzien.
