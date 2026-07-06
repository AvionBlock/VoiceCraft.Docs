# VoiceCraft (Repository und Build)

Primäres Repository: [gitlab.avion.team/voicecraft/VoiceCraft](https://gitlab.avion.team/voicecraft/VoiceCraft)

Public Mirror: [AvionBlock/VoiceCraft](https://github.com/AvionBlock/VoiceCraft)

Das Repository enthält Client, Server, Core, Network, Tests und Tools. Der Browser/Web-Client wurde in `1.7.0` entfernt.

## Änderungen in 1.7

- Version `1.6.1` -> `1.7.0`
- Android Version `17`
- aktualisierte Pakete
- `OpenPort.Net` für NAT-Port-Mapping
- neues Event-/Property-Modell
- Cave/Muffle-Pakete durch Properties ersetzt
- Audioeffekt-Prozessoren
- iOS Sample-Rate-Fix und Privacy Manifest
- Release-Pipeline

## Build

```bash
git clone https://gitlab.avion.team/voicecraft/VoiceCraft.git
cd VoiceCraft
dotnet restore
dotnet build -c Release
```

## Server starten

```bash
dotnet run --project VoiceCraft.Server -- --language en-US
```

## Produktionscheckliste

1. Server einmal starten, um Config zu erzeugen.
2. Tokens ersetzen.
3. Transport wählen: `McHttp`, `McWss` oder `McTcp`.
4. `AutoOpenPort` bewusst konfigurieren.
5. Nur nötige Ports öffnen.
6. Passende Minecraft-Integration installieren.
