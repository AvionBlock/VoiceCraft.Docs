# Troubleshooting Matrix

Use this page when you want symptom-based diagnosis rather than a generic checklist.

## Symptom: client connects, but no one hears anything

Check:

1. `PositioningType` match
2. bind flow completed
3. entities receive world and position updates
4. client is not locally muted or deafened
5. server has not muted or deafened the entity

How to verify:

- run `list --clientsOnly` to confirm the voice client exists
- run `list` and check whether the related entity has a changing position
- use client microphone test and output test to rule out local audio devices

## Symptom: addon connects, but bind never works

Check:

1. token is correct
2. the expected entity is created
3. player used the correct binding key
4. bind script events are firing

Common causes:

- player copied an expired or regenerated binding key
- addon package version does not match the server/client release
- custom addon logic intercepts or bypasses the stock bind flow

## Symptom: GeyserVoice is installed, but Java-side bridge never becomes usable

Check:

1. `McTcp` is enabled on VoiceCraft
2. `config.voicecraft.transport.host`, `config.voicecraft.transport.port`, and `config.voicecraft.transport.login-token` match
3. direct vs proxy mode is configured intentionally
4. if `auto-start` is enabled, the runtime becomes ready within timeout

Also check whether the plugin is installed on the correct layer: direct Paper mode needs Paper/Folia, while proxy mode needs the proxy and backend nodes.

## Symptom: direct Paper mode works after manual reconnect, but not on startup

Check:

1. `config.voicecraft.auto-start`
2. `install-directory`
3. `ready-timeout-ms`
4. startup ownership of the runtime process

If the plugin starts before the managed runtime is ready, increase timeout or use an external VoiceCraft service with its own restart policy.

## Symptom: proxy mode works on one backend, but breaks on server switch

Check:

1. proxy is the source of truth
2. backend nodes are not trying to own the VoiceCraft connection
3. snapshot forwarding stays intact across switches
4. world ID namespacing logic remains consistent

If only one backend fails, compare its GeyserVoice config and plugin version against a backend that works.

## Symptom: `McWss` is unstable

Check:

1. `CommandsPerTick`
2. `MaxByteLengthPerCommand`
3. entity churn and packet burst size
4. whether `McHttp` would be a better fit

If the world is becoming a long-running shared server, treat instability as a sign to move to BDS + `McHttp`.

## Symptom: VoiceCraft server starts, but transport consumer cannot connect

Check:

1. host binding
2. exposed port
3. firewall
4. wrong transport type selected
5. runtime overrides changing the expected values

Quick split:

- client connection problems are usually UDP endpoint or client settings
- addon/plugin connection problems are usually `McHttp`, `McWss`, or `McTcp`
- bind/proximity problems usually happen after both connections already exist
