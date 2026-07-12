# ServerProperties.json

Основной файл конфигурации сервера: `config/ServerProperties.json`.

Файл создаётся после первого запуска сервера и становится постоянным source of truth для `VoiceCraft.Server`. Перед ручным редактированием остановите сервер.

В VoiceCraft `1.7.0` знакомые transport sections остаются, но добавляются поля NAT port mapping и меняется модель кастомизации эффектов через entity properties.

## Workflow редактирования

1. Остановите `VoiceCraft.Server`.
2. Сделайте бэкап `config/ServerProperties.json`.
3. Измените нужный раздел.
4. Проверьте JSON syntax.
5. Запустите сервер снова.
6. Проверьте logs на config parsing, listener, NAT mapping и auth errors.
7. Переподключите client и Minecraft transport.

Самые важные первые правки — transport login tokens и host bindings.

## Пример

```json
{
  "TelemetryEnabled": true,
  "TelemetryToken": "replace-with-stable-random-token",
  "VoiceCraftConfig": {
    "Language": "en-US",
    "Port": 9050,
    "ExternalPort": 0,
    "PortMappingLifetimeMinutes": 60,
    "PortMappingTimeoutSeconds": 5,
    "MaxClients": 100,
    "Motd": "VoiceCraft Proximity Chat!",
    "PositioningType": 0,
    "EnableVisibilityDisplay": true,
    "AutoOpenPort": false
  },
  "McHttpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-secure-guid",
    "Hostname": "http://127.0.0.1:9050/",
    "ExternalPort": 0,
    "PortMappingLifetimeMinutes": 60,
    "PortMappingTimeoutSeconds": 5,
    "MaxClients": 1,
    "MaxTimeoutMs": 10000,
    "DisabledPacketTypes": [],
    "AutoOpenPort": false
  },
  "McTcpConfig": {
    "Enabled": false,
    "LoginToken": "replace-with-secure-guid",
    "Hostname": "127.0.0.1",
    "Port": 9050,
    "ExternalPort": 0,
    "PortMappingLifetimeMinutes": 60,
    "PortMappingTimeoutSeconds": 5,
    "MaxClients": 1,
    "MaxTimeoutMs": 10000,
    "DisabledPacketTypes": [],
    "AutoOpenPort": false
  },
  "McWssConfig": {
    "Enabled": false,
    "LoginToken": "replace-with-secure-guid",
    "Hostname": "ws://127.0.0.1:9051/",
    "ExternalPort": 0,
    "PortMappingLifetimeMinutes": 60,
    "PortMappingTimeoutSeconds": 5,
    "MaxClients": 1,
    "MaxTimeoutMs": 10000,
    "DataTunnelCommand": "voicecraft:data_tunnel",
    "CommandsPerTick": 3,
    "MaxByteLengthPerCommand": 300,
    "DisabledPacketTypes": [],
    "AutoOpenPort": false
  }
}
```

## VoiceCraftConfig

- `Language`: язык server logs.
- `Port`: UDP port core VoiceCraft server.
- `ExternalPort`: внешний UDP port для automatic port mapping. `0` означает использовать `Port`.
- `PortMappingLifetimeMinutes`: requested NAT mapping lifetime.
- `PortMappingTimeoutSeconds`: timeout для попытки port mapping.
- `MaxClients`: максимум VoiceCraft client connections.
- `Motd`: текст ping/info responses.
- `PositioningType`: `0 = Server`, `1 = Client`.
- `EnableVisibilityDisplay`: отправлять ли visibility indicators клиентам.
- `AutoOpenPort`: пытаться ли открыть UDP voice port через NAT mapping.

`Port` — endpoint для player clients. Это не автоматически тот же endpoint, что у Minecraft transports, даже если defaults используют `9050`.

## NAT port mapping fields

`1.7.0` добавляет в `VoiceCraftConfig`, `McHttpConfig`, `McTcpConfig`, `McWssConfig`:

