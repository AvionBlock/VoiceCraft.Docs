# VoiceCraft（倉庫和建置）

倉庫：[AvionBlock/VoiceCraft](https://github.com/AvionBlock/VoiceCraft)

## 倉庫結構

- `VoiceCraft.Client/*`
  適用於 Windows、Linux、macOS、Android、iOS 和瀏覽器相關目標的平台用戶端
- `VoiceCraft.Server`
  獨立的 VoiceCraft 後端
- `VoiceCraft.Core`
  共享核心實用程式、音訊助理、在地化、常數
- `VoiceCraft.Network`
  協定包、傳輸、實體、效果、世界邏輯
- 測試項目
  協定、網路和整合覆蓋範圍

## 倉庫包含什麼

倉庫比「客戶端+伺服器」更廣泛：

- 完整的客戶端設定模型
- 嵌入式語言環境
- 面向 Minecraft 的傳輸：
  `McHttp`, `McWss`, `McTcp`
- VoiceCraft 和 McApi 層的資料包定義
- 音訊效果和視覺性系統

## 建置要求

從原始碼來看：

- .NET SDK `9.0.312`
- `rollForward: latestMinor`

本地檢查：

```bash
dotnet --info
```

## 建置解決方案

```bash
git clone https://github.com/AvionBlock/VoiceCraft.git
cd VoiceCraft

dotnet restore
dotnet build -c Release
```

## 運行伺服器

```bash
dotnet run --project VoiceCraft.Server -- --language en-US
```

有用的根選項：

- `--language <locale>`
- `--exit-on-invalid-properties`
- `--transport-mode <http|tcp|wss>`
- `--transport-host <host>`
- `--transport-port <port>`
- `--server-key <token>`

## 客戶端構建

範例：

```bash
dotnet build VoiceCraft.Client/VoiceCraft.Client.Windows -c Release
dotnet build VoiceCraft.Client/VoiceCraft.Client.Linux -c Release
dotnet build VoiceCraft.Client/VoiceCraft.Client.MacOS -c Release
```

移動目標通常需要自己的平台 SDK 工具鏈。

## 嵌入語言環境

目前的嵌入式語言環境包括：

- `en-US`
- `ru-RU`
- `nl-NL`
- `de-DE`
- `pl-PL`
- `zh-CN`
- `zh-TW`

## 生產清單

1. Run `VoiceCraft.Server` once to generate config.
2. 取代所有產生的傳輸令牌。
3. 決定您實際上需要哪一種交通工具：
   - `McHttp`
   - `McWss`
   - `McTcp`
4. 僅開啟所需的連接埠。
5. Keep backups of `ServerProperties.json`.

## 相關文檔

- [伺服器安裝](/server/installation)
- [ServerProperties.json](/server/server-properties)
- [傳輸模式](/server/transports)
- [VoiceCraft.Addon](/ecosystem/voicecraft-addon)
- [GeyserVoice](/ecosystem/geyservoice)
