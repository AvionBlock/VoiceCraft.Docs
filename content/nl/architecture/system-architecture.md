# Systeemarchitectuur

VoiceCraft is een proximity-stemstapel, geen enkele Minecraft-mod. De client draagt ​​microfoonaudio over, de server is eigenaar van stemsessies en gedeelde status, en de Minecraft-integratielaag vertelt de server waar spelers zijn en hoe ze moeten worden weergegeven.

De scheiding is opzettelijk: dezelfde stemserver kan werken met Bedrock Dedicated Server, lokale Bedrock-werelden, directe Paper-servers en proxynetwerken, zolang het juiste Minecraft-gerichte transport is verbonden.

## Belangrijkste lagen

| Laag | Belangrijkste verantwoordelijkheid | Typische installatielocatie |
|-------|---------------------|--------------------------|
| `VoiceCraft.Client` | Vangt microfooninvoer op, verzendt spraakpakketten, speelt stemmen in de buurt af, slaat lokale audiovoorkeuren op. | Spelerapparaat |
| `VoiceCraft.Server` | Accepteert stemclients, slaat entiteitsstatus op, past moderatievlaggen en standaardinstellingen voor audio-effecten toe, stelt Minecraft-transporten bloot. | VPS, gamehost, lokale pc of door plug-ins beheerde runtime |
| Minecraft-integratie | Verzendt de positie van de speler/entiteit en levenscyclusgegevens van Minecraft naar VoiceCraft. | Bedrock-add-on, Paper-plug-in of proxy-plug-in |

### Cliëntlaag

`VoiceCraft.Client` handvatten:

- microfoonopname en voorverwerking
- push-to-talk, mute, doof, selectie van invoer-/uitvoerapparaten
- UDP-verbinding met `VoiceCraft.Server`
- afspelen van stemmen in de buurt op basis van de serverstatus
- lokaal volume per gebruiker en lokale mute-voorkeuren

De client ontdekt de Minecraft-spelerposities niet zelf in het normale server-side model. Het hangt af van de server- en Minecraft-integratie om een ​​entiteit en een wereldstaat te bieden.

### Serverlaag

`VoiceCraft.Server` handvatten:

- VoiceCraft UDP-clientsessies
- status van netwerkentiteit en bindingsstatus
- moderatievlaggen aan de serverzijde
- effectbitmaskers en standaardinstellingen voor audio-effecten
- Op Minecraft gerichte transporten: `McHttp`, `McWss` en `McTcp`
- persistente configuratie in `config/ServerProperties.json`

De server is de gedeelde runtime waarover zowel de spelerclients als de Minecraft-integratie het eens moeten worden. Als de client verbinding maakt, maar Minecraft niet, kunnen spelers verschijnen als spraaksessies zonder bruikbare gegevens over de wereldpositie.

### Minecraft-integratielaag

Dit is afhankelijk van de topologie:

- `VoiceCraft.Addon.Core.McHttp` voor Bedrock Dedicated Server
- `VoiceCraft.Addon.Core.McWss` voor lokale Bedrock-werelden en commandotunnelopstellingen
- `GeyserVoice` voor Java-, Geyser/Floodgate-, Paper-, Velocity- en BungeeCord-topologieën

De integratielaag is verantwoordelijk voor het vertalen van gamegebeurtenissen naar de VoiceCraft-status: spelers sluiten zich aan, spelers vertrekken, positie-updates, wereld-ID's, bindingsverzoeken, nep-entiteiten, effectwijzigingen en verbindingslevenscyclus.

## Kerngegevensconcepten

VoiceCraft draait om entiteiten in plaats van alleen om onbewerkte sockets.

Entiteiten dragen staat zoals:

- naam
- titel
- beschrijving
- positie
- rotatie
- wereld-ID
- stomme / dove toestand
- effect-bitmaskers

Netwerkclients kunnen worden weergegeven als entiteiten, en Minecraft-integraties kunnen ook entiteiten maken of bijwerken. Met dit model kan VoiceCraft echte spelers, nep-/display-entiteiten en aangepaste wereldgestuurde spraakdoelen beschrijven via dezelfde staatspijplijn.

## Waarom transporten gescheiden zijn

VoiceCraft-spraakverkeer en Minecraft-automatisering leven niet altijd in dezelfde omgeving.

Dat is waarom:

- de spelerclient praat met de kern-UDP-spraakserver
- Bedrock- of Java-integratiegesprekken via een Minecraft-transport
- elk transport kan zijn eigen token, hostbinding en maximale clientlimiet hebben

Door deze scheiding kunt u de stemserver stabiel houden terwijl u de Minecraft-integratie wijzigt. Een implementatie met alleen Bedrock kan bijvoorbeeld `McHttp` gebruiken, terwijl een Java/Geyser-netwerk dezelfde kernspraakserver kan behouden, maar de Minecraft-kant kan overschakelen naar `McTcp`.

## Typische verbindingsvormen

### Bedrock speciale server

```text
VoiceCraft.Client -> VoiceCraft UDP server
BDS + VoiceCraft.Addon.Core.McHttp -> McHttp endpoint
```

Gebruik dit wanneer de Bedrock-server een HTTP-eindpunt kan bereiken dat wordt weergegeven door `VoiceCraft.Server`.

### Lokale Bedrock-wereld

```text
VoiceCraft.Client -> VoiceCraft UDP server
Minecraft local world + Core.McWss -> McWss websocket endpoint
```

Gebruik dit voor lokaal testen of singleplayer-werelden waar een commandotunnel acceptabel is.

### Java + Geiser/Sluizen

```text
VoiceCraft.Client -> VoiceCraft UDP server
GeyserVoice -> McTcp endpoint
```

Gebruik dit wanneer de Java-infrastructuur de bron is van de spelerspositie en levenscyclusstatus.

## Wat u eerst moet configureren

1. Configureer `VoiceCraft.Server` en bevestig dat het netjes start.
2. Kies het Minecraft-transport dat bij de topologie past.
3. Zorg ervoor dat de client verbinding maakt met `VoiceCraftConfig.Port`.
4. Zorg ervoor dat de Minecraft-integratie wordt geverifieerd met het bijbehorende transporttoken.
5. Valideer de bindingsstroom en positie-updates voordat u meer aangepast gedrag toevoegt.
