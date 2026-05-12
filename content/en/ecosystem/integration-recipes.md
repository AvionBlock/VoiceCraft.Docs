# Integration Recipes

These are practical deployment patterns for the most common VoiceCraft scenarios.

## Scenario A: Bedrock Dedicated Server

Stack:

- `VoiceCraft.Server`
- `VoiceCraft.Addon.Core.McHttp`
- VoiceCraft clients

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

## Scenario B: Local / singleplayer Bedrock world

Stack:

- local VoiceCraft stack
- `VoiceCraft.Addon.Core.McWss`

Flow:

1. enable `McWss`
2. keep `DataTunnelCommand = voicecraft:data_tunnel`
3. install `Core.McWss`
4. use `/connect`
5. run `voicecraft:vcconnect <token>`

## Scenario C: Direct Paper with GeyserVoice-managed runtime

Stack:

- Paper / Folia
- `GeyserVoice`
- plugin-managed VoiceCraft runtime

Flow:

1. install `GeyserVoice`
2. set `config.proxy.enabled = false`
3. configure `config.voicecraft.login-token`
4. enable `config.voicecraft.auto-start`
5. reload and validate bind flow

This is the simplest Java-side setup when you want the plugin to run VoiceCraft under the hood.

## Scenario D: Direct Paper with external VoiceCraft

Stack:

- Paper / Folia
- `GeyserVoice`
- externally managed `VoiceCraft.Server`

Flow:

1. enable `McTcp` on VoiceCraft
2. set `host`, `port`, `login-token` in GeyserVoice
3. disable plugin runtime management if not needed
4. reload and validate connection

## Scenario E: Velocity or Bungee network

Stack:

- `GeyserVoice` on proxy
- `GeyserVoice` on backend Paper servers
- `VoiceCraft.Server` with `McTcp`

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
    "Port": 9050,
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

## Troubleshooting order

1. verify token match
2. verify host / port reachability
3. verify chosen transport is enabled
4. verify addon or plugin topology matches the config
5. only then investigate packet-level issues
