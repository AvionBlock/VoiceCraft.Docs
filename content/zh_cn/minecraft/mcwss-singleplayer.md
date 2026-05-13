# 单人世界的 McWss

`McWss` 是 websocket / 命令隧道传输，主要用于本地世界和轻量级Bedrock设置。

当您未运行完整的 Bedrock 专用服务器并且需要本地 Bedrock 世界通过 `/connect` websocket 流与 VoiceCraft 对话时，请使用本指南。

目标形状：

```text
VoiceCraft.Client -> VoiceCraft UDP endpoint
Local Bedrock world + VoiceCraft.Addon.Core.McWss -> McWss websocket endpoint
```

## 何时使用它

在以下情况下使用 `McWss`：

- 你在本地 Bedrock 世界中玩
- 你想要快速的单人游戏设置
- 您正在没有专用 BDS 主机的情况下测试插件逻辑

如果您运行真正的Bedrock 专用服务器，请改用 [McHttp for BDS](/minecraft/mchttp-bds)。

## 重要限制

- 通常不如 `McHttp` 稳定
- 命令吞吐量和有效负载大小非常重要
- 不是大型公共生产环境的默认建议
- 取决于您的环境中可用的 Bedrock websocket 和命令行为

## 要求

1. `VoiceCraft.Server` 与 `McWssConfig.Enabled = true`
2. `VoiceCraft.Addon.Core.McWss.zip`
3. 支持所需的 websocket/脚本功能的Bedrock构建
4. VoiceCraft 客户端已安装并配置
5. 匹配 `McWssConfig.LoginToken` 用于插件身份验证

有用的链接：

- [下载页面](/download) 用于 `Core.McWss` 发行包
- [附加包配置器](/addon-configurator) 用于可直接解压的世界归档

## VoiceCraft 服务器配置

典型设置：

```json
{
  "McWssConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-token",
    "Hostname": "ws://127.0.0.1:9051/",
    "MaxClients": 1,
    "MaxTimeoutMs": 10000,
    "DataTunnelCommand": "voicecraft:data_tunnel",
    "CommandsPerTick": 3,
    "MaxByteLengthPerCommand": 300,
    "DisabledPacketTypes": []
  }
}
```

保持 `DataTunnelCommand` 与插件包保持一致。如果您在服务器配置中更改它，则插件必须使用相同的命令名称。

对于本地单人游戏测试，请将 websocket 主机保留在 `127.0.0.1` 上。仅当Bedrock 世界从另一台机器连接时才使用更宽的绑定。

## 安装

### 选项 1：导入为 `.mcaddon`

1. 将存档重命名为 `VoiceCraft.Addon.Core.McWss.mcaddon`。
2. 打开它，让 Minecraft 导入插件。
3. 启用世界中的行为包和资源包。

### 选项 2：手动复制

1. 提取存档。
2. 将 `RP` 和 `BP` 复制到 Bedrock 目录。
3. 在目标世界中启用这两个包。

资源包提供可见的资产。行为包提供命令、脚本和桥接逻辑。

## 连接流程

### 第1步：连接世界websocket

```text
/connect <VOICECRAFT_HOST>:<MCWSS_PORT>
```

示例：

```text
/connect 127.0.0.1:9051
```

这将Bedrock 世界连接到 VoiceCraft Websocket 传输。它尚未验证该插件。

### 第 2 步：验证插件

```text
/voicecraft:vcconnect <LOGIN_TOKEN>
```

使用 `McWssConfig.LoginToken`。

经过身份验证后，插件可以通过命令隧道发送实体并绑定数据。

## 数据隧道

该插件使用：

- `voicecraft:data_tunnel`

这必须与 `McWssConfig.DataTunnelCommand` 保持一致。

如果您重命名一侧而不重命名另一侧，那么桥梁就会断裂。

该命令当前携带：

- 可选的最大字符串长度参数
- 打包有效负载数据参数

隧道对命令吞吐量很敏感。大量的实体或效果更新可能会导致延迟或不稳定的交付，尤其是在低端计算机上。

## 调音

如果您发现延迟或数据包不稳定：

- 降低 `CommandsPerTick`
- 评论 `MaxByteLengthPerCommand`
- 避免大量突发更新
- 使用较少的活动实体进行测试
- 调整时保持本地设置
- 如果世界变成长期运行的共享服务器，则切换到 `McHttp`

## 何时切换到其他传输

在以下情况下移至 `McHttp`：

- 您运行真正的专用Bedrock服务器
- 您想要清洁生产部署
- 命令隧道不稳定成为问题

在这种情况下，请继续使用 [McHttp for BDS](/minecraft/mchttp-bds)。

## 验证清单

- `McWssConfig.Enabled = true`
- 世界可以运行 `/connect <host>:<port>`
- `/voicecraft:vcconnect <LOGIN_TOKEN>` 成功
- VoiceCraft 客户端连接到 UDP 端点
- `PositioningType` 客户端和服务器之间的匹配
- 绑定流程在游戏中有效
- 移动玩家会改变距离感行为

## 常见问题

- `/connect` 失败：
  检查主机/端口以及 Bedrock 是否允许您的环境中的 Websocket 连接。
- `vcconnect` 失败：
  确认您使用了 `McWssConfig.LoginToken`。
- 数据隧道错误：
  确认 `DataTunnelCommand` 与插件包匹配。
- 音频已连接，但距离感效果错误：
  检查绑定流程、定位模式以及位置更新是否到达。
