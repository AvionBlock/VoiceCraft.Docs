# ServerProperties.json

Конфигурационный файл основного сервера: `config/ServerProperties.json`.

Этот файл создается после первого запуска сервера и становится постоянным источником истины для сервера. Остановите сервер перед его редактированием, если ваш менеджер процессов не предназначен для безопасной перезагрузки конфигурации.

Используйте эту страницу, когда вам нужно понять, чем управляет поле и какие поля должны соответствовать клиенту, аддону или плагину.

## Редактировать рабочий процесс

1. Остановите `VoiceCraft.Server`.
2. Создайте резервную копию `config/ServerProperties.json`.
3. Отредактируйте соответствующий раздел.
4. Проверьте синтаксис JSON.
5. Запустите сервер снова.
6. Просматривайте журналы на предмет ошибок синтаксического анализа конфигурации, прослушивания или аутентификации.
7. Переподключите клиент и транспорт Minecraft.

Наиболее важные первые изменения — это токены входа в транспорт и привязки хостов.

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
  включает анонимный запуск, контрольную проверку и диагностику сбоев из `VoiceCraft.Server`.
- `TelemetryToken`:
  стабильный псевдонимный отпечаток, используемый для группировки событий телеметрии с одной установки сервера.

Телеметрия помогает сопровождающим понять состояние среды выполнения и принятие версий. Его не следует использовать в качестве собственной замены мониторинга; ведите локальные журналы и отслеживайте процессы для производственных серверов.

Если вам не нужна телеметрия, установите:

```json
{
  "TelemetryEnabled": false
}
```

## VoiceCraftConfig

- `Language`:
  язык журнала сервера.
- `Port`:
  UDP-порт для основного сервера VoiceCraft.
- `MaxClients`:
  максимальное количество клиентских подключений VoiceCraft.
- `Motd`:
  текст, возвращаемый ответами ping/info.
- `PositioningType`:
  режим позиционирования:
  - `0 = Server`
  - `1 = Client`
- `EnableVisibilityDisplay`:
  отправляются ли клиентам показатели видимости.

`Port` — это endpoint, который клиенты игроков добавляют в UI клиента VoiceCraft. Это не то же самое, что каждый endpoint транспорта Minecraft, даже если по умолчанию повторно используется `9050`.

`PositioningType` должен соответствовать настройке клиента. В большинстве настроек BDS и GeyserVoice начните с `0 = Server`.

## McWssConfig

Используется для потоков WebSocket/командных туннелей Bedrock.

- `Enabled`:
  включить или отключить McWss.
- `LoginToken`:
  общий токен аутентификации, обычно используемый с `/voicecraft:vcconnect <token>`.
- `Hostname`:
  хост WebSocket, например `ws://0.0.0.0:9051/`.
- `MaxClients`:
  максимальное количество клиентов McWss.
- `MaxTimeoutMs`:
  тайм-аут бездействия.
- `DataTunnelCommand`:
  имя команды, используемое для туннеля данных, обычно `voicecraft:data_tunnel`.
- `CommandsPerTick`:
  сколько командных пакетов пересылается за такт.
- `MaxByteLengthPerCommand`:
  бюджет полезной нагрузки (в байтах) на вызов команды.
- `DisabledPacketTypes`:
  типы пакетов, заблокированные на этом транспорте.

Используйте `McWss` для локальных миров и тестирования. Командный туннель зависит от `DataTunnelCommand`; изменение его только на одной стороне ломает транспорт.

## Макхттпконфиг

Используется для выделенного сервера Bedrock и интеграции на основе HTTP.

- `Enabled`
- `LoginToken`
- `Hostname`
- `MaxClients`
- `MaxTimeoutMs`
- `DisabledPacketTypes`

Типичная привязка BDS:

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

Используйте `McHttp`, если BDS может достичь HTTP endpoint VoiceCraft. Если BDS и VoiceCraft работают на разных машинах, `127.0.0.1` будет указывать на неправильный хост с точки зрения BDS.

## McTcpConfig

Используется мостами на стороне Java, особенно `GeyserVoice`.

- `Enabled`:
  включить или отключить McTcp.
- `LoginToken`:
  общий токен аутентификации для TCP-моста.
- `Hostname`:
  привяжите имя хоста, например `127.0.0.1` или `0.0.0.0`.
- `Port`:
  Порт прослушивания TCP.
- `MaxClients`:
  Максимум транспортных клиентов.
- `MaxTimeoutMs`:
  тайм-аут бездействия.
- `DisabledPacketTypes`:
  типы пакетов, заблокированные на этом транспорте.

Важные отличия от `McHttp`/`McWss`:

- `Hostname` — это обычный хост, а не URI.
- `Port` — отдельное поле.
- это транспорт, наиболее подходящий для `GeyserVoice`

Используйте `McTcp`, когда плагин или прокси-сервер на стороне Java владеет путем к состоянию Minecraft. Значения `GeyserVoice`, `config.voicecraft.transport.host`, `config.voicecraft.transport.port` и `config.voicecraft.transport.login-token` должны соответствовать этому разделу.

## ДефолтАудиоЭффектсКонфиг

Ключ словаря — это битовая маска `ushort`, значение — объект JSON эффекта.

Матрица по умолчанию:

- `1`:
  `Visibility`
- `2`:
  `Proximity`
- `4`:
  `ProximityEcho`
- `8`:
  `ProximityMuffle`

Вы можете переопределить или расширить словарь, чтобы изменить поведение эффекта по умолчанию для новых объектов.

Изменяйте их только тогда, когда вы понимаете конвейер эффектов. В большинстве случаев перед изменением эффектов по умолчанию проверьте базовое поведение привязки и proximity audio.

## Типы отключенных пакетов

Каждый транспорт поддерживает `DisabledPacketTypes`.

Используйте это осторожно:

- он предназначен для отладки, экспериментов по совместимости или устранения аварийных ситуаций.
- отключение основных пакетов может нарушить вход в систему, синхронизацию объектов или доставку звука.
- не меняйте это в производстве, если не понимаете поток пакетов

Если транспорт работает только после отключения типов пакетов, рассматривайте это как обходной путь совместимости и задокументируйте, почему он необходим.

## Практические модели производства

### Выделенный сервер Bedrock

- `McHttpConfig.Enabled = true`
- `McWssConfig.Enabled = false`
- `McTcpConfig.Enabled = false`, если вы также не используете мосты на стороне Java

### Локальный мир / одиночная игра

- `McWssConfig.Enabled = true`
- `McHttpConfig.Enabled = false` или необязательно

### GeyserVoice / Java-мост

- `McTcpConfig.Enabled = true`
- `McHttpConfig.Enabled = false` или необязательно
- `McWssConfig.Enabled = false`, если это не требуется в другом месте

## Примеры минимальной топологии

### только БДС

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

### Только мост Java

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

## Важные примечания

- всегда заменяйте сгенерированные значения `LoginToken`
- с `Hostname: http://0.0.0.0:9050/` прослушиватель HTTP привязывается к подстановочному адресу
- с `McTcpConfig.Hostname = 0.0.0.0` TCP-мост становится доступным удаленно
- сохраняйте соответствие `PositioningType` конфигурации клиента
- перед обновлением сохраняйте копию последней заведомо исправной конфигурации
- используйте переопределения во время выполнения только тогда, когда ваш менеджер процессов будет передавать их последовательно

См. также:

- [Runtime Overrides](/server/runtime-overrides)
- [Transport Modes](/server/transports)
