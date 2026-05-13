# 认证和信任模型

VoiceCraft 在 Minecraft 传输端使用共享令牌。这些令牌决定是否允许插件、插件或桥将 Minecraft 状态发送到 `VoiceCraft.Server`。

它们不是玩家密码。它们是受信任的运行时组件之间的操作秘密。

## 主要原理

传输消费者证明它知道配置的共享令牌。

示例：

- Bedrock 插件使用 `McHttpConfig.LoginToken` 进行身份验证
- `McWss` 世界通过 `McWssConfig.LoginToken` 进行身份验证
- `GeyserVoice` 使用 `McTcpConfig.LoginToken` 进行身份验证

| 交通 | 消费者 | 令牌字段 |
|-----------|----------|-------------|
| `McHttp` | BDS插件包 | `McHttpConfig.LoginToken` |
| `McWss` | 本地 Bedrock 世界插件 | `McWssConfig.LoginToken` |
| `McTcp` | `GeyserVoice` 或 Java 端桥 | `McTcpConfig.LoginToken` |

## 信任边界

你应该分层思考：

- 玩家客户信任
- Minecraft 集成信任
- 后端运行时信任

这些不是同一件事。

玩家客户端连接到语音服务器并可以发送自己的会话音频。 Minecraft 集成可以更新世界/实体状态。后端运行时访问可以更改配置、令牌、日志和进程行为。在分配权限和决定秘密所在的位置时，请保持这些边界分开。

## 代币保护什么

它们保护 VoiceCraft 和集成节点之间的传输边界。

它们不能替代：

- 防火墙规则
- 主机安全
- 插件权限卫生

如果攻击者获得传输令牌并可以到达该传输端点，他们可能能够冒充 Minecraft 端集成。这就是为什么代币轮换和网络可达性一起重要的原因。

## 操作建议

- 当拓扑发生变化时轮换令牌
- 不要永远在任何地方重复使用相同的秘密
- 存储操作凭证等令牌
- 对 `McHttp`、`McWss` 和 `McTcp` 使用不同的标记，除非您故意需要共享自动化
- 当消费者在同一主机上运行时，bind 传输到 `127.0.0.1`
- 仅当另一台机器必须连接时才公开 `0.0.0.0`
- 将插件/管理命令限制为受信任的员工

## 轮换工作流程

1. 停止或断开 Minecraft 集成。
2. 为相关传输生成新令牌。
3. 更新 `config/ServerProperties.json` 或进程级 `--server-key` 覆盖。
4. 更新插件/插件配置或游戏内连接命令。
5. 如果您编辑了 JSON 配置，请重新启动 `VoiceCraft.Server`。
6. 重新连接 Minecraft 集成并验证绑定流程。

## 常见错误

- 当插件实际使用 `McWss` 时更改 `McHttpConfig.LoginToken`
- 仅更改 VoiceCraft 配置并忘记插件/插件端
- 使用重用的测试令牌将通配符侦听器公开到互联网
- 在屏幕截图、支持日志或公共问题报告中共享生产令牌
