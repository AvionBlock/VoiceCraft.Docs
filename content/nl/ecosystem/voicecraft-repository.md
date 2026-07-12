# VoiceCraft (repository en build)

Primaire repository: [gitlab.avion.team/voicecraft/VoiceCraft](https://gitlab.avion.team/voicecraft/VoiceCraft)

GitHub is alleen een publieke mirror: [AvionBlock/VoiceCraft](https://github.com/AvionBlock/VoiceCraft)

De `VoiceCraft`-repository bevat de kernruntime. Het is waar de client, server, gedeeld protocol, netwerkmodel en release-builds vandaan komen.

Voor een normale implementatie hoeft u niet vanaf de broncode te bouwen. Gebruik kant-en-klare releases, tenzij u VoiceCraft zelf ontwikkelt, fouten oplost in een specifieke build of een aangepaste runtime produceert.

## Structuur van de opslagplaats

- `VoiceCraft.Client/*`
  platformclients voor Windows, Linux, macOS, Android, iOS en browsergerelateerde doelen
- `VoiceCraft.Server`
  zelfstandige VoiceCraft-backend
- `VoiceCraft.Core`
  gedeelde kernhulpprogramma's, audiohelpers, lokalisatie, constanten
- `VoiceCraft.Network`
  protocolpakketten, transporten, entiteiten, effecten, wereldlogica
- test projecten
  protocol-, netwerk- en integratiedekking

## Wat de repository bevat

De repository is breder dan "client + server":

- volledig clientinstellingenmodel
- ingebedde landinstellingen
- Op Minecraft gerichte transporten:
  `McHttp`, `McWss`, `McTcp`
- pakketdefinities voor VoiceCraft- en McApi-lagen
- audio-effecten en zichtbaarheidssystemen

Het is ook belangrijk om te begrijpen wat deze repository niet is: VoiceCraft is geen enkele Minecraft-mod of plug-in. De kernruntime werkt samen met clients en Minecraft-integraties zoals `VoiceCraft.Addon` of `GeyserVoice`.

## Bouw vereisten

Van broncode:

- .NET SDK `9.0.312`
- `rollForward: latestMinor`

Lokaal controleren:

```bash
dotnet --info
```

## Bouw de oplossing

Gebruik dit als u de volledige oplossing wilt valideren of lokale binaire bestanden wilt produceren:

```bash
git clone https://gitlab.avion.team/voicecraft/VoiceCraft.git
cd VoiceCraft

dotnet restore
dotnet build -c Release
```

Als het herstellen mislukt, controleer dan of de geïnstalleerde .NET SDK overeenkomt met de verwachtingen van de repository `global.json`.

## Voer de server uit

```bash
dotnet run --project VoiceCraft.Server -- --language en-US
```

Handige root-opties:

- `--language <locale>`
- `--exit-on-invalid-properties`
- `--transport-mode <http|tcp|wss>`
- `--transport-host <host>`
- `--transport-port <port>`
- `--server-key <token>`

De extra `--` geeft argumenten door aan het serverproject in plaats van aan `dotnet run` zelf.

Voor implementatie geeft u de voorkeur aan het gepubliceerde releaseartefact of een `dotnet publish`-uitvoer boven rechtstreeks vanaf de broncode.

## Klant bouwt

Voorbeelden:

```bash
dotnet build VoiceCraft.Client/VoiceCraft.Client.Windows -c Release
dotnet build VoiceCraft.Client/VoiceCraft.Client.Linux -c Release
dotnet build VoiceCraft.Client/VoiceCraft.Client.MacOS -c Release
```

Mobiele doelen vereisen doorgaans hun eigen platform-SDK-toolchasins.

Desktopbuilds zijn eenvoudiger omdat de vereiste SDK's deel uitmaken van de .NET/Avalonia-toolchain. Voor mobiele builds zijn mogelijk platformspecifieke ondertekenings- en verpakkingsstappen nodig die buiten de kernoplossingsbuild vallen.

## Ingebedde landinstellingen

De huidige ingebedde landinstellingen zijn onder meer:

- `en-US`
- `ru-RU`
- `nl-NL`
- `de-DE`
- `pl-PL`
- `zh-CN`
- `zh-TW`

## Controlelijst voor productie

1. Voer `VoiceCraft.Server` één keer uit om configuratie te genereren.
2. Vervang alle gegenereerde transportfiches.
3. Bepaal welk vervoer je daadwerkelijk nodig hebt:
   - `McHttp`
   - `McWss`
   - `McTcp`
4. Open alleen de vereiste poorten.
5. Bewaar back-ups van `ServerProperties.json`.
6. Installeer de bijpassende Minecraft-side-integratie.
7. Bevestig dat clients en Minecraft-integratie verbinding maken via hun afzonderlijke eindpunten.

## Wanneer gebruikt u deze pagina?

- u de kern van VoiceCraft wilt bouwen of debuggen
- u moet begrijpen welk project eigenaar is van het client/server-gedrag
- u controleert of een functie thuishoort in core, add-on of GeyserVoice
- u bereidt aangepaste release-artefacten voor

## Gerelateerde documenten

- [Server Installation](/server/installation)
- [ServerProperties.json](/server/server-properties)
- [Transportmodi](/server/transports)
- [VoiceCraft.Addon](/ecosystem/voicecraft-addon)
- [GeyserVoice](/ecosystem/geyservoice)
