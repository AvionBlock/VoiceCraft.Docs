# VoiceCraft (Repository and Build)

Primary repository: [gitlab.avion.team/voicecraft/VoiceCraft](https://gitlab.avion.team/voicecraft/VoiceCraft)

Public mirror: [AvionBlock/VoiceCraft](https://github.com/AvionBlock/VoiceCraft)

Репозиторий `VoiceCraft` содержит core runtime: client, server, shared protocol, network model и release builds.

Для обычного deployment сборка из source не нужна. Используйте prebuilt releases, если не разрабатываете VoiceCraft, не debug'ите конкретный build и не делаете custom runtime.

## Структура репозитория

- `VoiceCraft.Client/VoiceCraft.Client`
  shared Avalonia client application
- `VoiceCraft.Client/VoiceCraft.Client.Windows`
  Windows desktop target
- `VoiceCraft.Client/VoiceCraft.Client.Linux`
  Linux desktop target
- `VoiceCraft.Client/VoiceCraft.Client.MacOS`
  macOS desktop target
- `VoiceCraft.Client/VoiceCraft.Client.Android`
  Android mobile target
- `VoiceCraft.Client/VoiceCraft.Client.iOS`
  iOS mobile target
- `VoiceCraft.Server`
  standalone backend
- `VoiceCraft.Core`
  constants, models, audio abstractions, helpers, telemetry transport, common runtime code
- `VoiceCraft.Network`
  VoiceCraft/McApi packets, clients, servers, transports, entities, audio effects, jitter buffer, world state
- `VoiceCraft.*.Tests`
  unit, protocol и integration coverage
- `VoiceCraft.Tools`
  tools для development/measurements

Browser/web client target удалён в `1.7.0`.

## Что изменилось в 1.7

- project version: `1.6.1` -> `1.7.0`
- Android version: `17`
- обновлены package versions, включая Avalonia, LiteNetLib, SoundFlow, OpusSharp, Spectre.Console и test packages
- добавлен `OpenPort.Net` для NAT port mapping
- event packet wrapping и event subscriptions переработаны
- добавлены entity custom properties
- cave/muffle factor packets заменены properties
- audio effects используют processors
- iOS получил sample-rate conversion fixes и Apple privacy manifest
- добавлен release pipeline

## Build requirements

Для source build:

- .NET SDK, совместимый с repository `global.json`
- platform SDKs для mobile targets
- signing/provisioning для iOS packaging

Проверить:

```bash
dotnet --info
```

## Build solution

```bash
git clone https://gitlab.avion.team/voicecraft/VoiceCraft.git
cd VoiceCraft

dotnet restore
dotnet build -c Release
```

Если restore падает, проверьте installed .NET SDK и `global.json`.

## Run server

```bash
dotnet run --project VoiceCraft.Server -- --language en-US
```

Полезные root options:

- `--language <locale>`
- `--exit-on-invalid-properties`
- `--transport-mode <http|tcp|wss>`
- `--transport-host <host>`
- `--transport-port <port>`
- `--server-key <token>`

Дополнительный `--` передаёт аргументы server project, а не `dotnet run`.

## Client builds

```bash
dotnet build VoiceCraft.Client/VoiceCraft.Client.Windows -c Release
dotnet build VoiceCraft.Client/VoiceCraft.Client.Linux -c Release
dotnet build VoiceCraft.Client/VoiceCraft.Client.MacOS -c Release
```

Mobile targets требуют platform SDK, signing и packaging steps.

## Production checklist

1. Запустите `VoiceCraft.Server` один раз для генерации config.
2. Замените все generated transport tokens.
3. Выберите нужный transport:
   - `McHttp`
   - `McWss`
   - `McTcp`
4. Решите, должен ли `AutoOpenPort` остаться выключенным.
5. Откройте только нужные порты.
6. Храните backups `ServerProperties.json`.
7. Установите matching Minecraft-side integration.
8. Проверьте client и Minecraft integration через их отдельные endpoints.

## Related docs

- [Server Installation](/server/installation)
- [ServerProperties.json](/server/server-properties)
- [Transport Modes](/server/transports)
- [VoiceCraft.Addon](/ecosystem/voicecraft-addon)
- [GeyserVoice](/ecosystem/geyservoice)
