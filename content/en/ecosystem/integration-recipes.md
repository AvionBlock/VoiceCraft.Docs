# Integration Recipes

These are practical deployment patterns for the most common VoiceCraft scenarios.

Use this page after you understand the basic components and need a concrete topology recipe. Each scenario lists the stack, the main reason to choose it, the config that matters most, and the validation point that proves it works.

## Scenario A: Bedrock Dedicated Server

Stack:

- `VoiceCraft.Server`
- `VoiceCraft.Addon.Core.McHttp`
- VoiceCraft clients

Choose this when:

- BDS is the main game server
- BDS can reach a VoiceCraft HTTP endpoint
- you want the most stable Bedrock production path

Recommended config:

- `McHttpConfig.Enabled = true`
- `McWssConfig.Enabled = false`
- `McTcpConfig.Enabled = false` unless also needed

Flow:

1. deploy `VoiceCraft.Server`
2. secure `McHttpConfig.LoginToken`
3. ensure BDS can reach `McHttpConfig.Hostname`
4. install `Core.McHttp`
5. run `voicecraft:vcconnect <hostname> <token>`
6. validate `voicecraft:vcbind <key>`
7. connect a client and confirm proximity changes with movement

## Scenario B: Local / singleplayer Bedrock world

Stack:

- local VoiceCraft stack
- `VoiceCraft.Addon.Core.McWss`

Choose this when:

- you are testing locally
- you do not run BDS
- the `/connect` websocket flow is available

Flow:

1. enable `McWss`
2. keep `DataTunnelCommand = voicecraft:data_tunnel`
3. install `Core.McWss`
4. use `/connect`
5. run `voicecraft:vcconnect <token>`
6. validate bind and movement

## Scenario C: Direct Paper with VoiceCraft.Java-managed runtime

Stack:

- Paper / Folia
- `VoiceCraft.Java`
- plugin-managed VoiceCraft runtime

Choose this when:

- one Paper/Folia server should own voice integration
- you want fewer external services
- VoiceCraft.Java should download and start VoiceCraft

Flow:

1. install `VoiceCraft.Java`
2. set `config.proxy.enabled = false`
3. configure `config.voicecraft.transport.login-token`
4. enable `config.voicecraft.auto-start`
5. reload and validate bind flow

This is the simplest Java-side setup when you want the plugin to run VoiceCraft under the hood.

## Scenario D: Direct Paper with external VoiceCraft

Stack:

- Paper / Folia
- `VoiceCraft.Java`
- externally managed `VoiceCraft.Server`

Choose this when:

- you already run VoiceCraft with systemd, Docker, or a panel
- several components may need the same backend
- you want external logs and restart policy

Flow:

1. enable `McTcp` on VoiceCraft
2. set `config.voicecraft.transport.host`, `config.voicecraft.transport.port`, and `config.voicecraft.transport.login-token` in VoiceCraft.Java
3. disable plugin runtime management if not needed
4. reload and validate connection

## Scenario E: Velocity or Bungee network

Stack:

- `VoiceCraft.Java` on proxy
- `VoiceCraft.Java` on backend Paper servers
- `VoiceCraft.Server` with `McTcp`

Choose this when:

- Velocity or BungeeCord routes players across backend servers
- the proxy should own the VoiceCraft connection
- backend servers should only send snapshots

Flow:

1. configure the proxy as the VoiceCraft owner
2. configure backend Paper nodes for proxy mode
3. reload plugin on all nodes
4. validate cross-server player movement

## Minimal production config fragment

```json
{
  "VoiceCraftConfig": {
    "Port": 9050,
    "MaxClients": 250,
    "PositioningType": 0
  },
  "McHttpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-strong-token",
    "Hostname": "http://0.0.0.0:9050/",
    "MaxClients": 10
  },
  "McTcpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-strong-token",
    "Hostname": "0.0.0.0",
    "Port": 9052,
    "MaxClients": 10
  },
  "McWssConfig": {
    "Enabled": false,
    "LoginToken": "replace-with-strong-token",
    "Hostname": "ws://0.0.0.0:9051/",
    "DataTunnelCommand": "voicecraft:data_tunnel"
  }
}
```

This fragment shows a mixed HTTP + TCP deployment. Do not bind `McHttp` and `McTcp` to the same TCP port. The VoiceCraft UDP client port can share the number `9050` because it is UDP, but HTTP and raw TCP listeners need distinct TCP bindings.

## Troubleshooting order

1. verify token match
2. verify host / port reachability
3. verify chosen transport is enabled
4. verify addon or plugin topology matches the config
5. only then investigate packet-level issues

## What "working" means

A recipe is complete only when all of these are true:

- `VoiceCraft.Server` starts without listener errors
- at least one VoiceCraft client connects
- the Minecraft-side transport authenticates
- bind flow completes
- moving in game changes proximity behavior
- staff can identify connected clients/entities for troubleshooting
