# Paket- und Ereignisfluss

Auf dieser Seite wird der konzeptionelle Ablauf erläutert, anstatt jeden Pakettyp aufzulisten. Dies ist nützlich, wenn ein Setup teilweise funktioniert: Beispielsweise stellt der Client eine Verbindung her, es wird jedoch kein Proximity-Audio abgespielt, oder das Add-on stellt eine Verbindung her, die Bindung wird jedoch nie abgeschlossen.

VoiceCraft verfügt über zwei verwandte Ebenen:

- Sprachebene:
  Spieler-Clients senden und empfangen Echtzeit-Sprachdaten über `VoiceCraft.Server`
- Minecraft-Zustandsebene:
  Bedrock-Add-ons oder Java-seitige Plugins senden Entitäts-, Positions-, Welt-, Bindungs- und Effektaktualisierungen über `McHttp`, `McWss` oder `McTcp`

Damit Proximity Voice korrekt funktioniert, müssen beide Ebenen intakt sein.

## High-Level-Ablauf

1. `VoiceCraft.Server` startet und lädt `ServerProperties.json`.
2. Ein Spieler öffnet `VoiceCraft.Client` und stellt eine Verbindung zum Server-UDP-Endpunkt her.
3. Der Minecraft-Transportclient authentifiziert sich mit seinem konfigurierten Token.
4. Die Minecraft-Seite erstellt, entdeckt oder aktualisiert Entitäten.
5. Position, Welt-ID, Sichtbarkeit, Mute/Deafen und Effektaktualisierungen fließen in das Server-Weltmodell ein.
6. Der Server sendet den von verbundenen Clients benötigten Status.
7. Clients rendern das resultierende Sprachverhalten lokal.

Die Reihenfolge kann je nach Topologie leicht variieren. Wichtig ist: Client-Anmeldung und Minecraft-Transport-Anmeldung sind separate Ereignisse. Eine Seite kann funktionieren, während die andere noch fehlerhaft ist.

## Typische Ereigniskategorien

- Anmelden / Abmelden
- Ping / Info
- Entität erstellen/löschen
- Metadatenaktualisierungen
- Moderationsaktualisierungen
- Wirkungsaktualisierungen
- Audioübertragungsereignisse

## Bindungsfluss

Der Bindungsfluss verknüpft einen Minecraft-Spieler oder eine Minecraft-Entität mit einer VoiceCraft-seitigen Client-Identität.

Typischer Bedrock-Flow:

1. Das Addon stellt eine Verbindung zu `McHttp` oder `McWss` her.
2. Der Spieler führt den Bindungsbefehl im Spiel aus oder erhält ihn.
3. Das Add-on sendet bindbezogene Daten an VoiceCraft.
4. VoiceCraft verknüpft den Sprachclient mit der Entität im Spiel.
5. Positions- und Weltaktualisierungen beginnen zu beeinflussen, was der Client hört.

Typischer Java/Geyser-Ablauf:

1. `GeyserVoice` stellt eine Verbindung zu `McTcp` her.
2. Das Plugin verfolgt den Lebenszyklus und die Position des Java-seitigen Spielers.
3. Der Spieler verwendet den konfigurierten Sprachbindungsbefehl.
4. `GeyserVoice` sendet die Bindungs-/Aktualisierungsdaten an VoiceCraft.

Wenn die Bindung fehlschlägt, überprüfen Sie zunächst die Token-Übereinstimmung und die Transport-Erreichbarkeit und prüfen Sie dann, ob der Spieler über eine aktive VoiceCraft-Client-Sitzung verfügt.

## Debuggen nach Ebene

| Symptom | Zuerst die Schicht prüfen | Typische Ursache |
|---------|----------------------|---------------|
| Der Client kann keine Verbindung herstellen | Sprachebene | Falscher Server-Host, UDP-Port geschlossen, Server läuft nicht |
| Addon/Plugin kann keine Verbindung herstellen | Minecraft-Zustandsebene | Falsches Transporttoken, falsche Bindung, blockierter TCP/HTTP/WebSocket-Pfad |
| Client verbindet sich, hört aber kein Proximity-Audio | Entitäts-/Positionsstatus | Bindung fehlt, `PositioningType` passt nicht, keine Positionsaktualisierungen |
| Audio ist vorhanden, aber Reichweite/Effekte wirken falsch | Effekt-/Statussynchronisierung | Falsche Effekt-Bitmaske, veraltete Entitätsmetadaten, nicht passende Client-Einstellungen |

## Warum das wichtig ist

Beim Debuggen ist es hilfreich zu wissen, ob Ihr Problem eines der folgenden ist:

- Authentifizierung
- Transport-Erreichbarkeit
- Entitätserstellung
- Bindungsassoziation
- Metadaten- und Positionssynchronisierung
- Audioaufnahme/-wiedergabe

Die meisten echten Ausfälle passieren, weil eine dieser Ebenen fehlerhaft ist, während die anderen noch intakt aussehen.
