# 整合食谱

这些是最常见 VoiceCraft 场景的实用部署模式。

在了解基本组件并需要具体的拓扑方案后，请使用此页面。每个场景都列出了堆栈、选择它的主要原因、最重要的配置以及证明其有效的验证点。

## 场景 A：基岩专用服务器

堆栈：

- `VoiceCraft.Server`
- `VoiceCraft.Addon.Core.McHttp`
- VoiceCraft 客户端

在以下情况下选择此选项：

- BDS是主要的游戏服务器
- BDS 可以到达 VoiceCraft HTTP 端点
- 您想要最稳定的基岩生产路径

推荐配置：

- `McHttpConfig.Enabled = true`
- `McWssConfig.Enabled = false`
- `McTcpConfig.Enabled = false` 除非也需要

流程：

1. 部署 `VoiceCraft.Server`
2. 安全 `McHttpConfig.LoginToken`
3. 确保BDS可以达到`McHttpConfig.Hostname`
4. 安装 `Core.McHttp`
5. 运行 `voicecraft:vcconnect <hostname> <token>`
6. 验证 `voicecraft:vcbind <key>`
7. 连接客户端并确认距离随着移动而变化

## 场景 B：本地/单人基岩世界

堆栈：

- 本地 VoiceCraft 堆栈
- `VoiceCraft.Addon.Core.McWss`

在以下情况下选择此选项：

- 您正在本地测试
- 你没有运行BDS
- `/connect` websocket 流可用

流程：

1. 启用 `McWss`
2. 保留 `DataTunnelCommand = voicecraft:data_tunnel`
3. 安装 `Core.McWss`
4. 使用 `/connect`
5. 运行 `voicecraft:vcconnect <token>`
6. 验证绑定和移动

## 场景 C：使用 GeyserVoice 管理的运行时直接提交论文

堆栈：

- Paper/Folia
- `GeyserVoice`
- 插件管理的 VoiceCraft 运行时

在以下情况下选择此选项：

- 一台 Paper/Folia 服务器应拥有语音集成
- 您需要更少的外部服务
- GeyserVoice 应该下载并启动 VoiceCraft

流程：

1. 安装 `GeyserVoice`
2. 设置 `config.proxy.enabled = false`
3. 配置 `config.voicecraft.transport.login-token`
4. 启用 `config.voicecraft.auto-start`
5. 重新加载并验证绑定流

当您希望插件在后台运行 VoiceCraft 时，这是最简单的 Java 端设置。

## 场景 D：使用外部 VoiceCraft Direct Paper

堆栈：

- Paper/Folia
- `GeyserVoice`
- 外部管理 `VoiceCraft.Server`

在以下情况下选择此选项：

- 您已经使用 systemd、Docker 或面板运行 VoiceCraft
- 多个组件可能需要相同的后端
- 您需要外部日志和重新启动策略

流程：

1. 在 VoiceCraft 上启用 `McTcp`
2. 在 GeyserVoice 中设置 `config.voicecraft.transport.host`、`config.voicecraft.transport.port` 和 `config.voicecraft.transport.login-token`
3. 如果不需要，禁用插件运行时管理
4. 重新加载并验证连接

## 场景 E：Velocity 或 Bungee 网络

堆栈：

- 代理上的 `GeyserVoice`
- 后端 Paper 服务器上的 `GeyserVoice`
- `VoiceCraft.Server` 与 `McTcp`

在以下情况下选择此选项：

- Velocity 或 BungeeCord 在后端服务器之间路由玩家
- 代理应该拥有 VoiceCraft 连接
- 后端服务器应该只发送快照

流程：

1. 将代理配置为 VoiceCraft 所有者
2. 配置后端Paper节点为代理模式
3. 在所有节点上重新加载插件
4. 验证跨服务器玩家移动

## 最小生产配置片段

```json
{
  "VoiceCraftConfig": {
    "Port": 9050,
    "MaxClients": 250,
    "PositioningType": 0
  },
  "McHttpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-strong-token",
    "Hostname": "http://0.0.0.0:9050/",
    "MaxClients": 10
  },
  "McTcpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-strong-token",
    "Hostname": "0.0.0.0",
    "Port": 9052,
    "MaxClients": 10
  },
  "McWssConfig": {
    "Enabled": false,
    "LoginToken": "replace-with-strong-token",
    "Hostname": "ws://0.0.0.0:9051/",
    "DataTunnelCommand": "voicecraft:data_tunnel"
  }
}
```

此片段显示了混合 HTTP + TCP 部署。请勿将 `McHttp` 和 `McTcp` 绑定到同一 TCP 端口。 VoiceCraft UDP 客户端端口可以共享编号 `9050`，因为它是 UDP，但 HTTP 和原始 TCP 侦听器需要不同的 TCP 绑定。

## 故障排除顺序

1. 验证令牌匹配
2. 验证主机/端口的可达性
3. 验证所选传输已启用
4. 验证插件或插件拓扑与配置匹配
5. 然后才调查数据包级问题

## “工作”是什么意思

只有当所有这些都成立时，食谱才是完整的：

- `VoiceCraft.Server` 启动时没有侦听器错误
- 至少有一个 VoiceCraft 客户端连接
- Minecraft 端传输进行身份验证
- 绑定流程完成
- 游戏中的移动会改变邻近行为
- 工作人员可以识别连接的客户/实体以进行故障排除
