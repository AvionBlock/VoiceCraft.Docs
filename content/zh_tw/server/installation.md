# 伺服器安裝

`VoiceCraft.Server` 是獨立後端，接受客戶端語音流量並公開針對 Minecraft 的傳輸。

使用此頁面作為伺服器設定路徑。最後，您應該擁有一個正在運行的伺服器、一個產生的配置、一個選擇的 Minecraft 傳輸，以及一個用於 Minecraft 整合的清晰的下一頁。

## 伺服器實際包含什麼

VoiceCraft 伺服器同時公開多個層：

- VoiceCraft UDP 語音伺服器
- `McHttp` 用於基岩整合的傳輸
- `McWss` 用於 websocket / 指令隧道基岩流的傳輸
- `McTcp` 用於 Java 端橋的傳輸，例如 `GeyserVoice`

您可以將它們全部啟用，或在運行時選擇傳輸。

## 設定流程

1. 下載並解壓縮適合您平台的伺服器。
2. 從要保留配置的資料夾運行一次。
3. 產生 `config/ServerProperties.json` 後停止該程序。
4. 取代生成的登入令牌。
5. 啟用與您的拓撲相符的 Minecraft 傳輸。
6. 設定主機綁定和防火牆規則。
7. 再次啟動伺服器。
8. 在客戶端中加入 VoiceCraft UDP 端點。
9. 將 Minecraft 端與相符的插件或插件指南連接起來。

## 預先建置的二進位版本

發布頁面通常包括：

- Windows：
  `VoiceCraft.Server.Windows.x64.zip`、`x86`、`arm64`
- Linux：
  `VoiceCraft.Server.Linux.x64.zip`、`arm`、`arm64`

下載：[Download Page](/download)

## Windows

1. 下載`VoiceCraft.Server.Windows.<arch>.zip`。
2. 將存檔解壓縮到專用資料夾。
3. 從該資料夾啟動伺服器：

```powershell
./VoiceCraft.Server.exe
```

第一次執行建立 `config/ServerProperties.json`。將此檔案保留在伺服器資料夾中，並且不要在重新啟動之間刪除它。

## Linux

1. 下載`VoiceCraft.Server.Linux.<arch>.zip`。
2. 將存檔解壓縮到專用資料夾。
3. 從該資料夾啟動伺服器：

```bash
chmod +x ./VoiceCraft.Server
./VoiceCraft.Server
```

第一次執行建立 `config/ServerProperties.json`。將此檔案保留在伺服器資料夾中，並確保它包含在備份中。

## 第一次啟動後

在連接 Minecraft 或玩家之前，請停止伺服器並開啟 `config/ServerProperties.json`。

首先進行這些編輯：

1. 替換每個產生的共享令牌：
   - `McHttpConfig.LoginToken`
   - `McWssConfig.LoginToken`
   - `McTcpConfig.LoginToken`
2. 選擇一種主要的 Minecraft 交通工具：
   - 基岩專用伺服器：啟用 `McHttpConfig`
   - 本地基岩世界：啟用 `McWssConfig`
   - Java + Geyser/Floodgate：啟用 `McTcpConfig`
3. 設定傳輸主機：
   - 當 Minecraft 在同一台電腦上運作時使用 `127.0.0.1`
   - 僅當另一台電腦必須連接時才使用 `0.0.0.0` 或 LAN/公共位址
4. 保持 `VoiceCraftConfig.Port` 對玩家用戶端可用。
5. 儲存配置後重新啟動 `VoiceCraft.Server`。

對於所有設定字段，請繼續使用 [First Server Run](/server/first-run) 和 [ServerProperties.json](/server/server-properties)。

## 連接堆疊的其餘部分

一旦伺服器乾淨地重新啟動：

1. 從 [Download Page](/download) 為每位玩家安裝 VoiceCraft 用戶端。
2. 在客戶端新增伺服器條目：
   - 主機：您的 VoiceCraft 伺服器位址
   - 連接埠：`VoiceCraftConfig.Port`，通常為 `9050`
3. 按照您選擇的交通工具的 Minecraft 指南進行操作：
   - [McHttp for BDS](/minecraft/mchttp-bds)
   - [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer)
   - [GeyserVoice](/ecosystem/geyservoice)

在用戶端連線並且 Minecraft 端使用相同的傳輸令牌進行身份驗證之前，伺服器不會被視為已完全設定。

## macOS

可能並不總是有預先建立的專用工件，但可以從原始碼建立伺服器：

```bash
git clone https://github.com/AvionBlock/VoiceCraft.git
cd VoiceCraft/VoiceCraft.Server
dotnet restore
dotnet publish -c Release -r osx-arm64 -p:PublishSingleFile=true
```

對於 Intel macOS，請將 `osx-arm64` 替換為 `osx-x64`。

## 碼頭工人/容器

容器鏡像是從主儲存庫自述文件中引用的：

- [VoiceCraft Docker Hub](https://hub.docker.com/r/sinevector241/voicecraft/tags)

容器部署在以下情況下很有用：

- 您需要專用的服務邊界
- 您已經在容器中執行 BDS / Java 節點
- 您想要更輕鬆的重啟策略和日誌

容器啟動後，以與正常二進位安裝相同的方式保留並編輯產生的 `config/ServerProperties.json` 。

## 推薦的安裝佈局

Linux 佈局範例：

```text
/opt/voicecraft/
  VoiceCraft.Server
  config/
    ServerProperties.json
```

推薦做法：

- 將 VoiceCraft 保存在自己的目錄中
- 堅持`config/`
- 備份`ServerProperties.json`
- 不要在同一資料夾中混合多個環境

## 準備清單

在向玩家開放設定之前，請確認：

- `VoiceCraft.Server` 啟動時沒有設定或連接埠錯誤
- 所有產生的 `LoginToken` 值已替換
- 僅暴露您需要的運輸
- 用戶端主機和連接埠匹配 `VoiceCraftConfig.Port`
- Minecraft 外掛程式或外掛程式使用相符的傳輸令牌
- 綁定流程在遊戲中有效

## 作為 systemd 服務運行 (Linux)

範例 `/etc/systemd/system/voicecraft.service`：

```ini
[Unit]
Description=VoiceCraft Server
After=network.target

[Service]
WorkingDirectory=/opt/voicecraft
ExecStart=/opt/voicecraft/VoiceCraft.Server
Restart=always
RestartSec=3
User=voicecraft
Group=voicecraft

[Install]
WantedBy=multi-user.target
```

應用它：

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now voicecraft
sudo systemctl status voicecraft
```

## 從原始碼構建

有關 SDK 和項目詳細信息，請參閱 [VoiceCraft repository and build](/ecosystem/voicecraft-repository)。

最小流量：

```bash
git clone https://github.com/AvionBlock/VoiceCraft.git
cd VoiceCraft
dotnet restore
dotnet build -c Release
dotnet run --project VoiceCraft.Server
```

## 接下來讀什麼

- [First Server Run](/server/first-run)
- [ServerProperties.json](/server/server-properties)
- [Transport Modes](/server/transports)
- [Client Installation](/client/installation)
- [McHttp for BDS](/minecraft/mchttp-bds)
- [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer)
- [GeyserVoice](/ecosystem/geyservoice)
