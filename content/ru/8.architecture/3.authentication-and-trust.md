# Authentication и trust model

VoiceCraft использует shared tokens на стороне Minecraft transports.

## Главный принцип

Transport consumer доказывает, что знает configured shared token.

Примеры:

- Bedrock addon использует `McHttpConfig.LoginToken`
- `McWss` world использует `McWssConfig.LoginToken`
- `GeyserVoice` использует `McTcpConfig.LoginToken`
