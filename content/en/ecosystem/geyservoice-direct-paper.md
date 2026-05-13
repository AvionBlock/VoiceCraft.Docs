# GeyserVoice Direct Paper Guide

Use this mode when one Paper / Folia server should talk directly to VoiceCraft.

Direct Paper mode is the simplest Java-side topology: the Paper server either connects to an external `VoiceCraft.Server` or lets GeyserVoice download and start a local VoiceCraft runtime.

Target shape:

```text
Paper/Folia + GeyserVoice -> McTcp/McApi TCP -> VoiceCraft.Server
VoiceCraft.Client -> VoiceCraft UDP endpoint
```

## Two ways to run it

### Option A: external VoiceCraft server

You already run `VoiceCraft.Server` somewhere and point GeyserVoice at it.

### Option B: plugin-managed runtime

GeyserVoice can bootstrap VoiceCraft for you:

- download runtime
- install runtime
- start runtime
- wait for readiness
- optionally stop runtime with the plugin

This is one of the most important current features for direct Paper users.

## Recommended config

```yml
config:
  debug: false
  lang: "system"
  auto-reconnect: true

  proxy:
    enabled: false

  voicecraft:
    transport:
      host: "127.0.0.1"
      port: 9050
      login-token: "replace-with-token"
    voice:
      port: 1111
    auto-start: true
    shutdown-on-disable: true
    invariant-globalization: true
    ready-timeout-ms: 20000
    install-directory: "voicecraft-runtime"

  voice:
    proximity-distance: 30
    proximity-toggle: true
    voice-effects: true
    send-bind-message: true
    send-disconnect-message: true
    send-voicecraft-disconnect-message: true
    send-connection-lost-message: true
    position-update-interval-ticks: 5
```

Use `config.voicecraft.transport.host`, `config.voicecraft.transport.port`, and `config.voicecraft.transport.login-token` for the VoiceCraft `McTcp` connection. These must match the VoiceCraft server side when you use an external runtime.

## Setup steps

1. Install GeyserVoice on Paper.
2. Start the server once.
3. Edit `plugins/GeyserVoice/config.yml`.
4. Decide whether `auto-start` should be enabled.
5. Ensure `config.voicecraft.transport.login-token` matches VoiceCraft `McTcpConfig.LoginToken`.
6. Run `/voice reload`.
7. Test bind flow in game.

If `auto-start` is `true`, make sure `install-directory` is writable by the Paper process. If `auto-start` is `false`, make sure the external VoiceCraft server is already running and reachable.

## When `auto-start` is a good idea

- single-server setup
- you want fewer moving pieces
- you do not already manage VoiceCraft with systemd / Docker / panel

## When an external runtime is better

- you already manage VoiceCraft centrally
- you want different restart policy or logging
- you run several Java nodes against one VoiceCraft backend
- you want a process manager such as systemd, Docker, or a hosting panel to own restarts

## Troubleshooting

- runtime never becomes ready:
  increase `ready-timeout-ms`
- plugin can connect manually but not on startup:
  check `auto-start` and `install-directory`
- players join but voice data does not bind:
  verify token, host, port, and bind flow
- external VoiceCraft never sees the plugin:
  confirm `McTcpConfig.Enabled = true`, host binding, firewall, and `config.voicecraft.transport.*`
- client connects but Java state does not affect proximity:
  check `/voice bind`, position update interval, and server-side positioning mode

## Validation checklist

- Paper logs show GeyserVoice enabled
- VoiceCraft runtime is running or auto-started
- `McTcpConfig.LoginToken` matches `config.voicecraft.transport.login-token`
- player can connect with the VoiceCraft client
- player can complete `/voice bind <key>`
- moving in game changes proximity behavior
