# ServerProperties.json

Configuratiebestand van de hoofdserver: `config/ServerProperties.json`.

Dit bestand wordt aangemaakt na de eerste serverstart en wordt de blijvende bron van waarheid voor de server. Stop de server voordat u deze bewerkt, tenzij uw procesbeheerder is ontworpen om de configuratie veilig opnieuw te laden.

Gebruik deze pagina als u wilt begrijpen wat een veld bestuurt en welke velden moeten overeenkomen met de client, add-on of plug-in.

## Werkstroom bewerken

1. Stop `VoiceCraft.Server`.
2. Maak een back-up van `config/ServerProperties.json`.
3. Bewerk de relevante sectie.
4. Valideer de JSON-syntaxis.
5. Start de server opnieuw.
6. Bekijk logboeken voor configuratieparseer-, luisteraar- of auth-fouten.
7. Sluit de client en het Minecraft-transport opnieuw aan.

De belangrijkste eerste bewerkingen zijn de transportinlogtokens en hostbindingen.

## Volledig voorbeeld

```json
{
  "TelemetryEnabled": true,
  "TelemetryToken": "replace-with-stable-random-token",
  "VoiceCraftConfig": {
    "Language": "en-US",
    "Port": 9050,
    "MaxClients": 100,
    "Motd": "VoiceCraft Proximity Chat!",
    "PositioningType": 0,
    "EnableVisibilityDisplay": true
  },
  "McWssConfig": {
    "Enabled": false,
    "LoginToken": "replace-with-secure-guid",
    "Hostname": "ws://127.0.0.1:9051/",
    "MaxClients": 1,
    "MaxTimeoutMs": 10000,
    "DataTunnelCommand": "voicecraft:data_tunnel",
    "CommandsPerTick": 3,
    "MaxByteLengthPerCommand": 300,
    "DisabledPacketTypes": []
  },
  "McHttpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-secure-guid",
    "Hostname": "http://127.0.0.1:9050/",
    "MaxClients": 1,
    "MaxTimeoutMs": 10000,
    "DisabledPacketTypes": []
  },
  "McTcpConfig": {
    "Enabled": false,
    "LoginToken": "replace-with-secure-guid",
    "Hostname": "127.0.0.1",
    "Port": 9050,
    "MaxClients": 1,
    "MaxTimeoutMs": 10000,
    "DisabledPacketTypes": []
  },
  "DefaultAudioEffectsConfig": {
    "1": { "EffectType": 1 },
    "2": { "WetDry": 1, "MinRange": 0, "MaxRange": 30, "EffectType": 2 },
    "4": { "WetDry": 1, "Delay": 0.5, "Range": 30, "EffectType": 4 },
    "8": { "WetDry": 1, "EffectType": 6 }
  }
}
```

## Telemetrie

- `TelemetryEnabled`:
  maakt anonieme opstart-, hartslag- en crashdiagnostiek van `VoiceCraft.Server` mogelijk.
- `TelemetryToken`:
  stabiele pseudonieme vingerafdruk die wordt gebruikt om telemetriegebeurtenissen van één serverinstallatie te groeperen.

Telemetrie helpt beheerders de runtimestatus en versie-acceptatie te begrijpen. Het mag niet worden gebruikt als uw eigen monitoringvervanger; houd lokale logboeken en procesmonitoring bij voor productieservers.

Als u geen telemetrie wilt, stelt u het volgende in:

```json
{
  "TelemetryEnabled": false
}
```

## VoiceCraftConfig

- `Language`:
  serverlogtaal.
- `Port`:
  UDP-poort voor de kern VoiceCraft-server.
- `MaxClients`:
  maximale VoiceCraft-clientverbindingen.
- `Motd`:
  tekst geretourneerd door ping / info-reacties.
- `PositioningType`:
  positioneringsmodus:
  - `0 = Server`
  - `1 = Client`
- `EnableVisibilityDisplay`:
  of zichtbaarheidsindicatoren naar klanten worden verzonden.

`Port` is het eindpunt dat spelerclients toevoegen in de VoiceCraft-clientgebruikersinterface. Het is niet automatisch hetzelfde als elk Minecraft-transporteindpunt, zelfs als de standaardinstellingen `9050` hergebruiken.

`PositioningType` moet overeenkomen met de clientinstelling. Begin in de meeste BDS- en GeyserVoice-opstellingen met `0 = Server`.

## McWssConfig

Gebruikt voor websocket/commandotunnel Bedrock-stromen.

- `Enabled`:
  McWss in- of uitschakelen.
- `LoginToken`:
  gedeeld authenticatietoken, meestal gebruikt met `/voicecraft:vcconnect <token>`.
- `Hostname`:
  websocket-host zoals `ws://0.0.0.0:9051/`.
- `MaxClients`:
  maximale McWss-klanten.
- `MaxTimeoutMs`:
  time-out bij inactiviteit.
- `DataTunnelCommand`:
  opdrachtnaam die wordt gebruikt voor de datatunnel, meestal `voicecraft:data_tunnel`.
- `CommandsPerTick`:
  hoeveel opdrachtpakketten er per tik worden doorgestuurd.
- `MaxByteLengthPerCommand`:
  payloadbudget (bytes) per opdrachtaanroep.
- `DisabledPacketTypes`:
  pakkettypen geblokkeerd op dit transport.

Gebruik `McWss` voor lokale werelden en testen. De opdrachttunnel is afhankelijk van `DataTunnelCommand`; het slechts aan één kant veranderen verbreekt het transport.

