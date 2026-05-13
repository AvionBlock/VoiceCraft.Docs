# Probleemoplossingsmatrix

Gebruik deze pagina als u een symptoomgebaseerde diagnose wilt in plaats van een algemene checklist.

## Symptoom: client maakt verbinding, maar niemand hoort iets

Controleer:

1. `PositioningType` overeenkomst
2. bindstroom voltooid
3. entiteiten ontvangen wereld- en positie-updates
4. cliënt is niet plaatselijk gedempt of doof
5. de server heeft de entiteit niet gedempt of verdoofd

Hoe te verifiëren:

- voer `list --clientsOnly` uit om te bevestigen dat de spraakclient bestaat
- voer `list` uit en controleer of de gerelateerde entiteit een veranderende positie heeft
- gebruik de clientmicrofoontest en uitvoertest om lokale audioapparaten uit te sluiten

## Symptoom: add-on maakt verbinding, maar binden werkt nooit

Controleer:

1. teken is juist
2. de verwachte entiteit wordt gecreëerd
3. speler gebruikte de juiste bindingssleutel
4. bind-scriptgebeurtenissen worden geactiveerd

Veelvoorkomende oorzaken:

- speler heeft een verlopen of opnieuw gegenereerde bindingssleutel gekopieerd
- versie van het add-onpakket komt niet overeen met de server-/clientrelease
- aangepaste add-onlogica onderschept of omzeilt de voorraadbindstroom

## Symptoom: GeyserVoice is geïnstalleerd, maar de Java-side bridge wordt nooit bruikbaar

Controleer:

1. `McTcp` is ingeschakeld op VoiceCraft
2. `config.voicecraft.transport.host`, `config.voicecraft.transport.port` en `config.voicecraft.transport.login-token` komen overeen
3. de directe versus proxy-modus is opzettelijk geconfigureerd
4. als `auto-start` is ingeschakeld, wordt de runtime binnen de time-out gereed

Controleer ook of de plug-in op de juiste laag is geïnstalleerd: de directe Paper-modus heeft Paper/Folia nodig, terwijl de proxy-modus de proxy- en backend-nodes nodig heeft.

## Symptoom: de Direct Paper-modus werkt na handmatig opnieuw verbinden, maar niet bij het opstarten

Controleer:

1. `config.voicecraft.auto-start`
2. `install-directory`
3. `ready-timeout-ms`
4. eigendom van het runtime-proces

Als de plug-in start voordat de beheerde runtime gereed is, verhoog dan de time-out of gebruik een externe VoiceCraft-service met een eigen herstartbeleid.

## Symptoom: de proxymodus werkt op één backend, maar breekt op de serverswitch

Controleer:

1. proxy is de bron van de waarheid
2. backend-knooppunten proberen geen eigenaar te worden van de VoiceCraft-verbinding
3. het doorsturen van snapshots blijft intact tussen switches
4. world ID-naamruimtelogica blijft consistent

Als slechts één backend faalt, vergelijk dan de GeyserVoice-configuratie en plug-inversie met een backend die werkt.

## Symptoom: `McWss` is instabiel

Controleer:

1. `CommandsPerTick`
2. `MaxByteLengthPerCommand`
3. entiteitschurn en pakketburstgrootte
4. of `McHttp` beter zou passen

Als de wereld een langlopende gedeelde server aan het worden is, beschouw instabiliteit dan als een teken om over te stappen naar BDS + `McHttp`.

## Symptoom: VoiceCraft-server start, maar transportconsument kan geen verbinding maken

Controleer:

1. gastheerbinding
2. blootgestelde haven
3. firewall
4. Verkeerd transporttype geselecteerd
5. runtime overschrijft het veranderen van de verwachte waarden

Snelle splitsing:

- Problemen met de clientverbinding zijn meestal UDP-eindpunt- of clientinstellingen
- Add-on/plug-in verbindingsproblemen zijn meestal `McHttp`, `McWss` of `McTcp`
- bindings-/nabijheidsproblemen treden meestal op nadat beide verbindingen al bestaan
