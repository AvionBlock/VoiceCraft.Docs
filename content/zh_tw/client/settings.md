# 客戶端設定（使用者介面）

所有客戶端 UI 變更都會自動儲存到 `Settings.json`。

有關原始架構、範例和進階字段，請參閱 [Settings.json](/client/settings-json)。

使用 UI 進行正常配置。只有當您需要批次變更、自動化或從損壞的 UI 狀態復原時才編輯 `Settings.json`。

## 建議的設定順序

1. 選擇輸入和輸出設備。
2. 執行麥克風測試並調整靈敏度。
3. 新增 VoiceCraft 伺服器條目。
4. 確認 `Positioning Type` 與伺服器相符。
5. 如果社區需要，請設定一鍵通。
6. 加入 Minecraft 並完成綁定流程。

## 一般

- `Language`：
  客戶端使用的 UI 語言/區域設定。
- `Notification Dismiss`：
  自動隱藏本地通知的延遲（以毫秒為單位）。
- `Hide Server Addresses`：
  隱藏 UI 中儲存的 IP/主機條目。
- `Disable Notifications`：
  禁用本地 toast 通知。

使用 `Hide Server Addresses` 進行螢幕截圖或公共串流。它不會加密磁碟上保存的伺服器清單。

## 外觀

- `Theme`：
  選定的視覺主題。
- `Background Image`：
  選擇內建背景圖像。

## 輸入

- `Input Devices`：
  捕獲設備/麥克風源。
- `Input Capture Preset`：
  平台後端使用的擷取設定文件，預設為 `VoiceCommunication`。
- `Input Volume`：
  麥克風增益範圍為 `0..2`。
- `Microphone Sensitivity`：
  語音活動閾值範圍為 `0..1`。
- `Denoisers`：
  可用的降噪器實作。
- `Automatic Gain Controllers`：
  AGC 實施。
- `Echo Cancelers`：
  迴聲消除的實現。
- `Push To Talk`：
  僅在按住配置的熱鍵時傳輸。
- `Push To Talk Cue`：
  PTT 接合/脫離時的本地聲音提示。
- `Microphone Test`：
  本地監控和活動視覺化。

好的起點：

- 將 `Input Volume` 保持在 `1` 附近
- 僅在未偵測到安靜語音時提高靈敏度
- 在吵雜的房間中啟用一鍵通
- 在更改伺服器端設定之前使用麥克風測試

如果其他玩家聽到持續的背景噪音，請降低輸入音量、增加啟動閾值、啟用一鍵通或更改選定的麥克風裝置。

## 輸出

- `Output Devices`：
  播放設備。
- `Output Volume`：
  播放增益範圍為 `0..2`。
- `Audio Clippers`：
  輸出限幅器/限制器實作。
- `Test Output`：
  向所選設備發送本地測試訊號。

如果您可以聽到測試輸出但聽不到其他玩家的聲音，則播放裝置可能沒問題。接下來檢查伺服器連線、綁定流程和位置更新。

## 網路

- `Positioning Type`：
  必須與伺服器上的 `VoiceCraftConfig.PositioningType` 相符。
- `McWss Listen Ip`：
  McWss側網橋使用的本地位址。
- `McWss Host Port`：
  用於 Bedrock Websocket 連結的本地 McWss 端口。

`Positioning Type` 是最重要的客戶端/伺服器相容性設定。在正常的 BDS 和 VoiceCraft.Java 部署中，使用 `ServerProperties.json` 中配置的相同伺服器端模式。

`McWss Listen Ip` 和 `McWss Host Port` 僅適用於 McWss 風格的本地 Bedrock 設置。它們不會取代用於語音 UDP 流量的 VoiceCraft 伺服器條目。

## 熱鍵

預設情況下，VoiceCraft 公開以下綁定：

- `Mute`
- `Deafen`

預設桌面綁定通常是：

- `Mute`：`LeftControl + LeftShift + M`
- `Deafen`：`LeftControl + LeftShift + D`

準確的熱鍵值儲存在 `HotKeySettings.Bindings` 中。

如果熱鍵未觸發，請檢查作業系統層級的衝突以及用戶端Windows或桌面環境是否允許全域熱鍵擷取。

## 每用戶控制

VoiceCraft 也會儲存每個使用者的本機偏好設定：

- 每用戶數量乘數
- 每用戶本地靜音狀態

它們儲存在 `UserSettings.Users` 中並在客戶端套用。

當只有一名玩家聲音太大或分散您的注意力時，請使用每個用戶本地靜音或音量。當工作人員需要強制每個人進行審核時，請使用伺服器靜音/震耳欲聾的命令。

## 進階

- `Trigger GC`：
  手動垃圾收集觸發器。
- `Crash`：
  用於診斷/日誌驗證的故意崩潰路徑。

高級控制用於診斷。正常播放期間請勿使用 `Crash` ，除非您有意驗證崩潰報告或日誌收集。

## 當感覺音頻有問題時要檢查什麼

1. 客戶端輸入和輸出設備。
2. 一鍵通狀態。
3. VoiceCraft 伺服器連線。
4. `Positioning Type`。
5. Minecraft 綁定流程。
6. 玩家距離和世界 ID 更新。

![Network Settings](/images/voicecraft/settings-network.png)
