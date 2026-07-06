# McHttp for Bedrock Dedicated Server

`McHttp` is the recommended VoiceCraft integration mode for BDS.

Use this guide when you run a Bedrock Dedicated Server and want the server-side addon to send player state into `VoiceCraft.Server`.

Target shape:

```text
VoiceCraft.Client -> VoiceCraft UDP endpoint
BDS + VoiceCraft.Addon.Core.McHttp -> VoiceCraft McHttp endpoint
```

## Why `McHttp` is recommended

- better suited for dedicated server environments
- simpler than command-tunnel based setups
- easier to reason about in production
- aligns well with the Bedrock addon package `VoiceCraft.Addon.Core.McHttp`
- does not depend on the local `/connect` websocket workflow used by `McWss`

## Requirements

1. Running `VoiceCraft.Server`
2. `McHttpConfig.Enabled = true`
3. `VoiceCraft.Addon.Core.McHttp.zip` from releases, or a ready world archive from the [Addon Configurator](/addon-configurator)
4. BDS with required modules and script API support
5. Network reachability from the BDS machine to the VoiceCraft `McHttpConfig.Hostname`
6. VoiceCraft clients installed by players

## Server-side VoiceCraft config

Minimal example:

```json
{
  "McHttpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-token",
    "Hostname": "http://0.0.0.0:9050/",
    "MaxClients": 10,
    "MaxTimeoutMs": 10000,
    "DisabledPacketTypes": []
  }
}
```

Important:

- use a real token, never keep the generated one in production
- make sure the BDS host can reach the configured endpoint
- use `http://127.0.0.1:9050/` only if BDS and VoiceCraft run on the same host
- use a LAN/public address or `0.0.0.0` binding when BDS connects from another machine

## Addon installation

Fastest path:

- [Addon Configurator](/addon-configurator) if you want a ready-to-unpack world archive
- [Download Page](/download) if you want the raw addon release package

Manual path:

1. Extract `VoiceCraft.Addon.Core.McHttp.zip`.
2. Put `RP` into `<MCServer>/resource_packs/`.
3. Put `BP` into `<MCServer>/behavior_packs/`.
4. Attach both packs to the target world.
5. Restart BDS after changing packs or permissions.

The resource pack provides client-visible assets such as icons. The behavior pack runs the scripts and commands that connect BDS to VoiceCraft.

## Module permissions

Open `<MCServer>/config/default/permissions.json` and ensure it contains the required modules:

```json
{
  "allowed_modules": [
    "@minecraft/server-gametest",
    "@minecraft/server",
    "@minecraft/server-ui",
    "@minecraft/server-admin",
    "@minecraft/server-editor",
    "@minecraft/server-net"
  ]
}
```

The addon needs network-related script permissions because it calls the VoiceCraft HTTP endpoint from the BDS runtime.

## Attach packs to the world

In `<MCServer>/worlds/<YourWorld>/world_behavior_packs.json`:

```json
{
  "pack_id": "71ebb3ba-e9db-4546-9520-05f20b17dcb6",
  "version": [1, 6, 0]
}
```

In `world_resource_packs.json`:

```json
{
  "pack_id": "30b512be-77d1-4a61-bdb7-6c2f4062f889",
  "version": [1, 0, 0]
}
```

## Connect in game

Run:

```text
/voicecraft:vcconnect "http://<VOICECRAFT_HOST>:<PORT>" <LOGIN_TOKEN>
```

Example:

```text
/voicecraft:vcconnect "http://127.0.0.1:9050" e4ad1f7e-4f90-4b21-bc15-6febe580bf1c
```

Use the token from `McHttpConfig.LoginToken`.

For scripted auto-connect, the addon also exposes the raw form:

```text
/voicecraft:vcconnect_raw "<VOICECRAFT_HOST>" <PORT> <LOGIN_TOKEN>
```

In `Core.McHttp`, this builds `http://<VOICECRAFT_HOST>:<PORT>` internally. Use the normal `vcconnect` command for manual setup unless your world script stores host and port separately.

If BDS runs on a different host than VoiceCraft, replace `127.0.0.1` with the address of the VoiceCraft server as seen from the BDS machine.

## What happens after connect

After successful connection:

- the addon authenticates with VoiceCraft
- the world can create / update entities through McApi
- bind flow becomes available through `voicecraft:vcbind`
- effects UI and packet-driven state sync become available

At this stage the transport is connected, but each player still needs the VoiceCraft client and a working bind flow for proximity audio.

## Recommended validation flow

1. Start `VoiceCraft.Server` and confirm `McHttpConfig.Enabled = true`.
2. Start BDS with the addon attached.
3. Connect the world with `vcconnect`.
4. Confirm no auth error is shown.
5. Connect a VoiceCraft client to `VoiceCraftConfig.Port`.
6. Use `voicecraft:vcbind <key>`.
7. Move the player in game and confirm position updates affect proximity.
8. Confirm other players can hear at the expected range.

## Common issues

- `HttpListenerException` on Windows:
  you may need `netsh http add iplisten 127.0.0.1`
- container or VM networking:
  use `http://0.0.0.0:9050/` or the correct LAN address
- hosting provider blocks outbound HTTP from BDS:
  this transport may not work there
- auth fails:
  confirm the command uses `McHttpConfig.LoginToken`, not the `McWss` or `McTcp` token
- addon loads but commands are missing:
  confirm both behavior and resource packs are attached to the world and BDS was restarted
- client connects but no proximity:
  confirm bind flow, `PositioningType`, and player position updates

## Read next

- [VoiceCraft.Addon](/ecosystem/voicecraft-addon)
- [Addon API](/ecosystem/addon-api)
- [Download Page](/download)
- [Addon Configurator](/addon-configurator)
