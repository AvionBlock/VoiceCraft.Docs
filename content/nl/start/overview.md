# Overzicht

VoiceCraft is een nabijheidsstemplatform voor Minecraft Bedrock Edition en gerelateerde bridge-scenario's.

Spelers kunnen een aparte stemclient gebruiken, terwijl de Minecraft-automatisering de stemserver vertelt waar elke speler zich bevindt, in welke wereld hij of zij zich bevindt en welke effecten of zichtbaarheidsregels van toepassing moeten zijn.

VoiceCraft is handig als u nabijheidsstem wilt zonder afhankelijk te zijn van één exacte Minecraft-servervorm. Dezelfde core-runtime kan worden gecombineerd met Bedrock-add-ons, Java/Geyser-bridges of proxy-implementaties.

## Wat je aan het opzetten bent

De meeste implementaties hebben drie bewegende stukken:

1. `VoiceCraft.Client`
   desktop- en mobiele app geïnstalleerd door elke speler
2. `VoiceCraft.Server`
   zelfstandige backend voor spraakverkeer, statussynchronisatie, moderatie en transporteindpunten
3. Transporten gericht op Minecraft
   `McHttp`, `McWss` en `McTcp`

Ecosysteemintegraties verbinden Minecraft met deze transporten:

- `VoiceCraft.Addon` voor Bedrock-werelden en BDS
- `GeyserVoice` voor Java / Geyser / proxystacks

## Hoe het werkt

1. De client maakt verbinding met `VoiceCraft.Server` via UDP.
2. De server houdt spraaksessies, entiteiten, posities, wereld-ID's, effect-bitmaskers en moderatiestatus bij.
3. Een integratie aan de Minecraft-zijde werkt de server bij met de gameplay-status:
   - `McHttp` voor BDS
   - `McWss` voor lokale Bedrock-werelden
   - `McTcp` voor `GeyserVoice`
4. De client geeft nabijheidsaudio weer op basis van de serverstatus en geselecteerde lokale instellingen.

De spraakverbinding en de Minecraft transportverbinding zijn gescheiden. Als slechts één zijde is aangesloten, kan de opstelling er gedeeltelijk gezond uitzien, maar zal het nabijheidsgedrag nog steeds onvolledig zijn.

## Ondersteunde clientplatforms

- Windows (`x86`, `x64`, `arm64`)
- Linux (`x64`, `arm32`, `arm64`)
- macOS (`x64`, `arm64`)
- Android (`arm64`)
- iOS (`arm64`, `.ipa`)

## Wat VoiceCraft flexibel maakt

- meerdere Minecraft-transporten
- Bedrock add-on API-oppervlak
- Brug aan Java-zijde via `GeyserVoice`
- configureerbare effecten en entiteitmetagegevens
- zowel positioneringsmodi aan de serverzijde als aan de clientzijde

Die flexibiliteit betekent ook dat de eerste beslissing ertoe doet: kies eerst de topologie en volg dan de gids voor dat transport.

## Algemene topologiekeuzes

| Als je rent... | Begin met... | Waarom |
|---------------|---------------|-----|
| Bedrock speciale server | [McHttp for BDS](/minecraft/mchttp-bds) | BDS kan een stabiel HTTP-eindpunt aanroepen |
| Lokale Bedrock-wereld | [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer) | Werkt via de lokale websocket/opdrachttunnelstroom |
| Java-server met Geyser/Floodgate | [GeyserVoice](/ecosystem/geyservoice) | Plugin aan Java-zijde verbindt met VoiceCraft via `McTcp` |
| Direct Paper-server | [GeyserVoice Direct Paper](/ecosystem/geyservoice-direct-paper) | De plug-in kan een externe server gebruiken of de runtime beheren |

## Wat moet je nu lezen?

- [Quick Start](/start/quick-start)
- [Download](/download)
- [Transport Modes](/server/transports)
- [System Architecture](/architecture/system-architecture)
- [Ecosystem Overview](/ecosystem/overview)
