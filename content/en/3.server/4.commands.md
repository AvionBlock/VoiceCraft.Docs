# Server Commands

While `VoiceCraft.Server` is running, console commands are available for moderation and entity management.

## Basic

- `list [--clientsOnly] [--limit N]`
  list entities currently known to the server
- `stop`
  stop the server
- `shutdown`
  alias of `stop`
- `kick <id>`
  disconnect a network client

## Client state management

- `mute <id>`
- `unmute <id>`
- `deafen <id>`
- `undeafen <id>`

Important behavior:

- on regular entities, these toggle entity mute / deafen state
- on connected network clients, the server uses the dedicated server-side flags (`ServerMuted`, `ServerDeafened`)

## Entity data management

- `setname <id> <value>`
- `settitle <id> <value>`
- `setdescription <id> <value>`
- `setposition <id> <x> <y> <z>`
- `setworldid <id> <value>`

Notes:

- `settitle` and `setdescription` target network entities
- `setname`, `setposition`, and `setworldid` work on general entities
- empty title / description values are normalized to an empty string

## `list` options

- `--clientsOnly`
  list only connected network clients
- `--limit <N>`
  limit the number of rows shown

Example:

```text
list --clientsOnly --limit 25
```

## Practical workflow

```text
list --clientsOnly
setworldid 12 spawn_world
setposition 12 100 64 100
mute 15
kick 18
```

## Failure cases

The server returns an error when:

- the entity ID does not exist
- a command expects a network client but receives a non-network entity
- `list --limit` is negative

## When these commands are useful

- testing addon or plugin integration
- correcting bad entity metadata
- staff moderation
- validating world ID and position updates during setup
