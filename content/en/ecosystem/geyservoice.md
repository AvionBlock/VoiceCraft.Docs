# GeyserVoice (Java / Geyser Bridge)

Repository: [AvionBlock/GeyserVoice](https://github.com/AvionBlock/GeyserVoice)

`GeyserVoice` connects Java-side infrastructure to `VoiceCraft.Server` through the `McTcp` transport.

In the GeyserVoice project this path is also described as `McApi TCP`. In the VoiceCraft server config, it corresponds to `McTcpConfig`.

It supports:

- direct Paper / Folia deployment
- Velocity proxy deployment
- BungeeCord proxy deployment
- mixed proxy + backend topologies

## What GeyserVoice does

`GeyserVoice` bridges player state from Java-side servers into VoiceCraft:

- player lifecycle
- position / world snapshots
- bind flow
- proxy relaying for multi-server networks

It is not just a simple packet forwarder. In direct Paper mode it can also manage a local VoiceCraft runtime.

## Very important: GeyserVoice can run VoiceCraft under the hood

On direct Paper installations, the plugin can automatically:

- download the VoiceCraft runtime
- install it into a configured directory
- start the process
- wait until it becomes ready
- optionally stop it when the plugin disables

This behavior is controlled through the `config.voicecraft.*` block.

That makes GeyserVoice suitable both for:

- using an already-managed external `VoiceCraft.Server`
- letting the plugin bootstrap and run VoiceCraft for you

If GeyserVoice manages the runtime, it still connects through the same `McTcp`/`McApi TCP` path. The difference is who starts the VoiceCraft process.

## Supported plugin platforms

From current source code:

- Paper / Folia
- Velocity
- BungeeCord

## Runtime paths

Current supported paths:

- `Paper -> McTcp -> VoiceCraft`
- `Paper -> Proxy relay -> McTcp -> VoiceCraft`

## `config.yml` layout

Current Paper config structure:

### `config.debug`

Enable plugin debug mode.

### `config.lang`

Plugin language, for example `system`.

### `config.auto-reconnect`

Whether the plugin should reconnect automatically.

### `config.proxy.enabled`

Whether the current Paper-side node is operating behind a proxy-managed relay.

### `config.voicecraft.*`

Connection and runtime-management block.

Current nested shape:

```yml
config:
  voicecraft:
    transport:
      host: "127.0.0.1"
      port: 9050
      login-token: "__GENERATED_LOGIN_TOKEN__"
    voice:
      port: 1111
    auto-start: true
    shutdown-on-disable: true
    invariant-globalization: true
    ready-timeout-ms: 20000
    install-directory: "voicecraft-runtime"
```

- `transport.host`
- `transport.port`
- `transport.login-token`
- `voice.port`
- `auto-start`
- `shutdown-on-disable`
- `invariant-globalization`
- `ready-timeout-ms`
- `install-directory`

Meaning:

- `transport.host` / `transport.port` / `transport.login-token`
  target `VoiceCraft.Server` / `McTcp`
- `voice.port`
  VoiceCraft runtime voice port used by the managed runtime path
- `auto-start`
  let the plugin start the VoiceCraft runtime automatically
- `shutdown-on-disable`
  stop the managed runtime when the plugin unloads
- `invariant-globalization`
  runtime globalization option useful for managed server launches
- `ready-timeout-ms`
  how long the plugin waits for the runtime to become ready
- `install-directory`
  where the managed runtime is installed

On Velocity and BungeeCord, the config keeps the `config.voicecraft.transport.*` and `config.voicecraft.voice.*` shape, but does not use the Paper-only managed runtime fields.

### `config.voice.*`

Player-facing behavior:

- `proximity-distance`
- `proximity-toggle`
- `voice-effects`
- `not-in-voice-symbol`
- `in-voice-symbol`
- `send-bind-message`
- `send-disconnect-message`
- `send-voicecraft-disconnect-message`
- `send-connection-lost-message`
- `position-update-interval-ticks`

### `config.players`

Stored autobind / player-side cache data.

### `config.player-links`

Additional link/cache structure used by the plugin.

## Commands

From `BaseVoiceCommand`:

- `connect <host> <port> <key>`
- `reconnect [true|false]`
- `disconnect`
- `settings`
- `bind <key>`
- `bindfake <key> <name>`
- `updatefake <key>`
- `clearautobind`
- `reload`

## Permissions

Typical permissions:

- `voice.cmd`
- `voice.connect`
- `voice.reconnect`
- `voice.disconnect`
- `voice.settings`
- `voice.bind`
- `voice.bindfake`
- `voice.reload`

## Direct Paper mode

Best when:

- you run one Paper server
- you want the simplest Java-side setup
- you want GeyserVoice to manage VoiceCraft runtime for you

See [Direct Paper Guide](/ecosystem/geyservoice-direct-paper).

## Proxy mode

Best when:

- you run Velocity or BungeeCord
- you have several backend Paper servers
- you want one central VoiceCraft connection on the proxy

See [Proxy Guide](/ecosystem/geyservoice-proxy).

In proxy mode, backend Paper servers should not be treated as the central VoiceCraft connection owner. The proxy owns the `McTcp` connection and backend nodes provide player snapshots.

## Technical notes

- plugin messaging channel: `geyservoice:main`
- in proxy mode, world IDs can be namespaced with backend identity
- the plugin currently uses `McTcp` as the VoiceCraft-facing bridge

## Current code limitations

- `updatefake` is still a placeholder
- `settings` exists but currently has minimal practical logic

## Production checklist

1. Decide whether Paper should manage VoiceCraft runtime itself.
2. If yes, configure `auto-start`, `install-directory`, and `ready-timeout-ms`.
3. If no, point `config.voicecraft.transport.host`, `config.voicecraft.transport.port`, and `config.voicecraft.transport.login-token` at an external VoiceCraft server.
4. Restrict staff-only commands.
5. Test bind flow and position updates before opening to players.
6. Confirm `McTcpConfig.Enabled = true` on the VoiceCraft side.
7. Confirm the token matches `McTcpConfig.LoginToken`.
