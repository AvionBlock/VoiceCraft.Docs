# VoiceCraft（倉庫與建置）

Primary repository：[gitlab.avion.team/voicecraft/VoiceCraft](https://gitlab.avion.team/voicecraft/VoiceCraft)

Public mirror only：[AvionBlock/VoiceCraft](https://github.com/AvionBlock/VoiceCraft)

倉庫包含 client、server、core、network、tests 和 tools。Browser/web client 在 `1.7.0` 中移除。

## 1.7 變更

- version `1.6.1` -> `1.7.0`
- Android version `17`
- dependency updates
- `OpenPort.Net` 用於 NAT port mapping
- 新 event/property model
- cave/muffle packets 改為 properties
- audio effect processors
- iOS sample-rate fix 和 privacy manifest
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

1. 執行一次 server 產生 config。
2. 替換 tokens。
3. 選擇 `McHttp`、`McWss` 或 `McTcp`。
4. 明確設定 `AutoOpenPort`。
5. 只開放需要的連接埠。
6. 安裝匹配的 Minecraft integration。
