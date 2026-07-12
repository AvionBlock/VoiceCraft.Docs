# VoiceCraft (Repository and Build)

Primary repository: [gitlab.avion.team/voicecraft/VoiceCraft](https://gitlab.avion.team/voicecraft/VoiceCraft)

GitHub is a public mirror only: [AvionBlock/VoiceCraft](https://github.com/AvionBlock/VoiceCraft)

The `VoiceCraft` repository contains the core runtime. It is where the client, server, shared protocol, network model, and release builds come from.

You do not need to build from source for a normal deployment. Use prebuilt releases unless you are developing VoiceCraft itself, debugging a specific build, or producing a custom runtime.

## Repository structure

- `VoiceCraft.Client/*`
  platform clients for Windows, Linux, macOS, Android, iOS, and browser-related targets
- `VoiceCraft.Server`
  standalone VoiceCraft backend
- `VoiceCraft.Core`
  shared core utilities, audio helpers, localization, constants
- `VoiceCraft.Network`
  protocol packets, transports, entities, effects, world logic
- test projects
  protocol, network, and integration coverage

## What the repository contains

The repository is broader than "client + server":

- full client settings model
- embedded locales
- Minecraft-facing transports:
  `McHttp`, `McWss`, `McTcp`
- packet definitions for VoiceCraft and McApi layers
- audio effects and visibility systems

It is also important to understand what this repository is not: VoiceCraft is not a single Minecraft mod or plugin. The core runtime works together with clients and Minecraft-side integrations such as `VoiceCraft.Addon` or `GeyserVoice`.

## Build requirements

From source code:

- .NET SDK `9.0.312`
- `rollForward: latestMinor`

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

For deployment, prefer the published release artifact or a `dotnet publish` output over running directly from source.

## Client builds

Examples:

```bash
dotnet build VoiceCraft.Client/VoiceCraft.Client.Windows -c Release
dotnet build VoiceCraft.Client/VoiceCraft.Client.Linux -c Release
dotnet build VoiceCraft.Client/VoiceCraft.Client.MacOS -c Release
```

Mobile targets usually require their own platform SDK toolchains.

Desktop builds are simpler because the required SDKs are part of the .NET/Avalonia toolchain. Mobile builds may require platform-specific signing and packaging steps outside the core solution build.

## Embedded locales

Current embedded locales include:

- `en-US`
- `ru-RU`
- `nl-NL`
- `de-DE`
- `pl-PL`
- `zh-CN`
- `zh-TW`

## Production checklist

1. Run `VoiceCraft.Server` once to generate config.
2. Replace all generated transport tokens.
3. Decide which transport you actually need:
   - `McHttp`
   - `McWss`
   - `McTcp`
4. Open only required ports.
5. Keep backups of `ServerProperties.json`.
6. Install the matching Minecraft-side integration.
7. Confirm clients and Minecraft integration connect through their separate endpoints.

## When to use this page

- you want to build or debug core VoiceCraft
- you need to understand which project owns client/server behavior
- you are checking whether a feature belongs in core, addon, or GeyserVoice
- you are preparing custom release artifacts

## Related docs

- [Server Installation](/server/installation)
- [ServerProperties.json](/server/server-properties)
- [Transport Modes](/server/transports)
- [VoiceCraft.Addon](/ecosystem/voicecraft-addon)
- [GeyserVoice](/ecosystem/geyservoice)
