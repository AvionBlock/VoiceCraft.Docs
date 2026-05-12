# 伺服器安裝

`VoiceCraft.Server` is the standalone backend that accepts client voice traffic and exposes Minecraft-facing transports.

## 伺服器實際包含什麼

VoiceCraft 伺服器同時公開多個層：

- VoiceCraft UDP語音伺服器
- `McHttp` transport for Bedrock integrations
- `McWss` transport for websocket / command-tunnel Bedrock flows
- `McTcp` transport for Java-side bridges such as `GeyserVoice`

您可以將它們全部啟用，或在運行時選擇傳輸。

## 預先建置的二進位版本

發布頁面通常包括：

- 窗：
  `VoiceCraft.Server.Windows.x64.zip`, `x86`, `arm64`
- Linux：
  `VoiceCraft.Server.Linux.x64.zip`, `arm`, `arm64`

下載：[下載頁面](/download)

## 視窗

1. Download `VoiceCraft.Server.Windows.<arch>.zip`.
2. 將存檔解壓縮到專用資料夾。
3. 開始：

```powershell
./VoiceCraft.Server.exe
```

## Linux

1. Download `VoiceCraft.Server.Linux.<arch>.zip`.
2. 解壓縮存檔。
3. 開始：

```bash
chmod +x ./VoiceCraft.Server
./VoiceCraft.Server
```

## macOS

可能並不總是有預先建立的專用工件，但可以從原始碼建立伺服器：

```bash
git clone https://github.com/AvionBlock/VoiceCraft.git
cd VoiceCraft/VoiceCraft.Server
dotnet restore
dotnet publish -c Release -r osx-arm64 -p:PublishSingleFile=true
```

For Intel macOS, replace `osx-arm64` with `osx-x64`.

## Docker/容器

容器鏡像是從主倉庫自述文件中引用的：

- [VoiceCraft Docker 中心](https://hub.docker.com/r/sinevector241/voicecraft/tags)

容器部署在以下情況下很有用：

- 您想要一個專門的服務邊界
- 您已經在容器中執行 BDS / Java 節點
- 您想要更輕鬆的重啟策略和日誌

## 建議的安裝佈局

Linux 佈局範例：

```text
/opt/voicecraft/
  VoiceCraft.Server
  config/
    ServerProperties.json
```

推薦做法：

- 將 VoiceCraft 保存在自己的目錄中
- persist `config/`
- back up `ServerProperties.json`
- 不要在同一資料夾中混合多個環境

## 作為 systemd 服務運行 (Linux)

Example `/etc/systemd/system/voicecraft.service`:

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

請參閱 [VoiceCraft 倉庫和建置](/ecosystem/voicecraft-repository) 以了解 SDK 和專案詳細資訊。

最小流量：

```bash
git clone https://github.com/AvionBlock/VoiceCraft.git
cd VoiceCraft
dotnet restore
dotnet build -c Release
dotnet run --project VoiceCraft.Server
```

## 接下來要讀什麼

- [首次伺服器運行](/server/first-run)
- [ServerProperties.json](/server/server-properties)
- [運轉時覆蓋](/server/runtime-overrides)
- [傳輸模式](/server/transports)
