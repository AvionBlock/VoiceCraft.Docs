# Authentifizierungs- und Vertrauensmodell

VoiceCraft verwendet gemeinsame Token auf der Minecraft-Transportseite. Diese Token entscheiden, ob ein Add-on, Plugin oder eine Bridge den Minecraft-Status an `VoiceCraft.Server` senden darf.

Es handelt sich hierbei nicht um Spielerpasswörter. Es handelt sich dabei um Betriebsgeheimnisse zwischen vertrauenswürdigen Laufzeitkomponenten.

## Hauptprinzip

Der Transportkonsument weist nach, dass er das konfigurierte gemeinsame Token kennt.

Beispiele:

- Das Bedrock-Add-on authentifiziert sich mit `McHttpConfig.LoginToken`
- `McWss` Welt authentifiziert sich mit `McWssConfig.LoginToken`
- `VoiceCraft.Java` authentifiziert sich mit `McTcpConfig.LoginToken`

| Transport | Verbraucher | Token-Feld |
|-----------|----------|-------------|
| `McHttp` | BDS-Zusatzpaket | `McHttpConfig.LoginToken` |
| `McWss` | lokales Bedrock-World-Addon | `McWssConfig.LoginToken` |
| `McTcp` | `VoiceCraft.Java` oder Java-seitige Brücke | `McTcpConfig.LoginToken` |

## Vertrauen Sie Grenzen

Sie sollten in Schichten denken:

- Vertrauen des Spielerkunden
- Minecraft-Integrationsvertrauen
- Backend-Laufzeitvertrauen

Das ist nicht dasselbe.

Spieler-Clients stellen eine Verbindung zum Sprachserver her und können Audio für ihre eigene Sitzung senden. Minecraft-Integrationen können den Welt-/Entitätsstatus aktualisieren. Der Backend-Laufzeitzugriff kann Konfiguration, Token, Protokolle und Prozessverhalten ändern. Halten Sie diese Grenzen getrennt, wenn Sie Berechtigungen zuweisen und entscheiden, wo Geheimnisse gespeichert sind.

## Welche Token schützen

Sie schützen die Transportgrenze zwischen VoiceCraft und dem integrierenden Knoten.

Sie sind kein Ersatz für:

- Firewall-Regeln
- Host-Sicherheit
- Plugin-Berechtigungshygiene

Wenn ein Angreifer ein Transport-Token erhält und diesen Transportendpunkt erreichen kann, kann er möglicherweise die Minecraft-seitige Integration nachahmen. Deshalb sind Token-Rotation und Netzwerkerreichbarkeit zusammen wichtig.

## Betriebsberatung

- Drehen Sie Token, wenn sich die Topologie ändert
- Verwenden Sie dasselbe Geheimnis nicht für immer und überall wieder
- Speichern Sie Token wie Betriebsanmeldeinformationen
- Verwenden Sie unterschiedliche Token für `McHttp`, `McWss` und `McTcp`, es sei denn, Sie benötigen bewusst eine gemeinsame Automatisierung
- Binden Sie Transporte an `127.0.0.1`, wenn der Verbraucher auf demselben Host ausgeführt wird
- Machen Sie `0.0.0.0` nur verfügbar, wenn eine andere Maschine eine Verbindung herstellen muss
- Halten Sie Plugin-/Administratorbefehle auf vertrauenswürdige Mitarbeiter beschränkt

## Rotationsworkflow

1. Stoppen oder trennen Sie die Minecraft-Integration.
2. Generieren Sie einen neuen Token für den entsprechenden Transport.
3. Aktualisieren Sie `config/ServerProperties.json` oder die `--server-key`-Überschreibung auf Prozessebene.
4. Aktualisieren Sie die Add-on-/Plugin-Konfiguration oder den Verbindungsbefehl im Spiel.
5. Starten Sie `VoiceCraft.Server` neu, wenn Sie die JSON-Konfiguration bearbeitet haben.
6. Verbinden Sie die Minecraft-Integration erneut und validieren Sie den Bindungsfluss.

## Häufige Fehler

- Ändern von `McHttpConfig.LoginToken`, während das Add-on tatsächlich `McWss` verwendet
- Ändern Sie nur die VoiceCraft-Konfiguration und vergessen Sie die Add-on-/Plugin-Seite
- Einen Wildcard-Listener mit einem wiederverwendeten Test-Token dem Internet zugänglich machen
- Teilen eines Produktionstokens in Screenshots, Supportprotokollen oder öffentlichen Problemberichten
