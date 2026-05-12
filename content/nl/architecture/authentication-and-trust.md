# Authenticatie- en vertrouwensmodel

VoiceCraft maakt gebruik van gedeelde tokens aan de Minecraft-transportzijde.

## Hoofdprincipe

De transportconsument bewijst dat hij het geconfigureerde gedeelde token kent.

Voorbeelden:

- Bedrock addon authenticates with `McHttpConfig.LoginToken`
- `McWss` world authenticates with `McWssConfig.LoginToken`
- `GeyserVoice` authenticates with `McTcpConfig.LoginToken`

## Vertrouwensgrenzen

Je moet in lagen denken:

- vertrouwen van de spelercliënt
- Minecraft-integratievertrouwen
- backend runtime-vertrouwen

Dit zijn niet dezelfde dingen.

## Welke tokens beschermen

Ze beschermen de transportgrens tussen VoiceCraft en het integrerende knooppunt.

Ze zijn geen vervanging voor:

- firewallregels
- hostbeveiliging
- hygiëne voor plug-intoestemming

## Operationeel advies

- tokens roteren wanneer de topologie verandert
- hergebruik hetzelfde geheim niet voor altijd overal
- bewaar tokens zoals operationele inloggegevens
