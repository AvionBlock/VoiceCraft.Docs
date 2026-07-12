# Server Installation

`VoiceCraft.Server` is the standalone backend that accepts client voice traffic and exposes Minecraft-facing transports.

Use this page as the server setup path. By the end you should have a running server, a generated config, one Minecraft transport selected, and a clear next page for your Minecraft integration.

## What the server actually includes

VoiceCraft server exposes multiple layers at once:

- VoiceCraft UDP voice server
- `McHttp` transport for Bedrock integrations
- `McWss` transport for websocket / command-tunnel Bedrock flows
- `McTcp` transport for Java-side bridges such as `VoiceCraft.Java`

You can leave all of them enabled, or select transports at runtime.

## Setup flow

1. Download and extract the server for your platform.
2. Run it once from the folder where you want to keep the config.
3. Stop the process after `config/ServerProperties.json` is generated.
4. Replace the generated login tokens.
5. Enable the Minecraft transport that matches your topology.
6. Set host bindings and firewall rules.
7. Start the server again.
8. Add the VoiceCraft UDP endpoint in the client.
9. Connect the Minecraft side with the matching addon or plugin guide.

## Prebuilt binary releases

The release page usually includes:

- Windows:
  `VoiceCraft.Server.Windows.x64.v1.7.0.zip`, `x86`, `arm64`
- Linux:
  `VoiceCraft.Server.Linux.x64.v1.7.0.zip`, `arm`, `arm64`

Download: [Download Page](/download)

## Windows

1. Download `VoiceCraft.Server.Windows.<arch>.v1.7.0.zip`.
2. Extract the archive to a dedicated folder.
3. Start the server from that folder:

```powershell
./VoiceCraft.Server.exe
```

The first run creates `config/ServerProperties.json`. Keep this file with the server folder and do not delete it between restarts.

## Linux

1. Download `VoiceCraft.Server.Linux.<arch>.v1.7.0.zip`.
2. Extract the archive to a dedicated folder.
3. Start the server from that folder:

```bash
chmod +x ./VoiceCraft.Server
./VoiceCraft.Server
```

The first run creates `config/ServerProperties.json`. Keep this file with the server folder and make sure it is included in backups.

## After the first start

Stop the server and open `config/ServerProperties.json` before connecting Minecraft or players.

Do these edits first:

1. Replace every generated shared token:
   - `McHttpConfig.LoginToken`
   - `McWssConfig.LoginToken`
   - `McTcpConfig.LoginToken`
2. Pick one primary Minecraft transport:
   - Bedrock Dedicated Server: enable `McHttpConfig`
   - local Bedrock world: enable `McWssConfig`
   - Java + Geyser/Floodgate: enable `McTcpConfig`
3. Set the transport host:
   - use `127.0.0.1` when Minecraft runs on the same machine
   - use `0.0.0.0` or a LAN/public address only when another machine must connect
4. Keep `VoiceCraftConfig.Port` available for player clients.
5. Restart `VoiceCraft.Server` after saving the config.

For all config fields, continue with [First Server Run](/server/first-run) and [ServerProperties.json](/server/server-properties).

## Connect the rest of the stack

Once the server restarts cleanly:

1. Install the VoiceCraft client for each player from the [Download Page](/download).
2. Add a server entry in the client:
   - host: your VoiceCraft server address
   - port: `VoiceCraftConfig.Port`, usually `9050`
3. Follow the Minecraft guide for your chosen transport:
   - [McHttp for BDS](/minecraft/mchttp-bds)
   - [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer)
   - [VoiceCraft.Java](/ecosystem/voicecraft-java)

The server is not considered fully set up until the client connects and the Minecraft side authenticates with the same transport token.

## macOS

There may not always be a prebuilt dedicated artifact, but the server can be built from source:

```bash
git clone https://gitlab.avion.team/voicecraft/VoiceCraft.git
cd VoiceCraft/VoiceCraft.Server
dotnet restore
dotnet publish -c Release -r osx-arm64 -p:PublishSingleFile=true
```

For Intel macOS, replace `osx-arm64` with `osx-x64`.

## Docker / containers

Container images are referenced from the main repository README:

- [VoiceCraft Docker Hub](https://hub.docker.com/r/sinevector241/voicecraft/tags)

Container deployment is useful when:

- you want a dedicated service boundary
- you already run BDS / Java nodes in containers
- you want easier restart policies and logs

After the container starts, persist and edit the generated `config/ServerProperties.json` the same way you would for a normal binary install.

## Recommended install layout

Example Linux layout:

```text
/opt/voicecraft/
  VoiceCraft.Server
  config/
    ServerProperties.json
```

Recommended practices:

- keep VoiceCraft in its own directory
- persist `config/`
- back up `ServerProperties.json`
- do not mix multiple environments in the same folder

## Ready checklist

Before opening the setup to players, confirm:

- `VoiceCraft.Server` starts without config or port errors
- all generated `LoginToken` values were replaced
- only the transport you need is exposed
- client host and port match `VoiceCraftConfig.Port`
- Minecraft addon or plugin uses the matching transport token
- bind flow works in game

## Run as systemd service (Linux)

Example `/etc/systemd/system/voicecraft.service`:

```ini
[Unit]
Description=VoiceCraft Server
After=network.target

[Service]
WorkingDirectory=/opt/voicecraft
ExecStart=/opt/voicecraft/VoiceCraft.Server
Restart=always
RestartSec=3
User=voicecraft
Group=voicecraft

[Install]
WantedBy=multi-user.target
```

Apply it:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now voicecraft
sudo systemctl status voicecraft
```

## Build from source

See [VoiceCraft repository and build](/ecosystem/voicecraft-repository) for SDK and project details.

Minimal flow:

```bash
git clone https://gitlab.avion.team/voicecraft/VoiceCraft.git
cd VoiceCraft
dotnet restore
dotnet build -c Release
dotnet run --project VoiceCraft.Server
```

## What to read next

- [First Server Run](/server/first-run)
- [ServerProperties.json](/server/server-properties)
- [Transport Modes](/server/transports)
- [Client Installation](/client/installation)
- [McHttp for BDS](/minecraft/mchttp-bds)
- [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer)
- [VoiceCraft.Java](/ecosystem/voicecraft-java)
