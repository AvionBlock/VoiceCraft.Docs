# VoiceCraft (репозиторий и сборка)

Репозиторий: [AvionBlock/VoiceCraft](https://github.com/AvionBlock/VoiceCraft)

## Структура

- `VoiceCraft.Client/*`
- `VoiceCraft.Server`
- `VoiceCraft.Core`
- `VoiceCraft.Network`
- test-проекты

## Что реально содержит репозиторий

Репозиторий шире, чем просто "клиент + сервер":

- модель настроек клиента
- встроенные локали
- transports:
  `McHttp`, `McWss`, `McTcp`
- packet definitions для VoiceCraft и McApi
- audio effects и visibility systems

## Требования для сборки

- .NET SDK `9.0.312`
- `rollForward: latestMinor`

## Сборка solution

```bash
git clone https://github.com/AvionBlock/VoiceCraft.git
cd VoiceCraft

dotnet restore
dotnet build -c Release
```

## Запуск сервера

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
