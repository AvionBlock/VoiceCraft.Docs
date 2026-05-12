# 快速開始

本指南是獲得可用的 VoiceCraft 堆疊的最快方法。

## 首先選擇您的拓撲

VoiceCraft 可透過多種方式部署：

- Bedrock Dedicated Server: `VoiceCraft.Server` + `VoiceCraft.Addon.Core.McHttp`
- Local Bedrock world / singleplayer: `VoiceCraft.Server` or local runtime + `Core.McWss`
- Java server with Geyser/Floodgate: `GeyserVoice` + `VoiceCraft.Server`
- Direct Paper server: `GeyserVoice` can also download and run the VoiceCraft runtime under the hood

如果您不確定，請從以下之一開始：

- 基岩專用伺服器：讀取[McHttp for BDS](/minecraft/mchttp-bds)
- Java + Geyser 伺服器：讀取 [GeyserVoice](/ecosystem/geyservoice)

## 1.下載伺服器

1. 開啟[下載頁面](/download)。
2. 下載適合您平台的伺服器存檔：
   - `VoiceCraft.Server.Windows.x64.zip`
   - `VoiceCraft.Server.Windows.x86.zip`
   - `VoiceCraft.Server.Windows.arm64.zip`
   - `VoiceCraft.Server.Linux.x64.zip`
   - `VoiceCraft.Server.Linux.arm.zip`
   - `VoiceCraft.Server.Linux.arm64.zip`

如果您從原始程式碼構建，請參閱 [VoiceCraft 倉庫和建置](/ecosystem/voicecraft-repository)。

## 2. 運行伺服器一次

### 視窗

```powershell
./VoiceCraft.Server.exe
```

### Linux

```bash
chmod +x ./VoiceCraft.Server
./VoiceCraft.Server
```

After first launch, VoiceCraft generates `config/ServerProperties.json`.

## 3. 保護產生的配置

在連接 Minecraft 或玩家之前，更改每個產生的共享令牌：

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

您通常希望每個環境都有不同的值。

## 4. 選擇 Minecraft 交通工具

VoiceCraft 目前有 3 種面向 Minecraft 的傳輸：

- `McHttp`:
  最適合 Bedrock 專用伺服器和最穩定的 Bedrock 自動化。
- `McWss`:
  最適合本地世界、測試和命令隧道場景。
- `McTcp`:
  Best for Java-side bridges such as `GeyserVoice`.

有關完整比較，請參閱[傳輸模式](/server/transports)。

## 5.下載客戶端

從[下載頁面](/download)，下載適合您的玩家的軟體包：

- Windows: `VoiceCraft.Client.Windows.<arch>.zip`
- Linux: `VoiceCraft.Client.Linux.<arch>.zip`
- macOS: `VoiceCraft.Client.MacOS.<arch>.dmg` or `.pkg`
- Android: `VoiceCraft.Client.Android.arm64.zip` (APK inside)
- iOS: `VoiceCraft.Client.iOS.arm64.ipa`

## 6.在客戶端新增伺服器

1. 打開客戶端。
2. 在 UI 中新增伺服器條目。
3. Use the VoiceCraft UDP endpoint from `VoiceCraftConfig.Port`.

典型的本地設定：

- host: `127.0.0.1`
- port: `9050`

## 7. 連接 Minecraft 端

- 對於基岩專用伺服器，請使用 [McHttp for BDS](/minecraft/mchttp-bds)。
- 對於本地基岩世界，請使用 [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer)。
- 對於 Java + Geyser/Floodgate，請使用 [GeyserVoice](/ecosystem/geyservoice)。

如果您要在基岩上部署，請將這兩個頁面放在附近：

- [下載頁面](/download) 用於原始客戶端/伺服器/外掛程式發布文件
- [插件配置器](/addon-configurator) 用於準備解壓縮世界存檔

## 8. 驗證堆疊

如果一切配置正確：

- VoiceCraft 伺服器啟動時沒有配置或連接埠錯誤
- 客戶端連線時沒有傳輸錯誤
- Minecraft 整合使用預期令牌進行身份驗證
- 實體建立和綁定流程工作
- 玩家在範圍內時會聽到接近聲音

## 推薦下一篇閱讀

- [伺服器安裝](/server/installation)
- [首次伺服器運行](/server/first-run)
- [ServerProperties.json](/server/server-properties)
- [運轉時覆蓋](/server/runtime-overrides)
- [傳輸模式](/server/transports)
- [下載頁面](/download)
- [插件配置器](/addon-configurator)
