# Overzicht

VoiceCraft is een platform voor proximity voice in Minecraft Bedrock Edition en gerelateerde bridge-scenario's.

Spelers kunnen een aparte stemclient gebruiken, terwijl de Minecraft-automatisering de stemserver vertelt waar elke speler zich bevindt, in welke wereld hij of zij zich bevindt en welke effecten of zichtbaarheidsregels van toepassing moeten zijn.

VoiceCraft is handig wanneer u proximity voice nodig hebt zonder vast te zitten aan één specifieke Minecraft-servertopologie. Dezelfde core-runtime kan worden gecombineerd met Bedrock-add-ons, Java/Geyser-bridges of proxy-implementaties.

## Wat je aan het opzetten bent

De meeste implementaties bestaan uit drie onderdelen:

1. `VoiceCraft.Client`
   desktop- en mobiele app geïnstalleerd door elke speler
2. `VoiceCraft.Server`
   zelfstandige backend voor spraakverkeer, statussynchronisatie, moderatie en transporteindpunten
3. Minecraft-transporten
   `McHttp`, `McWss` en `McTcp`

Ecosysteemintegraties verbinden Minecraft met deze transporten:

- `VoiceCraft.Addon` voor Bedrock-werelden en BDS
- `VoiceCraft.Java` voor Java / Geyser / proxystacks

## Hoe het werkt

1. De client maakt verbinding met `VoiceCraft.Server` via UDP.
2. De server houdt spraaksessies, entiteiten, posities, wereld-ID's, effect-bitmaskers en moderatiestatus bij.
3. Een integratie aan de Minecraft-zijde werkt de server bij met de gameplay-status:
   - `McHttp` voor BDS
   - `McWss` voor lokale Bedrock-werelden
   - `McTcp` voor `VoiceCraft.Java`
4. De client speelt proximity-audio af op basis van de serverstatus en geselecteerde lokale instellingen.

De spraakverbinding en de Minecraft-transportverbinding zijn gescheiden. Als slechts één kant is aangesloten, kan de setup gedeeltelijk werken, maar blijft het proximity-gedrag onvolledig.

## Ondersteunde clientplatforms

- Windows (`x86`, `x64`, `arm64`)
- Linux (`x64`, `arm32`, `arm64`)
- macOS (`x64`, `arm64`)
- Android (`arm64`)
- iOS (`arm64`, `.zip`)

## Wat VoiceCraft flexibel maakt

- meerdere Minecraft-transporten
- Bedrock add-on API-oppervlak
- Brug aan Java-zijde via `VoiceCraft.Java`
- configureerbare effecten en entiteitmetagegevens
- zowel positioneringsmodi aan de serverzijde als aan de clientzijde

Die flexibiliteit betekent ook dat de eerste beslissing ertoe doet: kies eerst de topologie en volg dan de gids voor dat transport.

## Algemene topologiekeuzes

| Als u ... gebruikt | Begin met... | Waarom |
|---------------|---------------|-----|
| Bedrock Dedicated Server | [McHttp for BDS](/minecraft/mchttp-bds) | BDS kan een stabiel HTTP-eindpunt aanroepen |
| Lokale Bedrock-wereld | [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer) | Werkt via de lokale WebSocket-/commandotunnelstroom |
| Java-server met Geyser/Floodgate | [VoiceCraft.Java](/ecosystem/voicecraft-java) | Plugin aan Java-zijde verbindt met VoiceCraft via `McTcp` |
| Direct Paper-server | [VoiceCraft.Java Direct Paper](/ecosystem/voicecraft-java-direct-paper) | De plug-in kan een externe server gebruiken of de runtime beheren |

## Wat u hierna kunt lezen

- [Snelstart](/start/quick-start)
- [Downloads](/download)
- [Transportmodi](/server/transports)
- [Systeemarchitectuur](/architecture/system-architecture)
- [Ecosysteemoverzicht](/ecosystem/overview)
