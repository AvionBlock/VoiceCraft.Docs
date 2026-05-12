# 安全强化

本页是关于降低实际部署中的操作风险的。

## 1. 轮换每个生成的令牌

切勿保留以下项的默认生成值：

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

将它们视为共享秘密。

## 2. 仅公开所需的传输

不要仅仅因为每种传输方式存在就将其发布。

示例：

- 仅基岩主机：
  usually only `McHttp`
- Java桥接主机：
  usually only `McTcp`
- 本地测试主机：
  often only loopback `McWss`

## 3. 尽可能使用环回

更喜欢：

- `127.0.0.1`
- `localhost`

当消费者在同一台机器上时。

Use `0.0.0.0` only when remote access is actually required.

## 4.严格的防火墙策略

仅允许您需要的内容：

- VoiceCraft UDP 端口
- 特定的 HTTP 或 TCP 传输端口
- 可选的网络套接字端口

如果集成节点已知且固定，则不要广泛打开传输端口。

## 5. 独立的环境

使用不同：

- 代币
- 配置文件
- 目录
- 端口

用于生产、登台和本地测试。

## 6. 小心插件管理的运行时

If `GeyserVoice` manages the VoiceCraft runtime:

- 控制安装目录
- 了解谁拥有重启行为
- 确认日志收集在可预测的地方

## 7. Avoid casual use of `DisabledPacketTypes`

这不是正常的强化功能。

它主要用于：

- 调试
- 暂时缓解
- 协议实验

盲目禁用数据包类型可能会破坏身份验证、同步或音频。

## 8.限制操作命令

For `GeyserVoice`, keep these staff-only:

- `/voice connect`
- `/voice reconnect`
- `/voice disconnect`
- `/voice reload`

## 9. 保护备份内容

备份可能包含：

- 传输 token
- 主机和端口拓扑
- 服务布局细节

将配置备份视为敏感操作数据。
