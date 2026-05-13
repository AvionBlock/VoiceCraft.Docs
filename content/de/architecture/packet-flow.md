# Paket- und Ereignisfluss

Auf dieser Seite wird der konzeptionelle Ablauf erläutert, anstatt jeden Pakettyp aufzulisten. Dies ist nützlich, wenn ein Setup teilweise funktioniert: Beispielsweise stellt der Client eine Verbindung her, es wird jedoch kein Proximity-Audio abgespielt, oder das Add-on stellt eine Verbindung her, die Bindung wird jedoch nie abgeschlossen.

VoiceCraft verfügt über zwei verwandte Ebenen:

- Sprachebene:
  Player-Clients senden und empfangen Echtzeit-Sprachdaten über `VoiceCraft.Server`
- Minecraft-Staatsebene:
  Bedrock-Add-ons oder Java-seitige Plugins senden Entitäts-, Positions-, Welt-, Bindungs- und Effektaktualisierungen über `McHttp`, `McWss` oder `McTcp`

Damit sich die Nahstimme richtig anfühlt, müssen beide Ebenen gesund sein.

## Durchfluss auf hohem Niveau

1. `VoiceCraft.Server` startet und lädt `ServerProperties.json`.
2. Ein Player öffnet `VoiceCraft.Client` und stellt eine Verbindung zum Server-UDP-Endpunkt her.
3. Ein Minecraft-Transportkonsument authentifiziert sich mit seinem konfigurierten Token.
4. Die Minecraft-Seite erstellt, entdeckt oder aktualisiert Entitäten.
5. Position, Welt-ID, Sichtbarkeit, Stummschaltung/Tauben und Effektaktualisierungen fließen in das Server-Weltmodell ein.
6. Der Server sendet den von verbundenen Clients benötigten Status.
7. Clients rendern das resultierende Sprachverhalten lokal.

Die Reihenfolge kann je nach Topologie leicht variieren, aber der wichtige Punkt ist, dass die Client-Anmeldung und die Minecraft-Transport-Anmeldung separate Ereignisse sind. Einer kann erfolgreich sein, während der andere noch kaputt ist.

## Typische Veranstaltungskategorien

- Anmelden / Abmelden
- Ping / Info
- Entität erstellen/zerstören
- Metadatenaktualisierungen
- Moderationsaktualisierungen
- Wirkungsaktualisierungen
- Audioübertragungsereignisse

## Fluss binden

Der Bindungsfluss verknüpft einen Minecraft-Spieler oder eine Minecraft-Entität mit einer VoiceCraft-seitigen Client-Identität.

Typischer Grundgesteinsfluss:

1. Das Addon stellt eine Verbindung zu `McHttp` oder `McWss` her.
2. Der Spieler führt den Bindungsbefehl im Spiel aus oder erhält ihn.
3. Das Add-on sendet bindbezogene Daten an VoiceCraft.
4. VoiceCraft verknüpft den Sprachclient mit der Entität im Spiel.
5. Positions- und Weltaktualisierungen wirken sich allmählich auf das aus, was der Kunde hört.

Typischer Java/Geyser-Ablauf:

1. `GeyserVoice` stellt eine Verbindung zu `McTcp` her.
2. Das Plugin verfolgt den Lebenszyklus und die Position des Java-seitigen Players.
3. Der Player verwendet den konfigurierten Sprachbindungsbefehl.
4. `GeyserVoice` sendet die Bindungs-/Aktualisierungsdaten an VoiceCraft.

Wenn die Bindung fehlschlägt, überprüfen Sie zunächst die Token-Übereinstimmung und die Transport-Erreichbarkeit und prüfen Sie dann, ob der Player über eine aktive VoiceCraft-Client-Sitzung verfügt.

## Debuggen nach Ebene

| Symptom | Zuerst die Schicht prüfen | Typische Ursache |
|---------|----------------------|---------------|
| Der Client kann keine Verbindung herstellen | Sprachflugzeug | Falscher Server-Host, UDP-Port geschlossen, Server läuft nicht |
| Addon/Plugin kann keine Verbindung herstellen | Minecraft-Staatsflugzeug | Wrong transport token, wrong binding, blocked TCP/HTTP/WebSocket path |
| Client connects but hears no proximity | Entitäts-/Positionsstatus | Bind missing, `PositioningType` mismatch, no position updates |
| Audio exists but range/effects feel wrong | Effekte/Statussynchronisierung | Wrong effect bitmask, stale entity metadata, mismatched client settings |

## Warum das wichtig ist

Beim Debuggen ist es hilfreich zu wissen, ob Ihr Problem eines der folgenden ist:

- Authentifizierung
- Verkehrserreichbarkeit
- Entitätserstellung
- Bindungsassoziation
- metadata and position sync
- Audioaufnahme/-wiedergabe

Die meisten echten Ausfälle passieren, weil eine dieser Schichten kaputt ist, während die anderen noch gesund aussehen.
