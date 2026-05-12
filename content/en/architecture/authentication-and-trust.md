# Authentication and Trust Model

VoiceCraft uses shared tokens on the Minecraft transport side.

## Main principle

The transport consumer proves it knows the configured shared token.

Examples:

- Bedrock addon authenticates with `McHttpConfig.LoginToken`
- `McWss` world authenticates with `McWssConfig.LoginToken`
- `GeyserVoice` authenticates with `McTcpConfig.LoginToken`

## Trust boundaries

You should think in layers:

- player client trust
- Minecraft integration trust
- backend runtime trust

These are not the same thing.

## What tokens protect

They protect the transport boundary between VoiceCraft and the integrating node.

They are not a substitute for:

- firewall rules
- host security
- plugin permission hygiene

## Operational advice

- rotate tokens when topology changes
- do not reuse the same secret everywhere forever
- store tokens like operational credentials
