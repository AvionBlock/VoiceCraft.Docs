# VoiceCraft（儲存庫與建置）

儲存庫：[AvionBlock/VoiceCraft](https://github.com/AvionBlock/VoiceCraft)

`VoiceCraft` 儲存庫包含核心執行時間。這是客戶端、伺服器、共享協定、網路模型和發布版本的來源。

您不需要從原始程式碼建置正常部署。使用預建置版本，除非您正在開發 VoiceCraft 本身、偵錯特定建置或產生自訂執行時間。

## 儲存庫結構

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

## 儲存庫包含什麼

儲存庫比「客戶端+伺服器」更廣泛：

- 完整的客戶端設定模型
- 嵌入式語言環境
- 面向 Minecraft 的運輸：
  `McHttp`、`McWss`、`McTcp`
- VoiceCraft 和 McApi 層的資料包定義
- 音訊效果和可視性系統

了解這個儲存庫不是什麼也很重要：VoiceCraft 不是一個單一的 Minecraft 模組或插件。核心運行時與客戶端和 Minecraft 端整合（例如 `VoiceCraft.Addon` 或 `GeyserVoice`）協同工作。

## 建置要求

從原始碼來看：

- .NET SDK `9.0.312`
- `rollForward: latestMinor`

本地檢查：

```bash
dotnet --info
```

## 建構解決方案

當您想要驗證完整的解決方案或產生本機二進位檔案時，請使用此選項：

```bash
git clone https://github.com/AvionBlock/VoiceCraft.git
cd VoiceCraft

dotnet restore
dotnet build -c Release
```

如果復原失敗，請確認已安裝的 .NET SDK 與儲存庫 `global.json` 期望相符。

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

額外的 `--` 將參數傳遞給伺服器項目而不是 `dotnet run` 本身。

對於部署，優先選擇已發布的版本工件或 `dotnet publish` 輸出，而不是直接從來源執行。

## 客戶端建構

範例：

```bash
dotnet build VoiceCraft.Client/VoiceCraft.Client.Windows -c Release
dotnet build VoiceCraft.Client/VoiceCraft.Client.Linux -c Release
dotnet build VoiceCraft.Client/VoiceCraft.Client.MacOS -c Release
```

移動目標通常需要自己的平台 SDK 工具鏈。

桌面建置更加簡單，因為所需的 SDK 是 .NET/Avalonia 工具鏈的一部分。行動建置可能需要核心解決方案建置之外的特定於平台的簽名和打包步驟。

## 嵌入式語言環境

目前的嵌入式語言環境包括：

- `en-US`
- `ru-RU`
- `nl-NL`
- `de-DE`
- `pl-PL`
- `zh-CN`
- `zh-TW`

## 生產清單

1. 執行 `VoiceCraft.Server` 一次以產生配置。
2. 取代所有產生的傳輸令牌。
3. 決定您實際上需要哪種交通工具：
   - `McHttp`
   - `McWss`
   - `McTcp`
4. 僅開啟所需的連接埠。
5. 保留 `ServerProperties.json` 的備份。
6. 安裝相符的 Minecraft 端整合。
7. 確認客戶端和 Minecraft 整合透過其單獨的端點進行連線。

## 何時使用此頁面

- 您想要建立或調試核心 VoiceCraft
- 您需要了解哪個項目擁有客戶端/伺服器行為
- 您正在檢查某個功能是否屬於核心、插件或 GeyserVoice
- 您正在準備自訂發布工件

## 相關文件

- [Server Installation](/server/installation)
- [ServerProperties.json](/server/server-properties)
- [Transport Modes](/server/transports)
- [VoiceCraft.Addon](/ecosystem/voicecraft-addon)
- [GeyserVoice](/ecosystem/geyservoice)
