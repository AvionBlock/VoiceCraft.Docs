# Руководство GeyserVoice Direct Paper

Используйте этот режим, когда один сервер Paper/Folia должен напрямую взаимодействовать с VoiceCraft.

Режим Direct Paper — это простейшая топология на стороне Java: сервер Paper либо подключается к внешнему `VoiceCraft.Server`, либо позволяет GeyserVoice загружать и запускать локальную среду выполнения VoiceCraft.

Форма цели:

```text
Paper/Folia + GeyserVoice -> McTcp/McApi TCP -> VoiceCraft.Server
VoiceCraft.Client -> VoiceCraft UDP endpoint
```

## Два способа запустить его

### Вариант А: внешний сервер VoiceCraft.

Вы уже где-то запускаете `VoiceCraft.Server` и указываете на него GeyserVoice.

### Вариант Б: среда выполнения, управляемая плагином

GeyserVoice может загрузить VoiceCraft за вас:

- скачать среду выполнения
- установить среду выполнения
- запустить среду выполнения
- дождаться готовности
- при необходимости остановить выполнение с помощью плагина

Это одна из наиболее важных текущих функций для непосредственных пользователей Paper.

## Рекомендуемая конфигурация

```yml
config:
  debug: false
  lang: "system"
  auto-reconnect: true

  proxy:
    enabled: false

  voicecraft:
    transport:
      host: "127.0.0.1"
      port: 9050
      login-token: "replace-with-token"
    voice:
      port: 1111
    auto-start: true
    shutdown-on-disable: true
    invariant-globalization: true
    ready-timeout-ms: 20000
    install-directory: "voicecraft-runtime"

  voice:
    proximity-distance: 30
    proximity-toggle: true
    voice-effects: true
    send-bind-message: true
    send-disconnect-message: true
    send-voicecraft-disconnect-message: true
    send-connection-lost-message: true
    position-update-interval-ticks: 5
```

Используйте `config.voicecraft.transport.host`, `config.voicecraft.transport.port` и `config.voicecraft.transport.login-token` для соединения VoiceCraft `McTcp`. Они должны соответствовать серверной части VoiceCraft при использовании внешней среды выполнения.

## Шаги настройки

1. Установите GeyserVoice на Paper.
2. Запустите сервер один раз.
3. Отредактируйте `plugins/GeyserVoice/config.yml`.
4. Решите, следует ли включать `auto-start`.
5. Убедитесь, что `config.voicecraft.transport.login-token` соответствует VoiceCraft `McTcpConfig.LoginToken`.
6. Запустите `/voice reload`.
7. Проверьте процесс привязки в игре.

Если `auto-start` равен `true`, убедитесь, что `install-directory` доступен для записи в процессе Paper. Если `auto-start` равен `false`, убедитесь, что внешний сервер VoiceCraft уже запущен и доступен.

## Когда `auto-start` — хорошая идея

- установка с одним сервером
- вам нужно меньше движущихся частей
- вы еще не управляете VoiceCraft с помощью systemd/Docker/panel

## Когда внешняя среда выполнения лучше

- вы уже централизованно управляете VoiceCraft
- вам нужна другая политика перезапуска или ведение журнала
- вы запускаете несколько узлов Java на одном сервере VoiceCraft
- вы хотите, чтобы менеджер процессов, такой как systemd, Docker или панель хостинга, владел перезапусками

## Устранение неполадок

- среда выполнения никогда не становится готовой:
  увеличить `ready-timeout-ms`
- Плагин может подключаться вручную, но не при запуске:
  проверьте `auto-start` и `install-directory`
- игроки присоединяются, но голосовые данные не привязываются:
  проверить токен, хост, порт и процесс привязки
- внешний VoiceCraft никогда не видит плагин:
  подтвердите `McTcpConfig.Enabled = true`, привязку хоста, брандмауэр и `config.voicecraft.transport.*`
- клиент подключается, но состояние Java не влияет на proximity audio:
  проверьте `/voice bind`, интервал обновления позиции и режим позиционирования на стороне сервера.

## Контрольный список проверки

- Бумажные журналы показывают, что GeyserVoice включен
- Среда выполнения VoiceCraft запущена или запускается автоматически
- `McTcpConfig.LoginToken` соответствует `config.voicecraft.transport.login-token`
- игрок может подключиться к клиенту VoiceCraft
- игрок может выполнить `/voice bind <key>`
- перемещение в игре меняет proximity-поведение
