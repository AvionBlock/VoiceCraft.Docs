# Runbook upgraden

Gebruik dit bij het upgraden van VoiceCraft of een gerelateerde bridge zoals `GeyserVoice`.

Dit runbook is bedoeld voor upgrades die van invloed kunnen zijn op de compatibiliteit tussen server-, client-, Bedrock-add-on en Java-plug-ins. Het doel is om een ​​rollback-pad te behouden en tegelijkertijd te bewijzen dat de hele stapel nog steeds werkt.

## Upgrade-bestelling

Aanbevolen bestelling:

1. Maak een back-up van configuratie- en plug-in/addon-bestanden.
2. Plaats nieuwe binaire bestanden in een aparte map.
3. Stage-matching add-on- of plug-inpakketten.
4. Lees de release-opmerkingen voor aannames over transport en topologie.
5. Stop met de oude dienst.
6. Verplaats of kopieer de configuratie naar de nieuwe installatie.
7. Update de add-on/plug-in aan de Minecraft-kant.
8. Start en valideer één pad tegelijk.

Laat voor VoiceCraft `v1.6.1` de oude Bedrock-add-on niet op zijn plaats. Update de add-on samen met de client/server-release voordat u de bindingsstroom en in-game-indicatoren valideert.

## Waarom afzonderlijke mappen helpen

Een afzonderlijke uitgepakte map maakt het terugdraaien eenvoudiger omdat:

- oude binaire bestanden zijn nog steeds intact
- configuratiemigratie is expliciet
- u kunt release-indelingen vergelijken

## Valideer na upgrade

Minimaal:

1. VoiceCraft wordt gestart.
2. Transportpoorten binden.
3. Klant maakt verbinding.
4. Add-on of plug-in authenticeert.
5. Bindstroom werkt.
6. In-game stempictogrammen of add-on-gebeurtenissen verschijnen wanneer verwacht.
7. Nabijheidsaudio werkt.
8. Serveropdrachten zoals `list --clientsOnly` tonen verwachte clients.

## Bij het upgraden van GeyserVoice

Valideer ook:

- automatisch startgedrag tijdens runtime
- proxy-eigendomsmodel
- backend-snapshot doorsturen
- `config.voicecraft.transport.*` waarden
- `McTcpConfig.LoginToken` overeenkomst

Voor proxynetwerken valideert u eerst één backend en vervolgens tussen servers.

## Bij het upgraden van Bedrock add-onpakketten

Valideer ook:

- gedrags- en bronpakketten zijn beide bijgewerkt
- BDS-machtigingen omvatten nog steeds de vereiste modules
- `voicecraft:vcconnect` gebruikt het juiste transporttoken
- `voicecraft:vcbind <key>` werkt voor een echte speler
- in-game indicatoren/gebeurtenissen komen overeen met het verwachte releasegedrag

## Voorbeelden van rollback-triggers

Overweeg een terugdraaiactie wanneer:

- auth mislukt plotseling op een eerder werkend token
- transporten binden niet langer zoals verwacht
- door plug-ins beheerde runtime wordt nooit gereed
- de proxy-stemstatus tussen de servers wordt inconsistent
- er is geen bijbehorend add-on-/plug-inpakket beschikbaar voor de nieuwe server-/clientrelease

## Terugdraaiworkflow

1. Stop de nieuwe dienst.
2. Herstel de vorige binaire map.
3. Herstel eerdere `ServerProperties.json` en plug-in/addon-configuraties.
4. Herstel het vorige add-on-/plug-inpakket aan Minecraft-kant.
5. Start de oude service.
6. Valideer client, transportauthenticatie, binding en nabijheid.
