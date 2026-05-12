# Scenariusze integracji

Są to praktyczne wzorce wdrażania dla najpopularniejszych scenariuszy VoiceCraft.

## Scenariusz A: Serwer dedykowany Bedrock

Stos:

- `VoiceCraft.Server`
- `VoiceCraft.Addon.Core.McHttp`
- Klienci VoiceCraft

Zalecana konfiguracja:

- `McHttpConfig.Enabled = true`
- `McWssConfig.Enabled = false`
- `McTcpConfig.Enabled = false` unless also needed

Przepływ:

1. deploy `VoiceCraft.Server`
2. secure `McHttpConfig.LoginToken`
3. ensure BDS can reach `McHttpConfig.Hostname`
4. install `Core.McHttp`
5. run `voicecraft:vcconnect <hostname> <token>`
6. validate `voicecraft:vcbind <key>`

## Scenariusz B: Świat Bedrock lokalny/singleplayer

Stos:

- lokalny stos VoiceCraft
- `VoiceCraft.Addon.Core.McWss`

Przepływ:

1. enable `McWss`
2. keep `DataTunnelCommand = voicecraft:data_tunnel`
3. install `Core.McWss`
4. use `/connect`
5. run `voicecraft:vcconnect <token>`

## Scenariusz C: Direct Paper ze środowiskiem wykonawczym zarządzanym przez GeyserVoice

Stos:

- Paper / Folia
- `GeyserVoice`
- zarządzane przez wtyczki środowisko wykonawcze VoiceCraft

Przepływ:

1. install `GeyserVoice`
2. set `config.proxy.enabled = false`
3. configure `config.voicecraft.login-token`
4. enable `config.voicecraft.auto-start`
5. załaduj ponownie i zatwierdź przepływ wiązania

Jest to najprostsza konfiguracja po stronie Java, jeśli chcesz, aby wtyczka uruchamiała VoiceCraft w tle.

## Scenariusz D: Direct Paper z zewnętrznym modułem VoiceCraft

Stos:

- Paper / Folia
- `GeyserVoice`
- externally managed `VoiceCraft.Server`

Przepływ:

1. enable `McTcp` on VoiceCraft
2. set `host`, `port`, `login-token` in GeyserVoice
3. wyłącz zarządzanie czasem działania wtyczek, jeśli nie jest to potrzebne
4. załaduj ponownie i zatwierdź połączenie

## Scenariusz E: Sieć Velocity lub Bungee

Stos:

- `GeyserVoice` on proxy
- `GeyserVoice` on backend Paper servers
- `VoiceCraft.Server` with `McTcp`

Przepływ:

1. skonfiguruj proxy jako właściciela VoiceCraft
2. skonfiguruj węzły Paper backendu do pracy w trybie proxy
3. załaduj ponownie wtyczkę na wszystkich węzłach
4. zatwierdzić ruch gracza między serwerami

## Minimalny fragment konfiguracji produkcyjnej

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

## Kolejność rozwiązywania problemów

1. sprawdź dopasowanie tokena
2. sprawdź dostępność hosta/portu
3. sprawdź, czy wybrany transport jest włączony
4. sprawdź, czy topologia dodatku lub wtyczki pasuje do konfiguracji
5. dopiero wtedy zbadaj problemy na poziomie pakietu
