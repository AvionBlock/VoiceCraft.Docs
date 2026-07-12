# VoiceCraft.Java Direct Paper Guide

Use this mode when one Paper server should talk directly to VoiceCraft. The Paper plugin can either connect to an external VoiceCraft backend or download and start VoiceCraft itself.

```text
Paper + VoiceCraft.Java -> McTcp -> VoiceCraft.Server
VoiceCraft Client / SVC / Plasmo -> shared VoiceCraft audio bridge
```

## Two runtime choices

External backend:

- run `VoiceCraft.Server` yourself
- set `config.voicecraft.transport.*` to that server
- keep `auto-start: false`

Managed runtime:

- set `config.voicecraft.auto-start: true`
- Paper downloads VoiceCraft from GitLab releases
- files are stored in `config.voicecraft.install-directory`
- the plugin can stop the runtime when disabled

## Minimal Paper config

```yml
config:
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
```

## Optional adapters

Enable these only if Java players will use those mods:

- `config.adapters.simple-voice-chat.enabled` for Simple Voice Chat
- `config.adapters.plasmo.enabled` for Plasmo Voice

Open the adapter UDP ports and set public host/port values when clients connect from outside the host machine.

## Setup

1. Put the Paper jar in `plugins`.
2. Start once to generate `plugins/VoiceCraft.Java/config.yml`.
3. Configure McTcp host, port, and token.
4. Decide whether `auto-start` should manage VoiceCraft.
5. Enable SVC/Plasmo adapters only when needed.
6. Run `/voice reload` or restart.
7. Test `/voice bind <key>` and proximity movement.
