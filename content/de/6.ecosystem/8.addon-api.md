# Add-on-API

`VoiceCraft.Addon` exposes a script-driven McApi layer that is much wider than just `vcbind`.

Diese Seite richtet sich an Addon- und Weltentwickler.

## High-Level-API-Oberfläche

Die addonseitige API stellt Folgendes bereit:

- Verbindungslebenszyklus
- Paket senden/empfangen
- Schaffung und Zerstörung von Entitäten
- Welt-ID-, Positions-, Rotations-, Stumm-, Taubheits- und Bitmasken-Updates
- Aktualisierungen bewirken
- Audio-empfangene Ereignisse

## Hochrangige Veranstaltungen

Von der aktuellen API-Ebene:

- `OnConnected`
- `OnDisconnected`
- `OnPlayerBind`
- `OnPlayerUnbind`
- `OnPacket`

VoiceCraft `v1.6.1` expands this event-driven path with broadcasted events used by the addon packages, so world scripts can react to connection, binding, and packet activity without custom polling.

Zu den vom System verwendeten Skriptereignissen gehören:

- `voicecraft:onConnected`
- `voicecraft:onDisconnected`
- `voicecraft:onPlayerBind`
- `voicecraft:onPlayerUnbind`
- `voicecraft:onPacket`
- `voicecraft:sendPacket`

## Abdeckung auf Paketebene

Aktuelle Ereignisse zu exponierten Paketen umfassen Kategorien wie:

- Anmelden / Abmelden / Ping
- Antworten akzeptieren / ablehnen / zurücksetzen
- Entität erstellen/zerstören
- Titel-/Beschreibungs-/Namensaktualisierungen
- stumm / taub / Server stumm / Server taub
- Bitmaske sprechen/zuhören/effektieren
- Position/Rotation/Welt-ID
- Höhlenfaktor / Muffelfaktor
- Aktualisierungen bewirken
- Audio empfangen

Dadurch ist die Add-on-API nicht nur für Standardwelten, sondern auch für benutzerdefinierte Spielmodi nützlich.

## Gemeinsame Anpassungsideen

- Automatische Bindung nach Team, Rolle oder Tag
- Benutzerdefinierte Bindungs-Benutzeroberfläche
- Benutzerdefinierte Effektvoreinstellungen pro Biom oder Gebiet
- Regionsbasierte Welt-ID-Neuzuordnung
- Tools zur Mitarbeitermoderation über Server-UI-Formulare
- Geskriptete NPC- oder Fake-Entity-Sprachlogik

## Grundlegendes Integrationsmodell

Typische Add-on-Logik:

1. Stellen Sie eine Verbindung zum VoiceCraft-Transport her
2. authentifizieren
3. Entitäten erstellen oder entdecken
4. Spieler binden
5. Welt-ID/Position/Rotation bei Tick oder Ereignis aktualisieren
6. Reagieren Sie auf Aktualisierungen auf Paketebene

## Wichtige Implementierungshinweise

- `McWss` mode depends on command tunnel throughput
- Effektumschaltungen werden durch Bitmasken codiert
- Die Automatisierung auf Paketebene sollte sorgfältig an echten Bedrock-Builds getestet werden
- Halten Sie die Add-on-Pakete an die VoiceCraft-Version angepasst, wenn Sie von übertragenen Ereignissen oder Sprachsymbolen im Spiel abhängig sind

## Empfohlene Vorgehensweise

- start from `Basic` if you need a working reference
- switch to `Core.McHttp` or `Core.McWss` when building a custom experience
- Halten Sie Ihre weltweite Automatisierung zunächst dünn und erweitern Sie dann die Paket-Hooks schrittweise
