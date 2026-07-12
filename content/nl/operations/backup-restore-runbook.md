# Back-up en herstel van Runbook

Deze pagina richt zich op praktische back-up- en herstelstappen.

Gebruik het vóór risicovolle wijzigingen: upgrades, tokenrotatie, transportwijzigingen, hostmigratie of schakelen tussen Bedrock- en Java-topologieën.

## Wat u moet back-uppen

Minimaal:

- `config/ServerProperties.json`
- service wrapper-bestanden
- implementatieopmerkingen voor poorten en tokens

Aanbevolen:

- artefacten uit eerdere releases
- logt rond de laatst bekende staat
- plug-inconfiguraties zoals `VoiceCraft.Java/config.yml`
- Configuratiebestanden voor het Bedrock World Pack
- addon-pakketversies die momenteel wereldwijd zijn geïnstalleerd
- servicemanagerbestanden zoals systemd-eenheden of paneelopstartopdrachten
- runtime-override-opmerkingen als opstartvlaggen worden gebruikt

## Voordat je iets verandert

Maak een momentopname wanneer u op het punt staat:

- upgrade VoiceCraft
- van transport veranderen
- tokens draaien
- topologie schakelen
- hostbindingen of firewallregels wijzigen
- ga van door plug-ins beheerde runtime naar externe runtime

## Werkstroom herstellen

1. Stop de getroffen service.
2. Herstel `ServerProperties.json`.
3. Herstel gerelateerde plug-in of add-on-configuratie als de topologie is gewijzigd.
4. Herstel het overeenkomende add-on-/plug-inpakket als versiecompatibiliteit ertoe doet.
5. Start VoiceCraft opnieuw.
6. Start of herlaad de integratie aan Minecraft-zijde.
7. Valideer de transportauthenticatie en bindstroom.

## Wat een herstel niet automatisch oplost

- firewall-fouten
- Problemen met de bereikbaarheid van DNS of host
- niet-overeenkomende client- of plug-inconfiguratie
- topologiefouten na een herontwerp van een netwerk
- een aanbieder die het benodigde transporttraject blokkeert
- spelers die een nieuwer, incompatibel clientpakket gebruiken

## Validatie na herstel

Controleer:

1. server start netjes op
2. gekozen transport is ingeschakeld
3. token komt overeen met het integrerende knooppunt
4. spelerbinding en audiostroom werken weer
5. serveropdrachten tonen verwachte clients/entiteiten
6. logboeken tonen niet langer de fout die het herstel heeft geactiveerd

## Naamgeving van back-ups

Gebruik namen die het volgende bevatten:

- datum
- VoiceCraft-versie
- topologie
- reden

Voorbeeld:

```text
2026-05-13-voicecraft-1.6.1-bds-before-token-rotation
```

Goede namen zijn belangrijk bij incidenten, omdat ze duidelijk maken welke back-up bij welke topologie hoort.
