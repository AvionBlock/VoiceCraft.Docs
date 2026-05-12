# Upgrade-runbook

Use this when upgrading VoiceCraft or a related bridge such as `GeyserVoice`.

## Upgrade-bestelling

Aanbevolen bestelling:

1. maak een back-up van de configuratie
2. nieuwe binaire bestanden afzonderlijk voorbereiden
3. Stage-matching add-on- of plug-inpakketten
4. aannames over transport en topologie lezen
5. stop de oude dienst
6. verplaats de configuratie naar de nieuwe installatie
7. update de add-on/plug-in aan de Minecraft-kant
8. starten en valideren

For VoiceCraft `v1.6.1`, do not leave the old Bedrock addon in place. Update the addon together with the client/server release before validating bind flow and in-game indicators.

## Waarom afzonderlijke mappen helpen

Een afzonderlijke uitgepakte map maakt het terugdraaien eenvoudiger omdat:

- oude binaire bestanden zijn nog steeds intact
- configuratiemigratie is expliciet
- u kunt release-indelingen vergelijken

## Valideren na upgrade

Minimaal:

1. VoiceCraft wordt gestart
2. transportpoorten binden
3. klant maakt verbinding
4. Add-on of plug-in authenticeert
5. bindstroom werkt
6. In-game stempictogrammen of add-on-gebeurtenissen verschijnen wanneer verwacht
7. nabijheidsaudio werkt

## Bij het upgraden van GeyserVoice

Valideer ook:

- automatisch startgedrag tijdens runtime
- proxy-eigendomsmodel
- backend-snapshot doorsturen

## Voorbeelden van rollback-triggers

Overweeg een terugdraaiactie wanneer:

- auth mislukt plotseling op een eerder werkend token
- transporten binden niet meer zoals verwacht
- Door plug-ins beheerde runtime wordt nooit gereed
- de proxy-spraakstatus tussen de servers wordt inconsistent
