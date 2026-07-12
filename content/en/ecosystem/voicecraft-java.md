# VoiceCraft.Java (Java Bridge)

Repository: [VoiceCraft.Java](https://java.voicecraft.chat)

VoiceCraft.Java is the Java-side plugin for VoiceCraft. It replaces the older GeyserVoice naming in the docs and connects Paper, Velocity, or BungeeCord infrastructure to the VoiceCraft backend through McTcp.

It turns VoiceCraft into a shared proximity voice layer for mixed servers: VoiceCraft client users, Simple Voice Chat users, Plasmo Voice users, and Bedrock players on Java cross-play servers can share the same voice space.

## What it supports

- Paper direct mode for one server
- Velocity and BungeeCord proxy mode for networks
- managed VoiceCraft runtime on Paper
- external VoiceCraft backend mode
- Simple Voice Chat adapter on Paper
- Plasmo Voice adapter on Paper
- bind flow for external VoiceCraft clients with `/voice bind <key>`
- localized config/message templates: `en`, `ru`, `nl`, `ja`

## Player client paths

| Player client | Path |
| --- | --- |
| VoiceCraft Client | player connects to VoiceCraft backend, then binds in Minecraft with `/voice bind <key>` |
| Simple Voice Chat | Paper adapter handles the SVC protocol and forwards Opus audio into VoiceCraft |
| Plasmo Voice | Paper adapter handles Plasmo TCP/UDP and forwards Opus audio into VoiceCraft |
| Bedrock on Java cross-play | player uses VoiceCraft Client; plugin supplies Java-side position/state |

## Runtime modes

Direct Paper:

```text
Paper -> VoiceCraft.Java -> VoiceCraft
```

Proxy network:

```text
Paper backends -> Velocity/BungeeCord -> VoiceCraft
```

In proxy mode install VoiceCraft.Java on every Paper backend and on the proxy. The proxy owns the McTcp connection; Paper backends send snapshots through `voicecraft-java:main`.

## Requirements

- Java 21
- Paper, Velocity, or BungeeCord
- VoiceCraft backend unless Paper managed runtime is enabled
- reachable UDP ports for enabled Simple Voice Chat or Plasmo Voice adapters

Current source targets include Paper API `1.21.11-R0.1-SNAPSHOT`, Velocity API `3.4.0-SNAPSHOT`, and BungeeCord API `26.1-R0.1-SNAPSHOT`.

## Config highlights

Paper uses config version `3`; Velocity and BungeeCord use config version `2`.

Important blocks:

- `config.voicecraft.transport.host`, `port`, `login-token`: McTcp connection to VoiceCraft
- `config.voicecraft.auto-start`: let Paper download and start VoiceCraft
- `config.voicecraft.install-directory`: where managed runtime files are stored
- `config.adapters.simple-voice-chat`: Simple Voice Chat adapter
- `config.adapters.plasmo`: Plasmo Voice adapter
- `config.voice.status-icons`: in-game voice status icons on Paper

## Commands

- `/voice connect <host> <port> <login-token>`
- `/voice reconnect [true|false]`
- `/voice disconnect`
- `/voice bind <key>`
- `/voice bindfake <key> <name>`
- `/voice reload`

## Build outputs

```text
modules/paper/build/libs/VoiceCraft.Java-paper-<version>.jar
modules/velocity/build/libs/VoiceCraft.Java-velocity-<version>.jar
modules/bungeecord/build/libs/VoiceCraft.Java-bungeecord-<version>.jar
```

Use shaded jars without the `thin` or `sources` classifier.
