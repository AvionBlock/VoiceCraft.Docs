# 服务器属性.json

主服务器配置文件：`config/ServerProperties.json`。

该文件会在服务器首次启动后创建，并成为服务器行为的持久配置来源。编辑之前请停止服务器，除非您的进程管理器支持安全重新加载配置。

当您需要了解字段控制什么，以及哪些字段必须与客户端、附加包或插件匹配时，请使用此页面。

## 编辑工作流程

1. 停止 `VoiceCraft.Server`。
2. 备份 `config/ServerProperties.json`。
3. 编辑相关部分。
4. 验证 JSON 语法。
5. 再次启动服务器。
6. 观察日志中的配置解析、侦听器或身份验证错误。
7. 重新连接客户端和 Minecraft 传输。

最重要的首次编辑是传输登录令牌和主机绑定。

## 完整示例

```json
{
  "TelemetryEnabled": true,
  "TelemetryToken": "replace-with-stable-random-token",
  "VoiceCraftConfig": {
    "Language": "en-US",
    "Port": 9050,
    "MaxClients": 100,
    "Motd": "VoiceCraft Proximity Chat!",
    "PositioningType": 0,
    "EnableVisibilityDisplay": true
  },
  "McWssConfig": {
    "Enabled": false,
    "LoginToken": "replace-with-secure-guid",
    "Hostname": "ws://127.0.0.1:9051/",
    "MaxClients": 1,
    "MaxTimeoutMs": 10000,
    "DataTunnelCommand": "voicecraft:data_tunnel",
    "CommandsPerTick": 3,
    "MaxByteLengthPerCommand": 300,
    "DisabledPacketTypes": []
  },
  "McHttpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-secure-guid",
    "Hostname": "http://127.0.0.1:9050/",
    "MaxClients": 1,
    "MaxTimeoutMs": 10000,
    "DisabledPacketTypes": []
  },
  "McTcpConfig": {
    "Enabled": false,
    "LoginToken": "replace-with-secure-guid",
    "Hostname": "127.0.0.1",
    "Port": 9050,
    "MaxClients": 1,
    "MaxTimeoutMs": 10000,
    "DisabledPacketTypes": []
  },
  "DefaultAudioEffectsConfig": {
    "1": { "EffectType": 1 },
    "2": { "WetDry": 1, "MinRange": 0, "MaxRange": 30, "EffectType": 2 },
    "4": { "WetDry": 1, "Delay": 0.5, "Range": 30, "EffectType": 4 },
    "8": { "WetDry": 1, "EffectType": 6 }
  }
}
```

## 遥测

- `TelemetryEnabled`：
  启用来自 `VoiceCraft.Server` 的匿名启动、心跳和崩溃诊断。
- `TelemetryToken`：
  用于对来自一台服务器安装的遥测事件进行分组的稳定假名指纹。

遥测帮助维护人员了解运行时健康状况和版本采用情况。它不应该被用作您自己的监控替代品；为生产服务器保留本地日志和进程监控。

如果您不需要遥测，请设置：

```json
{
  "TelemetryEnabled": false
}
```

## VoiceCraft配置

- `Language`：
  服务器日志语言。
- `Port`：
  VoiceCraft 核心服务器的 UDP 端口。
- `MaxClients`：
  VoiceCraft 客户端最大连接数。
- `Motd`：
  ping / info 响应返回的文本。
- `PositioningType`：
  定位方式：
  - `0 = Server`
  - `1 = Client`
- `EnableVisibilityDisplay`：
  是否将可见性指标发送给客户端。

`Port` 是玩家客户端在 VoiceCraft 客户端 UI 中添加的端点。即使默认重用 `9050`，它也不会自动与每个 Minecraft 传输端点相同。

`PositioningType` 必须与客户端设置匹配。在大多数 BDS 和 GeyserVoice 设置中，以 `0 = Server` 开头。

## McWss 配置

用于 WebSocket/命令隧道 Bedrock 流程。

- `Enabled`：
  启用或禁用 McWss。
- `LoginToken`：
  共享身份验证令牌，通常与 `/voicecraft:vcconnect <token>` 一起使用。
- `Hostname`：
  websocket 主机，例如 `ws://0.0.0.0:9051/`。
- `MaxClients`：
  最大 McWss 客户端数。
- `MaxTimeoutMs`：
  不活动超时。
- `DataTunnelCommand`：
  用于数据隧道的命令名称，通常为 `voicecraft:data_tunnel`。
- `CommandsPerTick`：
  每个时钟周期转发多少个命令数据包。
- `MaxByteLengthPerCommand`：
  每个命令调用的有效负载预算（字节）。
- `DisabledPacketTypes`：
  此传输上阻止的数据包类型。

