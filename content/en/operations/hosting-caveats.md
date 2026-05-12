# Hosting Caveats

Different providers and deployment styles affect which VoiceCraft topology is realistic.

## Bedrock hosts

`McHttp` is usually the best Bedrock transport, but only if the BDS node can reach the VoiceCraft endpoint.

Common blockers:

- outbound HTTP restrictions
- missing module permissions
- worlds where script support is constrained

## Shared hosting providers

Some providers do not allow:

- custom listeners
- outbound HTTP from the game server
- additional sidecar processes

In those environments, the technically supported topology may still be operationally blocked.

## Aternos-like limitations

In heavily restricted hosting, HTTP-style communication may be blocked or impractical.

When that happens:

- Bedrock BDS + `McHttp` may not be viable
- local-world or client-side alternatives may be the only path

## Docker and container caveats

Containers help with isolation, but you still need:

- port publishing
- stable volume mounts for config
- correct cross-container networking

## Reverse proxies

VoiceCraft transports are not all reverse-proxy shaped:

- `McHttp` can fit HTTP tooling more naturally
- `McTcp` is raw TCP
- `McWss` behaves differently from plain HTTP

Do not assume one ingress strategy works for all of them.

## Java network caveats

For `GeyserVoice` proxy deployments:

- the proxy must reliably reach VoiceCraft
- backend Paper nodes must reliably reach the proxy message path
- the ownership model must stay clear

If the proxy cannot own the bridge cleanly, the topology becomes fragile.
