# System Architecture

This page explains the big pieces of VoiceCraft and how they relate.

## Main layers

### Client layer

`VoiceCraft.Client` handles:

- input capture
- preprocessing
- UDP transport to VoiceCraft
- playback and local per-user preferences

### Server layer

`VoiceCraft.Server` handles:

- network entity state
- voice client sessions
- moderation flags
- effect bitmasks and audio effect defaults
- Minecraft-facing transports

### Minecraft integration layer

This depends on topology:

- `VoiceCraft.Addon` for Bedrock
- `GeyserVoice` for Java / Geyser / proxy networks

## Core data concepts

VoiceCraft revolves around entities rather than only raw sockets.

Entities carry state such as:

- name
- title
- description
- position
- rotation
- world ID
- mute / deafen state
- effect bitmasks

## Why transports are separate

VoiceCraft voice traffic and Minecraft automation do not always live in the same environment.

That is why:

- the client talks to the core voice server
- Bedrock or Java integration talks through a transport layer

This separation keeps the core platform flexible.
