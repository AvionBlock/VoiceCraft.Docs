# Fehlerbehebung

## Server startet nicht

Überprüfen Sie:

1. Der Port wird nicht bereits von einem anderen Prozess verwendet.
2. `ServerProperties.json` is valid JSON.
3. Correct `McHttpConfig.Hostname` format (`http://.../`) and `McWssConfig.Hostname` (`ws://.../`).

## Client kann keine Verbindung herstellen

- Bestätigen Sie die Server-IP/den Server-Port im Client.
- Überprüfen Sie Firewall und NAT.
- Ensure `PositioningType` matches on both client and server.

## McHttp funktioniert nicht

- Check `McHttpConfig.Enabled = true`.
- Check `LoginToken` used in `/voicecraft:vcconnect` (or `/vcconnect` if alias is supported).
– Stellen Sie sicher, dass das Add-on mit der Welt verbunden ist und die Berechtigungen konfiguriert sind.

## McWss funktioniert nicht

- Check `McWssConfig.Enabled = true`.
- Run `/connect <host:port>` before `/voicecraft:vcconnect`.
- Token überprüfen.

## Kein Ton

- In client, check `Input Device` / `Output Device`.
- Ensure `Mute` / `Deafen` are not enabled.
- Check `InputVolume`, `OutputVolume`, `MicrophoneSensitivity`.
- Run `Microphone Test` and `Test Output`.

## Nützliche Diagnosen

- Starten Sie sowohl den Client als auch den Server neu.
– Stellen Sie vorübergehend die Standardkonfiguration wieder her, um das Problem einzugrenzen.
- On server, run `list --clientsOnly` and verify players are visible as clients.
