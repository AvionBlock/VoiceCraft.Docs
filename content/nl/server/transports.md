# Transportmodi

VoiceCraft heeft meerdere naar Minecraft gerichte transportlagen. Het kiezen van de juiste is belangrijk voor de stabiliteit en eenvoud van implementatie.

Het transport is het pad dat door Minecraft-automatisering wordt gebruikt om de status naar `VoiceCraft.Server` te sturen. Het staat los van het UDP-spraakeindpunt dat door spelerclients wordt gebruikt.

Gebruik deze pagina voordat u `McHttpConfig`, `McWssConfig` of `McTcpConfig` bewerkt.

## Snelle vergelijking

| Vervoer | Typische consument | Vorm van het eindpunt | Beste voor | Tokenveld |
|-----------|------------------|----------------|----------|-------------|
| `McHttp` | `VoiceCraft.Addon.Core.McHttp` | HTTP-eindpunt | Bedrock speciale server | `McHttpConfig.LoginToken` |
| `McWss` | `VoiceCraft.Addon.Core.McWss` | websocket + opdrachttunnel | lokale Bedrock-werelden en testen | `McWssConfig.LoginToken` |
| `McTcp` | `GeyserVoice` | onbewerkte TCP-brug | Java-, Geyser-, proxy- of Paper Bridge-scenario's | `McTcpConfig.LoginToken` |

Kies geen transport uitsluitend op basis van poortnummer. Kies het op basis van welk Minecraft-onderdeel verbinding zal maken.

## McHttp

`McHttp` stelt een HTTP-eindpunt bloot dat een Bedrock Dedicated Server-add-on kan aanroepen.

### Beste gebruiksscenario's

- Bedrock speciale server
- stabiele gescripte Bedrock-werelden
- omgevingen waarin de gameserver een HTTP-eindpunt kan aanroepen

### Sterke punten

- eenvoudigste productietransport voor BDS
- eenvoudig eindpuntmodel
- goed geschikt voor panelen, omgekeerde netwerklay-outs en speciale hosts

### Afwegingen

- vereist netwerkbereikbaarheid van de Bedrock-server naar VoiceCraft
- kan bij sommige hostingproviders geblokkeerd zijn
- heeft de door de add-on vereiste BDS-script/module-machtigingen nodig

### Typische configuratie

```json
{
  "McHttpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-token",
    "Hostname": "http://0.0.0.0:9050/"
  }
}
```

Gebruik `http://127.0.0.1:9050/` alleen als BDS en VoiceCraft op dezelfde host draaien.

## McWss

`McWss` stelt een websocket-eindpunt bloot en gebruikt een opdrachttunnel in de Bedrock-wereld.

### Beste gebruiksscenario's

- lokale Bedrock-werelden
- singleplayer-testen
- instellingen met behulp van `/connect` en opdrachttunneling

### Sterke punten

- werkt zonder een zelfstandige BDS HTTP-workflow
- praktisch voor ontwikkeling en lokale demo's

### Afwegingen

- minder stabiel onder zware belastingdruk
- gevoelig voor `CommandsPerTick` en limieten voor het segmenteren van de payload
- meestal niet de eerste keuze voor openbare productieomgevingen

### Typische configuratie

```json
{
  "McWssConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-token",
    "Hostname": "ws://127.0.0.1:9051/",
    "DataTunnelCommand": "voicecraft:data_tunnel"
  }
}
```

Gebruik dit wanneer u de lokale `/connect`-stroom nodig heeft. Voor een echte BDS-productieserver geeft u de voorkeur aan `McHttp`.

## McTcp

`McTcp` onthult een onbewerkte TCP-brug die wordt gebruikt door de Java-infrastructuur.

### Beste gebruiksscenario's

- `GeyserVoice`
- Java-server of proxybridges
- directe Paper-runtime-integratie

### Sterke punten

- direct bridge-transport voor plug-ins aan Java-zijde
- vermijdt de semantiek van HTTP-eindpunten wanneer een native TCP-bridge beter is
- sluit aan bij de huidige `GeyserVoice`-architectuur

### Afwegingen

- een andere haven om te beheren
- het handigst als je daadwerkelijk een Java-side bridge gebruikt
- niet gebruikt door de Bedrock add-onpakketten

### Typische configuratie

```json
{
  "McTcpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-token",
    "Hostname": "0.0.0.0",
    "Port": 9050
  }
}
```

Als `GeyserVoice` op dezelfde machine draait als VoiceCraft, bind dan aan `127.0.0.1`. Als het ergens anders draait, bind dan aan een adres dat de plug-in kan bereiken en beperk de firewall.

## Welke moet je kiezen?

### Bedrock speciale server

Gebruik `McHttp`.

Ga verder met [McHttp for BDS](/minecraft/mchttp-bds).

### Basis singleplayer / lokale wereld

Gebruik `McWss`.

Ga verder met [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer).

### Java + Geiser/Sluizen

Gebruik `McTcp` tot en met `GeyserVoice`.

Ga verder met [GeyserVoice](/ecosystem/geyservoice).

### Gemengd netwerk

Je kunt meer dan één transport uitvoeren, maar laat alleen zien wat je echt nodig hebt.

Veel voorkomende gemengde gevallen:

- Bedrock BDS plus Java-bridge:
  schakel `McHttp` en `McTcp` in
- lokaal testen terwijl de productie op BDS blijft:
  voer een aparte testservermap uit in plaats van productietokens opnieuw te gebruiken
- proxy-netwerk:
  doorgaans alleen `McTcp` zichtbaar voor de proxy-eigenaar

## Beveiligingsadvies

- vervang alle inlogtokens
- binden aan `127.0.0.1` wanneer de consument lokaal is
- bind alleen aan `0.0.0.0` wanneer externe toegang vereist is
- houd de firewallregels per transport strak
- stel inactieve transporten niet bloot alleen maar omdat ze beschikbaar zijn

## Validatiechecklist

- gekozen transport `Enabled` veld is `true`
- de bijpassende add-on/plug-in is geïnstalleerd
- eindpunthost/-poort is bereikbaar vanaf de runtime aan Minecraft-zijde
- het add-on/plugin-token komt overeen met de juiste `LoginToken`
- serverlogboeken tonen de transportconsument die verbinding maakt
- bindflow werkt na inloggen op transport
