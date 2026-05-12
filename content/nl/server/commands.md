# Serveropdrachten

While `VoiceCraft.Server` is running, console commands are available for moderation and entity management.

## Basis

- `list [--clientsOnly] [--limit N]`
  lijst met entiteiten die momenteel bekend zijn bij de server
- `stop`
  stop de server
- `shutdown`
  alias of `stop`
- `kick <id>`
  ontkoppel een netwerkclient

## Beheer van klantstatus

- `mute <id>`
- `unmute <id>`
- `deafen <id>`
- `undeafen <id>`

Belangrijk gedrag:

- bij reguliere entiteiten schakelen deze de mute-/doofstatus van de entiteit in
- on connected network clients, the server uses the dedicated server-side flags (`ServerMuted`, `ServerDeafened`)

## Beheer van entiteitsgegevens

- `setname <id> <value>`
- `settitle <id> <value>`
- `setdescription <id> <value>`
- `setposition <id> <x> <y> <z>`
- `setworldid <id> <value>`

Opmerkingen:

- `settitle` and `setdescription` target network entities
- `setname`, `setposition`, and `setworldid` work on general entities
- lege titel-/beschrijvingswaarden worden genormaliseerd naar een lege tekenreeks

## `list` options

- `--clientsOnly`
  vermeld alleen verbonden netwerkclients
- `--limit <N>`
  beperk het aantal weergegeven rijen

Voorbeeld:

```text
list --clientsOnly --limit 25
```

## Praktische workflow

```text
list --clientsOnly
setworldid 12 spawn_world
setposition 12 100 64 100
mute 15
kick 18
```

## Mislukkingsgevallen

De server retourneert een fout wanneer:

- de entiteits-ID bestaat niet
- een opdracht verwacht een netwerkclient maar ontvangt een niet-netwerkentiteit
- `list --limit` is negative

## Wanneer deze commando's nuttig zijn

- testen van add-on- of plug-in-integratie
- het corrigeren van slechte entiteitmetagegevens
- personeelsmatiging
- valideren van wereld-ID en positie-updates tijdens de installatie
