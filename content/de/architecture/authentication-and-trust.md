# Authentifizierungs- und Vertrauensmodell

VoiceCraft verwendet gemeinsame Token auf der Minecraft-Transportseite.

## Hauptprinzip

Der Transportkonsument weist nach, dass er das konfigurierte gemeinsame Token kennt.

Beispiele:

- Bedrock addon authenticates with `McHttpConfig.LoginToken`
- `McWss` world authenticates with `McWssConfig.LoginToken`
- `GeyserVoice` authenticates with `McTcpConfig.LoginToken`

## Grenzen vertrauen

Sie sollten in Schichten denken:

- Vertrauen der Spielerkunden
- Minecraft-Integrationsvertrauen
- Backend-Laufzeitvertrauen

Das ist nicht dasselbe.

## Welche Token schützen

Sie schützen die Transportgrenze zwischen VoiceCraft und dem integrierenden Knoten.

Sie sind kein Ersatz für:

- Firewall-Regeln
- Host-Sicherheit
- Plugin-Berechtigungshygiene

## Betriebsberatung

- Token drehen, wenn sich die Topologie ändert
- Verwenden Sie nicht überall und immer wieder dasselbe Geheimnis
- Speichern Sie Token wie Betriebsberechtigungsnachweise
