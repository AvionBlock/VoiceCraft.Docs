# Security Hardening

This page is about reducing operational risk in real deployments.

## 1. Rotate every generated token

Never keep default generated values for:

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

Treat them as shared secrets.

## 2. Expose only required transports

Do not publish every transport just because it exists.

Examples:

- Bedrock-only host:
  usually only `McHttp`
- Java bridge host:
  usually only `McTcp`
- local test host:
  often only loopback `McWss`

## 3. Use loopback when possible

Prefer:

- `127.0.0.1`
- `localhost`

when the consumer is on the same machine.

Use `0.0.0.0` only when remote access is actually required.

## 4. Tight firewall policy

Allow only what you need:

- VoiceCraft UDP port
- specific HTTP or TCP transport port
- optional websocket port

Do not open transport ports broadly if the integrating node is known and fixed.

## 5. Separate environments

Use different:

- tokens
- config files
- directories
- ports

for production, staging, and local testing.

## 6. Be careful with plugin-managed runtimes

If `GeyserVoice` manages the VoiceCraft runtime:

- keep the install directory controlled
- understand who owns restart behavior
- confirm logs are collected somewhere predictable

## 7. Avoid casual use of `DisabledPacketTypes`

This is not a normal hardening feature.

It is primarily for:

- debugging
- temporary mitigation
- protocol experimentation

Blindly disabling packet types can break auth, sync, or audio.

## 8. Restrict operational commands

For `GeyserVoice`, keep these staff-only:

- `/voice connect`
- `/voice reconnect`
- `/voice disconnect`
- `/voice reload`

## 9. Protect backup contents

Backups may contain:

- transport tokens
- host and port topology
- service layout details

Treat config backups as sensitive operational data.
