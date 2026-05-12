# 傳輸模式

VoiceCraft 有多個面向 Minecraft 的傳輸層。選擇正確的產品對於穩定性和部署簡單性非常重要。

## 快速比較

|交通 |典型用途|預設形狀|最適合 |
|-----------|-------------|---------------|----------|
| `McHttp` | Bedrock Dedicated Server | HTTP endpoint | stable Bedrock server integration |
| `McWss` | local worlds / singleplayer | websocket + command tunnel | testing, local worlds, lightweight setups |
| `McTcp` | Java-side bridge | raw TCP bridge | `GeyserVoice`, proxy or Paper bridge scenarios |

## McHttp

### 最佳用例

- 基岩專用伺服器
- 穩定的腳本基岩世界
- 遊戲伺服器可以呼叫 HTTP 端點的環境

### 優勢

- 最簡單的北斗系統生產傳輸
- 簡單的端點模型
- 非常適合面板、反向網路佈局和專用主機

### 權衡

- 需要從 Bedrock 伺服器到 VoiceCraft 的網路可及性
- 可能會被某些託管提供者阻止

## McWss

### 最佳用例

- 當地基岩世界
- 單人遊戲測試
- setups using `/connect` and command tunneling

### 優勢

- 無需獨立的 BDS HTTP 工作流程即可運作
- 適用於開發和本地演示

### 權衡

- 在重負載壓力下穩定性較差
- sensitive to `CommandsPerTick` and payload chunking limits
- 通常不是公共生產環境的首選

## McTcp

### 最佳用例

- `GeyserVoice`
- Java伺服器或代理橋
- 直接 Paper 運行時集成

### 優勢

- Java端插件的直接橋接傳輸
- 當本機 TCP 橋更好時避免 HTTP 端點語義
- aligns with current `GeyserVoice` architecture

### 權衡

- 另一個要管理的端口
- 當您實際執行 Java 端橋時最有用

## 您應該選擇哪一個？

### 基岩專用伺服器

Use `McHttp`.

### 基岩單人遊戲/本地世界

Use `McWss`.

### Java + Geyser/Floodgate

Use `McTcp` through `GeyserVoice`.

### 混合網絡

您可以運行多種傳輸，但隻公開您真正需要的。

## 安全建議

- 取代所有登入令牌
- bind to `127.0.0.1` when the consumer is local
- bind to `0.0.0.0` only when remote access is required
- 保持每個傳輸嚴格的防火牆規則
