# Server Commands

While `VoiceCraft.Server` is running, console commands are available for moderation and entity management.

Commands operate on server-side entity IDs. Use `list` first, find the entity or connected client you want to affect, then run the specific moderation or metadata command.

These commands are most useful during setup, debugging, and staff moderation. They are not a replacement for configuring the Minecraft addon or plugin correctly.

## Command workflow

1. Run `list` or `list --clientsOnly`.
2. Find the ID for the target entity or network client.
3. Apply the command.
4. Run `list` again to verify the state changed.

## Basic

- `list [--clientsOnly] [--limit N]`
  list entities currently known to the server
- `stop`
  stop the server
- `shutdown`
  alias of `stop`
- `kick <id>`
  disconnect a network client

Use `kick` when a client session is stuck, duplicated, or needs to reconnect after config changes. It does not ban the player from reconnecting.

## Client state management

- `mute <id>`
- `unmute <id>`
- `deafen <id>`
- `undeafen <id>`

Important behavior:

- on regular entities, these toggle entity mute / deafen state
- on connected network clients, the server uses the dedicated server-side flags (`ServerMuted`, `ServerDeafened`)

Server mute/deafen is authoritative for all listeners. Local mute in the client only affects the local user.

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

Manual entity commands are mostly for diagnostics. In a healthy production setup, Minecraft integration should continuously update names, positions, and world IDs.

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

## Example setup checks

### Confirm clients are connected

```text
list --clientsOnly --limit 20
```

If the expected player is missing, check the client server address, UDP port, and firewall rules before debugging Minecraft integration.

### Confirm position updates are moving

```text
list --limit 20
```

Move the player in game, then run `list` again. If the position does not change, the problem is likely in the addon/plugin transport path rather than the audio client.

### Correct temporary test metadata

```text
setname 12 TestPlayer
setworldid 12 overworld
setposition 12 100 64 100
```

Use this only to isolate behavior. If the integration later sends a new update, it may overwrite your manual values.

## Safety notes

- Do not expose server console access to regular players.
- Avoid using manual metadata edits as long-term configuration.
- Keep command logs when debugging production incidents.
- Prefer fixing the source integration when values repeatedly revert or drift.
