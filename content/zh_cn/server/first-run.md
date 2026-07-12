# 服务器首次运行

此页面从您已经下载并启动过一次 `VoiceCraft.Server` 的位置开始。目标是把第一次启动变成客户端和 Minecraft 都能实际使用的服务器。

## 第一次启动时会发生什么

启动时，VoiceCraft 会在当前目录和子目录中查找 `ServerProperties.json`。

如果找不到该文件，服务器会自动创建：

- `config/`
- `config/ServerProperties.json`

该文件会成为服务器行为的主要持久配置来源。

文件出现后，停止服务器，编辑配置，然后再次启动。第一次启动只会创建基础配置；设置尚未完成。

## 默认端口和端点

默认情况下，生成的配置如下：

- VoiceCraft UDP：`9050`
- `McHttp`：`http://127.0.0.1:9050/`
- `McWss`：`ws://127.0.0.1:9051/`
- `McTcp`：`127.0.0.1:9050`

注意事项：

- UDP 语音流量和某些传输默认值共享 `9050`
- `McWss` 默认在 `9051` 上分隔
- `McTcp` 与 `VoiceCraft.Java` 特别相关

## 线性的首次运行流程

### 1. 停止服务器并打开生成的配置

打开：

```text
config/ServerProperties.json
```

将此文件保存在同一安装文件夹中并将其包含在备份中。

### 2. 替换生成的令牌

在任何附加包、插件或玩家客户端连接之前，替换：

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

使用您稍后实际连接的传输中的令牌。例如，BDS `vcconnect` 命令必须使用 `McHttpConfig.LoginToken`，而 VoiceCraft.Java 必须使用 `McTcpConfig.LoginToken`。

### 3. 选择一个主要的 Minecraft 传输

使用拓扑来决定应启用什么：

| 设置 | 启用 | 继续 |
|-------|--------|---------------|
| Bedrock 专用服务器 | `McHttpConfig` | [McHttp for BDS](/minecraft/mchttp-bds) |
| 本地 Bedrock 世界 | `McWssConfig` | [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer) |
| Java + Geyser/Floodgate | `McTcpConfig` | [VoiceCraft.Java](/ecosystem/voicecraft-java) |

您可以运行多个传输，但首次设置只开放所需传输时更容易调试。

### 4. 设置主机绑定

当一切都在一台机器上运行时使用本地绑定：

- `McHttpConfig.Hostname = http://127.0.0.1:9050/`
- `McWssConfig.Hostname = ws://127.0.0.1:9051/`
- `McTcpConfig.Hostname = 127.0.0.1`

仅当另一台计算机、容器或游戏主机必须到达 VoiceCraft 时才使用 `0.0.0.0`。

### 5. 重启服务器

从同一文件夹再次启动 `VoiceCraft.Server`。注意：

- 无效的 JSON 错误
- 端口已被占用的错误
- 监听器或绑定失败的错误

继续之前先修复这些问题。只要服务器仍在报告启动错误，Minecraft 附加包或插件就无法可靠连接。

### 6. 连接 VoiceCraft 客户端

从 [下载页面](/download) 安装客户端，然后添加服务器条目：

- 主机：VoiceCraft 服务器地址
- 端口：`VoiceCraftConfig.Port`，通常为 `9050`

对于本地测试，请使用：

```text
127.0.0.1:9050
```

确保客户端 `Positioning Type` 与 `VoiceCraftConfig.PositioningType` 匹配。

### 7. 连接 Minecraft

继续阅读与您启用的传输相匹配的指南：

- [McHttp for BDS](/minecraft/mchttp-bds)
- [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer)
- [VoiceCraft.Java](/ecosystem/voicecraft-java)

当提示输入令牌时，请使用 `ServerProperties.json` 中的匹配传输令牌。

### 8. 验证设置

第一次设置完成时：

- 服务器日志没有配置或监听器错误
- VoiceCraft 客户端连接到 UDP 端点
- Minecraft 通过选定的传输方式进行身份验证
- 游戏内绑定流程有效
- 玩家位置更新能够到达 VoiceCraft
- 距离感语音在预期范围内工作

## 启动参数

VoiceCraft 服务器支持这些根参数：

- `--exit-on-invalid-properties`
  如果无法解析 `ServerProperties.json`，则退出。
- `--language <culture>`
  覆盖当前运行的服务器日志语言。
- `--transport-mode <mode>`
  为当前运行启用 Minecraft 传输的子集。
- `--transport-host <host>`
  覆盖配置的 Minecraft 传输主机。
- `--transport-port <port>`
  覆盖配置的 Minecraft 传输端口。
- `--server-key <token>`
  覆盖当前运行的共享 Minecraft 端登录令牌。

代码中也存在短别名：

- `-eip`
- `-l`
- `-tm`
- `-th`
- `-tp`
- `-sk`

## 示例

### 使用启动语言覆盖运行

```bash
./VoiceCraft.Server --language en-US
```

### 如果配置无效则退出

```bash
./VoiceCraft.Server --exit-on-invalid-properties
```

### 仅针对 Java 桥运行 `McTcp`

```bash
./VoiceCraft.Server --transport-mode tcp --transport-host 0.0.0.0 --transport-port 9050
```

### 仅运行 `McHttp`

```bash
./VoiceCraft.Server --transport-mode http --transport-host 0.0.0.0 --transport-port 9050
```

### 覆盖令牌而不编辑 JSON

```bash
./VoiceCraft.Server --server-key "replace-with-secure-token"
```

## 传输覆盖的行为方式

运行时覆盖不会永久重写 `ServerProperties.json`。

它们仅适用于当前流程，并且在以下情况下很有用：

- 从同一个镜像运行多个环境
- 使用面板或 systemd 插件
- 测试直接与代理拓扑
- 让另一个工具（例如 `VoiceCraft.Java`）使用生成的值启动运行时

## 首次运行检查表

1. 运行服务器一次以生成 `config/ServerProperties.json`。
2. 在编辑生成的配置之前停止服务器。
3. 更改所有生成的登录令牌。
4. 确认您实际需要哪种传输：
   - BDS 的 `McHttp`
   - `McWss` 用于本地世界
   - `McTcp` 用于 `VoiceCraft.Java`
5. 验证主机绑定。
6. 仅打开您需要的端口。
7. 从同一安装文件夹重新启动服务器。
8. 与客户端确认 `PositioningType`。
9. 在连接 Minecraft 自动化之前测试客户端连接。
10. 连接 Minecraft 附加包或插件并验证绑定流程。

## 常见的首次运行错误

- 保持生成的令牌不变
- 将 `127.0.0.1` 端点暴露给远程节点
- 忘记 Java 端桥可能需要 `McTcp`
- 在生产环境中启用每一种传输，即使并不需要
- 编辑 `ServerProperties.json` 而进程管理器立即重新启动旧的损坏的配置
- 使用 Minecraft 指南期望传输端点的 UDP 客户端端口

有关完整配置参考，请参阅 [ServerProperties.json](/server/server-properties)。
