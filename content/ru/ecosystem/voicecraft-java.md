# VoiceCraft.Java (Java bridge)

Репозиторий/сайт: [VoiceCraft.Java](https://java.voicecraft.chat)

VoiceCraft.Java — Java-side плагин для VoiceCraft. Он заменяет старое имя GeyserVoice в документации и подключает Paper, Velocity или BungeeCord инфраструктуру к VoiceCraft backend через McTcp.

Плагин делает VoiceCraft общей proximity voice прослойкой: игроки с VoiceCraft Client, Simple Voice Chat, Plasmo Voice и Bedrock-игроки на Java cross-play сервере могут находиться в одном голосовом пространстве.

## Что поддерживается

- Direct Paper mode для одного сервера
- Velocity и BungeeCord proxy mode для сетей
- managed VoiceCraft runtime на Paper
- подключение к внешнему VoiceCraft backend
- Simple Voice Chat adapter на Paper
- Plasmo Voice adapter на Paper
- bind flow для внешних VoiceCraft clients через `/voice bind <key>`
- локализованные config/message templates: `en`, `ru`, `nl`, `ja`

## Пути клиентов

| Клиент игрока | Путь |
| --- | --- |
| VoiceCraft Client | игрок подключается к VoiceCraft backend и привязывается в Minecraft через `/voice bind <key>` |
| Simple Voice Chat | Paper adapter обрабатывает SVC protocol и передаёт Opus audio в VoiceCraft |
| Plasmo Voice | Paper adapter обрабатывает Plasmo TCP/UDP и передаёт Opus audio в VoiceCraft |
| Bedrock на Java cross-play | игрок использует VoiceCraft Client, а plugin отдаёт Java-side position/state |

## Runtime modes

Direct Paper:

```text
Paper -> VoiceCraft.Java -> VoiceCraft
```

Proxy network:

```text
Paper backends -> Velocity/BungeeCord -> VoiceCraft
```

В proxy mode ставьте VoiceCraft.Java на каждый Paper backend и на proxy. Proxy владеет McTcp connection; Paper backends отправляют snapshots через `voicecraft-java:main`.

## Требования

- Java 21
- Paper, Velocity или BungeeCord
- VoiceCraft backend, если не включён Paper managed runtime
- доступные UDP ports для Simple Voice Chat или Plasmo Voice adapters

Текущие target API: Paper `1.21.11-R0.1-SNAPSHOT`, Velocity `3.4.0-SNAPSHOT`, BungeeCord `26.1-R0.1-SNAPSHOT`.

## Главное в config

Paper использует config version `3`; Velocity и BungeeCord используют config version `2`.

Важные блоки:

- `config.voicecraft.transport.host`, `port`, `login-token`: McTcp connection к VoiceCraft
- `config.voicecraft.auto-start`: разрешить Paper скачать и запустить VoiceCraft
- `config.voicecraft.install-directory`: папка managed runtime
- `config.adapters.simple-voice-chat`: Simple Voice Chat adapter
- `config.adapters.plasmo`: Plasmo Voice adapter
- `config.voice.status-icons`: in-game voice status icons на Paper

## Команды

- `/voice connect <host> <port> <login-token>`
- `/voice reconnect [true|false]`
- `/voice disconnect`
- `/voice bind <key>`
- `/voice bindfake <key> <name>`
- `/voice reload`

## Build outputs

```text
modules/paper/build/libs/VoiceCraft.Java-paper-<version>.jar
modules/velocity/build/libs/VoiceCraft.Java-velocity-<version>.jar
modules/bungeecord/build/libs/VoiceCraft.Java-bungeecord-<version>.jar
```

Используйте shaded jars без classifier `thin` или `sources`.
