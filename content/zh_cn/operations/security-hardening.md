# 安全加固

本页是关于降低实际部署中的操作风险的。

VoiceCraft 安全性主要是限制谁可以到达传输端点、保护共享令牌以及让普通玩家远离仅限员工的操作控制。

## 1.轮换每个生成的token

切勿保留以下项的默认生成值：

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

将它们视为共享秘密。

仅将令牌与匹配的集成一起使用：

- BDS 的 `McHttpConfig.LoginToken` `McHttp`
- `McWssConfig.LoginToken` 适用于本地 Bedrock `McWss`
- `McTcpConfig.LoginToken` 用于 GeyserVoice / Java 桥

## 2.仅公开所需的传输

不要仅仅因为每种传输方式存在就将其发布。

示例：

- 仅Bedrock主机：
  通常只有 `McHttp`
- Java桥接主机：
  通常只有 `McTcp`
- 本地测试主机：
  通常仅环回 `McWss`

## 3. 尽可能使用环回

更喜欢：

- `127.0.0.1`
- `localhost`

当消费者在同一台机器上时。

仅当实际需要远程访问时才使用 `0.0.0.0`。

## 4.严格的防火墙政策

仅允许您需要的内容：

- VoiceCraft UDP 端口
- 特定 HTTP 或 TCP 传输端口
- 可选的 websocket 端口

如果集成节点已知且固定，则不要广泛打开传输端口。

请记住，客户端 UDP 端点和 Minecraft 传输端点服务于不同的用户。玩家需要语音 UDP 端点。插件/插件需要选定的 Minecraft 传输端点。

## 5. 独立的环境

使用不同：

- 代币
- 配置文件
- 目录
- 端口

用于生产、登台和本地测试。

## 6. 小心插件管理的运行时

如果 `GeyserVoice` 管理 VoiceCraft 运行时：

- 控制安装目录
- 了解谁拥有重启行为
- 确认日志收集在可预测的地方
- 确保生成的运行时文件不可被不受信任的用户写入
- 了解重新启动过程中是否需要 `shutdown-on-disable`

## 7.避免随意使用`DisabledPacketTypes`

这不是正常的强化功能。

它主要用于：

- 调试
- 暂时缓解
- 协议实验

盲目禁用数据包类型可能会破坏身份验证、同步或音频。

## 8. 限制操作命令

对于 `GeyserVoice`，仅保留这些人员：

- `/voice connect`
- `/voice reconnect`
- `/voice disconnect`
- `/voice reload`

对于 VoiceCraft 服务器控制台，仅将访问权限限制为受信任的操作员。 `kick`、`mute`、`deafen` 等命令和元数据编辑可能会影响实时玩家。

## 9. 保护备份内容

备份可能包含：

- 传输令牌
- 主机和端口拓扑
- 服务布局细节

将配置备份视为敏感操作数据。

## 10.审查公共支持工件

在公开发布屏幕截图、日志或配置之前，请删除：

- 传输登录令牌
- 公共 IP（如果不应公开）
- 服务包装秘密
- 生成的绑定键（如果它们仍然处于活动状态）
- 如果隐私很重要，则玩家标识符

## 强化检查表

- 生成的令牌被替换
- 仅启用所需的传输
- 用于同主机消费者的环回
- 防火墙规则尽可能限于已知来源
- GeyserVoice 操作命令受限
- 安全存储备份
- 发行版和插件/插件版本保持一致
