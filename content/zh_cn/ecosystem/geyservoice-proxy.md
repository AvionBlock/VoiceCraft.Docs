# GeyserVoice 代理指南

当您使用一台或多台后端 Paper 服务器运行 Velocity 或 BungeeCord 时，请使用此模式。

## 代理模式如何工作

- 后端 Paper 服务器将玩家快照发送到代理
- the proxy owns the VoiceCraft-side `McTcp` connection
- 世界 ID 和维度可以使用后端身份命名

这允许为多服务器网络提供一个中央语音桥。

## 部署模式

安装 GeyserVoice：

- 在代理上
- 在每个后端 Paper 服务器上

## 核心规则

代理是 VoiceCraft 连接的真实来源。

后端 Paper 服务器应被视为快照生产者，而不是主要的桥所有者。

## 后端 Paper 配置

在后端 Paper 服务器上：

- 为Paper端节点启用代理模式
- 不要将后端主机/端口/密钥视为事实来源

## 代理配置

在代理上：

- set the real `host`
- set the real `port`
- set the real `login-token`

## 设置流程

1. 在代理和后端节点上安装插件。
2. 启动一次一切以生成配置。
3. 使用真实的 VoiceCraft 连接配置代理。
4. 配置后端节点的代理中继行为。
5.重新加载插件。
6. 验证跨服务器移动和绑定流。

## 验证清单

- 玩家加入后端
- 后端正确发送快照
- 代理保持连接到 VoiceCraft
- 切换后端服务器保留预期的语音身份

## 失败模式

- 后端尝试拥有主连接
- proxy token differs from VoiceCraft `McTcpConfig.LoginToken`
- 代理可以到达 Paper，但不能到达 VoiceCraft
- 后端拓扑隐藏或重写插件消息
