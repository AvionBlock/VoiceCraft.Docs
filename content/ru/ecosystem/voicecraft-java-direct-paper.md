# VoiceCraft.Java Direct Paper Guide

Используйте этот режим, когда один Paper server должен напрямую общаться с VoiceCraft. Paper plugin может подключиться к внешнему VoiceCraft backend или скачать и запустить VoiceCraft сам.

```text
Paper + VoiceCraft.Java -> McTcp -> VoiceCraft.Server
VoiceCraft Client / SVC / Plasmo -> shared VoiceCraft audio bridge
```

## Два варианта runtime

External backend:

- вы сами запускаете `VoiceCraft.Server`
- указываете `config.voicecraft.transport.*` на этот server
- ставите `auto-start: false`

Managed runtime:

- ставите `config.voicecraft.auto-start: true`
- Paper скачивает VoiceCraft из GitLab releases
- файлы лежат в `config.voicecraft.install-directory`
- plugin может остановить runtime при выключении

## Минимальный Paper config

```yml
config:
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
```

## Optional adapters

Включайте только если Java players будут использовать эти моды:

- `config.adapters.simple-voice-chat.enabled` для Simple Voice Chat
- `config.adapters.plasmo.enabled` для Plasmo Voice

Откройте UDP ports адаптеров и задайте public host/port, если клиенты подключаются не с той же машины.

## Настройка

1. Положите Paper jar в `plugins`.
2. Запустите сервер один раз, чтобы создать `plugins/VoiceCraft.Java/config.yml`.
3. Настройте McTcp host, port и token.
4. Решите, должен ли `auto-start` управлять VoiceCraft.
5. Включите SVC/Plasmo adapters только если они нужны.
6. Выполните `/voice reload` или перезапустите сервер.
7. Проверьте `/voice bind <key>` и proximity movement.
