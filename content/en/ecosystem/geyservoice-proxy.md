# GeyserVoice Proxy Guide

Use this mode when you run Velocity or BungeeCord with one or more backend Paper servers.

Proxy mode keeps one central VoiceCraft connection on the proxy while backend Paper servers stream player snapshots through plugin messaging.

Target shape:

```text
Backend Paper + GeyserVoice -> proxy relay -> Velocity/Bungee + GeyserVoice -> McTcp -> VoiceCraft.Server
VoiceCraft.Client -> VoiceCraft UDP endpoint
```

## How proxy mode works

- backend Paper servers send player snapshots to the proxy
- the proxy owns the VoiceCraft-side `McTcp` connection
- world IDs and dimensions can be namespaced with backend identity

This allows one central voice bridge for a multi-server network.

## Deployment pattern

Install GeyserVoice:

- on the proxy
- on every backend Paper server

## Core rule

The proxy is the source of truth for the VoiceCraft connection.

Backend Paper servers should be treated as snapshot producers, not as the main bridge owner.

## Backend Paper config

On backend Paper servers:

- enable proxy mode for the Paper-side node
- do not treat backend host / port / key as the source of truth

Paper backend example:

```yml
config:
  proxy:
    enabled: true
```

The backend still needs GeyserVoice installed so it can observe players and send snapshots, but it should not own the main VoiceCraft connection.

## Proxy config

On the proxy:

- set the real `config.voicecraft.transport.host`
- set the real `config.voicecraft.transport.port`
- set the real `config.voicecraft.transport.login-token`

Velocity/Bungee example:

```yml
config:
  voicecraft:
    transport:
      host: "127.0.0.1"
      port: 9050
      login-token: "replace-with-token"
    voice:
      port: 1111
```

The token must match `McTcpConfig.LoginToken` on `VoiceCraft.Server`.

## Setup flow

1. Install plugin on proxy and backend nodes.
2. Start everything once to generate configs.
3. Configure the proxy with the real VoiceCraft connection.
4. Configure backend nodes for proxy-relay behavior.
5. Reload plugin.
6. Validate cross-server movement and bind flow.

Start with one backend server first. After bind and position updates work there, add more backend nodes.

## Validation checklist

- player joins backend
- backend sends snapshots correctly
- proxy remains connected to VoiceCraft
- switching backend servers preserves expected voice identity
- VoiceCraft server logs show a single proxy-owned `McTcp` consumer
- backend world IDs/dimensions are stable after server switches

## Failure patterns

- backend tries to own the main connection
- proxy token differs from VoiceCraft `McTcpConfig.LoginToken`
- proxy can reach Paper, but not VoiceCraft
- backend topology hides or rewrites plugin messages
- plugin is installed on the proxy but missing from one backend
- backend `config.proxy.enabled` is false in a proxy-relay deployment

## Operational notes

- Keep VoiceCraft close to the proxy when possible to reduce bridge latency.
- Restart or reload backend nodes after changing proxy-relay config.
- Keep tokens in the proxy config, not duplicated casually across every backend.
- Validate bind flow again after adding a new backend server.
