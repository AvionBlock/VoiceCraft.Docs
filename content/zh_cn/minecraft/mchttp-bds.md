# 用于基岩专用服务器的 McHttp

`McHttp` 是推荐的 BDS VoiceCraft 集成模式。

当您运行基岩专用服务器并希望服务器端插件将玩家状态发送到 `VoiceCraft.Server` 时，请使用本指南。

目标形状：

```text
VoiceCraft.Client -> VoiceCraft UDP endpoint
BDS + VoiceCraft.Addon.Core.McHttp -> VoiceCraft McHttp endpoint
```

## 为什么推荐`McHttp`

- 更适合专用服务器环境
- 比基于命令隧道的设置更简单
- 在生产中更容易推理
- 与 Bedrock 插件包 `VoiceCraft.Addon.Core.McHttp` 很好地配合
- 不依赖于 `McWss` 使用的本地 `/connect` websocket 工作流程

## 要求

1. 运行 `VoiceCraft.Server`
2. `McHttpConfig.Enabled = true`
3. 版本中的 `VoiceCraft.Addon.Core.McHttp.zip`，或 [Addon Configurator](/addon-configurator) 中的现成存档
4. BDS 具有所需的模块和脚本 API 支持
5. 从 BDS 计算机到 VoiceCraft `McHttpConfig.Hostname` 的网络可达性
6. 玩家安装的 VoiceCraft 客户端

## 服务器端 VoiceCraft 配置

最小的例子：

```json
{
  "McHttpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-token",
    "Hostname": "http://0.0.0.0:9050/",
    "MaxClients": 10,
    "MaxTimeoutMs": 10000,
    "DisabledPacketTypes": []
  }
}
```

重要：

- 使用真实的代币，切勿将生成的代币保留在生产环境中
- 确保 BDS 主机可以到达配置的端点
- 仅当 BDS 和 VoiceCraft 在同一主机上运行时才使用 `http://127.0.0.1:9050/`
- 当 BDS 从另一台计算机连接时，使用 LAN/公共地址或 `0.0.0.0` 绑定

## 插件安装

最快路径：

- [Addon Configurator](/addon-configurator) 如果您想要一个可立即解压的世界存档
- [Download Page](/download) 如果您想要原始插件发布包

手动路径：

1. 提取 `VoiceCraft.Addon.Core.McHttp.zip`。
2. 将 `RP` 放入 `<MCServer>/resource_packs/` 中。
3. 将 `BP` 放入 `<MCServer>/behavior_packs/` 中。
4. 将两个包附加到目标世界。
5. 更改包或权限后重新启动 BDS。

资源包提供客户端可见的资源，例如图标。该行为包运行将 BDS 连接到 VoiceCraft 的脚本和命令。

## 模块权限

打开 `<MCServer>/config/default/permissions.json` 并确保它包含所需的模块：

```json
{
  "allowed_modules": [
    "@minecraft/server-gametest",
    "@minecraft/server",
    "@minecraft/server-ui",
    "@minecraft/server-admin",
    "@minecraft/server-editor",
    "@minecraft/server-net"
  ]
}
```

该插件需要网络相关的脚本权限，因为它从 BDS 运行时调用 VoiceCraft HTTP 端点。

## 将包附加到世界

在 `<MCServer>/worlds/<YourWorld>/world_behavior_packs.json` 中：

```json
{
  "pack_id": "71ebb3ba-e9db-4546-9520-05f20b17dcb6",
  "version": [1, 6, 0]
}
```

在 `world_resource_packs.json` 中：

```json
{
  "pack_id": "30b512be-77d1-4a61-bdb7-6c2f4062f889",
  "version": [1, 0, 0]
}
```

## 在游戏中连接

运行：

```text
/voicecraft:vcconnect "http://<VOICECRAFT_HOST>:<PORT>" <LOGIN_TOKEN>
```

示例：

```text
/voicecraft:vcconnect "http://127.0.0.1:9050" e4ad1f7e-4f90-4b21-bc15-6febe580bf1c
```

使用 `McHttpConfig.LoginToken` 中的令牌。

如果 BDS 与 VoiceCraft 在不同的主机上运行，请将 `127.0.0.1` 替换为从 BDS 计算机看到的 VoiceCraft 服务器的地址。

## 连接后会发生什么

连接成功后：

- 该插件通过 VoiceCraft 进行身份验证
- 世界可以通过McApi创建/更新实体
- 绑定流通过 `voicecraft:vcbind` 变得可用
- 效果 UI 和数据包驱动的状态同步变得可用

在此阶段，传输已连接，但每个播放器仍然需要 VoiceCraft 客户端和用于邻近音频的工作绑定流。

## 推荐的验证流程

1. 启动 `VoiceCraft.Server` 并确认 `McHttpConfig.Enabled = true`。
2. 启动带有附加插件的 BDS。
3. 通过 `vcconnect` 连接世界。
4. 确认没有显示身份验证错误。
5. 将 VoiceCraft 客户端连接到 `VoiceCraftConfig.Port`。
6. 使用 `voicecraft:vcbind <key>`。
7. 在游戏中移动玩家并确认位置更新会影响接近度。
8. 确认其他玩家可以在预期范围内听到声音。

## 常见问题

- Windows 上的 `HttpListenerException`：
  您可能需要 `netsh http add iplisten 127.0.0.1`
- 容器或虚拟机网络：
  使用 `http://0.0.0.0:9050/` 或正确的 LAN 地址
- 托管提供商阻止来自 BDS 的出站 HTTP：
  该交通工具可能无法在那里使用
- 身份验证失败：
  确认命令使用 `McHttpConfig.LoginToken`，而不是 `McWss` 或 `McTcp` 标记
- 插件加载但缺少命令：
  确认行为和资源包均已附加到世界并且 BDS 已重新启动
- 客户端已连接但没有接近：
  确认绑定流程、`PositioningType` 和玩家位置更新

## 阅读下一篇

- [VoiceCraft.Addon](/ecosystem/voicecraft-addon)
- [Addon API](/ecosystem/addon-api)
- [Download Page](/download)
- [Addon Configurator](/addon-configurator)
