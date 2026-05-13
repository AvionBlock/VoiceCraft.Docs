# Security Hardening

This page is about reducing operational risk in real deployments.

VoiceCraft security is mostly about limiting who can reach transport endpoints, protecting shared tokens, and keeping staff-only operational controls away from regular players.

## 1. Rotate every generated token

Never keep default generated values for:

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

Treat them as shared secrets.

Use the token only with the matching integration:

- `McHttpConfig.LoginToken` for BDS `McHttp`
- `McWssConfig.LoginToken` for local Bedrock `McWss`
- `McTcpConfig.LoginToken` for GeyserVoice / Java bridge

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

Remember that the client UDP endpoint and Minecraft transport endpoints serve different users. Players need the voice UDP endpoint. The addon/plugin needs the selected Minecraft transport endpoint.

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
- make sure generated runtime files are not writable by untrusted users
- know whether `shutdown-on-disable` is expected in your restart process

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

For the VoiceCraft server console, restrict access to trusted operators only. Commands such as `kick`, `mute`, `deafen`, and metadata edits can affect live players.

## 9. Protect backup contents

Backups may contain:

- transport tokens
- host and port topology
- service layout details

Treat config backups as sensitive operational data.

## 10. Review public support artifacts

Before posting screenshots, logs, or configs publicly, remove:

- transport login tokens
- public IPs if they should not be disclosed
- service wrapper secrets
- generated bind keys if they are still active
- player identifiers if privacy matters

## Hardening checklist

- generated tokens replaced
- only required transports enabled
- loopback used for same-host consumers
- firewall rules limited to known sources where possible
- GeyserVoice operational commands restricted
- backups stored securely
- release and addon/plugin versions kept aligned
