# Hosting-waarschuwingen

Verschillende providers en implementatiestijlen beïnvloeden welke VoiceCraft-topologie realistisch is.

## Bedrock-gastheren

`McHttp` is usually the best Bedrock transport, but only if the BDS node can reach the VoiceCraft endpoint.

Veelvoorkomende blokkers:

- uitgaande HTTP-beperkingen
- ontbrekende modulerechten
- werelden waar scriptondersteuning beperkt is

## Gedeelde hostingproviders

Sommige providers staan het volgende niet toe:

- aangepaste luisteraars
- uitgaande HTTP vanaf de spelserver
- aanvullende zijspanprocessen

In die omgevingen kan de technisch ondersteunde topologie nog steeds operationeel geblokkeerd zijn.

## Aternos-achtige beperkingen

Bij sterk beperkte hosting kan communicatie in HTTP-stijl geblokkeerd of onpraktisch zijn.

Wanneer dat gebeurt:

- Bedrock BDS + `McHttp` may not be viable
- Alternatieven op de lokale wereld of aan de cliëntzijde kunnen de enige weg zijn

## Docker- en containervoorbehouden

Containers helpen bij de isolatie, maar u heeft nog steeds het volgende nodig:

- havenpublicatie
- stabiele volumemounts voor config
- correcte cross-container-netwerken

## Omgekeerde proxy's

VoiceCraft-transporten hebben niet allemaal de vorm van een omgekeerde proxy:

- `McHttp` can fit HTTP tooling more naturally
- `McTcp` is raw TCP
- `McWss` behaves differently from plain HTTP

Ga er niet van uit dat één ingangsstrategie voor allemaal werkt.

## Waarschuwingen voor Java-netwerken

For `GeyserVoice` proxy deployments:

- de proxy moet VoiceCraft betrouwbaar bereiken
- backend Paper-knooppunten moeten het pad van het proxybericht op betrouwbare wijze bereiken
- het eigendomsmodel moet helder blijven

Als de proxy de brug niet op een zuivere manier kan bezitten, wordt de topologie kwetsbaar.
