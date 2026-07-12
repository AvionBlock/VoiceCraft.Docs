# Production Blueprints

This page summarizes sane production approaches instead of raw feature lists.

Use these blueprints when you are deciding which topology to standardize on. They are intentionally opinionated: the goal is to reduce moving parts, not expose every possible transport at once.

## Blueprint 1: Bedrock-only server

Use:

- `VoiceCraft.Server`
- `McHttp`
- `VoiceCraft.Addon.Core.McHttp`

Why:

- cleanest stable Bedrock deployment
- easiest to monitor
- easiest to explain to server staff

Recommended shape:

```text
BDS addon -> McHttp -> VoiceCraft.Server
players -> VoiceCraft UDP endpoint
```

Keep `McWss` and `McTcp` disabled unless you have a specific reason to run them.

## Blueprint 2: Local community / SMP with Geyser

Use:

- `VoiceCraft.Server`
- `McTcp`
- `VoiceCraft.Java` direct Paper mode

Optional:

- let VoiceCraft.Java manage the VoiceCraft runtime if you prefer a single Java-side install flow

Recommended shape:

```text
Paper/Folia + VoiceCraft.Java -> McTcp -> VoiceCraft.Server
players -> VoiceCraft UDP endpoint
```

This is a good fit when one Java-side server is the main authority for player position.

## Blueprint 3: Large Java network

Use:

- external `VoiceCraft.Server`
- `McTcp`
- `VoiceCraft.Java` on proxy
- `VoiceCraft.Java` on backend nodes

Why:

- central control
- cleaner scaling
- easier restarts without touching every backend

Recommended shape:

```text
backend Paper nodes -> proxy relay -> proxy VoiceCraft.Java -> McTcp -> VoiceCraft.Server
players -> VoiceCraft UDP endpoint
```

Keep the proxy as the only VoiceCraft connection owner. Backend nodes should produce snapshots, not compete for the main `McTcp` connection.

## Blueprint 4: Builder / test environment

Use:

- `McWss`
- `Core.McWss`
- a local VoiceCraft instance

Why:

- fast local loop
- good for testing addon automation

Recommended shape:

```text
local Bedrock world -> McWss -> local VoiceCraft.Server
local client -> local VoiceCraft UDP endpoint
```

Do not treat this as the default production design for a public Bedrock server. Move to `McHttp` when the world becomes long-running or shared.

## Choosing a blueprint

| Need | Choose |
|------|--------|
| Stable Bedrock production | Blueprint 1 |
| One Java/Geyser server | Blueprint 2 |
| Velocity/Bungee network | Blueprint 3 |
| Local testing or addon development | Blueprint 4 |

## Operational recommendations

- store VoiceCraft logs separately from game logs when possible
- rotate or archive configs before large upgrades
- keep transport tokens secret
- test bind flow after every topology change
- expose only the transport required by the chosen blueprint
- keep a rollback copy of `ServerProperties.json` before changing ports or tokens
- document which service owns the VoiceCraft process in your environment
