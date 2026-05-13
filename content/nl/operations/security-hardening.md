# Beveiliging verharding

Deze pagina gaat over het verminderen van operationele risico's bij echte implementaties.

VoiceCraft-beveiliging gaat vooral over het beperken van wie transporteindpunten kan bereiken, het beschermen van gedeelde tokens en het weghouden van operationele controles die alleen door het personeel beschikbaar zijn voor reguliere spelers.

## 1. Roteer elk gegenereerd token

Bewaar nooit standaard gegenereerde waarden voor:

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

Behandel ze als gedeelde geheimen.

Gebruik het token alleen met de bijbehorende integratie:

- `McHttpConfig.LoginToken` voor BDS `McHttp`
- `McWssConfig.LoginToken` voor lokaal gesteente `McWss`
- `McTcpConfig.LoginToken` voor GeyserVoice / Java-bridge

## 2. Stel alleen noodzakelijke transporten bloot

Publiceer niet elk transport alleen maar omdat het bestaat.

Voorbeelden:

- Host met alleen Bedrock:
  meestal alleen `McHttp`
- Java-bridge-host:
  meestal alleen `McTcp`
- lokale testhost:
  vaak alleen loopback `McWss`

## 3. Gebruik waar mogelijk loopback

Liever:

- `127.0.0.1`
- `localhost`

wanneer de consument zich op dezelfde machine bevindt.

Gebruik `0.0.0.0` alleen als externe toegang daadwerkelijk vereist is.

## 4. Strak firewallbeleid

Sta alleen toe wat je nodig hebt:

- VoiceCraft UDP-poort
- specifieke HTTP- of TCP-transportpoort
- optionele websocket-poort

Open transportpoorten niet breed als het integrerende knooppunt bekend en vast is.

Houd er rekening mee dat het UDP-eindpunt van de client en de Minecraft-transporteindpunten verschillende gebruikers bedienen. Spelers hebben het stem-UDP-eindpunt nodig. De add-on/plug-in heeft het geselecteerde Minecraft-transporteindpunt nodig.

## 5. Aparte omgevingen

Gebruik verschillende:

- tokens
- configuratiebestanden
- mappen
- havens

voor productie, enscenering en lokale testen.

## 6. Wees voorzichtig met door plug-ins beheerde runtimes

Als `GeyserVoice` de VoiceCraft-runtime beheert:

- houd de installatiemap onder controle
- Begrijp wie de eigenaar is van het herstartgedrag
- bevestig dat logboeken ergens voorspelbaar worden verzameld
- zorg ervoor dat gegenereerde runtime-bestanden niet schrijfbaar zijn door niet-vertrouwde gebruikers
- weet of `shutdown-on-disable` wordt verwacht tijdens uw herstartproces

## 7. Vermijd incidenteel gebruik van `DisabledPacketTypes`

Dit is geen normaal verhardingskenmerk.

Het is in de eerste plaats bedoeld voor:

- debuggen
- tijdelijke verzachting
- protocol-experimenten

Het blindelings uitschakelen van pakkettypen kan de auth, synchronisatie of audio verbreken.

## 8. Beperk operationele commando's

Voor `GeyserVoice` moet u deze alleen voor personeel behouden:

- `/voice connect`
- `/voice reconnect`
- `/voice disconnect`
- `/voice reload`

Voor de VoiceCraft-serverconsole beperkt u de toegang tot vertrouwde operators. Commando's zoals `kick`, `mute`, `deafen` en bewerkingen van metagegevens kunnen live spelers beïnvloeden.

## 9. Bescherm de back-upinhoud

Back-ups kunnen het volgende bevatten:

- transportfiches
- host- en poorttopologie
- details van de service-indeling

Behandel configuratieback-ups als gevoelige operationele gegevens.

## 10. Beoordeel publieke steunartefacten

Voordat u schermafbeeldingen, logbestanden of configuraties openbaar plaatst, verwijdert u het volgende:

- inlogtokens transporteren
- openbare IP-adressen als deze niet openbaar mogen worden gemaakt
- service wrapper-geheimen
- gegenereerde bindsleutels als ze nog steeds actief zijn
- speler-ID's als privacy ertoe doet

## Controlelijst voor verharding

- gegenereerde tokens vervangen
- alleen vereiste transporten ingeschakeld
- loopback gebruikt voor consumenten op dezelfde host
- firewallregels zijn waar mogelijk beperkt tot bekende bronnen
- GeyserVoice operationele commando's beperkt
- back-ups veilig opgeslagen
- release- en add-on-/plug-inversies bleven op één lijn
