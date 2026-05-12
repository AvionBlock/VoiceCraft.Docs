# Beveiligingsverscherping

Deze pagina gaat over het verminderen van operationele risico's bij echte implementaties.

## 1. Roteer elk gegenereerd token

Bewaar nooit standaard gegenereerde waarden voor:

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

Behandel ze als gedeelde geheimen.

## 2. Stel alleen de vereiste transporten bloot

Publiceer niet elk transport alleen maar omdat het bestaat.

Voorbeelden:

- Alleen Bedrock-host:
  usually only `McHttp`
- Java-bridgehost:
  usually only `McTcp`
- lokale testhost:
  often only loopback `McWss`

## 3. Gebruik loopback indien mogelijk

Liever:

- `127.0.0.1`
- `localhost`

wanneer de consument zich op dezelfde machine bevindt.

Use `0.0.0.0` only when remote access is actually required.

## 4. Strak firewallbeleid

Sta alleen toe wat je nodig hebt:

- VoiceCraft UDP-poort
- specifieke HTTP- of TCP-transportpoort
- optionele websocket-poort

Open transportpoorten niet breed als het integrerende knooppunt bekend en vast is.

## 5. Aparte omgevingen

Gebruik verschillende:

- tokens
- configuratiebestanden
- mappen
- poorten

voor productie, enscenering en lokale testen.

## 6. Wees voorzichtig met door plug-ins beheerde runtimes

If `GeyserVoice` manages the VoiceCraft runtime:

- houd de installatiemap onder controle
- begrijp wie de eigenaar is van het herstartgedrag
- bevestig dat logs ergens voorspelbaar worden verzameld

## 7. Avoid casual use of `DisabledPacketTypes`

Dit is geen normaal verhardingskenmerk.

Het is in de eerste plaats bedoeld voor:

- debuggen
- tijdelijke verzachting
- protocolexperimenten

Het blindelings uitschakelen van pakkettypen kan de auth, synchronisatie of audio verbreken.

## 8. Beperk operationele commando's

For `GeyserVoice`, keep these staff-only:

- `/voice connect`
- `/voice reconnect`
- `/voice disconnect`
- `/voice reload`

## 9. Bescherm de back-upinhoud

Back-ups kunnen het volgende bevatten:

- transportfiches
- host- en poorttopologie
- Details van de servicelay-out

Behandel configuratieback-ups als gevoelige operationele gegevens.
