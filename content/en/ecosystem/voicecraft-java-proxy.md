# VoiceCraft.Java Proxy Guide

Use this mode for Velocity or BungeeCord networks with one or more Paper backend servers.

```text
Paper backends + VoiceCraft.Java -> voicecraft-java:main -> Velocity/BungeeCord + VoiceCraft.Java -> McTcp -> VoiceCraft.Server
```

## Core rule

The proxy owns the VoiceCraft connection. Paper backends observe players and send snapshots through plugin messaging; they should not also own the main McTcp connection.

## Install pattern

- install the proxy jar on Velocity or BungeeCord
- install the Paper jar on every backend Paper server
- start once to generate configs

## Backend Paper config

```yml
config:
  proxy:
    enabled: true
```

Backend nodes use the `voicecraft-java:main` plugin channel to send player snapshots, bind/unbind requests, and state updates to the proxy.

## Proxy config

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

The token must match `McTcpConfig.LoginToken` on VoiceCraft.Server.

## Adapter proxy ports

Velocity and BungeeCord configs include proxy sections for Simple Voice Chat and Plasmo. Enable them only when the proxy should expose those adapter ports for the network.

## Validation

- proxy logs show one active McTcp connection
- backend logs show plugin messaging to the proxy
- moving between backend servers keeps voice identity stable
- `/voice bind <key>` works after joining through the proxy
- VoiceCraft proximity changes when the player moves in-game
