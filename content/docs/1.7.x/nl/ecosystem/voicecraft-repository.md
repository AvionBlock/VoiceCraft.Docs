# VoiceCraft (repository en build)

Primary repository: [gitlab.avion.team/voicecraft/VoiceCraft](https://gitlab.avion.team/voicecraft/VoiceCraft)

Public mirror: [AvionBlock/VoiceCraft](https://github.com/AvionBlock/VoiceCraft)

De repository bevat client, server, core, network, tests en tools. De browser/web client is verwijderd in `1.7.0`.

## Wijzigingen in 1.7

- versie `1.6.1` -> `1.7.0`
- Android version `17`
- dependency updates
- `OpenPort.Net` voor NAT port mapping
- nieuw event/property model
- cave/muffle packets vervangen door properties
- audio effect processors
- iOS sample-rate fix en privacy manifest
- release pipeline

## Build

```bash
git clone https://gitlab.avion.team/voicecraft/VoiceCraft.git
cd VoiceCraft
dotnet restore
dotnet build -c Release
```

## Server draaien

```bash
dotnet run --project VoiceCraft.Server -- --language en-US
```

## Productiechecklist

1. Start server eenmaal voor config.
2. Vervang tokens.
3. Kies `McHttp`, `McWss` of `McTcp`.
4. Configureer `AutoOpenPort` bewust.
5. Open alleen benodigde poorten.
6. Installeer passende Minecraft-integratie.
