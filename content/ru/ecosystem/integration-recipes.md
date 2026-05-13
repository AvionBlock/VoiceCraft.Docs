# Рецепты интеграции

Это практические шаблоны развертывания для наиболее распространенных сценариев VoiceCraft.

Используйте эту страницу после того, как вы поймете основные компоненты и вам понадобится конкретный рецепт топологии. В каждом сценарии указан стек, основная причина его выбора, наиболее важная конфигурация и точка проверки, подтверждающая его работу.

## Сценарий А. Выделенный сервер Bedrock

Стек:

- `VoiceCraft.Server`
- `VoiceCraft.Addon.Core.McHttp`
- Клиенты VoiceCraft

Выбирайте это, когда:

- BDS — основной игровой сервер
- BDS может достичь HTTP endpoint VoiceCraft.
- вам нужен наиболее стабильный путь производства Bedrock

Рекомендуемая конфигурация:

- `McHttpConfig.Enabled = true`
- `McWssConfig.Enabled = false`
- `McTcpConfig.Enabled = false`, если это не требуется

Поток:

1. развернуть `VoiceCraft.Server`
2. безопасный `McHttpConfig.LoginToken`
3. убедиться, что BDS может достичь `McHttpConfig.Hostname`
4. установить `Core.McHttp`
5. запустите `voicecraft:vcconnect <hostname> <token>`
6. подтвердить `voicecraft:vcbind <key>`
7. подключить клиента и подтвердить изменение proximity audio при движении

## Сценарий Б: Локальный/одиночный мир Bedrock.

Стек:

- локальный стек VoiceCraft
- `VoiceCraft.Addon.Core.McWss`

Выбирайте это, когда:

- вы тестируете локально
- ты не запускаешь BDS
- доступен поток WebSocket `/connect`

Поток:

1. включить `McWss`
2. оставьте `DataTunnelCommand = voicecraft:data_tunnel`
3. установить `Core.McWss`
4. используйте `/connect`
5. запустите `voicecraft:vcconnect <token>`
6. проверить привязку и движение

## Сценарий C: Direct Paper со средой выполнения, управляемой GeyserVoice

Стек:

- Paper/Folia
- `GeyserVoice`
- среда выполнения VoiceCraft, управляемая плагином

Выбирайте это, когда:

- один сервер Paper/Folia должен иметь голосовую интеграцию
- вам нужно меньше внешних сервисов
- GeyserVoice должен скачать и запустить VoiceCraft.

Поток:

1. установить `GeyserVoice`
2. установите `config.proxy.enabled = false`
3. настроить `config.voicecraft.transport.login-token`
4. включить `config.voicecraft.auto-start`
5. перезагрузите и проверьте процесс привязки

Это простейшая настройка на стороне Java, когда вы хотите, чтобы плагин запускал VoiceCraft «под капотом».

## Сценарий D: Direct Paper с внешним VoiceCraft

Стек:

- Paper/Folia
- `GeyserVoice`
- внешнее управление `VoiceCraft.Server`

Выбирайте это, когда:

- вы уже запускаете VoiceCraft с помощью systemd, Docker или панели
- нескольким компонентам может потребоваться один и тот же бэкэнд
- вам нужны внешние журналы и политика перезапуска

Поток:

1. включить `McTcp` в VoiceCraft
2. установите `config.voicecraft.transport.host`, `config.voicecraft.transport.port` и `config.voicecraft.transport.login-token` в GeyserVoice
3. отключите управление временем выполнения плагина, если оно не требуется
4. перезагрузите и подтвердите соединение

## Сценарий E: сеть Velocity или Bungee

Стек:

- `GeyserVoice` на прокси
- `GeyserVoice` на внутренних серверах Paper
- `VoiceCraft.Server` с `McTcp`

Выбирайте это, когда:

- Velocity или BungeeCord маршрутизирует игроков между внутренними серверами.
- прокси-сервер должен владеть соединением VoiceCraft
- Внутренние серверы должны отправлять только снимки

Поток:

1. настроить прокси как владельца VoiceCraft
2. настроить серверные узлы Paper для режима прокси
3. перезагрузить плагин на всех узлах
4. проверять перемещение игроков между серверами

## Минимальный фрагмент производственной конфигурации

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

В этом фрагменте показано смешанное развертывание HTTP + TCP. Не привязывайте `McHttp` и `McTcp` к одному TCP-порту. Порт клиента VoiceCraft UDP может использовать общий номер `9050`, поскольку это UDP, но прослушивателям HTTP и необработанному TCP необходимы отдельные привязки TCP.

## Порядок устранения неполадок

1. проверить соответствие токена
2. проверить доступность хоста/порта
3. убедитесь, что выбранный транспорт включен
4. убедитесь, что топология аддона или плагина соответствует конфигурации
5. только после этого исследуйте проблемы на уровне пакетов

## Что значит «работает»

Рецепт считается полным только тогда, когда все эти условия верны:

- `VoiceCraft.Server` запускается без ошибок прослушивателя
- подключается хотя бы один клиент VoiceCraft
- транспорт на стороне Minecraft аутентифицирует
- процесс привязки завершен
- перемещение в игре меняет proximity-поведение
- сотрудники могут идентифицировать подключенных клиентов/объектов для устранения неполадок
