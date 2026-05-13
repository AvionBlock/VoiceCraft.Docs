# McWss voor werelden voor één speler

`McWss` is het websocket/commandotunneltransport dat vooral wordt gebruikt voor lokale werelden en lichtgewicht Bedrock-opstellingen.

Gebruik deze handleiding als u geen volledige Bedrock Dedicated Server gebruikt en een lokale Bedrock-wereld nodig heeft om met VoiceCraft te praten via de `/connect` websocket-stroom.

Doelvorm:

```text
VoiceCraft.Client -> VoiceCraft UDP endpoint
Local Bedrock world + VoiceCraft.Addon.Core.McWss -> McWss websocket endpoint
```

## Wanneer moet u het gebruiken?

Gebruik `McWss` wanneer:

- je speelt in een lokale Bedrock-wereld
- je een snelle singleplayer-installatie wilt
- u test add-onlogica zonder een speciale BDS-host

Als u een echte Bedrock Dedicated Server gebruikt, gebruik dan [McHttp for BDS](/minecraft/mchttp-bds).

## Belangrijke beperkingen

- meestal minder stabiel dan `McHttp`
- opdrachtdoorvoer en payload-grootte zijn van groot belang
- niet de standaardaanbeveling voor grote openbare productieomgevingen
- is afhankelijk van de beschikbaarheid van de Bedrock-websocket en het opdrachtgedrag in uw omgeving

## Vereisten

1. `VoiceCraft.Server` met `McWssConfig.Enabled = true`
2. `VoiceCraft.Addon.Core.McWss.zip`
3. Basisbuild die de vereiste websocket-/scriptfunctionaliteit ondersteunt
4. VoiceCraft-client geïnstalleerd en geconfigureerd
5. overeenkomende `McWssConfig.LoginToken` voor add-on-authenticatie

Handige links:

- [Download Page](/download) voor het onbewerkte releasepakket `Core.McWss`
- [Addon Configurator](/addon-configurator) voor een kant-en-klaar wereldarchief

## VoiceCraft-serverconfiguratie

Typische opstelling:

```json
{
  "McWssConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-token",
    "Hostname": "ws://127.0.0.1:9051/",
    "MaxClients": 1,
    "MaxTimeoutMs": 10000,
    "DataTunnelCommand": "voicecraft:data_tunnel",
    "CommandsPerTick": 3,
    "MaxByteLengthPerCommand": 300,
    "DisabledPacketTypes": []
  }
}
```

Houd `DataTunnelCommand` uitgelijnd met het add-onpakket. Als u dit in de serverconfiguratie wijzigt, moet de add-on dezelfde opdrachtnaam gebruiken.

Voor lokale singleplayer-tests moet u de websocket-host op `127.0.0.1` houden. Gebruik alleen een bredere binding als de Bedrock-wereld verbinding maakt vanaf een andere machine.

## Installatie

### Optie 1: importeer als `.mcaddon`

1. Hernoem het archief naar `VoiceCraft.Addon.Core.McWss.mcaddon`.
2. Open het zodat Minecraft de add-on importeert.
3. Schakel het gedragspakket en het resourcepakket in de wereld in.

### Optie 2: handmatig kopiëren

1. Pak het archief uit.
2. Kopieer `RP` en `BP` naar de Bedrock-mappen.
3. Schakel beide pakketten in de doelwereld in.

Het resourcepakket biedt zichtbare middelen. Het gedragspakket biedt opdrachten, scripts en bridge-logica.

## Verbindingsstroom

### Stap 1: sluit de wereldwebsocket aan

```text
/connect <VOICECRAFT_HOST>:<MCWSS_PORT>
```

Voorbeeld:

```text
/connect 127.0.0.1:9051
```

Dit verbindt de Bedrock-wereld met het VoiceCraft websocket-transport. Het authenticeert de add-on nog niet.

### Stap 2: authenticeer de add-on

```text
/voicecraft:vcconnect <LOGIN_TOKEN>
```

Gebruik `McWssConfig.LoginToken`.

Na authenticatie kan de add-on entiteiten verzenden en gegevens binden via de opdrachttunnel.

## Datatunnel

De add-on gebruikt:

- `voicecraft:data_tunnel`

Dit moet in lijn blijven met `McWssConfig.DataTunnelCommand`.

Als je de ene kant een andere naam geeft en de andere niet, breekt de brug.

Het commando bevat momenteel:

- optioneel argument voor maximale tekenreekslengte
- argument voor verpakte payloadgegevens

De tunnel is gevoelig voor commandodoorvoer. Grote uitbarstingen van entiteits- of effectupdates kunnen vertraging of onstabiele levering veroorzaken, vooral op low-end machines.

## Afstemmen

Als u vertraging of pakketinstabiliteit waarneemt:

- lager `CommandsPerTick`
- beoordeling `MaxByteLengthPerCommand`
- vermijd grote burst-updates
- test met minder actieve entiteiten
- houd de opstelling lokaal tijdens het afstemmen
- schakel over naar `McHttp` als de wereld een langlopende gedeelde server wordt

## Wanneer moet u overstappen op een ander vervoermiddel?

Ga naar `McHttp` wanneer:

- je draait een echte dedicated Bedrock-server
- u wilt een schonere productie-implementatie
- instabiliteit van de commandotunnel wordt een probleem

Ga in dat geval verder met [McHttp for BDS](/minecraft/mchttp-bds).

## Validatiechecklist

- `McWssConfig.Enabled = true`
- de wereld kan `/connect <host>:<port>` draaien
- `/voicecraft:vcconnect <LOGIN_TOKEN>` slaagt
- VoiceCraft-client maakt verbinding met het UDP-eindpunt
- `PositioningType` komt overeen tussen client en server
- bindflow werkt in het spel
- het verplaatsen van de speler verandert het nabijheidsgedrag

## Veelvoorkomende problemen

- `/connect` mislukt:
  controleer host/poort en of Bedrock websocket-verbindingen toestaat in uw omgeving.
- `vcconnect` mislukt:
  bevestig dat je `McWssConfig.LoginToken` hebt gebruikt.
- datatunnelfouten:
  bevestig dat `DataTunnelCommand` overeenkomt met het add-onpakket.
- audio maakt verbinding, maar de nabijheid is verkeerd:
  controleer de bindingsstroom, de positioneringsmodus en of er positie-updates binnenkomen.
