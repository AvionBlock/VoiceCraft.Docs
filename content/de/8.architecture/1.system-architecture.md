# Systemarchitektur

Auf dieser Seite werden die großen Teile von VoiceCraft und ihre Zusammenhänge erläutert.

## Hauptschichten

### Client-Ebene

`VoiceCraft.Client` handles:

- Eingabeerfassung
- Vorverarbeitung
- UDP-Transport zu VoiceCraft
- Wiedergabe und lokale Benutzereinstellungen

### Serverschicht

`VoiceCraft.Server` handles:

- Status der Netzwerkeinheit
- Voice-Client-Sitzungen
- Moderationsflaggen
- Effektbitmasken und Audioeffektstandards
- Minecraft-orientierte Transporte

### Minecraft-Integrationsschicht

Dies hängt von der Topologie ab:

- `VoiceCraft.Addon` for Bedrock
- `GeyserVoice` for Java / Geyser / proxy networks

## Kerndatenkonzepte

Bei VoiceCraft geht es um Entitäten und nicht nur um rohe Sockets.

Entitäten tragen Status wie:

- Name
- Titel
- Beschreibung
- Position
- Drehung
- Welt-ID
- Stumm-/Taubheitszustand
- Effektbitmasken

## Warum Transporte getrennt sind

VoiceCraft-Sprachverkehr und Minecraft-Automatisierung befinden sich nicht immer in derselben Umgebung.

Deshalb:

- Der Client kommuniziert mit dem Kern-Sprachserver
- Bedrock- oder Java-Integration erfolgt über eine Transportschicht

Durch diese Trennung bleibt die Kernplattform flexibel.
