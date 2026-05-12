# Integratiescenario's

Dit zijn praktische implementatiepatronen voor de meest voorkomende VoiceCraft-scenario's.

## Scenario A: Bedrock dedicated server

Stapel:

- `VoiceCraft.Server`
- `VoiceCraft.Addon.Core.McHttp`
- VoiceCraft-clients

Aanbevolen configuratie:

- `McHttpConfig.Enabled = true`
- `McWssConfig.Enabled = false`
- `McTcpConfig.Enabled = false` unless also needed

Stroom:

1. deploy `VoiceCraft.Server`
2. secure `McHttpConfig.LoginToken`
3. ensure BDS can reach `McHttpConfig.Hostname`
4. install `Core.McHttp`
5. run `voicecraft:vcconnect <hostname> <token>`
6. validate `voicecraft:vcbind <key>`

## Scenario B: Lokale/singleplayer Bedrock-wereld

Stapel:

- lokale VoiceCraft-stack
- `VoiceCraft.Addon.Core.McWss`

Stroom:

1. enable `McWss`
2. keep `DataTunnelCommand = voicecraft:data_tunnel`
3. install `Core.McWss`
4. use `/connect`
5. run `voicecraft:vcconnect <token>`

## Scenario C: Direct Paper met door GeyserVoice beheerde runtime

Stapel:

- Paper / Folia
- `GeyserVoice`
- door plug-ins beheerde VoiceCraft-runtime

Stroom:

1. install `GeyserVoice`
2. set `config.proxy.enabled = false`
3. configure `config.voicecraft.login-token`
4. enable `config.voicecraft.auto-start`
5. Laad en valideer de bindingsstroom opnieuw

Dit is de eenvoudigste installatie aan de Java-kant als je wilt dat de plug-in VoiceCraft op de achtergrond uitvoert.

## Scenario D: Direct Paper met externe VoiceCraft

Stapel:

- Paper / Folia
- `GeyserVoice`
- externally managed `VoiceCraft.Server`

Stroom:

1. enable `McTcp` on VoiceCraft
2. set `host`, `port`, `login-token` in GeyserVoice
3. schakel runtimebeheer van plug-ins uit als dit niet nodig is
4. Herlaad en valideer de verbinding

## Scenario E: Velocity- of Bungee-netwerk

Stapel:

- `GeyserVoice` on proxy
- `GeyserVoice` on backend Paper servers
- `VoiceCraft.Server` with `McTcp`

Stroom:

1. configureer de proxy als de VoiceCraft-eigenaar
2. configureer backend Paper-knooppunten voor proxymodus
3. Laad de plug-in opnieuw op alle knooppunten
4. valideer de bewegingen van spelers tussen servers

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
    "Port": 9050,
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

## Bestelling voor probleemoplossing

1. verifieer de tokenmatch
2. controleer de bereikbaarheid van de host/poort
3. Controleer of het gekozen transport is ingeschakeld
4. Controleer of de topologie van de add-on of plug-in overeenkomt met de configuratie
5. Onderzoek pas daarna problemen op pakketniveau
