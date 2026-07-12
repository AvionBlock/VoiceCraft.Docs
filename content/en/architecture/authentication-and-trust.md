# Authentication and Trust Model

VoiceCraft uses shared tokens on the Minecraft transport side. These tokens decide whether an addon, plugin, or bridge is allowed to send Minecraft state into `VoiceCraft.Server`.

They are not player passwords. They are operational secrets between trusted runtime components.

## Main principle

The transport consumer proves it knows the configured shared token.

Examples:

- Bedrock addon authenticates with `McHttpConfig.LoginToken`
- `McWss` world authenticates with `McWssConfig.LoginToken`
- `VoiceCraft.Java` authenticates with `McTcpConfig.LoginToken`

| Transport | Consumer | Token field |
|-----------|----------|-------------|
| `McHttp` | BDS addon package | `McHttpConfig.LoginToken` |
| `McWss` | local Bedrock world addon | `McWssConfig.LoginToken` |
| `McTcp` | `VoiceCraft.Java` or Java-side bridge | `McTcpConfig.LoginToken` |

## Trust boundaries

You should think in layers:

- player client trust
- Minecraft integration trust
- backend runtime trust

These are not the same thing.

Player clients connect to the voice server and can send audio for their own session. Minecraft integrations can update world/entity state. Backend runtime access can change config, tokens, logs, and process behavior. Keep those boundaries separate when assigning permissions and deciding where secrets live.

## What tokens protect

They protect the transport boundary between VoiceCraft and the integrating node.

They are not a substitute for:

- firewall rules
- host security
- plugin permission hygiene

If an attacker gets a transport token and can reach that transport endpoint, they may be able to impersonate the Minecraft-side integration. That is why token rotation and network reachability matter together.

## Operational advice

- rotate tokens when topology changes
- do not reuse the same secret everywhere forever
- store tokens like operational credentials
- use different tokens for `McHttp`, `McWss`, and `McTcp` unless you deliberately need shared automation
- bind transports to `127.0.0.1` when the consumer runs on the same host
- expose `0.0.0.0` only when another machine must connect
- keep plugin/admin commands restricted to trusted staff

## Rotation workflow

1. Stop or disconnect the Minecraft integration.
2. Generate a new token for the relevant transport.
3. Update `config/ServerProperties.json` or the process-level `--server-key` override.
4. Update the addon/plugin configuration or in-game connect command.
5. Restart `VoiceCraft.Server` if you edited the JSON config.
6. Reconnect the Minecraft integration and validate bind flow.

## Common mistakes

- changing `McHttpConfig.LoginToken` while the addon is actually using `McWss`
- changing only the VoiceCraft config and forgetting the addon/plugin side
- exposing a wildcard listener to the internet with a reused test token
- sharing a production token in screenshots, support logs, or public issue reports
