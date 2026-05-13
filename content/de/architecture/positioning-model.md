# Positionierungsmodell

VoiceCraft unterstützt sowohl serverseitige als auch clientseitige Positionierungsmodelle.

Die Positionierung entscheidet darüber, wer die Standortdaten liefert, von denen Proximity-Audio abhängt. Wenn der falsche Modus ausgewählt ist, können Clients zwar erfolgreich eine Verbindung herstellen, hören aber dennoch die falschen Personen, hören niemanden oder ignorieren Entfernungsänderungen.

## `PositioningType`

- `0 = Server`
- `1 = Client`

Dieser Wert muss zwischen dem Server und dem Client übereinstimmen.

Legen Sie den Serverwert fest in:

```text
VoiceCraftConfig.PositioningType
```

Legen Sie den Client-Wert in den Client-Netzwerkeinstellungen oder `Settings.json` fest.

## Serverseitige Positionierung

Am besten, wenn:

- Der Server oder die Integrationsschicht kann einen maßgeblichen Weltzustand bereitstellen
- Sie wünschen sich ein stärker zentralisiertes Verhalten
- Sie führen BDS mit `McHttp` aus
- Sie führen Java/Geyser mit `GeyserVoice` aus
- Sie möchten, dass Mitarbeiter/Moderationstools über den Status der servereigenen Entität nachdenken

In diesem Modell sendet die Minecraft-seitige Integration Positions- und Weltaktualisierungen an `VoiceCraft.Server`. Der Client erhält genügend Status, um Proximity-Audio lokal wiederzugeben.

Verwenden Sie dies als Standard für Produktionsbereitstellungen.

## Kundenseitige Positionierung

Am besten, wenn:

- Die Umgebung ist eingeschränkt
- Die serverseitige Weltintegration ist begrenzt
- Einige Hosting-Einschränkungen blockieren normale Integrationspfade

In diesem Modell wird vom Kunden erwartet, dass er mehr von seinem eigenen Positionierungskontext bereitstellt oder ableitet. Dies ist für eingeschränkte oder experimentelle Umgebungen nützlich, kann jedoch leichter falsch konfiguriert werden, da jeder Client mit der Servereinstellung einverstanden sein muss.

Verwenden Sie dies nur, wenn Sie wissen, warum die serverseitige Positionierung für die Zielkonfiguration nicht praktikabel ist.

## Auswahl eines Modus

| Einrichtung | Empfohlener Modus | Grund |
|-------|------------------|--------|
| Dedizierter Bedrock-Server + `McHttp` | `0 = Server` | Das BDS-Add-on kann den maßgeblichen Weltzustand melden |
| Lokale Bedrock-Welt + `McWss` | Normalerweise `0 = Server` | Das Add-on kann weiterhin Status über den Tunnel senden |
| Java + Geyser/Floodgate + `GeyserVoice` | `0 = Server` | Das Plugin verfolgt den Lebenszyklus und die Position des Spielers |
| Experimentelles, nur lokales Setup | Hängt davon ab | Verwenden Sie die Clientseite nur, wenn die Integration keinen Status bereitstellen kann |

## Warum Nichtübereinstimmungen die Audioerwartungen zerstören

Wenn sich Client und Server über den Positionierungsmodus nicht einig sind, können folgende Symptome auftreten:

- Sprach-Clients stellen eine Verbindung her, hören jedoch nicht die erwartete Nähe
- Entitäten scheinen vorhanden zu sein, verhalten sich aber seltsam
- Die Integration sieht teilweise gesund aus, während die Positionslogik falsch ist

## Validierungsschritte

1. Überprüfen Sie `VoiceCraftConfig.PositioningType` in `ServerProperties.json`.
2. Überprüfen Sie die Netzwerkeinstellungen des Clients.
3. Starten Sie den Client neu, nachdem Sie den lokalen Wert geändert haben.
4. Verbinden Sie den Minecraft-Transport erneut.
5. Bewegen Sie einen Spieler im Spiel und bestätigen Sie, dass sich das Server-/Client-Verhalten mit der Entfernung ändert.

Wenn die Einrichtung immer noch fehlschlägt, debuggen Sie als Nächstes den Bindungsablauf. Ein korrekter Positionierungsmodus kann nicht helfen, wenn die Sprachsitzung nicht an die Entität im Spiel gebunden ist.
