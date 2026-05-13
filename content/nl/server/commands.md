# Serveropdrachten

Terwijl `VoiceCraft.Server` actief is, zijn consoleopdrachten beschikbaar voor moderatie en entiteitsbeheer.

Opdrachten werken op entiteit-ID's aan de serverzijde. Gebruik eerst `list`, zoek de entiteit of verbonden client waarop u invloed wilt uitoefenen en voer vervolgens de specifieke opdracht voor moderatie of metagegevens uit.

Deze opdrachten zijn vooral handig tijdens het instellen, debuggen en het modereren van de medewerkers. Ze zijn geen vervanging voor het correct configureren van de Minecraft-add-on of plug-in.

## Opdrachtworkflow

1. Voer `list` of `list --clientsOnly` uit.
2. Zoek de ID voor de doelentiteit of netwerkclient.
3. Pas de opdracht toe.
4. Voer `list` opnieuw uit om te verifiëren dat de status is gewijzigd.

## Basis

- `list [--clientsOnly] [--limit N]`
  lijst met entiteiten die momenteel bekend zijn bij de server
- `stop`
  stop de server
- `shutdown`
  alias van `stop`
- `kick <id>`
  ontkoppel een netwerkclient

Gebruik `kick` wanneer een clientsessie vastloopt, wordt gedupliceerd of opnieuw verbinding moet maken na configuratiewijzigingen. Het verbiedt de speler niet om opnieuw verbinding te maken.

## Beheer van de klantstatus

- `mute <id>`
- `unmute <id>`
- `deafen <id>`
- `undeafen <id>`

Belangrijk gedrag:

- bij reguliere entiteiten schakelen deze tussen de mute-/doofstatus van de entiteit
- op verbonden netwerkclients gebruikt de server de speciale vlaggen aan de serverzijde (`ServerMuted`, `ServerDeafened`)

Server mute/doof is gezaghebbend voor alle luisteraars. Lokale mute in de client heeft alleen invloed op de lokale gebruiker.

## Beheer van entiteitsgegevens

- `setname <id> <value>`
- `settitle <id> <value>`
- `setdescription <id> <value>`
- `setposition <id> <x> <y> <z>`
- `setworldid <id> <value>`

Opmerkingen:

- `settitle` en `setdescription` richten zich op netwerkentiteiten
- `setname`, `setposition` en `setworldid` werken aan algemene entiteiten
- lege titel-/beschrijvingswaarden worden genormaliseerd naar een lege tekenreeks

Handmatige entiteitsopdrachten zijn meestal bedoeld voor diagnostiek. In een gezonde productieopstelling zou de Minecraft-integratie voortdurend namen, posities en wereld-ID's moeten bijwerken.

## `list` opties

- `--clientsOnly`
  vermeld alleen verbonden netwerkclients
- `--limit <N>`
  beperk het aantal weergegeven rijen

Voorbeeld:

```text
list --clientsOnly --limit 25
```

## Praktische werkstroom

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
- `list --limit` is negatief

## Wanneer deze commando's nuttig zijn

- testen van add-on- of plug-inintegratie
- het corrigeren van slechte entiteitmetagegevens
- personeel moderatie
- valideren van wereld-ID en positie-updates tijdens de installatie

## Voorbeeld van configuratiecontroles

### Bevestig dat clients zijn verbonden

```text
list --clientsOnly --limit 20
```

Als de verwachte speler ontbreekt, controleer dan het clientserveradres, de UDP-poort en de firewallregels voordat u fouten in de Minecraft-integratie oplost.

### Bevestig dat positie-updates in beweging zijn

```text
list --limit 20
```

Verplaats de speler in het spel en voer vervolgens `list` opnieuw uit. Als de positie niet verandert, ligt het probleem waarschijnlijk in het transportpad van de add-on/plug-in en niet in de audioclient.

### Corrigeer tijdelijke testmetagegevens

```text
setname 12 TestPlayer
setworldid 12 overworld
setposition 12 100 64 100
```

Gebruik dit alleen om gedrag te isoleren. Als de integratie later een nieuwe update verzendt, kan deze uw handmatige waarden overschrijven.

## Veiligheidsopmerkingen

- Stel de toegang tot de serverconsole niet bloot aan reguliere spelers.
- Vermijd het gebruik van handmatige bewerkingen van metagegevens als langetermijnconfiguratie.
- Houd opdrachtlogboeken bij bij het opsporen van fouten in productie-incidenten.
- Geef er de voorkeur aan om de bronintegratie te repareren wanneer waarden herhaaldelijk terugkeren of afwijken.
