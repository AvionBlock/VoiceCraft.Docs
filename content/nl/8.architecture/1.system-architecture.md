# Systeemarchitectuur

Op deze pagina worden de grote onderdelen van VoiceCraft uitgelegd en hoe deze zich tot elkaar verhouden.

## Hoofdlagen

### Clientlaag

`VoiceCraft.Client` handles:

- invoer vastleggen
- voorbewerking
- UDP-transport naar VoiceCraft
- afspelen en lokale voorkeuren per gebruiker

### Serverlaag

`VoiceCraft.Server` handles:

- status van netwerkentiteit
- stemclientsessies
- moderatievlaggen
- effectbitmaskers en standaardinstellingen voor audio-effecten
- Minecraft-gerichte transporten

### Minecraft-integratielaag

Dit is afhankelijk van de topologie:

- `VoiceCraft.Addon` for Bedrock
- `GeyserVoice` for Java / Geyser / proxy networks

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
- effectbitmaskers

## Waarom transporten gescheiden zijn

VoiceCraft-spraakverkeer en Minecraft-automatisering leven niet altijd in dezelfde omgeving.

Dat is waarom:

- de client praat met de core-spraakserver
- Bedrock- of Java-integratie verloopt via een transportlaag

Deze scheiding houdt het kernplatform flexibel.
