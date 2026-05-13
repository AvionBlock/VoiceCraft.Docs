# McWss for Singleplayer Worlds

`McWss` is the websocket / command-tunnel transport mostly used for local worlds and lightweight Bedrock setups.

Use this guide when you are not running a full Bedrock Dedicated Server and need a local Bedrock world to talk to VoiceCraft through the `/connect` websocket flow.

Target shape:

```text
VoiceCraft.Client -> VoiceCraft UDP endpoint
Local Bedrock world + VoiceCraft.Addon.Core.McWss -> McWss websocket endpoint
```

## When to use it

Use `McWss` when:

- you play in a local Bedrock world
- you want a quick singleplayer setup
- you are testing addon logic without a dedicated BDS host

If you run a real Bedrock Dedicated Server, use [McHttp for BDS](/minecraft/mchttp-bds) instead.

## Important limitations

- usually less stable than `McHttp`
- command throughput and payload size matter a lot
- not the default recommendation for large public production environments
- depends on Bedrock websocket and command behavior being available in your environment

## Requirements

1. `VoiceCraft.Server` with `McWssConfig.Enabled = true`
2. `VoiceCraft.Addon.Core.McWss.zip`
3. Bedrock build that supports the required websocket / script functionality
4. VoiceCraft client installed and configured
5. matching `McWssConfig.LoginToken` for addon authentication

Helpful links:

- [Download Page](/download) for the raw `Core.McWss` release package
- [Addon Configurator](/addon-configurator) for a ready-to-unpack world archive

## VoiceCraft server config

Typical setup:

```json
{
  "McWssConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-token",
    "Hostname": "ws://127.0.0.1:9051/",
    "MaxClients": 1,
    "MaxTimeoutMs": 10000,
    "DataTunnelCommand": "voicecraft:data_tunnel",
    "CommandsPerTick": 3,
    "MaxByteLengthPerCommand": 300,
    "DisabledPacketTypes": []
  }
}
```

Keep `DataTunnelCommand` aligned with the addon package. If you change it in the server config, the addon must use the same command name.

For local singleplayer testing, keep the websocket host on `127.0.0.1`. Use a wider binding only if the Bedrock world connects from another machine.

## Installation

### Option 1: import as `.mcaddon`

1. Rename archive to `VoiceCraft.Addon.Core.McWss.mcaddon`.
2. Open it so Minecraft imports the addon.
3. Enable the behavior pack and resource pack in the world.

### Option 2: manual copy

1. Extract the archive.
2. Copy `RP` and `BP` to the Bedrock directories.
3. Enable both packs in the target world.

The resource pack provides visible assets. The behavior pack provides commands, scripts, and bridge logic.

## Connection flow

### Step 1: connect the world websocket

```text
/connect <VOICECRAFT_HOST>:<MCWSS_PORT>
```

Example:

```text
/connect 127.0.0.1:9051
```

This connects the Bedrock world to the VoiceCraft websocket transport. It does not authenticate the addon yet.

### Step 2: authenticate the addon

```text
/voicecraft:vcconnect <LOGIN_TOKEN>
```

Use `McWssConfig.LoginToken`.

After authentication, the addon can send entity and bind data through the command tunnel.

## Data tunnel

The addon uses:

- `voicecraft:data_tunnel`

This must stay aligned with `McWssConfig.DataTunnelCommand`.

If you rename one side and not the other, the bridge breaks.

The command currently carries:

- optional max string length argument
- packed payload data argument

The tunnel is sensitive to command throughput. Large bursts of entity or effect updates can cause lag or unstable delivery, especially on low-end machines.

## Tuning

If you see lag or packet instability:

- lower `CommandsPerTick`
- review `MaxByteLengthPerCommand`
- avoid large burst updates
- test with fewer active entities
- keep the setup local while tuning
- switch to `McHttp` if the world becomes a long-running shared server

## When to switch to another transport

Move to `McHttp` when:

- you run a real dedicated Bedrock server
- you want a cleaner production deployment
- command tunnel instability becomes a problem

In that case, continue with [McHttp for BDS](/minecraft/mchttp-bds).

## Validation checklist

- `McWssConfig.Enabled = true`
- the world can run `/connect <host>:<port>`
- `/voicecraft:vcconnect <LOGIN_TOKEN>` succeeds
- VoiceCraft client connects to the UDP endpoint
- `PositioningType` matches between client and server
- bind flow works in game
- moving the player changes proximity behavior

## Common issues

- `/connect` fails:
  check host/port and whether Bedrock allows websocket connections in your environment.
- `vcconnect` fails:
  confirm you used `McWssConfig.LoginToken`.
- data tunnel errors:
  confirm `DataTunnelCommand` matches the addon package.
- audio connects but proximity is wrong:
  check bind flow, positioning mode, and whether position updates are arriving.
