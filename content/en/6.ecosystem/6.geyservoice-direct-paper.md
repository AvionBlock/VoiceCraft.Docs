# GeyserVoice Direct Paper Guide

Use this mode when one Paper / Folia server should talk directly to VoiceCraft.

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
    host: "127.0.0.1"
    port: 9050
    login-token: "replace-with-token"
    auto-start: true
    shutdown-on-disable: true
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

## Setup steps

1. Install GeyserVoice on Paper.
2. Start the server once.
3. Edit `plugins/GeyserVoice/config.yml`.
4. Decide whether `auto-start` should be enabled.
5. Ensure the `login-token` matches VoiceCraft `McTcpConfig.LoginToken`.
6. Run `/voice reload`.
7. Test bind flow in game.

## When `auto-start` is a good idea

- single-server setup
- you want fewer moving pieces
- you do not already manage VoiceCraft with systemd / Docker / panel

## When an external runtime is better

- you already manage VoiceCraft centrally
- you want different restart policy or logging
- you run several Java nodes against one VoiceCraft backend

## Troubleshooting

- runtime never becomes ready:
  increase `ready-timeout-ms`
- plugin can connect manually but not on startup:
  check `auto-start` and `install-directory`
- players join but voice data does not bind:
  verify token, host, port, and bind flow
