# GeyserVoice Direct Paper Guide

Используйте этот режим, когда один Paper / Folia сервер должен напрямую работать с VoiceCraft.

## Два варианта запуска

### Вариант A: внешний VoiceCraft сервер

Вы уже запустили `VoiceCraft.Server` отдельно и просто указываете на него в GeyserVoice.

### Вариант B: managed runtime

GeyserVoice может сам:

- скачать runtime
- установить runtime
- запустить runtime
- дождаться его готовности
- при необходимости остановить его вместе с плагином

Это одна из самых важных возможностей текущего direct Paper сценария.

## Рекомендуемый конфиг

```yml
config:
  debug: false
  lang: "system"
  auto-reconnect: true

  proxy:
    enabled: false

  voicecraft:
    host: "127.0.0.1"
    port: 9050
    login-token: "replace-with-token"
    auto-start: true
    shutdown-on-disable: true
    ready-timeout-ms: 20000
    install-directory: "voicecraft-runtime"
```

## Шаги настройки

1. Установите GeyserVoice на Paper.
2. Один раз запустите сервер.
3. Отредактируйте `plugins/GeyserVoice/config.yml`.
4. Решите, нужен ли `auto-start`.
5. Убедитесь, что `login-token` совпадает с `McTcpConfig.LoginToken`.
6. Выполните `/voice reload`.
7. Проверьте bind flow.
