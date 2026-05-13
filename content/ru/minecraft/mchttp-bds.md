# McHttp для выделенного сервера Bedrock

`McHttp` — рекомендуемый режим интеграции VoiceCraft для BDS.

Используйте это руководство, если вы запускаете выделенный сервер Bedrock и хотите, чтобы серверный аддон отправлял состояние игрока в `VoiceCraft.Server`.

Форма цели:

```text
VoiceCraft.Client -> VoiceCraft UDP endpoint
BDS + VoiceCraft.Addon.Core.McHttp -> VoiceCraft McHttp endpoint
```

## Почему рекомендуется `McHttp`

- лучше подходит для выделенных серверных сред
- проще, чем настройки на основе командного туннеля
- легче рассуждать в производстве
- хорошо сочетается с пакетом аддона Bedrock `VoiceCraft.Addon.Core.McHttp`
- не зависит от локального рабочего процесса WebSocket `/connect`, используемого `McWss`

## Требования

1. Запуск `VoiceCraft.Server`
2. `McHttpConfig.Enabled = true`
3. `VoiceCraft.Addon.Core.McHttp.zip` из релизов или готовый мировой архив из [Addon Configurator](/addon-configurator)
4. BDS с необходимыми модулями и поддержкой скриптового API
5. Доступность сети от компьютера BDS до VoiceCraft `McHttpConfig.Hostname`
6. Клиенты VoiceCraft, установленные игроками

## Конфигурация VoiceCraft на стороне сервера

Минимальный пример:

```json
{
  "McHttpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-token",
    "Hostname": "http://0.0.0.0:9050/",
    "MaxClients": 10,
    "MaxTimeoutMs": 10000,
    "DisabledPacketTypes": []
  }
}
```

Важно:

- используйте настоящий токен, никогда не оставляйте сгенерированный в производстве
- убедитесь, что хост BDS может достичь настроенного endpoint
- используйте `http://127.0.0.1:9050/` только в том случае, если BDS и VoiceCraft работают на одном хосте
- используйте LAN/публичный адрес или привязку `0.0.0.0`, когда BDS подключается с другого компьютера

## Установка аддона

Самый быстрый путь:

- [Addon Configurator](/addon-configurator), если вам нужен готовый к распаковке мировой архив
- [Download Page](/download), если вам нужен необработанный пакет выпуска аддона.

Ручной путь:

1. Извлеките `VoiceCraft.Addon.Core.McHttp.zip`.
2. Поместите `RP` в `<MCServer>/resource_packs/`.
3. Поместите `BP` в `<MCServer>/behavior_packs/`.
4. Прикрепите оба пакета к целевому миру.
5. Перезапустите BDS после изменения пакетов или разрешений.

Пакет ресурсов предоставляет видимые клиенту ресурсы, такие как значки. Пакет поведения запускает сценарии и команды, которые подключают BDS к VoiceCraft.

## Разрешения модуля

Откройте `<MCServer>/config/default/permissions.json` и убедитесь, что он содержит необходимые модули:

```json
{
  "allowed_modules": [
    "@minecraft/server-gametest",
    "@minecraft/server",
    "@minecraft/server-ui",
    "@minecraft/server-admin",
    "@minecraft/server-editor",
    "@minecraft/server-net"
  ]
}
```

Аддону требуются разрешения для сценариев, связанных с сетью, поскольку он вызывает HTTP endpoint VoiceCraft из среды выполнения BDS.

## Прикрепляйте пакеты к миру

В `<MCServer>/worlds/<YourWorld>/world_behavior_packs.json`:

```json
{
  "pack_id": "71ebb3ba-e9db-4546-9520-05f20b17dcb6",
  "version": [1, 6, 0]
}
```

В `world_resource_packs.json`:

```json
{
  "pack_id": "30b512be-77d1-4a61-bdb7-6c2f4062f889",
  "version": [1, 0, 0]
}
```

## Подключитесь в игре

Запустить:

```text
/voicecraft:vcconnect "http://<VOICECRAFT_HOST>:<PORT>" <LOGIN_TOKEN>
```

Пример:

```text
/voicecraft:vcconnect "http://127.0.0.1:9050" e4ad1f7e-4f90-4b21-bc15-6febe580bf1c
```

Используйте токен из `McHttpConfig.LoginToken`.

Если BDS работает на другом хосте, чем VoiceCraft, замените `127.0.0.1` адресом сервера VoiceCraft, видимым с компьютера BDS.

## Что происходит после подключения

После успешного подключения:

- аддон аутентифицируется с помощью VoiceCraft
- мир может создавать/обновлять сущности через McApi
- процесс привязки становится доступным через `voicecraft:vcbind`
- Становится доступным UI эффектов и синхронизация состояния на основе пакетов.

На этом этапе транспорт подключен, но каждому игроку по-прежнему нужен клиент VoiceCraft и работающий процесс привязки для proximity audio.

## Рекомендуемый порядок проверки

1. Запустите `VoiceCraft.Server` и подтвердите `McHttpConfig.Enabled = true`.
2. Запустите BDS с прикрепленным аддоном.
3. Соедините мир с `vcconnect`.
4. Убедитесь, что ошибка аутентификации не отображается.
5. Подключите клиент VoiceCraft к `VoiceCraftConfig.Port`.
6. Используйте `voicecraft:vcbind <key>`.
7. Переместите игрока в игру и убедитесь, что обновления местоположения влияют на proximity audio.
8. Убедитесь, что другие игроки слышат на ожидаемом расстоянии.

## Общие проблемы

- `HttpListenerException` в Windows:
  вам может понадобиться `netsh http add iplisten 127.0.0.1`
- Сеть контейнера или виртуальной машины:
  используйте `http://0.0.0.0:9050/` или правильный адрес локальной сети
- Хостинг-провайдер блокирует исходящий HTTP от BDS:
  этот транспорт может там не работать
- аутентификация не удалась:
  убедитесь, что команда использует `McHttpConfig.LoginToken`, а не токен `McWss` или `McTcp`
- Аддон загружается, но команды отсутствуют:
  убедитесь, что к миру подключены пакеты поведения и ресурсов, а BDS был перезапущен.
- клиент подключается, но нет proximity audio:
  подтвердите процесс привязки, `PositioningType` и обновления позиции игрока

## Читать далее

- [VoiceCraft.Addon](/ecosystem/voicecraft-addon)
- [Addon API](/ecosystem/addon-api)
- [Download Page](/download)
- [Addon Configurator](/addon-configurator)
