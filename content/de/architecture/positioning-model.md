# Positionierungsmodell

VoiceCraft unterstützt sowohl serverseitige als auch clientseitige Positionierungsmodelle.

## `PositioningType`

- `0 = Server`
- `1 = Client`

Dieser Wert muss zwischen dem Server und dem Client übereinstimmen.

## Serverseitige Positionierung

Am besten, wenn:

- Der Server oder die Integrationsschicht kann einen maßgeblichen Weltstatus bereitstellen
- Sie möchten ein stärker zentralisiertes Verhalten

## Kundenseitige Positionierung

Am besten, wenn:

- Die Umgebung ist eingeschränkt
- Die serverseitige Weltintegration ist begrenzt
- Einige Hosting-Einschränkungen blockieren normale Integrationspfade

## Warum Nichtübereinstimmungen die Audioerwartungen zerstören

Wenn sich Client und Server über den Positionierungsmodus nicht einig sind, können folgende Symptome auftreten:

- Sprach-Clients stellen eine Verbindung her, hören jedoch nicht die erwartete Nähe
- Entitäten scheinen vorhanden zu sein, verhalten sich aber seltsam
- Die Integration sieht teilweise gesund aus, während die Positionslogik falsch ist
