# Paket- und Ereignisfluss

Auf dieser Seite wird der konzeptionelle Ablauf erläutert, anstatt jeden Pakettyp aufzulisten.

## High-Level-Flow

1. Ein Transportkonsument authentifiziert sich bei VoiceCraft
2. Entitäten werden erstellt oder entdeckt
3. Metadatenaktualisierungen fließen in das VoiceCraft-Weltmodell ein
4. Der audiobezogene Status ist synchronisiert
5. Clients geben das resultierende Sprachverhalten wieder

## Typische Veranstaltungskategorien

- Anmelden / Abmelden
- Ping/Info
- Entität erstellen/zerstören
- Metadatenaktualisierungen
- Moderationsaktualisierungen
- Aktualisierungen bewirken
- Audioübertragungsereignisse

## Warum das wichtig ist

Beim Debuggen ist es hilfreich zu wissen, ob Ihr Problem eines der folgenden ist:

- Authentifizierungsschicht
- Entitätsschicht
- Metadatensynchronisierung
- Audio-Pipeline

Die meisten echten Ausfälle passieren, weil eine dieser Schichten kaputt ist, während die anderen noch gesund aussehen.
