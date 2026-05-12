# 传输模式

VoiceCraft 有多个面向 Minecraft 的传输层。选择正确的产品对于稳定性和部署简单性非常重要。

## 快速比较

|交通 |典型用途|默认形状|最适合 |
|-----------|-------------|---------------|----------|
| `McHttp` | Bedrock Dedicated Server | HTTP endpoint | stable Bedrock server integration |
| `McWss` | local worlds / singleplayer | websocket + command tunnel | testing, local worlds, lightweight setups |
| `McTcp` | Java-side bridge | raw TCP bridge | `GeyserVoice`, proxy or Paper bridge scenarios |

## McHttp

### 最佳用例

- 基岩专用服务器
- 稳定的脚本基岩世界
- 游戏服务器可以调用 HTTP 端点的环境

### 优势

- 最简单的北斗系统生产传输
- 简单的端点模型
- 非常适合面板、反向网络布局和专用主机

### 权衡

- 需要从 Bedrock 服务器到 VoiceCraft 的网络可达性
- 可能会被某些托管提供商阻止

## McWss

### 最佳用例

- 当地基岩世界
- 单人游戏测试
- setups using `/connect` and command tunneling

### 优势

- 无需独立的 BDS HTTP 工作流程即可工作
- 适用于开发和本地演示

### 权衡

- 在重负载压力下稳定性较差
- sensitive to `CommandsPerTick` and payload chunking limits
- 通常不是公共生产环境的首选

## McTcp

### 最佳用例

- `GeyserVoice`
- Java服务器或代理桥
- 直接 Paper 运行时集成

### 优势

- Java端插件的直接桥接传输
- 当本机 TCP 桥更好时避免 HTTP 端点语义
- aligns with current `GeyserVoice` architecture

### 权衡

- 另一个要管理的端口
- 当您实际运行 Java 端桥时最有用

## 您应该选择哪一个？

### 基岩专用服务器

Use `McHttp`.

### 基岩单人游戏/本地世界

Use `McWss`.

### Java + Geyser/Floodgate

Use `McTcp` through `GeyserVoice`.

### 混合网络

您可以运行多种传输，但只公开您真正需要的。

## 安全建议

- 替换所有登录令牌
- bind to `127.0.0.1` when the consumer is local
- bind to `0.0.0.0` only when remote access is required
- 保持每个传输严格的防火墙规则
