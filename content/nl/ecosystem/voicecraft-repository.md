# VoiceCraft (repository en build)

Repository: [AvionBlock/VoiceCraft](https://github.com/AvionBlock/VoiceCraft)

## Repositorystructuur

- `VoiceCraft.Client/*`
  platformclients voor Windows, Linux, macOS, Android, iOS en browsergerelateerde doelen
- `VoiceCraft.Server`
  zelfstandige VoiceCraft-backend
- `VoiceCraft.Core`
  gedeelde kernhulpprogramma's, audiohelpers, lokalisatie, constanten
- `VoiceCraft.Network`
  protocolpakketten, transporten, entiteiten, effecten, wereldlogica
- testprojecten
  protocol-, netwerk- en integratiedekking

## Wat de repository bevat

De repository is breder dan "client + server":

- volledig clientinstellingenmodel
- ingebedde landinstellingen
- Minecraft-gerichte transporten:
  `McHttp`, `McWss`, `McTcp`
- pakketdefinities voor VoiceCraft- en McApi-lagen
- audio-effecten en zichtbaarheidssystemen

## Bouwvereisten

Van broncode:

- .NET SDK `9.0.312`
- `rollForward: latestMinor`

Lokaal controleren:

```bash
dotnet --info
```

## Bouw de oplossing

```bash
git clone https://github.com/AvionBlock/VoiceCraft.git
cd VoiceCraft

dotnet restore
dotnet build -c Release
```

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

## Klantbuilds

Voorbeelden:

```bash
dotnet build VoiceCraft.Client/VoiceCraft.Client.Windows -c Release
dotnet build VoiceCraft.Client/VoiceCraft.Client.Linux -c Release
dotnet build VoiceCraft.Client/VoiceCraft.Client.MacOS -c Release
```

Mobiele doelen vereisen doorgaans hun eigen platform-SDK-toolchasins.

## Ingebedde landinstellingen

De huidige ingebedde landinstellingen zijn onder meer:

- `en-US`
- `ru-RU`
- `nl-NL`
- `de-DE`
- `pl-PL`
- `zh-CN`
- `zh-TW`

## Productiecontrolelijst

1. Run `VoiceCraft.Server` once to generate config.
2. Vervang alle gegenereerde transportfiches.
3. Bepaal welk vervoer je daadwerkelijk nodig hebt:
   - `McHttp`
   - `McWss`
   - `McTcp`
4. Open alleen de vereiste poorten.
5. Keep backups of `ServerProperties.json`.

## Gerelateerde documenten

- [Serverinstallatie](/server/installation)
- [ServerProperties.json](/server/server-properties)
- [Transportmodi](/server/transports)
- [VoiceCraft.Addon] (/ecosystem/voicecraft-addon)
- [GeyserVoice](/ecosystem/geyservoice)
