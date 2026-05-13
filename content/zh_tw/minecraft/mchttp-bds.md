# 用於Bedrock 專用伺服器的 McHttp

`McHttp` 是推薦的 BDS VoiceCraft 整合模式。

當您執行Bedrock 專用伺服器並希望伺服器端插件將玩家狀態傳送至 `VoiceCraft.Server` 時，請使用本指南。

目標形狀：

```text
VoiceCraft.Client -> VoiceCraft UDP endpoint
BDS + VoiceCraft.Addon.Core.McHttp -> VoiceCraft McHttp endpoint
```

## 為什麼推薦`McHttp`

- 更適合專用伺服器環境
- 比基於指令隧道的設定更簡單
- 在生產上更容易推理
- 與 Bedrock 插件包 `VoiceCraft.Addon.Core.McHttp` 很好地配合
- 不依賴 `McWss` 使用的本機 `/connect` websocket 工作流程

## 要求

1. 運行 `VoiceCraft.Server`
2. `McHttpConfig.Enabled = true`
3. 版本中的 `VoiceCraft.Addon.Core.McHttp.zip`，或 [Addon Configurator](/addon-configurator) 中的現成檔案
4. BDS 具有所需的模組和腳本 API 支持
5. 從 BDS 計算機到 VoiceCraft `McHttpConfig.Hostname` 的網路可及性
6. 由玩家安裝的 VoiceCraft 用戶端

## 伺服器端 VoiceCraft 配置

最小的例子：

```json
{
  "McHttpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-token",
    "Hostname": "http://0.0.0.0:9050/",
    "MaxClients": 10,
    "MaxTimeoutMs": 10000,
    "DisabledPacketTypes": []
  }
}
```

重要：

- 使用真實的代幣，切勿將生成的代幣保留在生產環境中
- 確保 BDS 主機可以到達設定的端點
- 僅當 BDS 和 VoiceCraft 在同一主機上運作時才使用 `http://127.0.0.1:9050/`
- 當 BDS 從另一台電腦連接時，使用 LAN/公用位址或 `0.0.0.0` 綁定

## 插件安裝

最快路徑：

- [Addon Configurator](/addon-configurator) 如果您想要一個可立即解壓縮的世界存檔
- [Download Page](/download) 如果您想要原始插件發布包

手動路徑：

1. 提取 `VoiceCraft.Addon.Core.McHttp.zip`。
2. 將 `RP` 放入 `<MCServer>/resource_packs/` 中。
3. 將 `BP` 放入 `<MCServer>/behavior_packs/` 中。
4. 將兩個包附加到目標世界。
5. 更改包或權限後重新啟動 BDS。

資源包提供用戶端可見的資源，例如圖示。該行為包執行將 BDS 連接到 VoiceCraft 的腳本和命令。

## 模組權限

打開 `<MCServer>/config/default/permissions.json` 並確保它包含所需的模組：

```json
{
  "allowed_modules": [
    "@minecraft/server-gametest",
    "@minecraft/server",
    "@minecraft/server-ui",
    "@minecraft/server-admin",
    "@minecraft/server-editor",
    "@minecraft/server-net"
  ]
}
```

該外掛程式需要網路相關的腳本權限，因為它從 BDS 運行時會呼叫 VoiceCraft HTTP 端點。

## 將包附加到世界

在 `<MCServer>/worlds/<YourWorld>/world_behavior_packs.json` 中：

```json
{
  "pack_id": "71ebb3ba-e9db-4546-9520-05f20b17dcb6",
  "version": [1, 6, 0]
}
```

在 `world_resource_packs.json` 中：

```json
{
  "pack_id": "30b512be-77d1-4a61-bdb7-6c2f4062f889",
  "version": [1, 0, 0]
}
```

## 在遊戲中連接

運行：

```text
/voicecraft:vcconnect "http://<VOICECRAFT_HOST>:<PORT>" <LOGIN_TOKEN>
```

範例：

```text
/voicecraft:vcconnect "http://127.0.0.1:9050" e4ad1f7e-4f90-4b21-bc15-6febe580bf1c
```

使用 `McHttpConfig.LoginToken` 中的令牌。

如果 BDS 與 VoiceCraft 在不同的主機上執行，請將 `127.0.0.1` 替換為從 BDS 電腦看到的 VoiceCraft 伺服器的位址。

## 連接後會發生什麼

連線成功後：

- 該插件透過 VoiceCraft 進行身份驗證
- 世界可以透過McApi創建/更新實體
- 綁定流程透過 `voicecraft:vcbind` 變得可用
- 效果 UI 和資料包驅動的狀態同步變得可用

在此階段，傳輸已連接，但每個玩家仍然需要 VoiceCraft 用戶端和用於鄰近音訊的工作綁定串流。

## 推薦的驗證流程

1. 啟動 `VoiceCraft.Server` 並確認 `McHttpConfig.Enabled = true`。
2. 啟動附加插件的 BDS。
3. 透過 `vcconnect` 連結世界。
4. 確認沒有顯示身份驗證錯誤。
5. 將 VoiceCraft 用戶端連接到 `VoiceCraftConfig.Port`。
6. 使用 `voicecraft:vcbind <key>`。
7. 在遊戲中移動玩家並確認位置更新會影響接近度。
8. 確認其他玩家可以在預期範圍內聽到聲音。

## 常見問題

- Windows 上的 `HttpListenerException`：
  您可能需要 `netsh http add iplisten 127.0.0.1`
- 容器或虛擬機器網路：
  使用 `http://0.0.0.0:9050/` 或正確的 LAN 位址
- 託管提供者封鎖來自 BDS 的出站 HTTP：
  該交通工具可能無法在那裡使用
- 身份驗證失敗：
  確認指令使用 `McHttpConfig.LoginToken`，而非 `McWss` 或 `McTcp` 標記
- 插件加載但缺少命令：
  確認行為和資源包均已附加到世界並且 BDS 已重新啟動
- 客戶端已連線但沒有接近：
  確認綁定流程、`PositioningType` 和玩家位置更新

## 閱讀下一篇

- [VoiceCraft.Addon](/ecosystem/voicecraft-addon)
- [Addon API](/ecosystem/addon-api)
- [Download Page](/download)
- [Addon Configurator](/addon-configurator)
