# Productieblauwdrukken

Deze pagina vat gezonde productiebenaderingen samen in plaats van ruwe lijsten met functies.

## Blauwdruk 1: Server met alleen Bedrock

Gebruik:

- `VoiceCraft.Server`
- `McHttp`
- `VoiceCraft.Addon.Core.McHttp`

Waarom:

- schoonste stabiele Bedrock-implementatie
- gemakkelijkst te controleren
- het gemakkelijkst uit te leggen aan het serverpersoneel

## Blauwdruk 2: Lokale gemeenschap / SMP met geiser

Gebruik:

- `VoiceCraft.Server`
- `McTcp`
- `GeyserVoice` direct Paper mode

Optioneel:

- laat GeyserVoice de VoiceCraft-runtime beheren als u de voorkeur geeft aan een enkele installatiestroom aan de Java-zijde

## Blauwdruk 3: Groot Java-netwerk

Gebruik:

- external `VoiceCraft.Server`
- `McTcp`
- `GeyserVoice` on proxy
- `GeyserVoice` on backend nodes

Waarom:

- centrale controle
- schonere kalkaanslag
- eenvoudiger opnieuw opstarten zonder elke backend aan te raken

## Blauwdruk 4: Bouwer/testomgeving

Gebruik:

- `McWss`
- `Core.McWss`
- een lokaal VoiceCraft-exemplaar

Waarom:

- snelle lokale lus
- goed voor het testen van add-on-automatisering

## Operationele aanbevelingen

- bewaar VoiceCraft-logboeken indien mogelijk gescheiden van gamelogboeken
- Roteer of archiveer configuraties vóór grote upgrades
- houd transportfiches geheim
- test de bindingsstroom na elke topologiewijziging
