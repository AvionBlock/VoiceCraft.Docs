# VoiceCraft（仓库与构建）

Primary repository：[gitlab.avion.team/voicecraft/VoiceCraft](https://gitlab.avion.team/voicecraft/VoiceCraft)

Public mirror only：[AvionBlock/VoiceCraft](https://github.com/AvionBlock/VoiceCraft)

仓库包含 client、server、core、network、tests 和 tools。Browser/web client 在 `1.7.0` 中移除。

## 1.7 变更

- version `1.6.1` -> `1.7.0`
- Android version `17`
- dependency updates
- `OpenPort.Net` 用于 NAT port mapping
- 新 event/property model
- cave/muffle packets 改为 properties
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

1. 运行一次 server 生成 config。
2. 替换 tokens。
3. 选择 `McHttp`、`McWss` 或 `McTcp`。
4. 明确配置 `AutoOpenPort`。
5. 只开放需要的端口。
6. 安装匹配的 Minecraft integration。