## McHttpConfig

Gebruikt voor Bedrock Dedicated Server en HTTP-gebaseerde integraties.

- `Enabled`
- `LoginToken`
- `Hostname`
- `MaxClients`
- `MaxTimeoutMs`
- `DisabledPacketTypes`

Typische BDS-binding:

```json
{
  "Enabled": true,
  "LoginToken": "replace-with-token",
  "Hostname": "http://0.0.0.0:9050/",
  "MaxClients": 10,
  "MaxTimeoutMs": 10000,
  "DisabledPacketTypes": []
}
```

Gebruik `McHttp` wanneer BDS het VoiceCraft HTTP-eindpunt kan bereiken. Als BDS en VoiceCraft op verschillende machines draaien, zal `127.0.0.1` vanuit het perspectief van BDS naar de verkeerde host verwijzen.

## McTcpConfig

Gebruikt door bruggen aan de Java-zijde, vooral `GeyserVoice`.

- `Enabled`:
  McTcp in- of uitschakelen.
- `LoginToken`:
  gedeeld authentificatietoken voor de TCP-bridge.
- `Hostname`:
  bind de hostnaam, bijvoorbeeld `127.0.0.1` of `0.0.0.0`.
- `Port`:
  TCP-luisterpoort.
- `MaxClients`:
  maximale transportklanten.
- `MaxTimeoutMs`:
  time-out bij inactiviteit.
- `DisabledPacketTypes`:
  pakkettypen geblokkeerd op dit transport.

Belangrijke verschillen vergeleken met `McHttp` / `McWss`:

- `Hostname` is een gewone host, geen URI
- `Port` is een apart veld
- dit is het transport dat het meest relevant is voor `GeyserVoice`

Gebruik `McTcp` wanneer een Java-plug-in of proxy eigenaar is van het Minecraft-statuspad. De waarden `GeyserVoice` `config.voicecraft.transport.host`, `config.voicecraft.transport.port` en `config.voicecraft.transport.login-token` moeten overeenkomen met deze sectie.

## StandaardAudioEffectsConfig

Woordenboeksleutel is een `ushort` bitmasker, waarde is een effect-JSON-object.

Standaardmatrix:

- `1`:
  `Visibility`
- `2`:
  `Proximity`
- `4`:
  `ProximityEcho`
- `8`:
  `ProximityMuffle`

U kunt het woordenboek overschrijven of uitbreiden om het standaardeffectgedrag voor nieuwe entiteiten te wijzigen.

Wijzig deze alleen als u de effectpijplijn begrijpt. Voor de meeste implementaties moet u het basisbindings- en nabijheidsgedrag verifiëren voordat u de standaardeffecten wijzigt.

## Uitgeschakelde pakkettypen

Elk transport ondersteunt `DisabledPacketTypes`.

Gebruik dit zorgvuldig:

- het is bedoeld voor foutopsporing, compatibiliteitsexperimenten of het beperken van noodsituaties
- Het uitschakelen van kernpakketten kan het inloggen, de entiteitssynchronisatie of de audiolevering verbreken
- verander dit niet in de productie, tenzij u de pakketstroom begrijpt

Als een transport alleen werkt nadat pakkettypen zijn uitgeschakeld, beschouw dit dan als een compatibiliteitsoplossing en documenteer waarom dit nodig is.

## Praktische productiepatronen

### Bedrock Dedicated Server

- `McHttpConfig.Enabled = true`
- `McWssConfig.Enabled = false`
- `McTcpConfig.Enabled = false` tenzij je ook Java-side bridges gebruikt

### Lokale wereld / singleplayer

- `McWssConfig.Enabled = true`
- `McHttpConfig.Enabled = false` of optioneel

### GeyserVoice / Java-brug

- `McTcpConfig.Enabled = true`
- `McHttpConfig.Enabled = false` of optioneel
- `McWssConfig.Enabled = false` tenzij ook elders nodig

## Minimale topologievoorbeelden

### Alleen BDS

```json
{
  "VoiceCraftConfig": {
    "Port": 9050,
    "PositioningType": 0
  },
  "McHttpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-strong-token",
    "Hostname": "http://0.0.0.0:9050/"
  },
  "McWssConfig": {
    "Enabled": false
  },
  "McTcpConfig": {
    "Enabled": false
  }
}
```

### Alleen Java-bridge

```json
{
  "VoiceCraftConfig": {
    "Port": 9050,
    "PositioningType": 0
  },
  "McTcpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-strong-token",
    "Hostname": "0.0.0.0",
    "Port": 9050
  },
  "McHttpConfig": {
    "Enabled": false
  },
  "McWssConfig": {
    "Enabled": false
  }
}
```

## Belangrijke opmerkingen

- vervang altijd de gegenereerde `LoginToken`-waarden
- met `Hostname: http://0.0.0.0:9050/` bindt de HTTP-listener aan een jokertekenadres
- met `McTcpConfig.Hostname = 0.0.0.0` wordt de TCP-brug op afstand bereikbaar
- houd `PositioningType` afgestemd op de clientconfiguratie
- bewaar een kopie van de laatst bekende goede configuratie vóór upgrades
- gebruik runtime-overrides alleen als uw procesmanager deze consequent doorgeeft

Zie ook:

- [Runtime-overschrijvingen](/server/runtime-overrides)
- [Transportmodi](/server/transports)
