# Serverinstallatie

`VoiceCraft.Server` is de zelfstandige backend die spraakverkeer van klanten accepteert en Minecraft-gerichte transporten beschikbaar maakt.

Gebruik deze pagina als het serverinstallatiepad. Tegen het einde zou je een actieve server moeten hebben, een gegenereerde configuratie, één Minecraft-transport geselecteerd en een duidelijke volgende pagina voor je Minecraft-integratie.

## Wat de server eigenlijk bevat

VoiceCraft-server maakt meerdere lagen tegelijk zichtbaar:

- VoiceCraft UDP-spraakserver
- `McHttp` transport voor Bedrock-integraties
- `McWss` transport voor websocket / commandotunnel Bedrock-stromen
- `McTcp` transport voor Java-zijbruggen zoals `GeyserVoice`

U kunt ze allemaal ingeschakeld laten of transporten tijdens runtime selecteren.

## Installatiestroom

1. Download en pak de server voor uw platform uit.
2. Voer het één keer uit vanuit de map waarin u de configuratie wilt bewaren.
3. Stop het proces nadat `config/ServerProperties.json` is gegenereerd.
4. Vervang de gegenereerde login-tokens.
5. Schakel het Minecraft-transport in dat bij uw topologie past.
6. Stel hostbindingen en firewallregels in.
7. Start de server opnieuw.
8. Voeg het VoiceCraft UDP-eindpunt toe aan de client.
9. Verbind de Minecraft-kant met de bijpassende add-on- of plug-ingids.

## Vooraf gebouwde binaire releases

De releasepagina bevat meestal:

- Windows:
  `VoiceCraft.Server.Windows.x64.zip`, `x86`, `arm64`
- Linux:
  `VoiceCraft.Server.Linux.x64.zip`, `arm`, `arm64`

Downloaden: [Download Page](/download)

## Windows

1. Download `VoiceCraft.Server.Windows.<arch>.zip`.
2. Pak het archief uit naar een speciale map.
3. Start de server vanuit die map:

```powershell
./VoiceCraft.Server.exe
```

Bij de eerste run wordt `config/ServerProperties.json` gemaakt. Bewaar dit bestand in de servermap en verwijder het niet tussen herstarts.

## Linux

1. Download `VoiceCraft.Server.Linux.<arch>.zip`.
2. Pak het archief uit naar een speciale map.
3. Start de server vanuit die map:

```bash
chmod +x ./VoiceCraft.Server
./VoiceCraft.Server
```

Bij de eerste run wordt `config/ServerProperties.json` gemaakt. Bewaar dit bestand in de servermap en zorg ervoor dat het wordt opgenomen in back-ups.

## Na het eerste begin

Stop de server en open `config/ServerProperties.json` voordat u Minecraft of spelers aansluit.

Voer eerst deze bewerkingen uit:

1. Vervang elk gegenereerd gedeeld token:
   - `McHttpConfig.LoginToken`
   - `McWssConfig.LoginToken`
   - `McTcpConfig.LoginToken`
2. Kies één primair Minecraft-transport:
   - Bedrock Dedicated Server: schakel `McHttpConfig` in
   - lokale Bedrock-wereld: schakel `McWssConfig` in
   - Java + Geyser/Floodgate: schakel `McTcpConfig` in
3. Stel de transporthost in:
   - gebruik `127.0.0.1` wanneer Minecraft op dezelfde machine draait
   - gebruik `0.0.0.0` of een LAN/openbaar adres alleen als een andere machine verbinding moet maken
4. Houd `VoiceCraftConfig.Port` beschikbaar voor spelerklanten.
5. Start `VoiceCraft.Server` opnieuw nadat u de configuratie hebt opgeslagen.

Ga voor alle configuratievelden verder met [First Server Run](/server/first-run) en [ServerProperties.json](/server/server-properties).

## Verbind de rest van de stapel

Zodra de server netjes opnieuw is opgestart:

1. Installeer de VoiceCraft-client voor elke speler vanaf de [Download Page](/download).
2. Voeg een serververmelding toe in de client:
   - host: uw VoiceCraft-serveradres
   - poort: `VoiceCraftConfig.Port`, meestal `9050`
3. Volg de Minecraft-gids voor het door jou gekozen transportmiddel:
   - [McHttp for BDS](/minecraft/mchttp-bds)
   - [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer)
   - [GeyserVoice](/ecosystem/geyservoice)

De server wordt pas als volledig ingesteld beschouwd als de client verbinding maakt en de Minecraft-kant zich verifieert met hetzelfde transporttoken.

## macOS

Er is misschien niet altijd een vooraf gebouwd speciaal artefact, maar de server kan vanaf de bron worden gebouwd:

```bash
git clone https://github.com/AvionBlock/VoiceCraft.git
cd VoiceCraft/VoiceCraft.Server
dotnet restore
dotnet publish -c Release -r osx-arm64 -p:PublishSingleFile=true
```

Voor Intel macOS vervangt u `osx-arm64` door `osx-x64`.

## Docker/containers

Er wordt verwezen naar containerimages vanuit de hoofdrepository README:

- [VoiceCraft Docker Hub](https://hub.docker.com/r/sinevector241/voicecraft/tags)

Containerimplementatie is nuttig wanneer:

- u wilt een speciale servicegrens
- u draait al BDS/Java-nodes in containers
- u wilt eenvoudiger herstartbeleid en logboeken

Nadat de container is gestart, gaat u door en bewerkt u de gegenereerde `config/ServerProperties.json` op dezelfde manier als bij een normale binaire installatie.

## Aanbevolen installatie-indeling

Voorbeeld Linux-indeling:

```text
/opt/voicecraft/
  VoiceCraft.Server
  config/
    ServerProperties.json
```

Aanbevolen praktijken:

- bewaar VoiceCraft in zijn eigen directory
- volharden `config/`
- back-up `ServerProperties.json`
- meng niet meerdere omgevingen in dezelfde map

## Klaar checklist

Bevestig het volgende voordat u de configuratie voor spelers opent:

- `VoiceCraft.Server` start zonder configuratie- of poortfouten
- alle gegenereerde `LoginToken`-waarden zijn vervangen
- alleen het transport dat u nodig heeft, is zichtbaar
- clienthost en poort komen overeen met `VoiceCraftConfig.Port`
- Minecraft-add-on of plug-in gebruikt het bijpassende transporttoken
- bindflow werkt in het spel

## Uitvoeren als systemd-service (Linux)

Voorbeeld `/etc/systemd/system/voicecraft.service`:

```ini
[Unit]
Description=VoiceCraft Server
After=network.target

[Service]
WorkingDirectory=/opt/voicecraft
ExecStart=/opt/voicecraft/VoiceCraft.Server
Restart=always
RestartSec=3
User=voicecraft
Group=voicecraft

[Install]
WantedBy=multi-user.target
```

Pas het toe:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now voicecraft
sudo systemctl status voicecraft
```

## Bouw vanuit de bron

Zie [VoiceCraft repository and build](/ecosystem/voicecraft-repository) voor SDK- en projectdetails.

Minimale stroom:

```bash
git clone https://github.com/AvionBlock/VoiceCraft.git
cd VoiceCraft
dotnet restore
dotnet build -c Release
dotnet run --project VoiceCraft.Server
```

## Wat moet je nu lezen?

- [First Server Run](/server/first-run)
- [ServerProperties.json](/server/server-properties)
- [Transport Modes](/server/transports)
- [Client Installation](/client/installation)
- [McHttp for BDS](/minecraft/mchttp-bds)
- [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer)
- [GeyserVoice](/ecosystem/geyservoice)
