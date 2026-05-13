# 快速入門

本指南是獲得可用的 VoiceCraft 堆疊的最快方法。

它有意地遍歷整個路徑：伺服器、產生的配置、客戶端、Minecraft 傳輸和驗證。伺服器二進位啟動後不要停止；此時語音後端已存在，但 Minecraft 尚未連線。

## 首先選擇您的拓撲

VoiceCraft 可透過多種方式部署：

- Bedrock 專用伺服器：`VoiceCraft.Server` + `VoiceCraft.Addon.Core.McHttp`
- 本地 Bedrock 世界/單人遊戲：`VoiceCraft.Server` 或本地運行時 + `Core.McWss`
- 帶有 Geyser/Floodgate 的 Java 伺服器：`GeyserVoice` + `VoiceCraft.Server`
- Direct Paper 伺服器：`GeyserVoice` 也可以在背景下載並執行 VoiceCraft 運行時

如果您不確定，請從以下之一開始：

- Bedrock 專用伺服器：閱讀 [McHttp for BDS](/minecraft/mchttp-bds)
- Java + Geyser 伺服器：讀取 [GeyserVoice](/ecosystem/geyservoice)

對於第一個設置，選擇一個拓撲並僅公開其所需的傳輸。在基本綁定和鄰近流程工作後，您可以稍後新增混合設定。

## 1.下載伺服器

1. 開啟 [download page](/download)。
2. 下載適合您平台的伺服器存檔：
   - `VoiceCraft.Server.Windows.x64.zip`
   - `VoiceCraft.Server.Windows.x86.zip`
   - `VoiceCraft.Server.Windows.arm64.zip`
   - `VoiceCraft.Server.Linux.x64.zip`
   - `VoiceCraft.Server.Linux.arm.zip`
   - `VoiceCraft.Server.Linux.arm64.zip`

如果您從原始程式碼構建，請參閱 [VoiceCraft repository and build](/ecosystem/voicecraft-repository)。

## 2. 運行一次伺服器

從您希望 `config/ServerProperties.json` 所在的資料夾執行。

### Windows

```powershell
./VoiceCraft.Server.exe
```

### Linux

```bash
chmod +x ./VoiceCraft.Server
./VoiceCraft.Server
```

首次啟動後，VoiceCraft 產生 `config/ServerProperties.json`。

編輯此文件之前停止伺服器。

## 3. 保護產生的配置

在連接 Minecraft 或玩家之前，更改每個產生的共享令牌：

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

您通常希望每個環境都有不同的值。

您稍後使用的令牌必須與傳輸相符：

- BDS `McHttp` 插件使用 `McHttpConfig.LoginToken`
- 本地 Bedrock `McWss` 插件使用 `McWssConfig.LoginToken`
- `GeyserVoice` 使用 `McTcpConfig.LoginToken`

## 4. 選擇 Minecraft 交通工具

VoiceCraft 目前有 3 種面向 Minecraft 的傳輸：

- `McHttp`：
  最適合 Bedrock 專用伺服器和最穩定的 Bedrock 自動化。
- `McWss`：
  最適合本地世界、測試和命令隧道場景。
- `McTcp`：
  最適合 Java 端橋，例如 `GeyserVoice`。

請參閱 [Transport Modes](/server/transports) 以了解完整比較。

確保所選傳輸已啟用並綁定到 Minecraft 端運行時可以到達的位址。

## 5.下載客戶端

從 [download page](/download) 中，下載適合您的玩家的軟體包：

- Windows：`VoiceCraft.Client.Windows.<arch>.zip`
- Linux：`VoiceCraft.Client.Linux.<arch>.zip`
- macOS：`VoiceCraft.Client.MacOS.<arch>.dmg` 或 `.pkg`
- Android：`VoiceCraft.Client.Android.arm64.zip`（APK 內）
- iOS：`VoiceCraft.Client.iOS.arm64.ipa`

## 6.在客戶端新增伺服器

1. 打開客戶端。
2. 選擇麥克風和播放設備。
3. 在 UI 中新增伺服器條目。
4. 使用 `VoiceCraftConfig.Port` 中的 VoiceCraft UDP 端點。
5. 確認客戶端 `Positioning Type` 與 `VoiceCraftConfig.PositioningType` 相符。

典型的本地設定：

- 主持人：`127.0.0.1`
- 連接埠：`9050`

## 7.連接Minecraft端

- 對於Bedrock 專用伺服器，請使用 [McHttp for BDS](/minecraft/mchttp-bds)。
- 對於本地 Bedrock 世界，請使用 [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer)。
- 對於 Java + Geyser/Floodgate，請使用 [GeyserVoice](/ecosystem/geyservoice)。

此步驟為 VoiceCraft 提供了接近音訊所需的遊戲內狀態：玩家身分、綁定資料、世界 ID、位置更新和效果狀態。

如果您要在 Bedrock上部署，請將這兩個頁面放在附近：

- [Download Page](/download) 用於原始客戶端/伺服器/插件發布文件
- [Addon Configurator](/addon-configurator) 用於準備解壓縮世界檔案

## 8. 驗證堆疊

如果一切配置正確：

- VoiceCraft 伺服器啟動時沒有設定或連接埠錯誤
- 客戶端連線無傳輸錯誤
- Minecraft 整合使用預期令牌進行身份驗證
- 實體建立和綁定流程工作
- 玩家在範圍內時會聽到 proximity voice

如果用戶端已連接但鄰近不起作用，請在更改音訊設定之前調試 Minecraft 傳輸和綁定流程。

## 推薦下一篇閱讀

- [Server Installation](/server/installation)
- [First Server Run](/server/first-run)
- [ServerProperties.json](/server/server-properties)
- [Runtime Overrides](/server/runtime-overrides)
- [Transport Modes](/server/transports)
- [Download Page](/download)
- [Addon Configurator](/addon-configurator)
