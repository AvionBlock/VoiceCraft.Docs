# VoiceCraft (Repository and Build)

Primary repository: [gitlab.avion.team/voicecraft/VoiceCraft](https://gitlab.avion.team/voicecraft/VoiceCraft)

Public mirror only: [AvionBlock/VoiceCraft](https://github.com/AvionBlock/VoiceCraft)

The `VoiceCraft` repository contains the core runtime. It is where the client, server, shared protocol, network model, and release builds come from.

You do not need to build from source for a normal deployment. Use prebuilt releases unless you are developing VoiceCraft itself, debugging a specific build, or producing a custom runtime.

## Repository structure

- `VoiceCraft.Client/VoiceCraft.Client`
  shared Avalonia client application
- `VoiceCraft.Client/VoiceCraft.Client.Windows`
  Windows desktop packaging target
- `VoiceCraft.Client/VoiceCraft.Client.Linux`
  Linux desktop packaging target
- `VoiceCraft.Client/VoiceCraft.Client.MacOS`
  macOS desktop packaging target
- `VoiceCraft.Client/VoiceCraft.Client.Android`
  Android mobile target
- `VoiceCraft.Client/VoiceCraft.Client.iOS`
  iOS mobile target
- `VoiceCraft.Server`
  standalone VoiceCraft backend
- `VoiceCraft.Core`
  shared constants, models, audio abstractions, helpers, telemetry transport, and common runtime code
- `VoiceCraft.Network`
  VoiceCraft and McApi packets, clients, servers, transports, entities, audio effects, jitter buffering, and world state
- `VoiceCraft.*.Tests`
  unit, protocol, and integration coverage
- `VoiceCraft.Tools`
  development and measurement tools

The browser/web client target was removed in `1.7.0`.

## What 1.7 changed in the repository

- project version changed from `1.6.1` to `1.7.0`
- Android version changed to `17`
- package versions were upgraded, including Avalonia, LiteNetLib, SoundFlow, OpusSharp, Spectre.Console, and test packages
- `OpenPort.Net` was added for NAT port mapping
- event packet wrapping and event subscriptions were reworked
- entity custom properties were added to core and network state
- cave/muffle factor packets were removed in favor of properties
- audio effects now use processors
- iOS received sample-rate conversion fixes and an Apple privacy manifest
- release pipeline files were added

## Build requirements

From source code:

- .NET SDK compatible with the repository `global.json`
- platform SDKs for mobile targets
- signing/provisioning setup for iOS packaging

Check locally:

```bash
dotnet --info
```

## Build the solution

Use this when you want to validate the full solution or produce local binaries:

```bash
git clone https://gitlab.avion.team/voicecraft/VoiceCraft.git
cd VoiceCraft

dotnet restore
dotnet build -c Release
```

If restore fails, confirm the installed .NET SDK matches the repository `global.json` expectations.

## Run the server

```bash
dotnet run --project VoiceCraft.Server -- --language en-US
```

Useful root options:

- `--language <locale>`
- `--exit-on-invalid-properties`
- `--transport-mode <http|tcp|wss>`
- `--transport-host <host>`
- `--transport-port <port>`
- `--server-key <token>`

The extra `--` passes arguments to the server project rather than to `dotnet run` itself.

## Client builds

Examples:

```bash
dotnet build VoiceCraft.Client/VoiceCraft.Client.Windows -c Release
dotnet build VoiceCraft.Client/VoiceCraft.Client.Linux -c Release
dotnet build VoiceCraft.Client/VoiceCraft.Client.MacOS -c Release
```

Mobile targets require platform-specific SDK, signing, and packaging steps outside the core solution build.

## Production checklist

1. Run `VoiceCraft.Server` once to generate config.
2. Replace all generated transport tokens.
3. Decide which transport you actually need:
   - `McHttp`
   - `McWss`
   - `McTcp`
4. Decide whether `AutoOpenPort` should stay disabled.
5. Open only required ports.
6. Keep backups of `ServerProperties.json`.
7. Install the matching Minecraft-side integration.
8. Confirm clients and Minecraft integration connect through their separate endpoints.

## Related docs

- [Server Installation](/server/installation)
- [ServerProperties.json](/server/server-properties)
- [Transport Modes](/server/transports)
- [VoiceCraft.Addon](/ecosystem/voicecraft-addon)
- [GeyserVoice](/ecosystem/geyservoice)
