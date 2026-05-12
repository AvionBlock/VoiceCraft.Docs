# 身份驗證與信任模型

VoiceCraft 在 Minecraft 傳輸端使用共用令牌。

## 主要原理

傳輸消費者證明它知道配置的共享令牌。

範例：

- Bedrock addon authenticates with `McHttpConfig.LoginToken`
- `McWss` world authenticates with `McWssConfig.LoginToken`
- `GeyserVoice` authenticates with `McTcpConfig.LoginToken`

## 信任邊界

你應該分層思考：

- 玩家客戶信任
- Minecraft 整合信任
- 後端運行時信任

這些不是同一件事。

## 代幣保護什麼

它們保護 VoiceCraft 和整合節點之間的傳輸邊界。

它們不能取代：

- 防火牆規則
- 主機安全
- 插件權限衛生

## 操作建議

- 當拓樸改變時輪換令牌
- 不要永遠在任何地方重複使用相同的秘密
- 儲存操作憑證等令牌
