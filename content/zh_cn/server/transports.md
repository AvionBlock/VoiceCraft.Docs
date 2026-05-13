# 传输模式

VoiceCraft 有多个面向 Minecraft 的传输层。选择正确的传输对于稳定性和部署简单性非常重要。

传输是 Minecraft 自动化将状态发送到 `VoiceCraft.Server` 的路径。它与玩家客户端使用的 UDP 语音端点分开。

在编辑 `McHttpConfig`、`McWssConfig` 或 `McTcpConfig` 之前使用此页面。

## 快速比较

| 传输 | 典型使用方 | 端点形式 | 最适合 | 令牌字段 |
|-----------|------------------|----------------|----------|-------------|
| `McHttp` | `VoiceCraft.Addon.Core.McHttp` | HTTP 端点 | Bedrock 专用服务器 | `McHttpConfig.LoginToken` |
| `McWss` | `VoiceCraft.Addon.Core.McWss` | WebSocket + 命令隧道 | 本地 Bedrock 世界和测试 | `McWssConfig.LoginToken` |
| `McTcp` | `GeyserVoice` | 原始 TCP 桥 | Java、Geyser、代理或 Paper 桥接方案 | `McTcpConfig.LoginToken` |

不要仅根据端口号选择传输。根据将连接的 Minecraft 端组件进行选择。

## McHttp

`McHttp` 公开一个 Bedrock 专用服务器附加包可以调用的 HTTP 端点。

### 最佳用例

- Bedrock 专用服务器
- 稳定的脚本 Bedrock 世界
- 游戏服务器可以调用 HTTP 端点的环境

### 优势

- 最简单的 BDS 生产传输
- 简单端点模型
- 非常适合面板、反向网络布局和专用主机

### 权衡

- 需要从 Bedrock 服务器到 VoiceCraft 的网络可达性
- 可能会被某些托管提供商阻止
- 需要插件所需的 BDS 脚本/模块权限

### 典型配置

```json
{
  "McHttpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-token",
    "Hostname": "http://0.0.0.0:9050/"
  }
}
```

仅当 BDS 和 VoiceCraft 在同一主机上运行时才使用 `http://127.0.0.1:9050/`。

## McWss

`McWss` 公开一个 WebSocket 端点，并在 Bedrock 世界中使用命令隧道。

### 最佳用例

- 本地 Bedrock 世界
- 单人游戏测试
- 使用 `/connect` 和命令隧道进行设置

### 优势

- 无需独立的 BDS HTTP 工作流程即可工作
- 适用于开发和本地演示

### 权衡

- 在重负载压力下稳定性较差
- 对 `CommandsPerTick` 和有效负载分块限制敏感
- 通常不是公共生产环境的首选

### 典型配置

```json
{
  "McWssConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-token",
    "Hostname": "ws://127.0.0.1:9051/",
    "DataTunnelCommand": "voicecraft:data_tunnel"
  }
}
```

当您需要本地 `/connect` 流时，请使用此选项。对于真正的 BDS 生产服务器，首选 `McHttp`。

## McTcp

`McTcp` 公开 Java 端基础设施使用的原始 TCP 桥。

### 最佳用例

- `GeyserVoice`
- Java 服务器或代理桥
- 直接 Paper 运行时集成

### 优势

- Java 端插件的直接桥接传输
- 当本机 TCP 桥接更好时避免 HTTP 端点语义
- 与当前 `GeyserVoice` 架构保持一致

### 权衡

- 另一个要管理的端口
- 当您实际运行 Java 端桥时最有用
- Bedrock 附加包不使用

### 典型配置

```json
{
  "McTcpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-token",
    "Hostname": "0.0.0.0",
    "Port": 9050
  }
}
```

如果 `GeyserVoice` 与 VoiceCraft 在同一台计算机上运行，则绑定到 `127.0.0.1`。如果它在其他地方运行，请绑定到插件可以到达并限制防火墙的地址。

## 你应该选择哪一个？

### Bedrock 专用服务器

使用 `McHttp`。

继续阅读 [McHttp for BDS](/minecraft/mchttp-bds)。

### Bedrock 单人/本地世界

使用 `McWss`。

继续阅读 [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer)。

### Java + Geyser/Floodgate

使用 `McTcp` 到 `GeyserVoice`。

继续阅读 [GeyserVoice](/ecosystem/geyservoice)。

### 混合网络

您可以运行多种传输，但只公开您真正需要的。

常见的混合情况：

- Bedrock BDS 加 Java 桥：
  启用 `McHttp` 和 `McTcp`
- 本地测试，而生产仍在 BDS 上：
  运行单独的测试服务器文件夹而不是重用生产令牌
- 代理网络：
  通常仅向代理所有者公开 `McTcp`

## 安全建议

- 替换所有登录令牌
- 当消费者是本地时绑定到 `127.0.0.1`
- 仅当需要远程访问时才绑定到 `0.0.0.0`
- 保持每个传输的防火墙规则严格
- 不要仅仅因为不活动的传输可用而暴露它们

## 验证清单

- 选择的传输 `Enabled` 字段是 `true`
- 匹配的附加包或插件已安装
- 端点主机/端口可从 Minecraft 端运行时访问
- 附加包或插件令牌与正确的 `LoginToken` 匹配
- 服务器日志显示传输使用方已连接
- 绑定流程在传输登录后起作用
