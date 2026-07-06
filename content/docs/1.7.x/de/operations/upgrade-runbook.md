# Upgrade-Runbook

Verwenden Sie dieses Runbook für Upgrades von VoiceCraft oder einer Bridge wie `GeyserVoice`.

VoiceCraft `1.7.0` ändert das Event- und Entity-Property-Modell. Prüfen Sie deshalb Server, Client, Bedrock-Add-on und Java-Plugin als zusammengehörigen Stack.

## Reihenfolge

1. Configs und Add-on/Plugin-Dateien sichern.
2. Neue Binaries in einem separaten Ordner vorbereiten.
3. Passende Add-on/Plugin-Pakete vorbereiten.
4. Release Notes zu Paketen, Properties und Transports lesen.
5. Alten Dienst stoppen.
6. Config in die neue Installation kopieren.
7. `ServerProperties.json` auf neue Port-Mapping-Felder prüfen.
8. Add-on/Plugin auf Minecraft-Seite aktualisieren.
9. Jeden Pfad einzeln testen.

## Speziell für 1.7 prüfen

- Server meldet `1.7.0`
- VoiceCraft UDP endpoint bindet
- McHttp, McTcp oder McWss binden
- NAT-Port-Mapping ist bewusst aktiv oder deaktiviert
- ein `1.7.x` Client verbindet sich
- Minecraft-Integration authentifiziert sich
- Bind-Flow funktioniert
- Position, Rotation, World ID, Mute/Deafen und Bitmasks aktualisieren sich
- Entity-Properties funktionieren, wenn Effekt-Overrides genutzt werden

## Event- und Property-Migration

Neue Event-Wrapper:

- `VcEventRequestPacket`
- `McApiEventRequestPacket`

Neue Property-Pakete:

- `VcSetPropertyRequestPacket`
- `VcOnEntityPropertyUpdatedPacket`
- `McApiSetEntityPropertyRequestPacket`
- `McApiOnEntityPropertyUpdatedPacket`

Unterstützte Werte: `null`, `bool`, Integer-Typen, `float`, `double`.

Der alte Cave/Muffle-Factor-Paketpfad wurde entfernt. Verwenden Sie Properties für Effektwerte.

## Audioeffekte

Der Effekt-Stack nutzt jetzt `IAudioEffectProcessor`. Prüfen Sie:

- `DefaultAudioEffectsConfig`
- eigene Effekt-JSONs
- Property-Overrides
- nicht-finite Positions- oder Rotationswerte

## NAT-Port-Mapping

`AutoOpenPort` kann für VoiceCraft UDP und Minecraft-Transports genutzt werden. Verwenden Sie es nur für Router/LAN-Setups mit UPnP oder NAT-PMP. Für VPS, Docker, Panels, Tunnel und Loopback-Transports sollte es deaktiviert bleiben.

## Rollback

1. Neuen Dienst stoppen.
2. Altes Binary-Verzeichnis wiederherstellen.
3. Alte Configs wiederherstellen.
4. Alte Add-on/Plugin-Version installieren.
5. Alten Dienst starten.
6. Client, Auth, Bind und Proximity testen.
