# 更新與備份

## 更新前要備份什麼

- `config/ServerProperties.json`
- 自訂腳本/systemd 或服務管理員包裝器
- 如果需要的話記錄歷史記錄

## 安全伺服器更新

1. Stop the server (`stop` or via service manager).
2. Back up `config/`.
3. 將新版本提取到單獨的目錄中。
4. Move your `ServerProperties.json`.
5. 啟動並驗證啟動日誌。

## VoiceCraft 1.6.1 注意事項

VoiceCraft `v1.6.1` requires updating the Bedrock addon packages at the same time as the client/server binaries. The release fixes McHttp/McWss disconnect handling and ships addon-side changes for in-game voice icons, auto connection quality-of-life, and broadcasted events.

## 安全客戶端更新

Client settings (`Settings.json`) are stored in `ApplicationData/voicecraft`, so they usually survive binary updates.

## 相容性

- Client and server `Major/Minor` versions should match.
- 補丁版本可能有所不同。

如果更新後出現問題，請從[故障排除](/operations/troubleshooting)開始。