- `AutoOpenPort`
- `ExternalPort`
- `PortMappingLifetimeMinutes`
- `PortMappingTimeoutSeconds`

Когда `AutoOpenPort` включён, VoiceCraft пытается создать временный router mapping через `OpenPort.Net`.

Оставляйте его выключенным для VPS, Docker, game panels, reverse proxies, tunnels и manually managed firewalls. Для `McHttp` и `McWss` internal port берётся из `Hostname`; loopback-bound transports не открываются наружу.

## McHttpConfig

Используется для Bedrock Dedicated Server и HTTP integrations.

Ключевые поля:

- `Enabled`
- `LoginToken`
- `Hostname`
- `ExternalPort`
- `PortMappingLifetimeMinutes`
- `PortMappingTimeoutSeconds`
- `MaxClients`
- `MaxTimeoutMs`
- `DisabledPacketTypes`
- `AutoOpenPort`

Типичный BDS binding:

```json
{
  "Enabled": true,
  "LoginToken": "replace-with-token",
  "Hostname": "http://0.0.0.0:9050/",
  "AutoOpenPort": false
}
```

Если BDS и VoiceCraft на разных машинах, `127.0.0.1` будет указывать не туда с точки зрения BDS.

## McTcpConfig

Используется Java-side bridges, особенно `VoiceCraft.Java`.

Отличия:

- `Hostname` — plain host, не URI
- `Port` — отдельное поле
- чаще всего нужен для Java/Geyser/proxy топологий

Если bridge локальный, bind'ите `127.0.0.1`. Если bridge на другой машине, используйте reachable address и закрывайте firewall.

## McWssConfig

Используется для websocket/command-tunnel Bedrock flows.

Важные поля:

- `DataTunnelCommand`
- `CommandsPerTick`
- `MaxByteLengthPerCommand`

Используйте `McWss` для local worlds и тестов. Для production BDS обычно лучше `McHttp`.

## DefaultAudioEffectsConfig

Ключ словаря — `ushort` bitmask, значение — effect JSON object.

Default matrix:

- `1`: `Visibility`
- `2`: `Proximity`
- `4`: `ProximityEcho`
- `8`: `ProximityMuffle`

В `1.7.0` default effects сохраняют свой bitmask. Effects создают per-entity processors, а custom entity properties могут переопределять поддерживаемые поля эффекта. Это замена старой cave/muffle factor customization.

## DisabledPacketTypes

Каждый transport поддерживает `DisabledPacketTypes`.

Используйте осторожно:

- это для debugging, compatibility experiments или emergency mitigation
- отключение core packets может сломать login, events, entity sync или audio delivery
- не меняйте в production без понимания packet flow

## Production patterns

### Bedrock Dedicated Server

- `McHttpConfig.Enabled = true`
- `McWssConfig.Enabled = false`
- `McTcpConfig.Enabled = false`, если нет Java-side bridges
- `AutoOpenPort = false`, если это не LAN/home-router deployment

### Local world / singleplayer

- `McWssConfig.Enabled = true`
- `McHttpConfig.Enabled = false` или optional
- держите `McWssConfig.Hostname` loopback-bound, если remote access не нужен

### VoiceCraft.Java / Java bridge

- `McTcpConfig.Enabled = true`
- `McHttpConfig.Enabled = false` или optional
- `McWssConfig.Enabled = false`, если отдельно не нужен

## Важные заметки

- всегда заменяйте generated `LoginToken`
- `Hostname: http://0.0.0.0:9050/` bind'ит HTTP listener на wildcard address
- `McTcpConfig.Hostname = 0.0.0.0` делает TCP bridge reachable извне
- держите `PositioningType` одинаковым с client configuration
- храните last known-good config перед upgrade

См. также:

- [Runtime Overrides](/server/runtime-overrides)
- [Transport Modes](/server/transports)
