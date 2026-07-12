# Runtime-overschrijvingen

De VoiceCraft-server ondersteunt runtime-overschrijvingen via root-CLI-opties.

Runtime-overschrijvingen veranderen het lopende proces zonder `config/ServerProperties.json` permanent te herschrijven. Ze zijn handig wanneer een paneel, container, systemd-eenheid of plug-in de server start en omgevingsspecifieke waarden moet injecteren.

Deze opties zijn ideaal wanneer:

- u wilt omgevingsspecifieke waarden zonder JSON te bewerken
- een procesmanager injecteert waarden bij het opstarten
- `VoiceCraft.Java` start de VoiceCraft-runtime automatisch
- je test verschillende transporttopologieën vanuit dezelfde installatiemap

Als u een eenvoudige handmatige installatie uitvoert, bewerkt u eerst `ServerProperties.json` en gebruikt u overschrijvingen alleen als deze de implementatie duidelijker maken.

## Ondersteunde opties

- `--exit-on-invalid-properties` / `-eip`
- `--language <culture>` / `-l`
- `--transport-mode <mode>` / `-tm`
- `--transport-host <host>` / `-th`
- `--transport-port <port>` / `-tp`
- `--server-key <token>` / `-sk`

## Prioriteit overschrijven

Bij het opstarten laadt VoiceCraft `ServerProperties.json` en past vervolgens runtime-overschrijvingen toe voor het huidige proces.

Dat betekent:

- het JSON-bestand blijft de permanente standaard
- de CLI-waarde wint voor die run
- opnieuw opstarten zonder dezelfde CLI-vlag keert terug naar de JSON-waarde
- back-ups moeten nog steeds de JSON-configuratie bevatten, zelfs als uw productieproces overschrijvingen gebruikt

## Wat elke optie verandert

### `--language`

Overschrijft `VoiceCraftConfig.Language` voor het huidige proces.

Voorbeeld:

```bash
./VoiceCraft.Server --language ru-RU
```

Gebruik dit voor logboeken en diagnostische gegevens. Het verandert de taal van de client-UI niet.

### `--transport-mode`

Schakelt alleen geselecteerde Minecraft-transporten in voor de huidige run.

Geaccepteerde waarden:

- `http`
- `tcp`
- `wss`
- aliassen zoals `ws`, `websocket`, `websockets`
- aliassen zoals `local-socket`, `tcp-socket` normaliseren naar `tcp`

Voorbeelden:

```bash
./VoiceCraft.Server --transport-mode http
./VoiceCraft.Server --transport-mode tcp
./VoiceCraft.Server --transport-mode http,tcp
```

Indien ingesteld, schakelt VoiceCraft eerst alle Minecraft-transporten uit en schakelt vervolgens alleen de geselecteerde transporten opnieuw in.

Dit is de veiligste manier om een proces met één doel uit te voeren. Een host met alleen BDS kan bijvoorbeeld beginnen met `--transport-mode http`, zelfs als de JSON-configuratie nog steeds standaardinstellingen voor andere transporten bevat.

### `--transport-host`

Overschrijft de Minecraft-transporthost:

- `McHttpConfig.Hostname`
- `McWssConfig.Hostname`
- `McTcpConfig.Hostname`

Voorbeeld:

```bash
./VoiceCraft.Server --transport-host 0.0.0.0
```

Voor `McHttp` en `McWss` past VoiceCraft de host toe op de hostnaam in URI-stijl. Voor `McTcp` wordt het gewone hostveld toegepast.

### `--transport-port`

Overschrijft de Minecraft-transportpoort:

- URI-poort in `McHttpConfig.Hostname`
- URI-poort in `McWssConfig.Hostname`
- `McTcpConfig.Port`

Voorbeeld:

```bash
./VoiceCraft.Server --transport-port 9055
```

Wees voorzichtig als meerdere transporten standaard dezelfde poort delen. Als u meerdere transporten met één overschrijving inschakelt, zorg er dan voor dat de resulterende bindingen geldig zijn voor uw platform en topologie.

### `--server-key`

Overschrijft het gedeelde login-token dat wordt gebruikt door:

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

Voorbeeld:

```bash
./VoiceCraft.Server --server-key "prod-secret-token"
```

Gebruik dit wanneer geheimen worden aangeleverd door een procesmanager of plugin. Plaats productietokens niet rechtstreeks in openbare servicebestanden, schermafbeeldingen of gedeelde ondersteuningslogboeken.

## Goede implementatievoorbeelden

### Toegewijde BDS-host

```bash
./VoiceCraft.Server --transport-mode http --transport-host 0.0.0.0 --transport-port 9050
```

### Java-bridge-host

```bash
./VoiceCraft.Server --transport-mode tcp --transport-host 0.0.0.0 --transport-port 9050
```

### Lokale singleplayer-testen

```bash
./VoiceCraft.Server --transport-mode wss --transport-host 127.0.0.1 --transport-port 9051
```

## systemisch voorbeeld

```ini
[Service]
WorkingDirectory=/opt/voicecraft
ExecStart=/opt/voicecraft/VoiceCraft.Server --transport-mode http --transport-host 0.0.0.0 --transport-port 9050
Restart=always
```

Gebruik een omgevingsbestand of geheime manager voor `--server-key` als het token niet rechtstreeks in het eenheidsbestand mag voorkomen.

## Containervoorbeeld

```bash
./VoiceCraft.Server --transport-mode tcp --transport-host 0.0.0.0 --transport-port 9050 --server-key "$VOICECRAFT_TOKEN"
```

Hierdoor blijft de afbeelding herbruikbaar, terwijl elke omgeving zijn eigen token en binding kan bieden.

## Belangrijk gedrag

- runtime-overschrijvingen zijn proceslokaal
- ze herschrijven `ServerProperties.json` niet permanent
- ze zijn uitstekend geschikt voor testen en automatisering
- ze verminderen de behoefte aan meerdere configuratiekopieën
- als een procesmanager de server opnieuw opstart, moet hij telkens dezelfde overrides doorgeven
- als een waarde er verkeerd uitziet in de logboeken, controleer dan zowel de JSON-configuratie als de opstartargumenten

## Wanneer mag u geen overschrijvingen gebruiken?

Vermijd overschrijvingen wanneer:

- je bent nog steeds de configuratievorm aan het leren
- je verwacht dat een andere beheerder alleen `ServerProperties.json` inspecteert
- je hebt geen betrouwbare plek om geheimen buiten het configuratiebestand op te slaan
- de overschrijving maakt het onduidelijk welk transport daadwerkelijk is ingeschakeld
