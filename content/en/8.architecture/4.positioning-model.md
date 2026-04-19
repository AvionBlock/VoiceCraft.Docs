# Positioning Model

VoiceCraft supports both server-side and client-side positioning models.

## `PositioningType`

- `0 = Server`
- `1 = Client`

This value must align between the server and the client.

## Server-side positioning

Best when:

- the server or integration layer can provide authoritative world state
- you want more centralized behavior

## Client-side positioning

Best when:

- the environment is constrained
- server-side world integration is limited
- some hosting restrictions block normal integration paths

## Why mismatches break audio expectations

If the client and server disagree on positioning mode, you can see symptoms like:

- voice clients connect but do not hear expected proximity
- entities appear present but behave strangely
- integration looks partly healthy while positional logic is wrong
