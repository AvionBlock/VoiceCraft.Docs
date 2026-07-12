# VoiceCraft-ecosysteem

VoiceCraft is niet slechts één binair bestand. Het is een klein ecosysteem van repositories en runtime-lagen die op verschillende manieren kunnen worden gecombineerd.

Het hoofdidee is simpel: spelers voeren `VoiceCraft.Client` uit, één backend draait of beheert `VoiceCraft.Server`, en een integratie aan Minecraft-kant stuurt de spelstatus naar de server. Welke integratie u kiest, hangt af van of uw Minecraft-runtime Bedrock, lokaal Bedrock, direct Paper of een proxynetwerk is.

## Kernopslagplaatsen

| Bewaarplaats | Wat het bezit | Gebruik het wanneer |
|------------|--------------|-------------|
| `VoiceCraft` | client-apps, zelfstandige server, protocol, gedeelde kerncode, Minecraft-gerichte transporten | je hebt de kernserver/client-runtime nodig of je wilt vanaf de bron bouwen |
| `VoiceCraft.Java` | Java-zijbrug voor Paper, Velocity en BungeeCord | u gebruikt Java, Geyser/Floodgate of een proxynetwerk |
| `VoiceCraft.Addon` | Basis add-onpakketten en scriptbaar McApi-oppervlak | je beheert Bedrock-werelden of wilt aangepast add-ongedrag |

## Implementatiekaart

```mermaid
flowchart LR
  A["VoiceCraft Client"] --> B["VoiceCraft UDP Server"]
  C["Bedrock Addon (McHttp / McWss)"] --> D["Minecraft API Transport"]
  D --> B
  E["VoiceCraft.Java (Paper / Proxy)"] --> F["McTcp Bridge"]
  F --> B
```

De client- en Minecraft-integratie maken geen verbinding via hetzelfde pad. De client gebruikt het VoiceCraft UDP-eindpunt. De Minecraft-integratie gebruikt `McHttp`, `McWss` of `McTcp`.

## Typische stapels

### Bedrock Dedicated Server

- `VoiceCraft.Server`
- `VoiceCraft.Addon.Core.McHttp`
- VoiceCraft-klanten
- BDS-script-/modulemachtigingen die nodig zijn voor de add-on

Gebruik dit voor productie-Bedrock-servers waar BDS een HTTP-eindpunt kan bereiken.

### Lokale Bedrock-wereld

- lokale VoiceCraft-stack
- `VoiceCraft.Addon.Core.McWss`
- lokale `/connect` websocketstroom

Gebruik dit voor het testen van singleplayers, demo's en add-ons.

### Java-server met Geyser/Floodgate

- `VoiceCraft.Java`
- `VoiceCraft.Server`
- optioneel een beheerde runtime gestart door `VoiceCraft.Java` zelf
- `McTcp` als de naar VoiceCraft gerichte brug

Gebruik dit wanneer de serverstatus aan de Java-zijde de bron is van spelerposities en bindingsstroom.

### Java-proxynetwerk

- `VoiceCraft.Java` op proxy
- `VoiceCraft.Java` op backend Paper-servers
- `VoiceCraft.Server` bereikt via `McTcp`
- backend-knooppunten streamen momentopnamen naar de proxy

Gebruik dit wanneer één proxy eigenaar moet zijn van de centrale VoiceCraft-verbinding voor meerdere backend-servers.

## Waarom er meerdere repo's bestaan

- `VoiceCraft` richt zich op het kernspraakplatform
- `VoiceCraft.Java` vertaalt Java- of proxy-omgevingen naar een VoiceCraft-compatibele status
- `VoiceCraft.Addon` legt wereldautomatisering, entiteitsbinding en effectcontrole op Bedrock bloot

Door deze splitsing kan elk project zich rond zijn runtime ontwikkelen: C# client/server-code in `VoiceCraft`, Java-plug-incode in `VoiceCraft.Java` en Bedrock-script/addon-code in `VoiceCraft.Addon`.

## Kiezen waar te beginnen

- Nieuwe Bedrock dedicated server:
  begin met [Snelstart](/start/quick-start) en vervolgens [McHttp for BDS](/minecraft/mchttp-bds).
- Lokale Bedrock-tests:
  beginnen met [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer).
- Java + Geyser/Floodgate:
  beginnen met [VoiceCraft.Java](/ecosystem/voicecraft-java).
- Aangepast Bedrock-gedrag:
  lees [VoiceCraft.Addon](/ecosystem/voicecraft-addon) en vervolgens [Addon API](/ecosystem/addon-api).

## Ga verder met

- [VoiceCraft-repository en build](/ecosystem/voicecraft-repository)
- [VoiceCraft.Java overview](/ecosystem/voicecraft-java)
- [VoiceCraft.Addon overview](/ecosystem/voicecraft-addon)
- [Addon API](/ecosystem/addon-api)
- [Integration recipes](/ecosystem/integration-recipes)
- [Production blueprints](/ecosystem/production-blueprints)
