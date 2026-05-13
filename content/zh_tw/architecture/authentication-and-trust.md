# 認證和信任模型

VoiceCraft 在 Minecraft 傳輸端使用共用令牌。這些令牌決定是否允許附加包、外掛程式或橋接元件將 Minecraft 狀態傳送到 `VoiceCraft.Server`。

它們不是玩家密碼。它們是受信任的運行時元件之間的操作秘密。

## 主要原理

傳輸消費者證明它知道配置的共享令牌。

範例：

- Bedrock 外掛程式使用 `McHttpConfig.LoginToken` 進行驗證
- `McWss` 世界透過 `McWssConfig.LoginToken` 進行驗證
- `GeyserVoice` 使用 `McTcpConfig.LoginToken` 進行驗證

| 傳輸 | 使用方 | 令牌欄位 |
|-----------|----------|-------------|
| `McHttp` | BDS插件包 | `McHttpConfig.LoginToken` |
| `McWss` | 本地 Bedrock 世界插件 | `McWssConfig.LoginToken` |
| `McTcp` | `GeyserVoice` 或 Java 端橋 | `McTcpConfig.LoginToken` |

## 信任邊界

你應該分層思考：

- 玩家客戶端信任
- Minecraft 整合信任
- 後端運行時信任

這些不是同一件事。

玩家用戶端連接到語音伺服器並可以發送自己的會話音訊。 Minecraft 整合可以更新世界/實體狀態。後端運行時存取可以更改配置、令牌、日誌和進程行為。在分配權限和決定秘密所在的位置時，請保持這些邊界分開。

## 代幣保護什麼

它們保護 VoiceCraft 和整合節點之間的傳輸邊界。

它們不能取代：

- 防火牆規則
- 主機安全
- 插件權限衛生

如果攻擊者獲得傳輸令牌並可以到達該傳輸端點，他們可能能夠冒充 Minecraft 端整合。這就是為什麼代幣輪換和網路可達性一起重要的原因。

## 操作建議

- 當拓撲發生變化時輪換令牌
- 不要永遠在任何地方重複使用相同的秘密
- 儲存操作憑證等令牌
- 對 `McHttp`、`McWss` 和 `McTcp` 使用不同的標記，除非您故意需要共享自動化
- 當消費者在同一台主機上運作時，bind 會傳送到 `127.0.0.1`
- 僅當另一台機器必須連接時才公開 `0.0.0.0`
- 將插件/管理命令限制為受信任的員工

## 輪調工作流程

1. 停止或斷開 Minecraft 整合。
2. 為相關傳輸產生新令牌。
3. 更新 `config/ServerProperties.json` 或進程層級 `--server-key` 覆蓋。
4. 更新插件/插件配置或遊戲內連接命令。
5. 如果您編輯了 JSON 配置，請重新啟動 `VoiceCraft.Server`。
6. 重新連接 Minecraft 整合並驗證綁定流程。

## 常見錯誤

- 當外掛程式實際使用 `McWss` 時變更 `McHttpConfig.LoginToken`
- 僅更改 VoiceCraft 配置並忘記插件/插件端
- 使用重複使用的測試令牌將通配符偵聽器公開到互聯網
- 在螢幕截圖、支援日誌或公共問題報告中共享生產令牌
