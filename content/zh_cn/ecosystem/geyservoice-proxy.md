# GeyserVoice 代理指南

当您使用一台或多台后端 Paper 服务器运行 Velocity 或 BungeeCord 时，请使用此模式。

代理模式在代理上保留一个中央 VoiceCraft 连接，而后端 Paper 服务器通过插件消息传递流式传输玩家快照。

目标形状：

```text
Backend Paper + GeyserVoice -> proxy relay -> Velocity/Bungee + GeyserVoice -> McTcp -> VoiceCraft.Server
VoiceCraft.Client -> VoiceCraft UDP endpoint
```

## 代理模式如何工作

- 后端 Paper 服务器将玩家快照发送到代理
- 代理拥有 VoiceCraft 端 `McTcp` 连接
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

- Paper端节点启用代理模式
- 不要将后端主机/端口/密钥视为事实来源

Paper 后端示例：

```yml
config:
  proxy:
    enabled: true
```

后端仍然需要安装 GeyserVoice，以便它可以观察玩家并发送快照，但它不应该拥有主 VoiceCraft 连接。

## 代理配置

在代理上：

- 设置真实的 `config.voicecraft.transport.host`
- 设置真实的 `config.voicecraft.transport.port`
- 设置真实的 `config.voicecraft.transport.login-token`

速度/弹力示例：

```yml
config:
  voicecraft:
    transport:
      host: "127.0.0.1"
      port: 9050
      login-token: "replace-with-token"
    voice:
      port: 1111
```

该令牌必须与 `VoiceCraft.Server` 上的 `McTcpConfig.LoginToken` 匹配。

## 设置流程

1. 在代理和后端节点上安装插件。
2. 启动一切一次以生成配置。
3. 使用真实的 VoiceCraft 连接配置代理。
4. 配置后端节点的代理中继行为。
5. 重新加载插件。
6. 验证跨服务器移动和绑定流。

首先从一台后端服务器开始。绑定和位置更新在那里工作后，添加更多后端节点。

## 验证清单

- 玩家加入后台
- 后端正确发送快照
- 代理保持与 VoiceCraft 的连接
- 切换后端服务器保留预期的语音身份
- VoiceCraft 服务器日志显示单个代理拥有的 `McTcp` 使用者
- 服务器切换后后端世界ID/维度保持稳定

## 失败模式

- 后端尝试拥有主连接
- 代理令牌与 VoiceCraft `McTcpConfig.LoginToken` 不同
- 代理可以到达 Paper，但不能到达 VoiceCraft
- 后端拓扑隐藏或重写插件消息
- 插件已安装在代理上，但在一个后端中缺失
- 后端 `config.proxy.enabled` 在代理中继部署中为 false

## 操作注意事项

- 尽可能让 VoiceCraft 靠近代理，以减少网桥延迟。
- 更改代理中继配置后重新启动或重新加载后端节点。
- 将令牌保留在代理配置中，不要在每个后端随意复制。
- 添加新的后端服务器后再次验证绑定流。