使用 `McWss` 进行本地世界和测试。命令隧道依赖于 `DataTunnelCommand`；只在一侧更改它会破坏传输。

## McHttp 配置

用于 Bedrock 专用服务器和基于 HTTP 的集成。

- `Enabled`
- `LoginToken`
- `Hostname`
- `MaxClients`
- `MaxTimeoutMs`
- `DisabledPacketTypes`

典型的BDS绑定：

```json
{
  "Enabled": true,
  "LoginToken": "replace-with-token",
  "Hostname": "http://0.0.0.0:9050/",
  "MaxClients": 10,
  "MaxTimeoutMs": 10000,
  "DisabledPacketTypes": []
}
```

当 BDS 可以到达 VoiceCraft HTTP 端点时，请使用 `McHttp`。如果 BDS 和 VoiceCraft 在不同的计算机上运行，从 BDS 的角度来看 `127.0.0.1` 将指向错误的主机。

## McTcp 配置

由 Java 端桥使用，尤其是 `GeyserVoice`。

- `Enabled`：
  启用或禁用 McTcp。
- `LoginToken`：
  TCP 桥的共享身份验证令牌。
- `Hostname`：
  绑定主机名，例如 `127.0.0.1` 或 `0.0.0.0`。
- `Port`：
  TCP 监听端口。
- `MaxClients`：
  最大传输客户端数。
- `MaxTimeoutMs`：
  不活动超时。
- `DisabledPacketTypes`：
  此传输上阻止的数据包类型。

与 `McHttp` / `McWss` 相比的重要区别：

- `Hostname` 是一个普通主机，而不是 URI
- `Port` 是一个单独的字段
- 这是与 `GeyserVoice` 最相关的传输

当 Java 端插件或代理拥有 Minecraft 状态路径时，请使用 `McTcp`。 `GeyserVoice` `config.voicecraft.transport.host`、`config.voicecraft.transport.port` 和 `config.voicecraft.transport.login-token` 值必须与此部分匹配。

## 默认音频效果配置

字典键是 `ushort` 位掩码，值是效果 JSON 对象。

默认矩阵：

- `1`：
  `Visibility`
- `2`：
  `Proximity`
- `4`：
  `ProximityEcho`
- `8`：
  `ProximityMuffle`

您可以覆盖或扩展字典以更改新实体的默认效果行为。

仅当您了解效果管线时才更改这些。对于大多数部署，请在更改默认效果之前验证基本绑定和距离感行为。

## 禁用数据包类型

每个传输都支持 `DisabledPacketTypes`。

小心使用这个：

- 它用于调试、兼容性实验或紧急缓解
- 禁用核心数据包可能会破坏登录、实体同步或音频传输
- 除非您了解数据包流，否则不要在生产中更改此设置

如果传输仅在禁用数据包类型后才起作用，请将其视为兼容性解决方法并记录为什么需要它。

## 实际生产模式

### Bedrock 专用服务器

- `McHttpConfig.Enabled = true`
- `McWssConfig.Enabled = false`
- `McTcpConfig.Enabled = false` 除非您还运行 Java 端桥

### 本地世界/单人游戏

- `McWssConfig.Enabled = true`
- `McHttpConfig.Enabled = false` 或可选

### GeyserVoice / Java 桥

- `McTcpConfig.Enabled = true`
- `McHttpConfig.Enabled = false` 或可选
- `McWssConfig.Enabled = false` 除非其他地方也需要

## 最小拓扑示例

### 仅 BDS

```json
{
  "VoiceCraftConfig": {
    "Port": 9050,
    "PositioningType": 0
  },
  "McHttpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-strong-token",
    "Hostname": "http://0.0.0.0:9050/"
  },
  "McWssConfig": {
    "Enabled": false
  },
  "McTcpConfig": {
    "Enabled": false
  }
}
```

### 仅 Java 桥

```json
{
  "VoiceCraftConfig": {
    "Port": 9050,
    "PositioningType": 0
  },
  "McTcpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-strong-token",
    "Hostname": "0.0.0.0",
    "Port": 9050
  },
  "McHttpConfig": {
    "Enabled": false
  },
  "McWssConfig": {
    "Enabled": false
  }
}
```

## 重要提示

- 始终替换生成的 `LoginToken` 值
- 使用 `Hostname: http://0.0.0.0:9050/`，HTTP 侦听器绑定到通配符地址
- 使用 `McTcpConfig.Hostname = 0.0.0.0`，TCP 桥变得可远程访问
- 使 `PositioningType` 与客户端配置保持一致
- 升级前保留最后一次已知良好配置的副本
- 仅当您的流程管理器一致地传递它们时才使用运行时覆盖

另请参阅：

- [运行时覆盖](/server/runtime-overrides)
- [传输模式](/server/transports)
