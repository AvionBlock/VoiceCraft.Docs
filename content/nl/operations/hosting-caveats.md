# Host-waarschuwingen

Verschillende providers en implementatiestijlen beïnvloeden welke VoiceCraft-topologie realistisch is.

Voordat u een topologie kiest, bevestigt u twee netwerkpaden:

1. spelers kunnen het VoiceCraft UDP-eindpunt bereiken
2. de runtime aan de Minecraft-zijde kan het geselecteerde transporteindpunt bereiken

Veel hostingproblemen komen doordat een van die paden wordt geblokkeerd terwijl de andere nog steeds werkt.

## Bedrock-gastheren

`McHttp` is doorgaans het beste Bedrock-transport, maar alleen als het BDS-knooppunt het VoiceCraft-eindpunt kan bereiken.

Veelvoorkomende blokkers:

- uitgaande HTTP-beperkingen
- ontbrekende modulerechten
- werelden waar scriptondersteuning beperkt is

Als de provider uitgaande HTTP of vereiste scriptmodules blokkeert, is `McHttp` mogelijk technisch correct, maar operationeel niet beschikbaar.

## Gedeelde hostingproviders

Sommige providers staan het volgende niet toe:

- aangepaste luisteraars
- uitgaande HTTP vanaf de spelserver
- extra zijspanprocessen

In die omgevingen kan de technisch ondersteunde topologie nog steeds operationeel geblokkeerd zijn.

Vraag de provider specifiek naar uitgaande HTTP/TCP vanaf de spelserver en aanvullende secundaire processen. Een algemeen antwoord "plug-ins toegestaan" is niet voldoende.

## Aternos-achtige beperkingen

Bij sterk beperkte hosting kan communicatie in HTTP-stijl geblokkeerd of onpraktisch zijn.

Wanneer dat gebeurt:

- Bedrock BDS + `McHttp` is mogelijk niet levensvatbaar
- Alternatieven op de lokale wereld of aan de cliëntzijde kunnen de enige weg zijn

Ga er niet van uit dat een vrije/beperkte host dezelfde topologie kan draaien als een VPS of een speciale machine.

## Docker- en containervoorbehouden

Containers helpen bij de isolatie, maar u heeft nog steeds het volgende nodig:

- haven publiceren
- stabiele volumemounts voor config
- correcte cross-container-netwerken
- expliciete UDP-publicatie voor het VoiceCraft-clienteindpunt
- permanente opslag voor beheerde runtimemappen

## Omgekeerde proxy's

VoiceCraft-transporten hebben niet allemaal de vorm van een omgekeerde proxy:

- `McHttp` past op een natuurlijkere manier bij HTTP-tools
- `McTcp` is onbewerkt TCP
- `McWss` gedraagt zich anders dan gewone HTTP

Ga er niet van uit dat één ingangsstrategie voor allemaal werkt.

HTTP-tools kunnen helpen bij `McHttp`, maar lossen niet automatisch het onbewerkte `McTcp`- of client-UDP-verkeer op.

## Waarschuwingen voor Java-netwerken

Voor `VoiceCraft.Java` proxy-implementaties:

- de proxy moet VoiceCraft betrouwbaar bereiken
- backend Paper-knooppunten moeten het proxyberichtpad op betrouwbare wijze kunnen bereiken
- het eigendomsmodel moet duidelijk blijven

Als de proxy de brug niet op een zuivere manier kan bezitten, wordt de topologie kwetsbaar.

## Praktische checklist voor aanbieders

Vraag of verifieer:

- Kunnen spelers een aangepaste UDP-poort bereiken?
- Kan de spelserver uitgaande HTTP-verzoeken doen?
- Kan de gameserver onbewerkte TCP-poorten openen of er verbinding mee maken?
- Kan ik een zijspanproces uitvoeren voor `VoiceCraft.Server`?
- Kan ik `config/ServerProperties.json` volhouden?
- Kan ik Bedrock-gedrags-/resourcepakketten installeren of updaten?
- Kunnen plug-inberichten voor Java-netwerken betrouwbaar worden doorgegeven tussen de backend en de proxy?

Als enig antwoord nee is, kies dan een topologie die deze vereiste vermijdt of verplaats VoiceCraft naar de infrastructuur die u beheert.
