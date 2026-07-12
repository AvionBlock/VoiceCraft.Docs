# VoiceCraft.Java Proxy Guide

Используйте этот режим для Velocity или BungeeCord networks с одним или несколькими Paper backend servers.

```text
Paper backends + VoiceCraft.Java -> voicecraft-java:main -> Velocity/BungeeCord + VoiceCraft.Java -> McTcp -> VoiceCraft.Server
```

## Главное правило

Proxy владеет VoiceCraft connection. Paper backends наблюдают за игроками и отправляют snapshots через plugin messaging; они не должны параллельно владеть главным McTcp connection.

## Схема установки

- установите proxy jar на Velocity или BungeeCord
- установите Paper jar на каждый backend Paper server
- запустите всё один раз, чтобы сгенерировать configs

## Backend Paper config

```yml
config:
  proxy:
    enabled: true
```

Backend nodes используют plugin channel `voicecraft-java:main` для player snapshots, bind/unbind requests и state updates на proxy.

## Proxy config

```yml
config:
  voicecraft:
    transport:
      host: "127.0.0.1"
      port: 9050
      login-token: "replace-with-token"
    voice:
      port: 1111
```

Token должен совпадать с `McTcpConfig.LoginToken` на VoiceCraft.Server.

## Adapter proxy ports

Velocity и BungeeCord configs содержат proxy sections для Simple Voice Chat и Plasmo. Включайте их только если proxy должен открывать adapter ports для сети.

## Проверка

- proxy logs показывают один active McTcp connection
- backend logs показывают plugin messaging на proxy
- переход между backend servers сохраняет voice identity
- `/voice bind <key>` работает после входа через proxy
- VoiceCraft proximity меняется при движении игрока в игре
