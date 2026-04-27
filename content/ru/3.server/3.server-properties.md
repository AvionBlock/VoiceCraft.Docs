# ServerProperties.json

Главный конфиг сервера: `config/ServerProperties.json`.

## Полный пример

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

## Телеметрия

- `TelemetryEnabled`:
  включает анонимные события запуска, heartbeat и crash-диагностику от `VoiceCraft.Server`.
- `TelemetryToken`:
  стабильный псевдонимный идентификатор, по которому группируются события с одной установки сервера.

Если телеметрия не нужна:

```json
{
  "TelemetryEnabled": false
}
```

## VoiceCraftConfig

- `Language`:
  язык логов сервера.
- `Port`:
  UDP-порт основного VoiceCraft-сервера.
- `MaxClients`:
  максимум подключений VoiceCraft-клиентов.
- `Motd`:
  текст для ping/info ответов.
- `PositioningType`:
  режим позиционирования:
  - `0 = Server`
  - `1 = Client`
- `EnableVisibilityDisplay`:
  отправлять ли клиентам индикаторы видимости.

## McWssConfig

Используется для websocket / command-tunnel Bedrock-сценариев.

- `Enabled`
- `LoginToken`
- `Hostname`
- `MaxClients`
- `MaxTimeoutMs`
- `DataTunnelCommand`
- `CommandsPerTick`
- `MaxByteLengthPerCommand`
- `DisabledPacketTypes`

## McHttpConfig

Используется для Bedrock Dedicated Server и HTTP-интеграций.

- `Enabled`
- `LoginToken`
- `Hostname`
- `MaxClients`
- `MaxTimeoutMs`
- `DisabledPacketTypes`

## McTcpConfig

Используется Java-мостами, прежде всего `GeyserVoice`.

- `Enabled`
- `LoginToken`
- `Hostname`
- `Port`
- `MaxClients`
- `MaxTimeoutMs`
- `DisabledPacketTypes`

Ключевые отличия от `McHttp` / `McWss`:

- `Hostname` это обычный host, а не URI
- `Port` задается отдельным полем
- именно этот transport важен для `GeyserVoice`

## DefaultAudioEffectsConfig

Ключ словаря это `ushort` bitmask, значение это JSON-объект эффекта.

Дефолтная матрица:

- `1`: `Visibility`
- `2`: `Proximity`
- `4`: `ProximityEcho`
- `8`: `ProximityMuffle`

## DisabledPacketTypes

Каждый transport поддерживает `DisabledPacketTypes`.

Используйте это очень осторожно:

- для дебага
- для экспериментов совместимости
- для временных mitigations

Отключение core packet-ов может сломать логин, синхронизацию сущностей и звук.
