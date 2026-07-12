# Рецепты интеграции

Это практические шаблоны развертывания для наиболее распространенных сценариев VoiceCraft.

Используйте эту страницу после того, как вы поймете основные компоненты и вам понадобится конкретный рецепт топологии. В каждом сценарии указан стек, основная причина его выбора, наиболее важная конфигурация и точка проверки, подтверждающая его работу.

## Сценарий A: выделенный сервер Bedrock

Стек:

- `VoiceCraft.Server`
- `VoiceCraft.Addon.Core.McHttp`
- клиенты VoiceCraft

Выбирайте это, когда:

- BDS — основной игровой сервер
- BDS может достичь HTTP-эндпоинта VoiceCraft.
- вам нужен наиболее стабильный production-путь для Bedrock

Рекомендуемая конфигурация:

- `McHttpConfig.Enabled = true`
- `McWssConfig.Enabled = false`
- `McTcpConfig.Enabled = false`, если это не требуется

Порядок:

1. разверните `VoiceCraft.Server`
2. защитите `McHttpConfig.LoginToken`
3. убедитесь, что BDS может достичь `McHttpConfig.Hostname`
4. установите `Core.McHttp`
5. запустите `voicecraft:vcconnect <hostname> <token>`
6. подтвердите `voicecraft:vcbind <key>`
7. подключите клиента и подтвердите, что звук с учетом расстояния меняется при движении

## Сценарий B: локальный/одиночный мир Bedrock

Стек:

- локальный стек VoiceCraft
- `VoiceCraft.Addon.Core.McWss`

Выбирайте это, когда:

- вы тестируете локально
- вы не запускаете BDS
- доступен WebSocket-путь `/connect`

Порядок:

1. включите `McWss`
2. оставьте `DataTunnelCommand = voicecraft:data_tunnel`
3. установите `Core.McWss`
4. используйте `/connect`
5. запустите `voicecraft:vcconnect <token>`
6. проверьте привязку и движение

## Сценарий C: Direct Paper со средой выполнения, управляемой VoiceCraft.Java

Стек:

- Paper/Folia
- `VoiceCraft.Java`
- среда выполнения VoiceCraft, управляемая плагином

Выбирайте это, когда:

- один сервер Paper/Folia должен иметь голосовую интеграцию
- вам нужно меньше внешних сервисов
- VoiceCraft.Java должен скачать и запустить VoiceCraft

Порядок:

1. установите `VoiceCraft.Java`
2. установите `config.proxy.enabled = false`
3. настройте `config.voicecraft.transport.login-token`
4. включите `config.voicecraft.auto-start`
5. перезагрузите и проверьте процесс привязки

Это простейшая настройка на стороне Java, когда вы хотите, чтобы плагин запускал VoiceCraft «под капотом».

## Сценарий D: Direct Paper с внешним VoiceCraft

Стек:

- Paper/Folia
- `VoiceCraft.Java`
- внешний `VoiceCraft.Server`

Выбирайте это, когда:

- вы уже запускаете VoiceCraft с помощью systemd, Docker или панели
- нескольким компонентам может потребоваться один и тот же бэкэнд
- вам нужны внешние журналы и политика перезапуска

Порядок:

1. включите `McTcp` в VoiceCraft
2. установите `config.voicecraft.transport.host`, `config.voicecraft.transport.port` и `config.voicecraft.transport.login-token` в VoiceCraft.Java
3. отключите управление средой выполнения в плагине, если оно не требуется
4. перезагрузите и подтвердите соединение

## Сценарий E: сеть Velocity или Bungee

Стек:

- `VoiceCraft.Java` на прокси
- `VoiceCraft.Java` на внутренних серверах Paper
- `VoiceCraft.Server` с `McTcp`

Выбирайте это, когда:

- Velocity или BungeeCord маршрутизирует игроков между внутренними серверами
- прокси-сервер должен владеть соединением VoiceCraft
- внутренние серверы должны отправлять только снимки

Порядок:

1. настройте прокси как владельца VoiceCraft
2. настройте серверные узлы Paper для режима прокси
3. перезагрузите плагин на всех узлах
4. проверьте перемещение игроков между серверами

## Минимальный фрагмент production-конфигурации

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

В этом фрагменте показано смешанное развертывание HTTP + TCP. Не привязывайте `McHttp` и `McTcp` к одному TCP-порту. UDP-порт клиента VoiceCraft может использовать общий номер `9050`, поскольку это UDP, но HTTP-слушателю и необработанному TCP нужны отдельные TCP-привязки.

## Порядок устранения неполадок

1. проверить соответствие токена
2. проверить доступность хоста/порта
3. убедитесь, что выбранный транспорт включен
4. убедитесь, что топология аддона или плагина соответствует конфигурации
5. только после этого исследуйте проблемы на уровне пакетов

## Что значит «работает»

Рецепт считается полным только тогда, когда все эти условия верны:

- `VoiceCraft.Server` запускается без ошибок слушателя
- подключается хотя бы один клиент VoiceCraft
- транспорт на стороне Minecraft аутентифицируется
- процесс привязки завершен
- перемещение в игре меняет поведение звука с учетом расстояния
- сотрудники могут идентифицировать подключенных клиентов/сущностей для устранения неполадок
