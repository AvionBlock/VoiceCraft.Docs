# Productieblauwdrukken

Deze pagina vat gezonde productiebenaderingen samen in plaats van ruwe lijsten met functies.

Gebruik deze blauwdrukken wanneer u besluit op welke topologie u wilt standaardiseren. Ze zijn opzettelijk eigenwijs: het doel is om bewegende delen te verminderen, en niet elk mogelijk transport in één keer bloot te leggen.

## Blauwdruk 1: Server met alleen Bedrock

Gebruik:

- `VoiceCraft.Server`
- `McHttp`
- `VoiceCraft.Addon.Core.McHttp`

Waarom:

- schoonste stabiele Bedrock-implementatie
- het gemakkelijkst te monitoren
- het gemakkelijkst uit te leggen aan het serverpersoneel

Aanbevolen vorm:

```text
BDS addon -> McHttp -> VoiceCraft.Server
players -> VoiceCraft UDP endpoint
```

Houd `McWss` en `McTcp` uitgeschakeld tenzij u een specifieke reden hebt om ze uit te voeren.

## Blauwdruk 2: Lokale community / SMP met Geyser

Gebruik:

- `VoiceCraft.Server`
- `McTcp`
- `GeyserVoice` Direct Paper-modus

Optioneel:

- laat GeyserVoice de VoiceCraft-runtime beheren als u de voorkeur geeft aan een enkele installatiestroom aan de Java-zijde

Aanbevolen vorm:

```text
Paper/Folia + GeyserVoice -> McTcp -> VoiceCraft.Server
players -> VoiceCraft UDP endpoint
```

Dit past goed wanneer één Java-server de belangrijkste autoriteit is voor de positie van de speler.

## Blauwdruk 3: Groot Java-netwerk

Gebruik:

- extern `VoiceCraft.Server`
- `McTcp`
- `GeyserVoice` op proxy
- `GeyserVoice` op backend-knooppunten

Waarom:

- centrale controle
- schonere schaal
- gemakkelijker opnieuw opstarten zonder elke backend aan te raken

Aanbevolen vorm:

```text
backend Paper nodes -> proxy relay -> proxy GeyserVoice -> McTcp -> VoiceCraft.Server
players -> VoiceCraft UDP endpoint
```

Behoud de proxy als de enige VoiceCraft-verbindingseigenaar. Backend-knooppunten moeten snapshots produceren en niet strijden om de hoofd-`McTcp`-verbinding.

## Blauwdruk 4: Bouwer/testomgeving

Gebruik:

- `McWss`
- `Core.McWss`
- een lokale VoiceCraft-instantie

Waarom:

- snelle lokale lus
- goed voor het testen van add-on-automatisering

Aanbevolen vorm:

```text
local Bedrock world -> McWss -> local VoiceCraft.Server
local client -> local VoiceCraft UDP endpoint
```

Beschouw dit niet als het standaardproductieontwerp voor een openbare Bedrock-server. Ga naar `McHttp` wanneer de wereld duurzaam of gedeeld wordt.

## Een blauwdruk kiezen

| Behoefte | Kies |
|------|--------|
| Stabiele Bedrock-productie | Blauwdruk 1 |
| Eén Java/Geyser-server | Blauwdruk 2 |
| Snelheid/Bungee-netwerk | Blauwdruk 3 |
| Lokaal testen of add-on-ontwikkeling | Blauwdruk 4 |

## Operationele aanbevelingen

- bewaar VoiceCraft-logboeken indien mogelijk gescheiden van gamelogboeken
- roteer of archiveer configuraties vóór grote upgrades
- houd transportfiches geheim
- test de bindingsstroom na elke topologiewijziging
- stel alleen het transport bloot dat nodig is voor de gekozen blauwdruk
- bewaar een terugdraaikopie van `ServerProperties.json` voordat u poorten of tokens wijzigt
- documenteer welke service eigenaar is van het VoiceCraft-proces in uw omgeving
