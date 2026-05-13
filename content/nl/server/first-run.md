# Eerste serverrun

Deze pagina start nadat u `VoiceCraft.Server` al een keer hebt gedownload en gestart. Het doel is om van die eerste lancering een werkende server te maken die clients en Minecraft daadwerkelijk kunnen gebruiken.

## Wat gebeurt er bij de eerste start

Bij het opstarten zoekt VoiceCraft naar `ServerProperties.json` in de huidige map en submappen.

Als het bestand niet wordt gevonden, maakt de server automatisch:

- `config/`
- `config/ServerProperties.json`

Dit bestand wordt de belangrijkste blijvende bron van waarheid voor servergedrag.

Nadat het bestand verschijnt, stopt u de server, bewerkt u de configuratie en start u deze opnieuw. De eerste lancering creëert alleen de basislijn; de installatie is nog niet voltooid.

## Standaardpoorten en eindpunten

Standaard is de gegenereerde configuratie als volgt uitgelijnd:

- VoiceCraft-UDP: `9050`
- `McHttp`: `http://127.0.0.1:9050/`
- `McWss`: `ws://127.0.0.1:9051/`
- `McTcp`: `127.0.0.1:9050`

Opmerkingen:

- UDP-spraakverkeer en sommige standaard transportinstellingen delen `9050`
- `McWss` wordt standaard gescheiden op `9051`
- `McTcp` is vooral relevant voor `GeyserVoice`

## Lineair eerste run-pad

### 1. Stop en open de gegenereerde configuratie

Openen:

```text
config/ServerProperties.json
```

Bewaar dit bestand in dezelfde installatiemap en neem het op in back-ups.

### 2. Vervang gegenereerde tokens

Voordat een add-on, plug-in of speler-client verbinding maakt, vervangt u:

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

Gebruik het token van het transportmiddel dat je later daadwerkelijk aansluit. Een BDS `vcconnect`-opdracht moet bijvoorbeeld `McHttpConfig.LoginToken` gebruiken, terwijl GeyserVoice `McTcpConfig.LoginToken` moet gebruiken.

### 3. Kies één primair Minecraft-transport

Gebruik de topologie om te beslissen wat moet worden ingeschakeld:

| Installatie | Inschakelen | Ga verder met |
|-------|--------|---------------|
| Bedrock speciale server | `McHttpConfig` | [McHttp for BDS](/minecraft/mchttp-bds) |
| Lokale Bedrock-wereld | `McWssConfig` | [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer) |
| Java + Geiser/Sluizen | `McTcpConfig` | [GeyserVoice](/ecosystem/geyservoice) |

U kunt meerdere transporten uitvoeren, maar een eerste configuratie is gemakkelijker te debuggen als alleen de vereiste wordt weergegeven.

### 4. Stel hostbindingen in

Gebruik lokale bindingen als alles op één machine draait:

- `McHttpConfig.Hostname = http://127.0.0.1:9050/`
- `McWssConfig.Hostname = ws://127.0.0.1:9051/`
- `McTcpConfig.Hostname = 127.0.0.1`

Gebruik `0.0.0.0` alleen wanneer een andere machine, container of gamehost VoiceCraft moet bereiken.

### 5. Start de server opnieuw op

Start `VoiceCraft.Server` opnieuw vanuit dezelfde map. Let op:

- ongeldige JSON-fouten
- poort al in gebruik fouten
- mislukte luisteraar of bindingsfouten

Los deze op voordat u verder gaat. Een Minecraft-add-on of plug-in kan geen betrouwbare verbinding maken terwijl de server opstartfouten meldt.

### 6. Sluit een VoiceCraft-client aan

Installeer de client vanaf [Download Page](/download) en voeg vervolgens een serververmelding toe:

- host: het VoiceCraft-serveradres
- poort: `VoiceCraftConfig.Port`, meestal `9050`

Gebruik voor lokale tests:

```text
127.0.0.1:9050
```

Zorg ervoor dat de client `Positioning Type` overeenkomt met `VoiceCraftConfig.PositioningType`.

### 7. Sluit Minecraft aan

Ga verder met de gids die overeenkomt met het transport dat je hebt ingeschakeld:

- [McHttp for BDS](/minecraft/mchttp-bds)
- [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer)
- [GeyserVoice](/ecosystem/geyservoice)

