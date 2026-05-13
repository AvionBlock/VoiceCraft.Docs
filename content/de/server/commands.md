# Serverbefehle

Während `VoiceCraft.Server` ausgeführt wird, stehen Konsolenbefehle zur Moderation und Entitätsverwaltung zur Verfügung.

Befehle werden mit serverseitigen Entitäts-IDs ausgeführt. Verwenden Sie zuerst `list`, suchen Sie die Entität oder den verbundenen Client, die Sie beeinflussen möchten, und führen Sie dann den spezifischen Moderations- oder Metadatenbefehl aus.

Diese Befehle sind beim Einrichten, Debuggen und bei der Mitarbeitermoderation besonders nützlich. Sie sind kein Ersatz für die korrekte Konfiguration des Minecraft-Addons oder -Plugins.

## Befehlsworkflow

1. Führen Sie `list` oder `list --clientsOnly` aus.
2. Suchen Sie die ID für die Zielentität oder den Netzwerkclient.
3. Wenden Sie den Befehl an.
4. Führen Sie `list` erneut aus, um den geänderten Status zu überprüfen.

## Einfach

- `list [--clientsOnly] [--limit N]`
  Listet Entitäten auf, die dem Server derzeit bekannt sind
- `stop`
  Stoppen Sie den Server
- `shutdown`
  Alias von `stop`
- `kick <id>`
  Trennen Sie einen Netzwerk-Client

Verwenden Sie `kick`, wenn eine Clientsitzung hängen bleibt, dupliziert wird oder nach Konfigurationsänderungen erneut eine Verbindung herstellen muss. Es verbietet dem Spieler nicht, die Verbindung wiederherzustellen.

## Client-Statusverwaltung

- `mute <id>`
- `unmute <id>`
- `deafen <id>`
- `undeafen <id>`

Wichtiges Verhalten:

- Bei regulären Entitäten schalten diese den Stumm-/Tauben-Zustand der Entität um
- Auf verbundenen Netzwerkclients verwendet der Server die dedizierten serverseitigen Flags (`ServerMuted`, `ServerDeafened`).

Die Server-Stumm-/Tauben-Funktion ist für alle Zuhörer maßgebend. Die lokale Stummschaltung im Client wirkt sich nur auf den lokalen Benutzer aus.

## Entitätsdatenverwaltung

- `setname <id> <value>`
- `settitle <id> <value>`
- `setdescription <id> <value>`
- `setposition <id> <x> <y> <z>`
- `setworldid <id> <value>`

Hinweise:

- `settitle` und `setdescription` zielen auf Netzwerkentitäten ab
- `setname`, `setposition` und `setworldid` arbeiten an allgemeinen Entitäten
- Leere Titel-/Beschreibungswerte werden auf eine leere Zeichenfolge normalisiert

Manuelle Entitätsbefehle dienen hauptsächlich der Diagnose. In einem gesunden Produktionsaufbau sollte die Minecraft-Integration Namen, Positionen und Welt-IDs kontinuierlich aktualisieren.

## `list` Optionen

- `--clientsOnly`
  Listet nur verbundene Netzwerk-Clients auf
- `--limit <N>`
  Begrenzen Sie die Anzahl der angezeigten Zeilen

Beispiel:

```text
list --clientsOnly --limit 25
```

## Praktischer Arbeitsablauf

```text
list --clientsOnly
setworldid 12 spawn_world
setposition 12 100 64 100
mute 15
kick 18
```

## Fehlerfälle

Der Server gibt einen Fehler zurück, wenn:

- Die Entitäts-ID existiert nicht
- Ein Befehl erwartet einen Netzwerk-Client, empfängt aber eine Nicht-Netzwerk-Entität
- `list --limit` ist negativ

## Wenn diese Befehle nützlich sind

- Testen der Add-on- oder Plugin-Integration
- Korrigieren fehlerhafter Entitätsmetadaten
- Personalmoderation
- Validierung von Welt-ID- und Positionsaktualisierungen während der Einrichtung

## Beispiel-Setup-Prüfungen

### Bestätigen Sie, dass die Clients verbunden sind

```text
list --clientsOnly --limit 20
```

Wenn der erwartete Player fehlt, überprüfen Sie die Client-Server-Adresse, den UDP-Port und die Firewall-Regeln, bevor Sie die Minecraft-Integration debuggen.

### Bestätigen Sie, dass Positionsaktualisierungen verschoben werden

```text
list --limit 20
```

Bewegen Sie den Spieler im Spiel und führen Sie dann `list` erneut aus. Wenn sich die Position nicht ändert, liegt das Problem wahrscheinlich im Transportpfad des Add-ons/Plugins und nicht im Audio-Client.

### Korrigieren Sie temporäre Testmetadaten

```text
setname 12 TestPlayer
setworldid 12 overworld
setposition 12 100 64 100
```

Verwenden Sie dies nur, um das Verhalten zu isolieren. Wenn die Integration später ein neues Update sendet, werden möglicherweise Ihre manuellen Werte überschrieben.

## Sicherheitshinweise

- Geben Sie den Zugriff auf die Serverkonsole nicht für normale Spieler frei.
- Vermeiden Sie die Verwendung manueller Metadatenbearbeitungen als langfristige Konfiguration.
- Führen Sie beim Debuggen von Produktionsvorfällen Befehlsprotokolle.
- Korrigieren Sie lieber die Quellintegration, wenn die Werte wiederholt zurückgehen oder abweichen.
