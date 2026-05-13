# VoiceCraft (Repository und Build)

Repository: [AvionBlock/VoiceCraft](https://github.com/AvionBlock/VoiceCraft)

Das `VoiceCraft`-Repository enthält die Kernlaufzeit. Von hier stammen der Client, der Server, das gemeinsame Protokoll, das Netzwerkmodell und die Release-Builds.

Für eine normale Bereitstellung müssen Sie nicht aus dem Quellcode erstellen. Verwenden Sie vorgefertigte Versionen, es sei denn, Sie entwickeln VoiceCraft selbst, debuggen einen bestimmten Build oder erstellen eine benutzerdefinierte Laufzeit.

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
- eingebettete Gebietsschemas
- Minecraft-orientierte Transporte:
  `McHttp`, `McWss`, `McTcp`
- Paketdefinitionen für VoiceCraft- und McApi-Ebenen
- Audioeffekte und Sichtbarkeitssysteme

Es ist auch wichtig zu verstehen, was dieses Repository nicht ist: VoiceCraft ist kein einzelner Minecraft-Mod oder Plugin. Die Kernlaufzeit funktioniert zusammen mit Clients und Minecraft-seitigen Integrationen wie `VoiceCraft.Addon` oder `GeyserVoice`.

## Build-Anforderungen

Aus dem Quellcode:

- .NET SDK `9.0.312`
- `rollForward: latestMinor`

Prüfen Sie vor Ort:

```bash
dotnet --info
```

## Erstellen Sie die Lösung

Verwenden Sie dies, wenn Sie die vollständige Lösung validieren oder lokale Binärdateien erstellen möchten:

```bash
git clone https://github.com/AvionBlock/VoiceCraft.git
cd VoiceCraft

dotnet restore
dotnet build -c Release
```

Wenn die Wiederherstellung fehlschlägt, bestätigen Sie, dass das installierte .NET SDK den Erwartungen des Repositorys `global.json` entspricht.

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

Der zusätzliche `--` übergibt Argumente an das Serverprojekt und nicht an `dotnet run` selbst.

Bevorzugen Sie für die Bereitstellung das veröffentlichte Release-Artefakt oder eine `dotnet publish`-Ausgabe gegenüber der direkten Ausführung aus der Quelle.

## Client-Builds

Beispiele:

```bash
dotnet build VoiceCraft.Client/VoiceCraft.Client.Windows -c Release
dotnet build VoiceCraft.Client/VoiceCraft.Client.Linux -c Release
dotnet build VoiceCraft.Client/VoiceCraft.Client.MacOS -c Release
```

Mobile Ziele erfordern normalerweise ihre eigenen Plattform-SDK-Toolchains.

Desktop-Builds sind einfacher, da die erforderlichen SDKs Teil der .NET/Avalonia-Toolchain sind. Mobile Builds erfordern möglicherweise plattformspezifische Signierungs- und Verpackungsschritte außerhalb des Kernlösungsbuilds.

## Eingebettete Gebietsschemas

Zu den aktuellen eingebetteten Gebietsschemata gehören:

- `en-US`
- `ru-RU`
- `nl-NL`
- `de-DE`
- `pl-PL`
- `zh-CN`
- `zh-TW`

## Checkliste für die Produktion

1. Führen Sie `VoiceCraft.Server` einmal aus, um die Konfiguration zu generieren.
2. Ersetzen Sie alle generierten Transporttokens.
3. Entscheiden Sie, welchen Transport Sie tatsächlich benötigen:
   - `McHttp`
   - `McWss`
   - `McTcp`
4. Öffnen Sie nur die erforderlichen Ports.
5. Bewahren Sie Backups von `ServerProperties.json` auf.
6. Installieren Sie die passende Minecraft-seitige Integration.
7. Bestätigen Sie, dass Clients und die Minecraft-Integration über ihre separaten Endpunkte eine Verbindung herstellen.

## Wann Sie diese Seite verwenden sollten

- Sie möchten das Kern-VoiceCraft erstellen oder debuggen
- Sie müssen verstehen, welches Projekt das Client/Server-Verhalten besitzt
- Sie prüfen, ob eine Funktion zum Core, Add-on oder GeyserVoice gehört
- Sie bereiten benutzerdefinierte Release-Artefakte vor

## Verwandte Dokumente

- [Server Installation](/server/installation)
- [ServerProperties.json](/server/server-properties)
- [Transport Modes](/server/transports)
- [VoiceCraft.Addon](/ecosystem/voicecraft-addon)
- [GeyserVoice](/ecosystem/geyservoice)
