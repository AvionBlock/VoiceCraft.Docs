# Update und Backup

## Was vor dem Update gesichert werden muss

- `config/ServerProperties.json`
- Benutzerdefinierte Skripte/Systemd- oder Service-Manager-Wrapper
- Protokollverlauf, falls erforderlich

## Sicheres Server-Update

1. Stop the server (`stop` or via service manager).
2. Back up `config/`.
3. Extrahieren Sie die neue Version in ein separates Verzeichnis.
4. Move your `ServerProperties.json`.
5. Starten und validieren Sie die Startprotokolle.

## Hinweis zu VoiceCraft 1.6.1

VoiceCraft `v1.6.1` requires updating the Bedrock addon packages at the same time as the client/server binaries. The release fixes McHttp/McWss disconnect handling and ships addon-side changes for in-game voice icons, auto connection quality-of-life, and broadcasted events.

## Sicheres Client-Update

Client settings (`Settings.json`) are stored in `ApplicationData/voicecraft`, so they usually survive binary updates.

## Kompatibilität

- Client and server `Major/Minor` versions should match.
- Patch-Versionen können unterschiedlich sein.

Wenn nach einem Update Probleme auftreten, beginnen Sie mit [Fehlerbehebung](/operations/troubleshooting).
