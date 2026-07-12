# 更新和備份

使用此頁面進行例行更新，您希望拓撲保持不變。對於較大的版本跳轉或拓樸更改，請使用 [Upgrade Runbook](/operations/upgrade-runbook)。

## 更新前要備份什麼

- `config/ServerProperties.json`
- 自訂腳本/systemd 或服務管理員包裝器
- 如果需要的話記錄歷史記錄
- VoiceCraft.Java `config.yml` 如果使用 Java 端集成
- 如果使用插件，則Bedrock 世界包配置
- 公共/LAN 主機名稱和開放連接埠的註釋

備份包含令牌和拓撲詳細資訊。將它們儲存為敏感操作文件。

## 安全伺服器更新

1. 停止伺服器（`stop` 或透過服務管理員）。
2. 備份 `config/`。
3. 將新版本提取到單獨的目錄中。
4. 移動您的 `ServerProperties.json`。
5. 啟動並驗證啟動日誌。
6. 確認所選傳輸綁定成功。
7. 在向所有玩家開放之前，先連接一個客戶端和一個 Minecraft 端整合。

## VoiceCraft 1.6.1 註釋

VoiceCraft `v1.6.1` 需要在更新客戶端/伺服器二進位檔案的同時更新 Bedrock 插件包。此版本修復了 McHttp/McWss 斷開連接處理，並針對遊戲內語音圖標、自動連接生活品質和廣播事件進行了插件端更改。

## 安全客戶端更新

客戶端設定 (`Settings.json`) 儲存在 `ApplicationData/voicecraft` 中，因此它們通常在二進位更新後仍然存在。

還是請小測試組驗證一下：

- 麥克風選擇
- 輸出裝置
- 保存的伺服器條目
- 即按即說行為
- `Positioning Type`

## 相容性

- 用戶端和伺服器 `Major/Minor` 版本應符合。
- 補丁版本可能有所不同。
- 當發行說明提到插件端行為時，Bedrock插件包應與伺服器/客戶端版本相符。
- 使用 Java 端橋時，應使用其符合的配置期望來更新 VoiceCraft.Java。

如果更新後出現問題，請從 [Troubleshooting](/operations/troubleshooting) 開始。

## 復原準備

替換文件之前，請保留：

- 上一個伺服器二進位目錄
- 以前的插件/插件包
- 以前的配置備份
- 最後已知的正確令牌和連接埠註釋

當舊目錄仍然存在並且更新沒有覆蓋它時，回滾會容易得多。
