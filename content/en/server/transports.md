# Transport Modes

VoiceCraft has multiple Minecraft-facing transport layers. Picking the right one is important for stability and deployment simplicity.

## Quick comparison

| Transport | Typical use | Default shape | Best for |
|-----------|-------------|---------------|----------|
| `McHttp` | Bedrock Dedicated Server | HTTP endpoint | stable Bedrock server integration |
| `McWss` | local worlds / singleplayer | websocket + command tunnel | testing, local worlds, lightweight setups |
| `McTcp` | Java-side bridge | raw TCP bridge | `GeyserVoice`, proxy or Paper bridge scenarios |

## McHttp

### Best use cases

- Bedrock Dedicated Server
- stable scripted Bedrock worlds
- environments where the game server can call an HTTP endpoint

### Strengths

- easiest production transport for BDS
- simple endpoint model
- good fit for panels, reverse network layouts, and dedicated hosts

### Trade-offs

- requires network reachability from the Bedrock server to VoiceCraft
- may be blocked on some hosting providers

## McWss

### Best use cases

- local Bedrock worlds
- singleplayer testing
- setups using `/connect` and command tunneling

### Strengths

- works without a standalone BDS HTTP workflow
- practical for development and local demos

### Trade-offs

- less stable under heavy payload pressure
- sensitive to `CommandsPerTick` and payload chunking limits
- usually not the first choice for public production environments

## McTcp

### Best use cases

- `GeyserVoice`
- Java server or proxy bridges
- direct Paper runtime integration

### Strengths

- direct bridge transport for Java-side plugins
- avoids HTTP endpoint semantics when a native TCP bridge is better
- aligns with current `GeyserVoice` architecture

### Trade-offs

- another port to manage
- most useful when you actually run a Java-side bridge

## Which one should you choose?

### Bedrock Dedicated Server

Use `McHttp`.

### Bedrock singleplayer / local world

Use `McWss`.

### Java + Geyser/Floodgate

Use `McTcp` through `GeyserVoice`.

### Mixed network

You can run more than one transport, but only expose what you really need.

## Security advice

- replace all login tokens
- bind to `127.0.0.1` when the consumer is local
- bind to `0.0.0.0` only when remote access is required
- keep firewall rules tight per transport
