# Back-up en herstel Runbook

Deze pagina richt zich op praktische back-up- en herstelstappen.

## Waar u een back-up van moet maken

Minimaal:

- `config/ServerProperties.json`
- servicewrapperbestanden
- implementatienotities voor poorten en tokens

Aanbevolen:

- artefacten uit eerdere releases
- logt rond de laatst bekende staat
- plugin configs such as `GeyserVoice/config.yml`

## Voordat je iets verandert

Maak een momentopname wanneer u op het punt staat:

- upgrade VoiceCraft
- van transport veranderen
- tokens roteren
- schakeltopologie

## Herstel de werkstroom

1. Stop de betreffende service.
2. Restore `ServerProperties.json`.
3. Herstel de gerelateerde plug-in of add-on-configuratie als de topologie is gewijzigd.
4. Start VoiceCraft opnieuw.
5. Valideer de transportauthenticatie en bind de stroom.

## Wat een herstel niet automatisch oplost

- firewallfouten
- Problemen met de bereikbaarheid van DNS of host
- niet-overeenkomende client- of plug-inconfiguratie
- topologiefouten na een herontwerp van een netwerk

## Validatie na herstel

Controleer:

1. server start netjes
2. gekozen transport is ingeschakeld
3. token komt overeen met het integrerende knooppunt
4. Spelerbinding en audiostroom werken weer
