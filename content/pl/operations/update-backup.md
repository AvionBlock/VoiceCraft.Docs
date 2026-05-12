# Aktualizacja i kopia zapasowa

## Co utworzyć kopię zapasową przed aktualizacją

- `config/ServerProperties.json`
- niestandardowe opakowanie skryptów/systemd lub menedżera usług
- historia logowania, jeśli to konieczne

## Bezpieczna aktualizacja serwera

1. Stop the server (`stop` or via service manager).
2. Back up `config/`.
3. Wyodrębnij nową wersję do osobnego katalogu.
4. Move your `ServerProperties.json`.
5. Uruchom i sprawdź dzienniki uruchamiania.

## Uwaga dotycząca VoiceCraft 1.6.1

VoiceCraft `v1.6.1` requires updating the Bedrock addon packages at the same time as the client/server binaries. The release fixes McHttp/McWss disconnect handling and ships addon-side changes for in-game voice icons, auto connection quality-of-life, and broadcasted events.

## Bezpieczna aktualizacja klienta

Client settings (`Settings.json`) are stored in `ApplicationData/voicecraft`, so they usually survive binary updates.

## Zgodność

- Client and server `Major/Minor` versions should match.
- Wersje poprawek mogą się różnić.

Jeśli po aktualizacji pojawią się problemy, rozpocznij od [Rozwiązywanie problemów](/operations/troubleshooting).
