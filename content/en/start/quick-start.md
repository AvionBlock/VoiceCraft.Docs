# Quick Start

This guide is the fastest way to get a working VoiceCraft stack.

It intentionally walks through the whole path: server, generated config, client, Minecraft transport, and validation. Do not stop after the server binary starts; at that point the voice backend exists, but Minecraft has not connected yet.

## Choose your topology first

VoiceCraft can be deployed in several ways:

- Bedrock Dedicated Server: `VoiceCraft.Server` + `VoiceCraft.Addon.Core.McHttp`
- Local Bedrock world / singleplayer: `VoiceCraft.Server` or local runtime + `Core.McWss`
- Java server with Geyser/Floodgate: `GeyserVoice` + `VoiceCraft.Server`
- Direct Paper server: `GeyserVoice` can also download and run the VoiceCraft runtime under the hood

If you are unsure, start with one of these:

- Bedrock dedicated server: read [McHttp for BDS](/minecraft/mchttp-bds)
- Java + Geyser server: read [GeyserVoice](/ecosystem/geyservoice)

For a first setup, choose one topology and expose only the transport it needs. You can add mixed setups later after the basic bind and proximity flow works.

## 1. Download the server

1. Open the [download page](/download).
2. Download the server archive for your platform:
   - `VoiceCraft.Server.Windows.x64.v1.7.0.zip`
   - `VoiceCraft.Server.Windows.x86.v1.7.0.zip`
   - `VoiceCraft.Server.Windows.arm64.v1.7.0.zip`
   - `VoiceCraft.Server.Linux.x64.v1.7.0.zip`
   - `VoiceCraft.Server.Linux.arm.v1.7.0.zip`
   - `VoiceCraft.Server.Linux.arm64.v1.7.0.zip`

If you are building from source, see [VoiceCraft repository and build](/ecosystem/voicecraft-repository).

## 2. Run the server once

Run from the folder where you want `config/ServerProperties.json` to live.

### Windows

```powershell
./VoiceCraft.Server.exe
```

### Linux

```bash
chmod +x ./VoiceCraft.Server
./VoiceCraft.Server
```

After first launch, VoiceCraft generates `config/ServerProperties.json`.

Stop the server before editing this file.

## 3. Secure the generated config

Before connecting Minecraft or players, change every generated shared token:

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

You usually want different values per environment.

The token you use later must match the transport:

- BDS `McHttp` addon uses `McHttpConfig.LoginToken`
- local Bedrock `McWss` addon uses `McWssConfig.LoginToken`
- `GeyserVoice` uses `McTcpConfig.LoginToken`

## 4. Pick the Minecraft transport

VoiceCraft currently has 3 Minecraft-facing transports:

- `McHttp`:
  Best for Bedrock Dedicated Server and most stable Bedrock automation.
- `McWss`:
  Best for local worlds, testing, and command-tunnel scenarios.
- `McTcp`:
  Best for Java-side bridges such as `GeyserVoice`.

See [Transport Modes](/server/transports) for the full comparison.

Make sure the chosen transport is enabled and bound to an address the Minecraft-side runtime can reach.

## 5. Download the client

From the [download page](/download), download the package for your players:

- Windows: `VoiceCraft.Client.Windows.<arch>.v1.7.0.zip`
- Linux: `VoiceCraft.Client.Linux.<arch>.v1.7.0.zip`
- macOS: `VoiceCraft.Client.MacOS.<arch>.v1.7.0.zip`
- Android: `VoiceCraft.Client.Android.arm64.v1.7.0.zip` (APK inside)
- iOS: `VoiceCraft.Client.iOS.arm64.v1.7.0.zip`

## 6. Add the server in the client

1. Open the client.
2. Select microphone and playback devices.
3. Add a server entry in the UI.
4. Use the VoiceCraft UDP endpoint from `VoiceCraftConfig.Port`.
5. Confirm client `Positioning Type` matches `VoiceCraftConfig.PositioningType`.

Typical local setup:

- host: `127.0.0.1`
- port: `9050`

## 7. Connect the Minecraft side

- For Bedrock Dedicated Server, use [McHttp for BDS](/minecraft/mchttp-bds).
- For a local Bedrock world, use [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer).
- For Java + Geyser/Floodgate, use [GeyserVoice](/ecosystem/geyservoice).

This step is what gives VoiceCraft the in-game state needed for proximity audio: player identity, bind data, world IDs, position updates, and effect state.

If you are deploying on Bedrock, keep these two pages nearby:

- [Download Page](/download) for raw client/server/addon release files
- [Addon Configurator](/addon-configurator) for a ready-to-unpack world archive

## 8. Verify the stack

If everything is configured correctly:

- VoiceCraft server starts without config or port errors
- client connects without transport errors
- Minecraft integration authenticates with the expected token
- entity creation and bind flow work
- players hear proximity voice when they are in range

If the client connects but proximity does not work, debug the Minecraft transport and bind flow before changing audio settings.

## Recommended next reads

- [Server Installation](/server/installation)
- [First Server Run](/server/first-run)
- [ServerProperties.json](/server/server-properties)
- [Runtime Overrides](/server/runtime-overrides)
- [Transport Modes](/server/transports)
- [Download Page](/download)
- [Addon Configurator](/addon-configurator)
