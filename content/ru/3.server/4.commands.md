# Команды сервера

Во время работы `VoiceCraft.Server` доступны консольные команды для модерации и управления сущностями.

## Базовые

- `list [--clientsOnly] [--limit N]`
- `stop`
- `shutdown`
  алиас для `stop`
- `kick <id>`

## Управление состоянием клиента

- `mute <id>`
- `unmute <id>`
- `deafen <id>`
- `undeafen <id>`

Важно:

- для обычных сущностей меняется entity mute / deafen
- для сетевых клиентов используются server-side флаги (`ServerMuted`, `ServerDeafened`)

## Управление данными сущностей

- `setname <id> <value>`
- `settitle <id> <value>`
- `setdescription <id> <value>`
- `setposition <id> <x> <y> <z>`
- `setworldid <id> <value>`

## Опции `list`

- `--clientsOnly`
- `--limit <N>`

Пример:

```text
list --clientsOnly --limit 25
```

## Практический сценарий

```text
list --clientsOnly
setworldid 12 spawn_world
setposition 12 100 64 100
mute 15
kick 18
```

## Когда это полезно

- тестирование аддона или плагина
- staff moderation
- проверка world ID и position update логики
