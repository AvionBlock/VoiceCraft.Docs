# Serverbefehle

While `VoiceCraft.Server` is running, console commands are available for moderation and entity management.

## Grundlegend

- `list [--clientsOnly] [--limit N]`
  Listet Entitäten auf, die dem Server derzeit bekannt sind
- `stop`
  Stoppen Sie den Server
- `shutdown`
  alias of `stop`
- `kick <id>`
  Trennen Sie einen Netzwerk-Client

## Client-Statusverwaltung

- `mute <id>`
- `unmute <id>`
- `deafen <id>`
- `undeafen <id>`

Wichtiges Verhalten:

- Bei regulären Entitäten schalten diese den Stumm-/Tauben-Zustand der Entität um
- on connected network clients, the server uses the dedicated server-side flags (`ServerMuted`, `ServerDeafened`)

## Entitätsdatenverwaltung

- `setname <id> <value>`
- `settitle <id> <value>`
- `setdescription <id> <value>`
- `setposition <id> <x> <y> <z>`
- `setworldid <id> <value>`

Hinweise:

- `settitle` and `setdescription` target network entities
- `setname`, `setposition`, and `setworldid` work on general entities
- Leere Titel-/Beschreibungswerte werden auf eine leere Zeichenfolge normalisiert

## `list` options

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
– Ein Befehl erwartet einen Netzwerk-Client, empfängt aber eine Nicht-Netzwerk-Entität
- `list --limit` is negative

## Wenn diese Befehle nützlich sind

- Testen der Add-on- oder Plugin-Integration
- Korrektur fehlerhafter Entitätsmetadaten
- Personalmoderation
- Validierung von Welt-ID- und Positionsaktualisierungen während der Einrichtung
