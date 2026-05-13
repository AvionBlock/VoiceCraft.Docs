# FAQ

Common questions about VoiceCraft.

## Does every player need the VoiceCraft client app?

Yes. Players need the client application. The server itself does not use the client app.

The client is what captures microphone input and plays nearby voice audio. The Minecraft addon or plugin only supplies game state such as player position and bind data.

## Does VoiceCraft work on mobile?

Yes. Android and iOS are supported.

Mobile users still need a reachable VoiceCraft server endpoint and microphone permission.

## Does VoiceCraft work on console?

Not directly on console hardware as a native VoiceCraft client today.

Console players can still participate in some server-side scenarios when the rest of the stack is configured correctly, but direct native client support is not the same as desktop or mobile.

## Does VoiceCraft work on Realms?

It can work in limited scenarios, especially when client-side positioning is used, but Realms is a more constrained environment than a dedicated server.

If you want a predictable production setup, use BDS with `McHttp` or a Java/Geyser topology with `GeyserVoice`.

## Which transport should I use?

- Bedrock Dedicated Server:
  `McHttp`
- local Bedrock world:
  `McWss`
- Java + Geyser / Floodgate:
  `McTcp` through `GeyserVoice`

The transport is for Minecraft-side state. Player clients still connect to the VoiceCraft UDP endpoint.

## Does GeyserVoice require a separately managed VoiceCraft server?

Not always.

In direct Paper mode, GeyserVoice can bootstrap and run the VoiceCraft runtime under the hood using:

- `config.voicecraft.auto-start`
- `config.voicecraft.shutdown-on-disable`
- `config.voicecraft.ready-timeout-ms`
- `config.voicecraft.install-directory`

If you prefer, it can also point to an already-running external VoiceCraft server.

In current configs, the external connection values live under `config.voicecraft.transport.*`.

## Can I use VoiceCraft with hosting providers such as Apex, Aternos, or similar?

It depends on whether your provider allows the required network path between the game server and the VoiceCraft server.

Examples:

- BDS with `McHttp` needs outbound reachability to the VoiceCraft HTTP endpoint
- Java + GeyserVoice needs reachability to the VoiceCraft `McTcp` endpoint

Some providers block the exact network behavior you need.

Before buying hosting, ask whether custom UDP ports, outbound HTTP/TCP, sidecar processes, and required Bedrock script modules are allowed.

## Can I host VoiceCraft on the same machine as the game server?

Yes. That is common for:

- local testing
- small communities
- direct Paper + GeyserVoice setups

Use loopback addresses such as `127.0.0.1` only when the consumer really runs on the same machine.

## Can I run only one transport?

Yes. You can limit runtime transports with:

- config toggles in `ServerProperties.json`
- runtime overrides such as `--transport-mode`

This is recommended for production. Expose only the transport your topology uses.

## Why am I not hearing anyone even though the client connects?

Check these in order:

1. correct VoiceCraft server IP and port in the client
2. matching `PositioningType`
3. correct Minecraft transport token
4. successful bind flow
5. entities receiving position and world updates

If `list --clientsOnly` shows the player but `list` does not show changing entity position, debug the Minecraft integration rather than microphone settings.

## Is `McWss` good for production?

Usually not the first choice for larger public environments.

It is best for local worlds, testing, and lightweight setups. `McHttp` is usually a better Bedrock production transport.

## What is the difference between server mute and local mute?

- server mute:
  enforced by the backend for the target entity or client
- local mute:
  stored in a player's `Settings.json` as a personal preference

## Where are per-user volume and local mute stored?

In `Settings.json` under `UserSettings.Users`.

## I run Java with Geyser. Do I need the Bedrock addon too?

No. In Java + Geyser topologies, the bridge is typically `GeyserVoice`, not the Bedrock addon.

Use the Bedrock addon for Bedrock worlds/BDS. Use GeyserVoice when Java-side infrastructure is the source of player state.

## Is VoiceCraft a third-party hosted voice service?

No. VoiceCraft does not require a third-party hosted service. You run the server/runtime yourself or let GeyserVoice manage the runtime in direct Paper mode.

## Is VoiceCraft just a Minecraft mod?

No. VoiceCraft is a collection of client apps, a server runtime, Bedrock addon packages, and Java-side bridge tooling. A working setup needs the right combination for your topology.
