# 客戶端安裝

`VoiceCraft.Client` 是玩家使用的應用程式。每個想要說話或聽到距離感語音的玩家都需要在自己的裝置上執行它。

在 `VoiceCraft.Server` 可達後安裝客戶端。首次啟動期間，您將新增一個指向 VoiceCraft UDP 端點（通常為 `host:9050`）的伺服器項目。

## 開始之前

您需要：

- 玩家應該使用的伺服器位址
- 來自 `VoiceCraftConfig.Port` 的伺服器 UDP 端口
- 作業系統可用的麥克風和播放設備
- 客戶端和伺服器之間匹配 `Positioning Type`

對於本地測試，端點通常是：

```text
127.0.0.1:9050
```

對於遠端伺服器，請使用執行 `VoiceCraft.Server` 的電腦的公用或 LAN 位址。

## Windows

1. 下載`VoiceCraft.Client.Windows.<Architecture>.v1.7.0.zip`。
2. 提取存檔。
3. 執行 `VoiceCraft.Client.Windows.exe`。
4. 如果出現 Windows SmartScreen，請驗證該檔案是否來自官方發布頁面，然後再繼續。

## Linux

1. 下載`VoiceCraft.Client.Linux.<Architecture>.v1.7.0.zip`。
2. 提取存檔。
3. 授予權限並運行：

```bash
chmod +x ./VoiceCraft.Client.Linux
./VoiceCraft.Client.Linux
```

如果應用程式看不到音訊設備，請檢查 PulseAudio/PipeWire 權限以及應用程式是否在受限沙箱內運作。

## macOS

選擇適合裝置的 ZIP 套件：

- `VoiceCraft.Client.MacOS.arm64.v1.7.0.zip` 適用於 Apple Silicon
- `VoiceCraft.Client.MacOS.x64.v1.7.0.zip` 適用於 Intel

1. 解壓縮封存檔。
2. 啟動 `VoiceCraft.app`。

如果 macOS 阻止啟動：

```bash
xattr -dr com.apple.quarantine /Applications/VoiceCraft.app
```

僅刪除您有意下載和信任的版本的隔離。

## 安卓

1. 下載`VoiceCraft.Client.Android.<Architecture>.v1.7.0.zip`。
2. 提取存檔。
3. 從檔案開啟 `.apk` 並安裝。
4. 當 Android 詢問時允許麥克風權限。

## iOS（AltStore/側載）

1. 下載`VoiceCraft.Client.iOS.arm64.v1.7.0.zip`。
2. 透過 AltStore 或其他旁加載工具安裝 IPA。
3. 如果需要，請在 iOS 設定中允許該設定檔。
4. 首次啟動時允許麥克風權限。

## 關於 .NET 運行時的注意事項

對於較舊的版本（`v1.4.0` 之前的版本），可能需要安裝 .NET 9 執行階段。
對於當前的獨立構建，通常不需要。

## 首次啟動清單

1. 打開客戶端。
2. 選擇輸入和輸出設備。
3. 使用麥克風測試來確認輸入電平。
4. 新增伺服器條目：
   - 主機：VoiceCraft 伺服器位址
   - 連接埠：`VoiceCraftConfig.Port`
5. 確認 `Positioning Type` 與伺服器相符。
6. 在開始 Minecraft 綁定流程之前進行連線。

客戶端連線成功僅證明語音端點可達。Minecraft 的距離感行為仍然取決於附加包或外掛程式是否連接到相符的傳輸。

## 常見的首次啟動問題

- 無麥克風輸入：
  檢查作業系統麥克風權限和選定的輸入裝置。
- 客戶端已連線但沒有距離感效果：
  檢查 Minecraft 傳輸、綁定流程和 `Positioning Type`。
- 遠端伺服器無法連線：
  確認玩家和 `VoiceCraft.Server` 之間的 UDP 連接埠已開啟。
- 玩家聽到每個人的聲音距離錯誤：
  檢查實體位置更新和世界 ID。

## 截圖

![General Settings](/images/voicecraft/settings-general.png)
![Voice Settings](/images/voicecraft/settings-voice.png)
