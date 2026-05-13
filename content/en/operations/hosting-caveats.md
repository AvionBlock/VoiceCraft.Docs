# Hosting Caveats

Different providers and deployment styles affect which VoiceCraft topology is realistic.

Before choosing a topology, confirm two network paths:

1. players can reach the VoiceCraft UDP endpoint
2. the Minecraft-side runtime can reach the selected transport endpoint

Many hosting problems come from one of those paths being blocked while the other still works.

## Bedrock hosts

`McHttp` is usually the best Bedrock transport, but only if the BDS node can reach the VoiceCraft endpoint.

Common blockers:

- outbound HTTP restrictions
- missing module permissions
- worlds where script support is constrained

If the provider blocks outbound HTTP or required script modules, `McHttp` may be technically correct but operationally unavailable.

## Shared hosting providers

Some providers do not allow:

- custom listeners
- outbound HTTP from the game server
- additional sidecar processes

In those environments, the technically supported topology may still be operationally blocked.

Ask the provider specifically about outbound HTTP/TCP from the game server and additional sidecar processes. A generic "plugins allowed" answer is not enough.

## Aternos-like limitations

In heavily restricted hosting, HTTP-style communication may be blocked or impractical.

When that happens:

- Bedrock BDS + `McHttp` may not be viable
- local-world or client-side alternatives may be the only path

Do not assume that a free/restricted host can run the same topology as a VPS or dedicated machine.

## Docker and container caveats

Containers help with isolation, but you still need:

- port publishing
- stable volume mounts for config
- correct cross-container networking
- explicit UDP publishing for the VoiceCraft client endpoint
- persistent storage for managed runtime directories

## Reverse proxies

VoiceCraft transports are not all reverse-proxy shaped:

- `McHttp` can fit HTTP tooling more naturally
- `McTcp` is raw TCP
- `McWss` behaves differently from plain HTTP

Do not assume one ingress strategy works for all of them.

HTTP tooling can help with `McHttp`, but it does not automatically solve raw `McTcp` or client UDP traffic.

## Java network caveats

For `GeyserVoice` proxy deployments:

- the proxy must reliably reach VoiceCraft
- backend Paper nodes must reliably reach the proxy message path
- the ownership model must stay clear

If the proxy cannot own the bridge cleanly, the topology becomes fragile.

## Practical provider checklist

Ask or verify:

- Can players reach a custom UDP port?
- Can the game server make outbound HTTP requests?
- Can the game server open or connect to raw TCP ports?
- Can I run a sidecar process for `VoiceCraft.Server`?
- Can I persist `config/ServerProperties.json`?
- Can I install or update Bedrock behavior/resource packs?
- For Java networks, can plugin messages pass reliably between backend and proxy?

If any answer is no, choose a topology that avoids that requirement or move VoiceCraft to infrastructure you control.
