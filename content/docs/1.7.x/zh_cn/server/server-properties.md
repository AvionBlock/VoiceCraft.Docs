# ServerProperties.json

主配置文件：`config/ServerProperties.json`。

VoiceCraft `1.7.0` 保留原有 transport sections，但加入 NAT port mapping，并使用 entity properties 进行效果定制。

## 编辑流程

1. 停止服务器。
2. 备份 `ServerProperties.json`。
3. 编辑并验证 JSON。
4. 启动服务器。
5. 检查 config/listener/NAT/auth 日志。

## 新字段

`VoiceCraftConfig`、`McHttpConfig`、`McTcpConfig`、`McWssConfig` 中新增：

- `AutoOpenPort`
- `ExternalPort`
- `PortMappingLifetimeMinutes`
- `PortMappingTimeoutSeconds`

`AutoOpenPort` 会通过 `OpenPort.Net` 尝试创建临时 router mapping。

## VoiceCraftConfig

- `Port`：客户端使用的 UDP port。
- `ExternalPort`：外部映射端口，`0` 使用 `Port`。
- `PositioningType`：`0 = Server`，`1 = Client`。
- `EnableVisibilityDisplay`：是否向客户端发送 visibility indicators。
- `AutoOpenPort`：自动打开 UDP port。

## McHttpConfig

BDS 常用配置：

```json
{
  "Enabled": true,
  "LoginToken": "replace-with-token",
  "Hostname": "http://0.0.0.0:9050/",
  "AutoOpenPort": false
}
```

仅当 BDS 和 VoiceCraft 在同一主机时使用 `127.0.0.1`。

## McTcpConfig

用于 `VoiceCraft.Java` 等 Java bridges。`Hostname` 是 host，不是 URI；`Port` 是独立字段。

## McWssConfig

用于本地 Bedrock world 和 command tunnel。重点检查 `DataTunnelCommand`、`CommandsPerTick`、`MaxByteLengthPerCommand`。

## DefaultAudioEffectsConfig

- `1`：`Visibility`
- `2`：`Proximity`
- `4`：`ProximityEcho`
- `8`：`ProximityMuffle`

在 `1.7.0` 中，effect 会为每个 entity 创建 processor，并可读取受支持的 entity properties 覆盖参数。

## 注意

- 始终替换 `LoginToken`
- `0.0.0.0` 会暴露 listener
- `PositioningType` 必须与客户端匹配
- 升级前保留可用配置
