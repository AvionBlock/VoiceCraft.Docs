# 身份验证和信任模型

VoiceCraft 在 Minecraft 传输端使用共享令牌。

## 主要原理

传输消费者证明它知道配置的共享令牌。

示例：

- Bedrock addon authenticates with `McHttpConfig.LoginToken`
- `McWss` world authenticates with `McWssConfig.LoginToken`
- `GeyserVoice` authenticates with `McTcpConfig.LoginToken`

## 信任边界

你应该分层思考：

- 玩家客户信任
- Minecraft 集成信任
- 后端运行时信任

这些不是同一件事。

## 代币保护什么

它们保护 VoiceCraft 和集成节点之间的传输边界。

它们不能替代：

- 防火墙规则
- 主机安全
- 插件权限卫生

## 操作建议

- 当拓扑改变时轮换令牌
- 不要永远在任何地方重复使用相同的秘密
- 存储操作凭证等令牌
