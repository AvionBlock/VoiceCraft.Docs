# Integratie Recepten

Dit zijn praktische implementatiepatronen voor de meest voorkomende VoiceCraft-scenario's.

Gebruik deze pagina nadat u de basiscomponenten begrijpt en een concreet topologierecept nodig heeft. Elk scenario vermeldt de stapel, de belangrijkste reden om ervoor te kiezen, de configuratie die er het meest toe doet, en het validatiepunt dat bewijst dat het werkt.

## Scenario A: Bedrock Dedicated Server

Stapel:

- `VoiceCraft.Server`
- `VoiceCraft.Addon.Core.McHttp`
- VoiceCraft-klanten

Kies dit wanneer:

- BDS is de hoofdspelserver
- BDS kan een VoiceCraft HTTP-eindpunt bereiken
- je wilt het meest stabiele Bedrock-productiepad

Aanbevolen configuratie:

- `McHttpConfig.Enabled = true`
- `McWssConfig.Enabled = false`
- `McTcpConfig.Enabled = false` tenzij ook nodig

Stroom:

1. implementeren `VoiceCraft.Server`
2. veilig `McHttpConfig.LoginToken`
3. zorg ervoor dat BDS `McHttpConfig.Hostname` kan bereiken
4. installeer `Core.McHttp`
5. voer `voicecraft:vcconnect <hostname> <token>` uit
6. valideren `voicecraft:vcbind <key>`
7. verbind een cliënt en bevestig nabijheidsveranderingen met beweging

## Scenario B: Lokale/singleplayer Bedrock-wereld

Stapel:

- lokale VoiceCraft-stack
- `VoiceCraft.Addon.Core.McWss`

Kies dit wanneer:

- je test lokaal
- u voert geen BDS uit
- de `/connect` websocket-stroom is beschikbaar

Stroom:

1. schakel `McWss` in
2. behoud `DataTunnelCommand = voicecraft:data_tunnel`
3. installeer `Core.McWss`
4. gebruik `/connect`
5. voer `voicecraft:vcconnect <token>` uit
6. valideer binding en beweging

## Scenario C: Direct Paper met door VoiceCraft.Java beheerde runtime

Stapel:

- Paper / Folia
- `VoiceCraft.Java`
- door plug-ins beheerde VoiceCraft-runtime

Kies dit wanneer:

- één Paper/Folia-server moet beschikken over spraakintegratie
- je wilt minder externe diensten
- VoiceCraft.Java zou VoiceCraft moeten downloaden en starten

Stroom:

1. installeer `VoiceCraft.Java`
2. stel `config.proxy.enabled = false` in
3. configureren `config.voicecraft.transport.login-token`
4. schakel `config.voicecraft.auto-start` in
5. herlaad en valideer de bindingsstroom

Dit is de eenvoudigste installatie aan de Java-kant als je wilt dat de plug-in VoiceCraft onder de motorkap uitvoert.

## Scenario D: Direct Paper met externe VoiceCraft

Stapel:

- Paper / Folia
- `VoiceCraft.Java`
- extern beheerd `VoiceCraft.Server`

Kies dit wanneer:

- u voert VoiceCraft al uit met systemd, Docker of een paneel
- meerdere componenten hebben mogelijk dezelfde backend nodig
- u wilt externe logboeken en een herstartbeleid

Stroom:

1. schakel `McTcp` in op VoiceCraft
2. stel `config.voicecraft.transport.host`, `config.voicecraft.transport.port` en `config.voicecraft.transport.login-token` in VoiceCraft.Java in
3. schakel runtimebeheer van plug-ins uit als dit niet nodig is
4. herlaad en valideer de verbinding

## Scenario E: Velocity- of Bungee-netwerk

Stapel:

- `VoiceCraft.Java` op proxy
- `VoiceCraft.Java` op backend Paper-servers
- `VoiceCraft.Server` met `McTcp`

Kies dit wanneer:

- Velocity of BungeeCord routeert spelers via backend-servers
- de proxy moet eigenaar zijn van de VoiceCraft-verbinding
- backend-servers mogen alleen snapshots verzenden

Stroom:

1. configureer de proxy als de VoiceCraft-eigenaar
2. configureer backend Paper-knooppunten voor proxymodus
3. plug-in opnieuw laden op alle knooppunten
4. valideer de beweging van spelers tussen servers

## Minimaal productieconfiguratiefragment

```json
{
  "VoiceCraftConfig": {
    "Port": 9050,
    "MaxClients": 250,
    "PositioningType": 0
  },
  "McHttpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-strong-token",
    "Hostname": "http://0.0.0.0:9050/",
    "MaxClients": 10
  },
  "McTcpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-strong-token",
    "Hostname": "0.0.0.0",
    "Port": 9052,
    "MaxClients": 10
  },
  "McWssConfig": {
    "Enabled": false,
    "LoginToken": "replace-with-strong-token",
    "Hostname": "ws://0.0.0.0:9051/",
    "DataTunnelCommand": "voicecraft:data_tunnel"
  }
}
```

Dit fragment toont een gemengde HTTP- en TCP-implementatie. Bind `McHttp` en `McTcp` niet aan dezelfde TCP-poort. De VoiceCraft UDP-clientpoort kan het nummer `9050` delen omdat het UDP is, maar HTTP- en onbewerkte TCP-listeners hebben verschillende TCP-bindingen nodig.

## Bestelling voor probleemoplossing

1. tokenmatch verifiëren
2. controleer de bereikbaarheid van de host/poort
3. controleer of het gekozen transport is ingeschakeld
4. controleer of de topologie van de add-on of plug-in overeenkomt met de configuratie
5. onderzoek dan pas problemen op pakketniveau

## Wat ‘werken’ betekent

Een recept is pas compleet als al deze punten waar zijn:

- `VoiceCraft.Server` start zonder luisteraarfouten
- er maakt minimaal één VoiceCraft-client verbinding
- het transport aan de Minecraft-zijde authenticeert
- bindingsstroom is voltooid
- bewegen in het spel verandert het nabijheidsgedrag
- Het personeel kan verbonden klanten/entiteiten identificeren voor het oplossen van problemen
