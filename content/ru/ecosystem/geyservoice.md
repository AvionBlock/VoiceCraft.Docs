# GeyserVoice (Java/Geyser Bridge)

Репозиторий: [AvionBlock/GeyserVoice](https://github.com/AvionBlock/GeyserVoice)

`GeyserVoice` подключает инфраструктуру стороны Java к `VoiceCraft.Server` через транспорт `McTcp`.

В проекте GeyserVoice этот путь также описан как `McApi TCP`. В конфигурации сервера VoiceCraft он соответствует `McTcpConfig`.

Он поддерживает:

- прямое развертывание Paper/Folia
- Развертывание прокси-сервера Velocity
- Развертывание прокси-сервера BungeeCord
- смешанная топология прокси + серверная часть

## Что делает GeyserVoice

`GeyserVoice` соединяет состояние игрока с Java-серверов в VoiceCraft:

- жизненный цикл игрока
- позиция/снимки мира
- процесс привязки
- ретрансляция прокси для многосерверных сетей

Это не просто перенаправление пакетов. В прямом режиме Paper он также может управлять локальной средой выполнения VoiceCraft.

## Очень важно: GeyserVoice может запускать VoiceCraft под капотом.

При прямой установке Paper плагин может автоматически:

- скачать среду выполнения VoiceCraft
- установить ее в настроенный каталог
- запустить процесс
- дождаться готовности среды выполнения
- при необходимости остановить ее, когда плагин отключится

Такое поведение контролируется блоком `config.voicecraft.*`.

Это делает GeyserVoice подходящим как для:

- использования уже управляемого внешнего `VoiceCraft.Server`
- сценария, где плагин сам загружает и запускает VoiceCraft

Если GeyserVoice управляет средой выполнения, она по-прежнему подключается по тому же пути `McTcp`/`McApi TCP`. Разница в том, кто запускает процесс VoiceCraft.

## Поддерживаемые платформы плагинов

Из текущего исходного кода:

- Paper/Folia
- Velocity
- BungeeCord

## Пути выполнения

Текущие поддерживаемые пути:

- `Paper -> McTcp -> VoiceCraft`
- `Paper -> Proxy relay -> McTcp -> VoiceCraft`

## `config.yml` макет

Текущая структура конфигурации Paper:

### `config.debug`

Включите режим отладки плагина.

### `config.lang`

Язык плагина, например `system`.

### `config.auto-reconnect`

Должен ли плагин автоматически переподключаться.

### `config.proxy.enabled`

Работает ли текущий узел Paper через ретранслятор, управляемый прокси-сервером.

### `config.voicecraft.*`

Блок подключения и управления временем выполнения.

Текущая вложенная форма:

```yml
config:
  voicecraft:
    transport:
      host: "127.0.0.1"
      port: 9050
      login-token: "__GENERATED_LOGIN_TOKEN__"
    voice:
      port: 1111
    auto-start: true
    shutdown-on-disable: true
    invariant-globalization: true
    ready-timeout-ms: 20000
    install-directory: "voicecraft-runtime"
```

- `transport.host`
- `transport.port`
- `transport.login-token`
- `voice.port`
- `auto-start`
- `shutdown-on-disable`
- `invariant-globalization`
- `ready-timeout-ms`
- `install-directory`

Значение:

- `transport.host` / `transport.port` / `transport.login-token`
  цель `VoiceCraft.Server` / `McTcp`
- `voice.port`
  Голосовой порт среды выполнения VoiceCraft, используемый управляемым путем среды выполнения.
- `auto-start`
  разрешить плагину автоматически запускать среду выполнения VoiceCraft
- `shutdown-on-disable`
  остановить управляемую среду выполнения при выгрузке плагина
- `invariant-globalization`
  опция глобализации времени выполнения, полезная для запуска управляемых серверов
- `ready-timeout-ms`
  как долго плагин ожидает готовности среды выполнения
- `install-directory`
  где установлена управляемая среда выполнения

В Velocity и BungeeCord конфигурация сохраняет форму `config.voicecraft.transport.*` и `config.voicecraft.voice.*`, но не использует поля времени выполнения, управляемые только на Paper.

### `config.voice.*`

Поведение при столкновении с игроком:

- `proximity-distance`
- `proximity-toggle`
- `voice-effects`
- `not-in-voice-symbol`
- `in-voice-symbol`
- `send-bind-message`
- `send-disconnect-message`
- `send-voicecraft-disconnect-message`
- `send-connection-lost-message`
- `position-update-interval-ticks`

### `config.players`

Сохраненные данные автопривязки/кеша на стороне игрока.

### `config.player-links`

Дополнительная структура ссылок/кэша, используемая плагином.

## Команды

От `BaseVoiceCommand`:

- `connect <host> <port> <key>`
- `reconnect [true|false]`
- `disconnect`
- `settings`
- `bind <key>`
- `bindfake <key> <name>`
- `updatefake <key>`
- `clearautobind`
- `reload`

## Разрешения

Типичные разрешения:

- `voice.cmd`
- `voice.connect`
- `voice.reconnect`
- `voice.disconnect`
- `voice.settings`
- `voice.bind`
- `voice.bindfake`
- `voice.reload`

## Режим Direct Paper

Лучше всего, когда:

- у вас есть один сервер Paper
- вам нужна самая простая настройка на стороне Java
- вы хотите, чтобы GeyserVoice управлял средой выполнения VoiceCraft за вас

См. [Direct Paper Guide](/ecosystem/geyservoice-direct-paper).

## Режим прокси

Лучше всего, когда:

- вы используете Velocity или BungeeCord
- у вас есть несколько внутренних серверов Paper
- вам нужно одно центральное соединение VoiceCraft на прокси-сервере

См. [Proxy Guide](/ecosystem/geyservoice-proxy).

В режиме прокси-сервера внутренние серверы Paper не следует рассматривать как центрального владельца соединения VoiceCraft. Прокси-серверу принадлежит соединение `McTcp`, а внутренние узлы предоставляют снимки игроков.

## Технические примечания

- канал обмена сообщениями плагина: `geyservoice:main`
- в режиме прокси мировые идентификаторы могут быть размещены в пространстве имен с внутренней идентификацией.
- плагин в настоящее время использует `McTcp` в качестве моста, обращенного к VoiceCraft.

## Текущие ограничения кода

- `updatefake` по-прежнему является заполнителем.
- `settings` существует, но в настоящее время имеет минимальную практическую логику.

## Контрольный список производства

1. Решите, должна ли Paper самостоятельно управлять средой выполнения VoiceCraft.
2. Если да, настройте `auto-start`, `install-directory` и `ready-timeout-ms`.
3. Если нет, укажите `config.voicecraft.transport.host`, `config.voicecraft.transport.port` и `config.voicecraft.transport.login-token` на внешний сервер VoiceCraft.
4. Ограничьте команды, предназначенные только для персонала.
5. Протестируйте процесс привязки и обновления позиций, прежде чем открывать их игрокам.
6. Подтвердите `McTcpConfig.Enabled = true` на стороне VoiceCraft.
7. Убедитесь, что токен соответствует `McTcpConfig.LoginToken`.
