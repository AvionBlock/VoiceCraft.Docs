# 更新與備份

本頁用於拓撲基本不變的常規更新。若涉及協定、拓撲或橋接外掛的大改，請使用[升級執行手冊](/operations/upgrade-runbook)。

VoiceCraft `1.7.0` 不是單純補丁。伺服器、用戶端、Bedrock addon 和 Java bridge 應一起升級到 `1.7.x`。

## 1.7.0 變更

- 重寫 audio effect pipeline，每個 entity 使用獨立 processor
- 使用 custom entity properties 覆蓋效果參數
- event flow 改為 `EventRequest`
- `SetProperty` / `OnEntityPropertyUpdated` 取代舊 cave/muffle factor 路徑
- 透過 `OpenPort.Net` 支援 NAT port mapping
- iOS sample-rate 修復和 Apple privacy manifest
- 依賴更新、Android version `17`、release pipeline
- 移除 browser/web client

用戶端和伺服器應保持相同 `Major.Minor`。`1.7.x` 用戶端應連接 `1.7.x` 伺服器。

## 更新前備份

- `config/ServerProperties.json`
- 自訂啟動腳本、systemd、容器或面板設定
- 需要保留的日誌
- VoiceCraft.Java 或其他 Java bridge 設定
- Bedrock world pack 設定
- host、port、firewall、port forwarding 記錄

## 安全更新伺服器

1. 停止 `VoiceCraft.Server`。
2. 備份整個 `config/`。
3. 將 `1.7.0` 解壓縮到新目錄。
4. 複製 `ServerProperties.json`。
5. 檢查新的 NAT port mapping 欄位。
6. 啟動伺服器並檢查日誌。
7. 驗證所有啟用的 transport。
8. 先連接一個用戶端和一個 Minecraft integration。

## 設定遷移

`1.7.0` 新增：

- `AutoOpenPort`
- `ExternalPort`
- `PortMappingLifetimeMinutes`
- `PortMappingTimeoutSeconds`

`AutoOpenPort` 預設是 `false`。如果連接埠由 firewall、reverse proxy、tunnel、Docker、面板或服務商管理，請保持關閉。

## Addon 與 bridge

與伺服器一起更新匹配的 addon/bridge 套件。使用舊 cave/muffle packets 的自訂程式碼應遷移到 `SetProperty` 和 `OnEntityPropertyUpdated`。

## 用戶端

檢查：

- 麥克風和輸出裝置
- 已儲存的伺服器
- push-to-talk
- `Positioning Type`
- iOS 錄音，尤其是舊版本有 sample-rate 問題時

`1.7.0` 已移除 browser/web client。請使用原生桌面或行動用戶端。
