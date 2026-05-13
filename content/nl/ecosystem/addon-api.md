# Add-on-API

`VoiceCraft.Addon` toont een scriptgestuurde McApi-laag die veel breder is dan alleen `vcbind`.

Deze pagina is bedoeld voor add-on- en wereldontwikkelaars.

Gebruik de API als het gedrag van de stock-add-on niet voldoende is: aangepaste bindingsregels, aangepaste effecten, regiospecifiek stemgedrag, gescripte nep-entiteiten, personeelstools of gamemodus-specifieke zichtbaarheidslogica.

Begin eerst met het voorraadpakket `Basic`. Zodra transport, binding en nabijheid werken, voegt u geleidelijk aangepaste pakket-/gebeurtenislogica toe.

## API-oppervlak op hoog niveau

De add-on-side API onthult:

- levenscyclus van de verbinding
- pakket verzenden/ontvangen
- creatie en vernietiging van entiteiten
- wereld ID-, positie-, rotatie-, mute-, doof- en bitmask-updates
- effect-updates
- audio-ontvangen gebeurtenissen

De API bestaat zodat de wereld kan beslissen wat stem moet betekenen in de gameplay. VoiceCraft biedt het transport- en staatsmodel; uw add-onlogica kan beslissen hoe tags, rollen, regio's, dimensies of scriptentiteiten aan dat model worden toegewezen.

## Evenementen op hoog niveau

Vanuit de huidige API-laag:

- `OnConnected`
- `OnDisconnected`
- `OnPlayerBind`
- `OnPlayerUnbind`
- `OnPacket`

VoiceCraft `v1.6.1` breidt dit gebeurtenisgestuurde pad uit met uitgezonden gebeurtenissen die door de add-onpakketten worden gebruikt, zodat wereldscripts kunnen reageren op verbindings-, bindings- en pakketactiviteit zonder aangepaste polling.

Scriptgebeurtenissen die door het systeem worden gebruikt, zijn onder meer:

- `voicecraft:onConnected`
- `voicecraft:onDisconnected`
- `voicecraft:onPlayerBind`
- `voicecraft:onPlayerUnbind`
- `voicecraft:onPacket`
- `voicecraft:sendPacket`

## Dekking op pakketniveau

Huidige blootgestelde pakketgebeurtenissen omvatten categorieën zoals:

- inloggen/uitloggen/pingen
- antwoorden accepteren / weigeren / resetten
- entiteit creëren / vernietigen
- titel / beschrijving / naamupdates
- dempen / doof / server dempen / server doof
- praat/luister/effect bitmasker
- positie / rotatie / wereld-ID
- grotfactor / moffelfactor
- effect-updates
- geluid ontvangen

Dit maakt de add-on-API niet alleen nuttig voor aandelenwerelden, maar ook voor aangepaste spelmodi.

Hooks op pakketniveau zijn krachtig, maar kunnen ook gemakkelijk overmatig worden gebruikt. Geef de voorkeur aan levenscyclusgebeurtenissen op hoog niveau voor normale aanpassingen en pakkethaken alleen wanneer u controle op laag niveau nodig heeft.

## Algemene aanpassingsideeën

- automatische binding per team, rol of tag
- aangepaste bind-UI
- aangepaste effectvoorinstellingen per bioom of gebied
- regiogebaseerde wereld-ID opnieuw toewijzen
- tools voor personeelsmoderatie via server-UI-formulieren
- gescripte NPC of nep-entiteitsstemlogica

## Basis integratiemodel

Typische add-onlogica:

1. maak verbinding met VoiceCraft-transport
2. authenticeren
3. entiteiten creëren of ontdekken
4. spelers binden
5. update wereld-ID / positie / rotatie op tick of evenement
6. reageren op updates op pakketniveau

Voor BDS betekent dit meestal `Core.McHttp`. Voor lokale werelden betekent dit meestal `Core.McWss`.

## Belangrijke implementatieaantekeningen

- De `McWss`-modus is afhankelijk van de doorvoer van de opdrachttunnel
- effectschakelaars worden gecodeerd via bitmaskers
- Automatisering op pakketniveau moet zorgvuldig worden getest op echte Bedrock-builds
- houd add-onpakketten afgestemd op de VoiceCraft-release wanneer u afhankelijk bent van uitgezonden evenementen of in-game stempictogrammen
- vermijd het verzenden van onnodige hoogfrequente updates; positie-updates zijn nuttig, maar luidruchtige aangepaste pakketlussen kunnen instabiliteit veroorzaken
- behandel transportinlogtokens als serverreferenties, niet als waarden voor de speler

## Aanbevolen praktijk

- begin vanaf `Basic` als u een werkreferentie nodig heeft
- schakel over naar `Core.McHttp` of `Core.McWss` bij het bouwen van een aangepaste ervaring
- houd eerst uw wereldautomatisering dun en breid vervolgens de pakkethaken geleidelijk uit
- valideer elke aangepaste functie met ten minste twee spelers, zodat nabijheids- en bindingsgedrag wordt uitgeoefend

## Foutopsporing in aangepaste logica

1. Bevestig dat de stock-add-on verbinding kan maken en binden.
2. Voeg één aangepaste gebeurtenis of pakkethaak toe.
3. Controleer of de VoiceCraft-server nog steeds entiteitsupdates ziet.
4. Test beweging tussen werelden/dimensies als uw logica wereld-ID's verandert.
5. Schakel aangepaste code uit voordat u transport- of audio-instellingen de schuld geeft.
