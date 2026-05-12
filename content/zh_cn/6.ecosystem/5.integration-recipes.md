# 集成方案

这些是最常见 VoiceCraft 场景的实用部署模式。

## 场景 A：基岩专用服务器

堆栈：

- `VoiceCraft.Server`
- `VoiceCraft.Addon.Core.McHttp`
- VoiceCraft 客户端

推荐配置：

- `McHttpConfig.Enabled = true`
- `McWssConfig.Enabled = false`
- `McTcpConfig.Enabled = false` unless also needed

流程：

1. deploy `VoiceCraft.Server`
2. secure `McHttpConfig.LoginToken`
3. ensure BDS can reach `McHttpConfig.Hostname`
4. install `Core.McHttp`
5. run `voicecraft:vcconnect <hostname> <token>`
6. validate `voicecraft:vcbind <key>`

## 场景 B：本地/单人基岩世界

堆栈：

- 本地 VoiceCraft 堆栈
- `VoiceCraft.Addon.Core.McWss`

流程：

1. enable `McWss`
2. keep `DataTunnelCommand = voicecraft:data_tunnel`
3. install `Core.McWss`
4. use `/connect`
5. run `voicecraft:vcconnect <token>`

## 场景 C：使用 GeyserVoice 托管运行时的 Direct Paper

堆栈：

- Paper / Folia
- `GeyserVoice`
- 插件管理的 VoiceCraft 运行时

流程：

1. install `GeyserVoice`
2. set `config.proxy.enabled = false`
3. configure `config.voicecraft.login-token`
4. enable `config.voicecraft.auto-start`
5. 重新加载并验证绑定流程

当您希望插件在后台运行 VoiceCraft 时，这是最简单的 Java 端设置。

## 场景 D：使用外部 VoiceCraft 直接 Paper

堆栈：

- Paper / Folia
- `GeyserVoice`
- externally managed `VoiceCraft.Server`

流程：

1. enable `McTcp` on VoiceCraft
2. set `host`, `port`, `login-token` in GeyserVoice
3. 如果不需要，禁用插件运行时管理
4. 重新加载并验证连接

## 场景 E：Velocity 或 Bungee 网络

堆栈：

- `GeyserVoice` on proxy
- `GeyserVoice` on backend Paper servers
- `VoiceCraft.Server` with `McTcp`

流程：

1. 将代理配置为 VoiceCraft 所有者
2.配置后端Paper节点为代理模式
3.在所有节点上重新加载插件
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
    "Port": 9050,
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

## 故障排除顺序

1. 验证token匹配
2. 验证主机/端口可达性
3. 验证所选传输是否已启用
4. 验证插件或插件拓扑与配置匹配
5. 然后才调查数据包级别的问题
