# VoiceCraft (Repository und Build)

Repository: [AvionBlock/VoiceCraft](https://github.com/AvionBlock/VoiceCraft)

## Repository-Struktur

- `VoiceCraft.Client/*`
  Plattform-Clients für Windows, Linux, macOS, Android, iOS und browserbezogene Ziele
- `VoiceCraft.Server`
  eigenständiges VoiceCraft-Backend
- `VoiceCraft.Core`
  Gemeinsam genutzte Kerndienstprogramme, Audio-Helfer, Lokalisierung, Konstanten
- `VoiceCraft.Network`
  Protokollpakete, Transporte, Entitäten, Effekte, Weltlogik
- Testprojekte
  Protokoll-, Netzwerk- und Integrationsabdeckung

## Was das Repository enthält

Das Repository ist umfassender als „Client + Server“:

- Vollständiges Client-Einstellungsmodell
- Eingebettete Gebietsschemas
- Minecraft-orientierte Transporte:
  `McHttp`, `McWss`, `McTcp`
- Paketdefinitionen für VoiceCraft- und McApi-Ebenen
- Audioeffekte und Sichtbarkeitssysteme

## Build-Anforderungen

Aus dem Quellcode:

- .NET SDK `9.0.312`
- `rollForward: latestMinor`

Prüfen Sie vor Ort:

```bash
dotnet --info
```

## Erstellen Sie die Lösung

```bash
git clone https://github.com/AvionBlock/VoiceCraft.git
cd VoiceCraft

dotnet restore
dotnet build -c Release
```

## Führen Sie den Server aus

```bash
dotnet run --project VoiceCraft.Server -- --language en-US
```

Nützliche Root-Optionen:

- `--language <locale>`
- `--exit-on-invalid-properties`
- `--transport-mode <http|tcp|wss>`
- `--transport-host <host>`
- `--transport-port <port>`
- `--server-key <token>`

## Client-Builds

Beispiele:

```bash
dotnet build VoiceCraft.Client/VoiceCraft.Client.Windows -c Release
dotnet build VoiceCraft.Client/VoiceCraft.Client.Linux -c Release
dotnet build VoiceCraft.Client/VoiceCraft.Client.MacOS -c Release
```

Mobile Ziele erfordern normalerweise ihre eigenen Plattform-SDK-Toolchains.

## Eingebettete Gebietsschemas

Zu den aktuellen eingebetteten Gebietsschemata gehören:

- `en-US`
- `ru-RU`
- `nl-NL`
- `de-DE`
- `pl-PL`
- `zh-CN`
- `zh-TW`

## Produktionscheckliste

1. Run `VoiceCraft.Server` once to generate config.
2. Ersetzen Sie alle generierten Transport-Tokens.
3. Entscheiden Sie, welchen Transport Sie tatsächlich benötigen:
   - `McHttp`
   - `McWss`
   - `McTcp`
4. Öffnen Sie nur die erforderlichen Ports.
5. Keep backups of `ServerProperties.json`.

## Verwandte Dokumente

- [Serverinstallation](/server/installation)
- [ServerProperties.json](/server/server-properties)
- [Transportmodi](/server/transports)
- [VoiceCraft.Addon](/ecosystem/voicecraft-addon)
- [GeyserVoice](/ecosystem/geyservoice)
