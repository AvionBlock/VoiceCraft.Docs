# First Server Run

This page starts after you have already downloaded and launched `VoiceCraft.Server` once. The goal is to turn that first launch into a working server that clients and Minecraft can actually use.

## What happens on first start

On startup, VoiceCraft looks for `ServerProperties.json` in the current directory and subdirectories.

If the file is not found, the server automatically creates:

- `config/`
- `config/ServerProperties.json`

This file becomes the main persistent source of truth for server behavior.

After the file appears, stop the server, edit the config, then start it again. The first launch only creates the baseline; the setup is not finished yet.

## Default ports and endpoints

By default the generated config is aligned like this:

- VoiceCraft UDP: `9050`
- `McHttp`: `http://127.0.0.1:9050/`
- `McWss`: `ws://127.0.0.1:9051/`
- `McTcp`: `127.0.0.1:9050`

Notes:

- UDP voice traffic and some transport defaults share `9050`
- `McWss` is separated by default on `9051`
- `McTcp` is especially relevant for `VoiceCraft.Java`

## Linear first-run path

### 1. Stop and open the generated config

Open:

```text
config/ServerProperties.json
```

Keep this file in the same install folder and include it in backups.

### 2. Replace generated tokens

Before any addon, plugin, or player client connects, replace:

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

Use the token from the transport you actually connect later. For example, a BDS `vcconnect` command must use `McHttpConfig.LoginToken`, while VoiceCraft.Java must use `McTcpConfig.LoginToken`.

### 3. Choose one primary Minecraft transport

Use the topology to decide what should be enabled:

| Setup | Enable | Continue with |
|-------|--------|---------------|
| Bedrock Dedicated Server | `McHttpConfig` | [McHttp for BDS](/minecraft/mchttp-bds) |
| Local Bedrock world | `McWssConfig` | [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer) |
| Java + Geyser/Floodgate | `McTcpConfig` | [VoiceCraft.Java](/ecosystem/voicecraft-java) |

You can run multiple transports, but a first setup is easier to debug when only the required one is exposed.

### 4. Set host bindings

Use local bindings when everything runs on one machine:

- `McHttpConfig.Hostname = http://127.0.0.1:9050/`
- `McWssConfig.Hostname = ws://127.0.0.1:9051/`
- `McTcpConfig.Hostname = 127.0.0.1`

Use `0.0.0.0` only when another machine, container, or game host must reach VoiceCraft.

### 5. Restart the server

Start `VoiceCraft.Server` again from the same folder. Watch for:

- invalid JSON errors
- port already in use errors
- failed listener or binding errors

Fix these before moving on. A Minecraft addon or plugin cannot connect reliably while the server is reporting startup errors.

### 6. Connect a VoiceCraft client

Install the client from the [Download Page](/download), then add a server entry:

- host: the VoiceCraft server address
- port: `VoiceCraftConfig.Port`, usually `9050`

For local testing, use:

```text
127.0.0.1:9050
```

Make sure the client `Positioning Type` matches `VoiceCraftConfig.PositioningType`.

### 7. Connect Minecraft

Continue with the guide that matches the transport you enabled:

- [McHttp for BDS](/minecraft/mchttp-bds)
- [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer)
- [VoiceCraft.Java](/ecosystem/voicecraft-java)

When prompted for a token, use the matching transport token from `ServerProperties.json`.

### 8. Validate the setup

The first setup is complete when:

- server logs show no config or listener errors
- the VoiceCraft client connects to the UDP endpoint
- Minecraft authenticates through the selected transport
- in-game bind flow works
- player position updates reach VoiceCraft
- proximity voice works at the expected range

## Startup arguments

VoiceCraft server supports these root arguments:

- `--exit-on-invalid-properties`
  Exit if `ServerProperties.json` cannot be parsed.
- `--language <culture>`
  Override server log language for the current run.
- `--transport-mode <mode>`
  Enable a subset of Minecraft transports for the current run.
- `--transport-host <host>`
  Override the configured Minecraft transport host.
- `--transport-port <port>`
  Override the configured Minecraft transport port.
- `--server-key <token>`
  Override the shared Minecraft-side login token for the current run.

Short aliases also exist in code:

- `-eip`
- `-l`
- `-tm`
- `-th`
- `-tp`
- `-sk`

## Examples

### Run with a startup language override

```bash
./VoiceCraft.Server --language en-US
```

### Exit if config is invalid

```bash
./VoiceCraft.Server --exit-on-invalid-properties
```

### Run only `McTcp` for a Java bridge

```bash
./VoiceCraft.Server --transport-mode tcp --transport-host 0.0.0.0 --transport-port 9050
```

### Run only `McHttp`

```bash
./VoiceCraft.Server --transport-mode http --transport-host 0.0.0.0 --transport-port 9050
```

### Override token without editing JSON

```bash
./VoiceCraft.Server --server-key "replace-with-secure-token"
```

## How transport overrides behave

Runtime overrides do not permanently rewrite `ServerProperties.json`.

They apply only to the current process and are useful when:

- running multiple environments from one image
- using panels or systemd drop-ins
- testing direct vs proxy topologies
- letting another tool such as `VoiceCraft.Java` launch the runtime with generated values

## First-run checklist

1. Run the server once to generate `config/ServerProperties.json`.
2. Stop the server before editing the generated config.
3. Change all generated login tokens.
4. Confirm which transport you actually need:
   - `McHttp` for BDS
   - `McWss` for local worlds
   - `McTcp` for `VoiceCraft.Java`
5. Verify host bindings.
6. Open only the ports you need.
7. Restart the server from the same install folder.
8. Confirm `PositioningType` with your clients.
9. Test client connection before connecting Minecraft automation.
10. Connect the Minecraft addon or plugin and validate bind flow.

## Common first-run mistakes

- leaving generated tokens unchanged
- exposing `127.0.0.1` endpoints to remote nodes
- forgetting that `McTcp` may be required by Java-side bridges
- enabling every transport in production without actually needing them
- editing `ServerProperties.json` while a process manager immediately restarts the old broken config
- using the UDP client port where the Minecraft guide expects a transport endpoint

For the full config reference, see [ServerProperties.json](/server/server-properties).
