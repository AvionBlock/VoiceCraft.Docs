# GeyserVoice Proxy-gids

Gebruik deze modus wanneer u Velocity of BungeeCord uitvoert met een of meer backend Paper-servers.

## Hoe de proxymodus werkt

- backend Paper-servers sturen momentopnamen van spelers naar de proxy
- the proxy owns the VoiceCraft-side `McTcp` connection
- Wereld-ID's en dimensies kunnen een naamruimte krijgen met de backend-identiteit

Hierdoor is één centrale spraakbrug voor een multiservernetwerk mogelijk.

## Implementatiepatroon

Installeer GeyserVoice:

- op de proxy
- op elke backend Paper-server

## Kernregel

De proxy is de bron van waarheid voor de VoiceCraft-verbinding.

Backend Paper-servers moeten worden behandeld als producenten van snapshots, niet als de belangrijkste bridge-eigenaar.

## Backend Paper-configuratie

Op backend Paper-servers:

- schakel de proxymodus in voor het knooppunt aan de Paper-zijde
- behandel de backend-host/poort/sleutel niet als de bron van de waarheid

## Proxy-configuratie

Op de proxy:

- set the real `host`
- set the real `port`
- set the real `login-token`

## Installatiestroom

1. Installeer de plug-in op proxy- en backend-knooppunten.
2. Start alles één keer om configuraties te genereren.
3. Configureer de proxy met de echte VoiceCraft-verbinding.
4. Configureer backend-knooppunten voor proxy-relay-gedrag.
5. Laad de plug-in opnieuw.
6. Valideer beweging tussen servers en bind de stroom.

## Validatiechecklist

- speler sluit zich aan bij de backend
- backend verzendt snapshots correct
- proxy blijft verbonden met VoiceCraft
- Bij het wisselen van backend-servers blijft de verwachte stemidentiteit behouden

## Foutpatronen

- backend probeert eigenaar te worden van de hoofdverbinding
- proxy token differs from VoiceCraft `McTcpConfig.LoginToken`
- proxy kan Paper bereiken, maar VoiceCraft niet
- backend-topologie verbergt of herschrijft plug-inberichten
