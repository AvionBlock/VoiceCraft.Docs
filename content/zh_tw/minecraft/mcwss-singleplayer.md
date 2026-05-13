# 單人世界的 McWss

`McWss` 是 websocket / 指令隧道傳輸，主要用於本地世界和輕量級基岩設定。

當您未執行完整的 Bedrock 專用伺服器並且需要本地 Bedrock 世界透過 `/connect` websocket 串流與 VoiceCraft 對話時，請使用本指南。

目標形狀：

```text
VoiceCraft.Client -> VoiceCraft UDP endpoint
Local Bedrock world + VoiceCraft.Addon.Core.McWss -> McWss websocket endpoint
```

## 何時使用它

在下列情況下使用 `McWss`：

- 你在當地的基岩世界中玩
- 你想要快速的單人遊戲設置
- 您正在沒有專用 BDS 主機的情況下測試插件邏輯

如果您執行真正的基岩專用伺服器，請改用 [McHttp for BDS](/minecraft/mchttp-bds)。

## 重要限制

- 通常不如 `McHttp` 穩定
- 命令吞吐量和有效負載大小非常重要
- 不是大型公共生產環境的預設建議
- 取決於您的環境中可用的 Bedrock websocket 和命令行為

## 要求

1. `VoiceCraft.Server` 與 `McWssConfig.Enabled = true`
2. `VoiceCraft.Addon.Core.McWss.zip`
3. 支援所需的 websocket/腳本功能的基岩構建
4. VoiceCraft 用戶端已安裝並配置
5. 匹配 `McWssConfig.LoginToken` 用於插件驗證

有用的連結：

- [Download Page](/download) 用於原始 `Core.McWss` 發行包
- [Addon Configurator](/addon-configurator) 用於準備解壓縮世界檔案

## VoiceCraft 伺服器配置

典型設定：

```json
{
  "McWssConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-token",
    "Hostname": "ws://127.0.0.1:9051/",
    "MaxClients": 1,
    "MaxTimeoutMs": 10000,
    "DataTunnelCommand": "voicecraft:data_tunnel",
    "CommandsPerTick": 3,
    "MaxByteLengthPerCommand": 300,
    "DisabledPacketTypes": []
  }
}
```

保持 `DataTunnelCommand` 與插件包保持一致。如果您在伺服器設定中更改它，則插件必須使用相同的命令名稱。

對於本地單人遊戲測試，請將 websocket 主機保留在 `127.0.0.1` 上。僅當基岩世界從另一台機器連接時才使用更寬的綁定。

## 安裝

### 選項 1：導入為 `.mcaddon`

1. 將檔案重新命名為 `VoiceCraft.Addon.Core.McWss.mcaddon`。
2. 打開它，讓 Minecraft 導入插件。
3. 啟用世界中的行為包和資源包。

### 選項 2：手動複製

1. 提取存檔。
2. 將 `RP` 和 `BP` 複製到 Bedrock 目錄。
3. 在目標世界中啟用這兩個套件。

資源包提供可見的資產。行為包提供命令、腳本和橋接邏輯。

## 連結流程

### 第1步：連接世界websocket

```text
/connect <VOICECRAFT_HOST>:<MCWSS_PORT>
```

範例：

```text
/connect 127.0.0.1:9051
```

這將基岩世界連接到 VoiceCraft Websocket 傳輸。它尚未驗證該插件。

### 第 2 步：驗證插件

```text
/voicecraft:vcconnect <LOGIN_TOKEN>
```

使用 `McWssConfig.LoginToken`。

經過身份驗證後，插件可以透過命令隧道發送實體並綁定資料。

## 數據隧道

該插件使用：

- `voicecraft:data_tunnel`

這必須與 `McWssConfig.DataTunnelCommand` 保持一致。

如果您重命名一側而不重命名另一側，那麼橋樑就會斷裂。

該指令目前攜帶：

- 可選的最大字串長度參數
- 打包有效負載資料參數

隧道對命令吞吐量很敏感。大量的實體或效果更新可能會導致延遲或不穩定的交付，尤其是在低階電腦上。

## 調音

如果您發現延遲或資料包不穩定：

- 降低 `CommandsPerTick`
- 評論 `MaxByteLengthPerCommand`
- 避免大量突發更新
- 使用較少的活動實體進行測試
- 調整時保持本地設定
- 如果世界變成長期運作的共享伺服器，則切換到 `McHttp`

## 何時切換至其他交通工具

在下列情況下移至 `McHttp`：

- 您運行真正的專用基岩伺服器
- 您想要清潔生產部署
- 命令隧道不穩定成為問題

在這種情況下，請繼續使用 [McHttp for BDS](/minecraft/mchttp-bds)。

## 驗證清單

- `McWssConfig.Enabled = true`
- 世界可以運作 `/connect <host>:<port>`
- `/voicecraft:vcconnect <LOGIN_TOKEN>` 成功
- VoiceCraft 用戶端連接到 UDP 端點
- `PositioningType` 用戶端與伺服器之間的匹配
- 綁定流程在遊戲中有效
- 移動玩家會改變接近行為

## 常見問題

- `/connect` 失敗：
  檢查主機/連接埠以及 Bedrock 是否允許您的環境中的 Websocket 連線。
- `vcconnect` 失敗：
  確認您使用了 `McWssConfig.LoginToken`。
- 資料隧道錯誤：
  確認 `DataTunnelCommand` 與插件包相符。
- 音訊已連接，但接近度錯誤：
  檢查綁定流、定位模式以及位置更新是否到達。
