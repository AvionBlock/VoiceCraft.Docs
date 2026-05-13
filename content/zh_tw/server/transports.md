# 運輸方式

VoiceCraft 有多個面向 Minecraft 的傳輸層。選擇正確的產品對於穩定性和部署簡單性非常重要。

傳輸是 Minecraft 自動化將狀態傳送到 `VoiceCraft.Server` 的路徑。它與玩家客戶端使用的 UDP 語音端點分開。

在編輯 `McHttpConfig`、`McWssConfig` 或 `McTcpConfig` 之前使用此頁面。

## 快速比較

| 交通 | 典型消費者 | 端點形狀 | 最適合 | 令牌字段 |
|-----------|------------------|----------------|----------|-------------|
| `McHttp` | `VoiceCraft.Addon.Core.McHttp` | HTTP端點 | Bedrock 專用伺服器 | `McHttpConfig.LoginToken` |
| `McWss` | `VoiceCraft.Addon.Core.McWss` | websocket + 指令隧道 | 本地 Bedrock 世界和測試 | `McWssConfig.LoginToken` |
| `McTcp` | `GeyserVoice` | 原始 TCP 橋 | Java、Geyser、代理或 Paper 橋接方案 | `McTcpConfig.LoginToken` |

不要僅根據連接埠號選擇傳輸。根據將連接的 Minecraft 端組件進行選擇。

## 麥克HTTP

`McHttp` 公開了一個 Bedrock 專用伺服器外掛程式可以呼叫的 HTTP 端點。

### 最佳用例

- Bedrock 專用伺服器
- 穩定的腳本 Bedrock 世界
- 遊戲伺服器可以呼叫 HTTP 端點的環境

### 優勢

- 最簡單的北斗系統生產傳輸
- 簡單端點模型
- 非常適合面板、反向網路佈局和專用主機

### 權衡

- 需要從 Bedrock 伺服器到 VoiceCraft 的網路可及性
- 可能會被某些託管提供者阻止
- 需要插件所需的 BDS 腳本/模組權限

### 典型配置

```json
{
  "McHttpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-token",
    "Hostname": "http://0.0.0.0:9050/"
  }
}
```

僅當 BDS 和 VoiceCraft 在同一主機上運作時才使用 `http://127.0.0.1:9050/`。

## 麥克瓦斯

`McWss` 公開一個 websocket 端點並在 Bedrock 世界中使用指令隧道。

### 最佳用例

- 本地 Bedrock 世界
- 單人遊戲測試
- 使用 `/connect` 和指令隧道進行設定

### 優勢

- 無需獨立的 BDS HTTP 工作流程即可運作
- 適用於開發和本地演示

### 權衡

- 在重負載壓力下穩定性較差
- 對 `CommandsPerTick` 和有效負載分塊限制敏感
- 通常不是公共生產環境的首選

### 典型配置

```json
{
  "McWssConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-token",
    "Hostname": "ws://127.0.0.1:9051/",
    "DataTunnelCommand": "voicecraft:data_tunnel"
  }
}
```

當您需要本機 `/connect` 流時，請使用此選項。對於真正的 BDS 生產伺服器，首選 `McHttp`。

## 麥克Tcp

`McTcp` 公開 Java 端基礎架構所使用的原始 TCP 橋。

### 最佳用例

- `GeyserVoice`
- Java 伺服器或代理橋
- 直接 Paper 運行時集成

### 優勢

- Java 端插件的直接橋接傳輸
- 當本機 TCP 橋接更好時避免 HTTP 端點語義
- 與目前 `GeyserVoice` 架構保持一致

### 權衡

- 另一個要管理的端口
- 當您實際執行 Java 端橋時最有用
- Bedrock插件包不使用

### 典型配置

```json
{
  "McTcpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-token",
    "Hostname": "0.0.0.0",
    "Port": 9050
  }
}
```

如果 `GeyserVoice` 與 VoiceCraft 在同一台電腦上執行，則綁定至 `127.0.0.1`。如果它在其他地方運行，請綁定到插件可以到達並限制防火牆的位址。

## 你應該選擇哪一個？

### Bedrock 專用伺服器

使用 `McHttp`。

繼續[McHttp for BDS](/minecraft/mchttp-bds)。

### Bedrock單人/本地世界

使用 `McWss`。

繼續[McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer)。

### Java + Geyser/Floodgate

使用 `McTcp` 到 `GeyserVoice`。

繼續[GeyserVoice](/ecosystem/geyservoice)。

### 混合網路

您可以運行多種傳輸，但隻公開您真正需要的。

常見的混合情況：

- Bedrock BDS 加 Java 橋：
  啟用 `McHttp` 和 `McTcp`
- 本地測試，而生產仍在 BDS 上：
  運行單獨的測試伺服器資料夾而不是重複使用生產令牌
- 代理網絡：
  通常僅向代理所有者公開 `McTcp`

## 安全建議

- 替換所有登入令牌
- 當消費者是本地時綁定到 `127.0.0.1`
- 僅當需要遠端存取時才綁定到 `0.0.0.0`
- 保持每個傳輸的防火牆規則嚴格
- 不要僅僅因為不活動的傳輸可用而暴露它們

## 驗證清單

- 選擇的傳輸 `Enabled` 欄位是 `true`
- 相符的插件/插件已安裝
- 端點主機/連接埠可從 Minecraft 端運行時存取
- 插件/插件令牌與正確的 `LoginToken` 匹配
- 伺服器日誌顯示傳輸消費者連接
- 綁定流程在傳輸登入後起作用