Wanneer u om een token wordt gevraagd, gebruikt u het overeenkomende transporttoken van `ServerProperties.json`.

### 8. Valideer de configuratie

De eerste installatie is voltooid wanneer:

- serverlogboeken tonen geen configuratie- of luisteraarfouten
- de VoiceCraft-client maakt verbinding met het UDP-eindpunt
- Minecraft authenticeert via het geselecteerde transport
- in-game bindstroom werkt
- Updates van spelersposities bereiken VoiceCraft
- nabijheidsstem werkt op het verwachte bereik

## Opstartargumenten

VoiceCraft-server ondersteunt deze hoofdargumenten:

- `--exit-on-invalid-properties`
  Sluit af als `ServerProperties.json` niet kan worden geparseerd.
- `--language <culture>`
  Overschrijf de taal van het serverlogboek voor de huidige run.
- `--transport-mode <mode>`
  Schakel een subset van Minecraft-transporten in voor de huidige run.
- `--transport-host <host>`
  Overschrijf de geconfigureerde Minecraft-transporthost.
- `--transport-port <port>`
  Overschrijf de geconfigureerde Minecraft-transportpoort.
- `--server-key <token>`
  Overschrijf het gedeelde Minecraft-inlogtoken voor de huidige uitvoering.

Er bestaan ook korte aliassen in de code:

- `-eip`
- `-l`
- `-tm`
- `-th`
- `-tp`
- `-sk`

## Voorbeelden

### Uitvoeren met een opstarttaaloverschrijving

```bash
./VoiceCraft.Server --language en-US
```

### Sluit af als de configuratie ongeldig is

```bash
./VoiceCraft.Server --exit-on-invalid-properties
```

### Voer alleen `McTcp` uit voor een Java-bridge

```bash
./VoiceCraft.Server --transport-mode tcp --transport-host 0.0.0.0 --transport-port 9050
```

### Voer alleen `McHttp` uit

```bash
./VoiceCraft.Server --transport-mode http --transport-host 0.0.0.0 --transport-port 9050
```

### Token overschrijven zonder JSON te bewerken

```bash
./VoiceCraft.Server --server-key "replace-with-secure-token"
```

## Hoe transportoverschrijvingen zich gedragen

Runtime-overschrijvingen herschrijven `ServerProperties.json` niet permanent.

Ze zijn alleen van toepassing op het huidige proces en zijn nuttig wanneer:

- meerdere omgevingen uitvoeren vanaf één image
- met behulp van panelen of systemd drop-ins
- testen van directe versus proxy-topologieën
- een ander hulpmiddel zoals `GeyserVoice` de runtime laten starten met gegenereerde waarden

## Controlelijst voor de eerste keer

1. Voer de server één keer uit om `config/ServerProperties.json` te genereren.
2. Stop de server voordat u de gegenereerde configuratie bewerkt.
3. Wijzig alle gegenereerde inlogtokens.
4. Bevestig welk vervoer je daadwerkelijk nodig hebt:
   - `McHttp` voor BDS
   - `McWss` voor lokale werelden
   - `McTcp` voor `GeyserVoice`
5. Controleer hostbindingen.
6. Open alleen de poorten die u nodig heeft.
7. Start de server opnieuw op vanuit dezelfde installatiemap.
8. Bevestig `PositioningType` bij uw klanten.
9. Test de clientverbinding voordat u Minecraft-automatisering aansluit.
10. Sluit de Minecraft-add-on of plug-in aan en valideer de bindstroom.

## Veel voorkomende fouten bij de eerste run

- de gegenereerde tokens ongewijzigd laten
- het blootstellen van `127.0.0.1` eindpunten aan externe knooppunten
- we vergeten dat `McTcp` mogelijk vereist is voor bruggen aan Java-zijde
- waardoor elk transport in de productie mogelijk wordt gemaakt zonder dat het daadwerkelijk nodig is
- bewerken van `ServerProperties.json` terwijl een procesmanager onmiddellijk de oude kapotte configuratie opnieuw opstart
- met behulp van de UDP-clientpoort waar de Minecraft-gids een transporteindpunt verwacht

Zie [ServerProperties.json](/server/server-properties) voor de volledige configuratiereferentie.
