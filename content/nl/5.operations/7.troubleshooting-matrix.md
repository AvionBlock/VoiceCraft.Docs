# Probleemoplossingsmatrix

Gebruik deze pagina als u een symptoomgebaseerde diagnose wilt in plaats van een algemene checklist.

## Symptoom: client maakt verbinding, maar niemand hoort iets

Controleer:

1. `PositioningType` match
2. Bindstroom voltooid
3. entiteiten ontvangen wereld- en positie-updates
4. cliënt is niet plaatselijk gedempt of doof
5. de server heeft de entiteit niet gedempt of verdoofd

## Symptoom: add-on maakt verbinding, maar binden werkt nooit

Controleer:

1. token is correct
2. de verwachte entiteit is gecreëerd
3. De speler gebruikte de juiste bindingssleutel
4. bind-scriptgebeurtenissen worden geactiveerd

## Symptoom: GeyserVoice is geïnstalleerd, maar de Java-side bridge wordt nooit bruikbaar

Controleer:

1. `McTcp` is enabled on VoiceCraft
2. `host`, `port`, and `login-token` match
3. de directe versus proxy-modus is opzettelijk geconfigureerd
4. if `auto-start` is enabled, the runtime becomes ready within timeout

## Symptoom: de directe Paper-modus werkt na handmatig opnieuw verbinden, maar niet bij het opstarten

Controleer:

1. `config.voicecraft.auto-start`
2. `install-directory`
3. `ready-timeout-ms`
4. Start-eigendom van het runtime-proces

## Symptoom: de proxymodus werkt op één backend, maar breekt op de serverswitch

Controleer:

1. proxy is de bron van de waarheid
2. backend-knooppunten proberen geen eigenaar te worden van de VoiceCraft-verbinding
3. Het doorsturen van snapshots blijft intact tussen switches
4. De logica voor de naamruimte van wereld-ID's blijft consistent

## Symptom: `McWss` is unstable

Controleer:

1. `CommandsPerTick`
2. `MaxByteLengthPerCommand`
3. entiteitschurn en pakketburstgrootte
4. whether `McHttp` would be a better fit

## Symptoom: VoiceCraft-server start, maar transportconsument kan geen verbinding maken

Controleer:

1. hostbinding
2. blootgestelde poort
3. firewall
4. Verkeerd transporttype geselecteerd
5. runtime-overschrijvingen die de verwachte waarden wijzigen
