# Authenticatie- en vertrouwensmodel

VoiceCraft maakt gebruik van gedeelde tokens aan de Minecraft-transportzijde. Deze tokens bepalen of een add-on, plug-in of bridge de Minecraft-status naar `VoiceCraft.Server` mag sturen.

Het zijn geen spelerswachtwoorden. Het zijn operationele geheimen tussen vertrouwde runtimecomponenten.

## Hoofdprincipe

De transportconsument bewijst dat hij het geconfigureerde gedeelde token kent.

Voorbeelden:

- Bedrock-add-on authenticeert met `McHttpConfig.LoginToken`
- `McWss` wereld authenticeert met `McWssConfig.LoginToken`
- `VoiceCraft.Java` authenticeert met `McTcpConfig.LoginToken`

| Vervoer | Consument | Tokenveld |
|-----------|----------|-------------|
| `McHttp` | BDS-add-onpakket | `McHttpConfig.LoginToken` |
| `McWss` | lokale Bedrock-wereld-add-on | `McWssConfig.LoginToken` |
| `McTcp` | `VoiceCraft.Java` of brug aan Java-zijde | `McTcpConfig.LoginToken` |

## Vertrouw op grenzen

Je moet in lagen denken:

- speler klantvertrouwen
- Minecraft-integratievertrouwen
- backend runtime-vertrouwen

Dit zijn niet dezelfde dingen.

Spelerclients maken verbinding met de stemserver en kunnen audio verzenden voor hun eigen sessie. Minecraft-integraties kunnen de wereld-/entiteitsstatus bijwerken. Backend-runtime-toegang kan configuratie, tokens, logboeken en procesgedrag wijzigen. Houd deze grenzen gescheiden bij het toewijzen van machtigingen en het beslissen waar geheimen zich bevinden.

## Welke tokens beschermen

Ze beschermen de transportgrens tussen VoiceCraft en het integrerende knooppunt.

Ze zijn geen vervanging voor:

- firewall-regels
- beveiliging van de gastheer
- hygiëne voor plug-intoestemming

Als een aanvaller een transporttoken krijgt en dat transporteindpunt kan bereiken, kan hij/zij mogelijk de Minecraft-integratie nabootsen. Dat is de reden waarom tokenrotatie en netwerkbereikbaarheid samen van belang zijn.

## Operationeel advies

- roteer tokens wanneer de topologie verandert
- hergebruik hetzelfde geheim niet voor altijd overal
- bewaar tokens zoals operationele referenties
- gebruik verschillende tokens voor `McHttp`, `McWss` en `McTcp` tenzij je opzettelijk gedeelde automatisering nodig hebt
- bind transporten aan `127.0.0.1` wanneer de consument op dezelfde host draait
- stel `0.0.0.0` alleen bloot als een andere machine verbinding moet maken
- houd plug-in/admin-opdrachten beperkt tot vertrouwd personeel

## Rotatieworkflow

1. Stop of verbreek de Minecraft-integratie.
2. Genereer een nieuw token voor het betreffende transport.
3. Update `config/ServerProperties.json` of de overschrijving op procesniveau `--server-key`.
4. Update de add-on/plug-in-configuratie of de in-game connect-opdracht.
5. Start `VoiceCraft.Server` opnieuw als u de JSON-configuratie hebt bewerkt.
6. Sluit de Minecraft-integratie opnieuw aan en valideer de bindstroom.

## Veel voorkomende fouten

- het wijzigen van `McHttpConfig.LoginToken` terwijl de add-on feitelijk `McWss` gebruikt
- alleen de VoiceCraft-configuratie wijzigen en de add-on/plug-in-kant vergeten
- een wildcard-listener blootstellen aan internet met een hergebruikt testtoken
- het delen van een productietoken in schermafbeeldingen, ondersteuningslogboeken of openbare probleemrapporten
