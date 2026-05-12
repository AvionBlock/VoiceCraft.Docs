# Rozwiązywanie problemów

## Serwer nie uruchamia się

Sprawdź:

1. Port nie jest już używany przez inny proces.
2. `ServerProperties.json` is valid JSON.
3. Correct `McHttpConfig.Hostname` format (`http://.../`) and `McWssConfig.Hostname` (`ws://.../`).

## Klient nie może się połączyć

- Potwierdź adres IP/port serwera w kliencie.
- Sprawdź zaporę sieciową i NAT.
- Ensure `PositioningType` matches on both client and server.

## McHttp nie działa

- Check `McHttpConfig.Enabled = true`.
- Check `LoginToken` used in `/voicecraft:vcconnect` (or `/vcconnect` if alias is supported).
- Upewnij się, że dodatek jest podłączony do świata i skonfigurowane są uprawnienia.

## McWss nie działa

- Check `McWssConfig.Enabled = true`.
- Run `/connect <host:port>` before `/voicecraft:vcconnect`.
- Zweryfikuj token.

## Brak dźwięku

- In client, check `Input Device` / `Output Device`.
- Ensure `Mute` / `Deafen` are not enabled.
- Check `InputVolume`, `OutputVolume`, `MicrophoneSensitivity`.
- Run `Microphone Test` and `Test Output`.

## Przydatna diagnostyka

- Uruchom ponownie klienta i serwer.
- Tymczasowo przywróć domyślną konfigurację, aby zawęzić problem.
- On server, run `list --clientsOnly` and verify players are visible as clients.
