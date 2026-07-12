# Транспортные режимы

VoiceCraft имеет несколько Minecraft-facing transport layers. Правильный выбор транспорта важен для стабильности и простоты deployment.

Transport — это путь, по которому Minecraft automation отправляет state в `VoiceCraft.Server`. Он отделён от UDP voice endpoint, которым пользуются player clients.

В VoiceCraft `1.7.0` остаются три transport families, но event stream теперь использует event request packets, а effect customization — entity properties.

## Краткое сравнение

| Transport | Типичный consumer | Endpoint | Для чего | Token field |
|-----------|-------------------|----------|----------|-------------|
| `McHttp` | `VoiceCraft.Addon.Core.McHttp` | HTTP endpoint | Bedrock Dedicated Server | `McHttpConfig.LoginToken` |
| `McWss` | `VoiceCraft.Addon.Core.McWss` | websocket + command tunnel | local Bedrock worlds и testing | `McWssConfig.LoginToken` |
| `McTcp` | Java-side bridge, например `VoiceCraft.Java` | raw TCP bridge | Java, Geyser, proxy, Paper bridge | `McTcpConfig.LoginToken` |

Выбирайте transport по Minecraft-side component, а не только по номеру порта.

## Общее поведение 1.7

Все transports разделяют 1.7 McApi model:

- low-level events оборачиваются в `EventRequest`
- entity custom properties можно устанавливать и слушать
- `OnEntityPropertyUpdated` сообщает о property changes
- cave/muffle factor packets больше не customization path
- каждый transport может опционально пробовать NAT port mapping через `AutoOpenPort`

Custom consumers нужно обновить перед подключением к 1.7 server.

## McHttp

`McHttp` поднимает HTTP endpoint, к которому может обращаться Bedrock Dedicated Server addon.

```json
{
  "McHttpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-token",
    "Hostname": "http://0.0.0.0:9050/",
    "AutoOpenPort": false
  }
}
```

Используйте `http://127.0.0.1:9050/` только когда BDS и VoiceCraft запущены на одной машине.

## McWss

`McWss` поднимает websocket endpoint и использует command tunnel внутри Bedrock world.

```json
{
  "McWssConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-token",
    "Hostname": "ws://127.0.0.1:9051/",
    "DataTunnelCommand": "voicecraft:data_tunnel",
    "AutoOpenPort": false
  }
}
```

Используйте это для local `/connect` flow. Для production BDS обычно выбирайте `McHttp`.

## McTcp

`McTcp` — raw TCP bridge для Java-side infrastructure.

```json
{
  "McTcpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-token",
    "Hostname": "0.0.0.0",
    "Port": 9050,
    "AutoOpenPort": false
  }
}
```

Если `VoiceCraft.Java` на той же машине, bind'ите `127.0.0.1`. Если он на другой машине, bind'ите reachable address и ограничьте firewall.

## NAT port mapping

Каждый transport config содержит:

- `AutoOpenPort`
- `ExternalPort`
- `PortMappingLifetimeMinutes`
- `PortMappingTimeoutSeconds`

Когда включено, VoiceCraft пытается открыть router mapping для transport. Это полезно для home-hosted servers с UPnP/NAT-PMP.

Обычно это не нужно для VPS, Docker/panel hosting, reverse proxies, tunnels и loopback-only integrations.

## Что выбрать?

### Bedrock Dedicated Server

Используйте `McHttp`.

Дальше: [McHttp для BDS](/minecraft/mchttp-bds).

### Bedrock singleplayer / local world

Используйте `McWss`.

Дальше: [McWss для singleplayer worlds](/minecraft/mcwss-singleplayer).

### Java + Geyser/Floodgate

Используйте `McTcp` через `VoiceCraft.Java` или другой Java-side bridge.

Дальше: [VoiceCraft.Java](/ecosystem/voicecraft-java).

## Security advice

- замените все login tokens
- bind'ите `127.0.0.1`, когда consumer локальный
- bind'ите `0.0.0.0` только когда нужен remote access
- держите `AutoOpenPort` выключенным, если automatic router mappings не нужны
- firewall rules должны быть минимальными
- не expose'те inactive transports

## Validation checklist

- выбранный transport имеет `Enabled = true`
- matching addon/plugin установлен и поддерживает 1.7 packets
- endpoint reachable с Minecraft-side runtime
- addon/plugin token совпадает с правильным `LoginToken`
- logs показывают подключение transport consumer
- bind flow работает после transport login
- custom property events приходят, если integration использует effect overrides
