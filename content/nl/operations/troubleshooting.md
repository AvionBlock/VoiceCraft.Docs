# Problemen oplossen

## Server start niet

Controleer:

1. Poort wordt nog niet door een ander proces gebruikt.
2. `ServerProperties.json` is valid JSON.
3. Correct `McHttpConfig.Hostname` format (`http://.../`) and `McWssConfig.Hostname` (`ws://.../`).

## Klant kan geen verbinding maken

- Bevestig server-IP/poort in client.
- Controleer firewall en NAT.
- Ensure `PositioningType` matches on both client and server.

## McHttp werkt niet

- Check `McHttpConfig.Enabled = true`.
- Check `LoginToken` used in `/voicecraft:vcconnect` (or `/vcconnect` if alias is supported).
- Zorg ervoor dat de add-on aan de wereld is gekoppeld en dat de machtigingen zijn geconfigureerd.

## McWss werkt niet

- Check `McWssConfig.Enabled = true`.
- Run `/connect <host:port>` before `/voicecraft:vcconnect`.
- Token verifiëren.

## Geen audio

- In client, check `Input Device` / `Output Device`.
- Ensure `Mute` / `Deafen` are not enabled.
- Check `InputVolume`, `OutputVolume`, `MicrophoneSensitivity`.
- Run `Microphone Test` and `Test Output`.

## Nuttige diagnostiek

- Start zowel client als server opnieuw op.
- Tijdelijk terugkeren naar de standaardconfiguratie om het probleem te beperken.
- On server, run `list --clientsOnly` and verify players are visible as clients.
