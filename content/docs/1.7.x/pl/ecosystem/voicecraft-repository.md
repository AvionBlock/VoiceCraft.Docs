# VoiceCraft (Repository and Build)

Primary repository: [gitlab.avion.team/voicecraft/VoiceCraft](https://gitlab.avion.team/voicecraft/VoiceCraft)

Public mirror only: [AvionBlock/VoiceCraft](https://github.com/AvionBlock/VoiceCraft)

Repo zawiera client, server, core, network, tests i tools. Browser/web client usunięto w `1.7.0`.

## Zmiany 1.7

- wersja `1.6.1` -> `1.7.0`
- Android version `17`
- aktualizacje paczek
- `OpenPort.Net` dla NAT port mapping
- nowy event/property model
- cave/muffle packets zastąpione properties
- audio effect processors
- iOS sample-rate fix i privacy manifest
- release pipeline

## Build

```bash
git clone https://gitlab.avion.team/voicecraft/VoiceCraft.git
cd VoiceCraft
dotnet restore
dotnet build -c Release
```

## Run server

```bash
dotnet run --project VoiceCraft.Server -- --language en-US
```

## Production checklist

1. Uruchom server raz, aby wygenerować config.
2. Zmień tokens.
3. Wybierz `McHttp`, `McWss` albo `McTcp`.
4. Skonfiguruj `AutoOpenPort` świadomie.
5. Otwórz tylko potrzebne porty.
6. Zainstaluj pasującą Minecraft integration.
