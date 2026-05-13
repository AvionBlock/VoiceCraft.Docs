# Positioning Model

VoiceCraft supports both server-side and client-side positioning models.

Positioning decides who supplies the location data that proximity audio depends on. If the wrong mode is selected, clients can connect successfully but still hear the wrong people, hear nobody, or ignore distance changes.

## `PositioningType`

- `0 = Server`
- `1 = Client`

This value must align between the server and the client.

Set the server value in:

```text
VoiceCraftConfig.PositioningType
```

Set the client value in the client Network settings or `Settings.json`.

## Server-side positioning

Best when:

- the server or integration layer can provide authoritative world state
- you want more centralized behavior
- you run BDS with `McHttp`
- you run Java/Geyser with `GeyserVoice`
- you want staff/moderation tooling to reason about server-owned entity state

In this model, Minecraft-side integration sends position and world updates to `VoiceCraft.Server`. The client receives enough state to render proximity audio locally.

Use this as the default for production deployments.

## Client-side positioning

Best when:

- the environment is constrained
- server-side world integration is limited
- some hosting restrictions block normal integration paths

In this model, the client is expected to provide or derive more of its own positioning context. It is useful for constrained or experimental environments, but it is easier to misconfigure because every client must agree with the server setting.

Use this only when you know why server-side positioning is not practical for the target setup.

## Choosing a mode

| Setup | Recommended mode | Reason |
|-------|------------------|--------|
| Bedrock Dedicated Server + `McHttp` | `0 = Server` | BDS addon can report authoritative world state |
| Local Bedrock world + `McWss` | Usually `0 = Server` | Addon can still send state through the tunnel |
| Java + Geyser/Floodgate + `GeyserVoice` | `0 = Server` | Plugin tracks player lifecycle and position |
| Experimental local-only setup | Depends | Use client-side only when the integration cannot provide state |

## Why mismatches break audio expectations

If the client and server disagree on positioning mode, you can see symptoms like:

- voice clients connect but do not hear expected proximity
- entities appear present but behave strangely
- integration looks partly healthy while positional logic is wrong

## Validation steps

1. Check `VoiceCraftConfig.PositioningType` in `ServerProperties.json`.
2. Check the client Network settings.
3. Restart the client after changing the local value.
4. Reconnect the Minecraft transport.
5. Move a player in game and confirm the server/client behavior changes with distance.

If the setup still fails, debug bind flow next. A correct positioning mode cannot help if the voice session is not bound to the in-game entity.
