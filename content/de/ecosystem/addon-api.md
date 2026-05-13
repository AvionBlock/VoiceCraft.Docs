# Add-on-API

`VoiceCraft.Addon` stellt eine skriptgesteuerte McApi-Ebene bereit, die viel breiter ist als nur `vcbind`.

Diese Seite richtet sich an Addon- und Weltentwickler.

Verwenden Sie die API, wenn das Standard-Add-on-Verhalten nicht ausreicht: benutzerdefinierte Bindungsregeln, benutzerdefinierte Effekte, regionsspezifisches Sprachverhalten, geskriptete Fake-Entitäten, Mitarbeiter-Tools oder spielmodusspezifische Sichtbarkeitslogik.

Beginnen Sie zunächst mit dem Standardpaket `Basic`. Sobald Transport, Bindung und Proximity funktionieren, fügen Sie nach und nach benutzerdefinierte Paket-/Ereignislogik hinzu.

## High-Level-API-Oberfläche

Die addonseitige API stellt Folgendes bereit:

- Verbindungslebenszyklus
- Paket senden/empfangen
- Schöpfung und Zerstörung von Entitäten
- Welt-ID, Position, Drehung, Stummschaltung, Stummschaltung und Bitmaskenaktualisierungen
- Wirkungsaktualisierungen
- Audio-empfangene Ereignisse

Die API existiert, damit die Welt entscheiden kann, was Stimme in ihrem Gameplay bedeuten soll. VoiceCraft stellt das Transport- und Zustandsmodell bereit; Ihre Add-on-Logik kann entscheiden, wie Tags, Rollen, Regionen, Dimensionen oder Skript-Entitäten diesem Modell zugeordnet werden.

## High-Level-Ereignisse

Von der aktuellen API-Ebene:

- `OnConnected`
- `OnDisconnected`
- `OnPlayerBind`
- `OnPlayerUnbind`
- `OnPacket`

VoiceCraft `v1.6.1` erweitert diesen ereignisgesteuerten Pfad um gesendete Ereignisse, die von den Add-on-Paketen verwendet werden, sodass Weltskripte ohne benutzerdefinierte Abfragen auf Verbindungs-, Bindungs- und Paketaktivitäten reagieren können.

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
- Wirkungsaktualisierungen
- Audio empfangen

Dadurch ist die Add-on-API nicht nur für Standardwelten, sondern auch für benutzerdefinierte Spielmodi nützlich.

Hooks auf Paketebene sind leistungsstark, können aber auch leicht überbeansprucht werden. Bevorzugen Sie Lebenszyklusereignisse auf hoher Ebene für die normale Anpassung und Paket-Hooks nur, wenn Sie eine Steuerung auf niedriger Ebene benötigen.

## Gemeinsame Anpassungsideen

- Automatische Bindung nach Team, Rolle oder Tag
- benutzerdefinierte Bindungs-Benutzeroberfläche
- Benutzerdefinierte Effektvoreinstellungen pro Biom oder Gebiet
- Regionsbasierte Welt-ID-Neuzuordnung
- Mitarbeitermoderationstools über Server-UI-Formulare
- geskriptete NPC- oder Fake-Entity-Sprachlogik

## Grundlegendes Integrationsmodell

Typische Add-on-Logik:

1. Stellen Sie eine Verbindung zum VoiceCraft-Transport her
2. authentifizieren
3. Entitäten erstellen oder entdecken
4. Spieler binden
5. Welt-ID/Position/Rotation bei Tick oder Ereignis aktualisieren
6. auf Aktualisierungen auf Paketebene reagieren

Für BDS bedeutet dies normalerweise `Core.McHttp`. Für lokale Welten bedeutet es normalerweise `Core.McWss`.

## Wichtige Hinweise zur Umsetzung

- Der `McWss`-Modus hängt vom Durchsatz des Befehlstunnels ab
- Effektumschaltungen werden durch Bitmasken codiert
- Die Automatisierung auf Paketebene sollte sorgfältig an echten Bedrock-Builds getestet werden
- Halten Sie die Add-on-Pakete an die VoiceCraft-Version angepasst, wenn Sie von übertragenen Ereignissen oder Sprachsymbolen im Spiel abhängig sind
- Vermeiden Sie das Senden unnötiger Hochfrequenz-Updates. Positionsaktualisierungen sind nützlich, aber laute benutzerdefinierte Paketschleifen können zu Instabilität führen
- Behandeln Sie Transport-Anmeldetokens als Serveranmeldeinformationen und nicht als spielerbezogene Werte

## Empfohlene Praxis

- Beginnen Sie mit `Basic`, wenn Sie eine Arbeitsreferenz benötigen
- Wechseln Sie zu `Core.McHttp` oder `Core.McWss`, wenn Sie ein benutzerdefiniertes Erlebnis erstellen
- Halten Sie Ihre weltweite Automatisierung zunächst dünn und erweitern Sie dann die Paket-Hooks schrittweise
- Validieren Sie jede benutzerdefinierte Funktion mit mindestens zwei Spielern, damit Nähe und Bindungsverhalten ausgeübt werden

## Debuggen benutzerdefinierter Logik

1. Bestätigen Sie, dass das Standard-Add-on eine Verbindung herstellen und binden kann.
2. Fügen Sie ein benutzerdefiniertes Ereignis oder einen Paket-Hook hinzu.
3. Überprüfen Sie, ob der VoiceCraft-Server weiterhin Entitätsaktualisierungen sieht.
4. Testen Sie die Bewegung über Welten/Dimensionen hinweg, wenn Ihre Logik die Welt-IDs ändert.
5. Deaktivieren Sie benutzerdefinierten Code, bevor Sie Transport- oder Audioeinstellungen dafür verantwortlich machen.
