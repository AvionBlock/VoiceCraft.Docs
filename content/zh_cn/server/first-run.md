# 第一个服务器运行

## 第一次启动时会发生什么

On startup, VoiceCraft looks for `ServerProperties.json` in the current directory and subdirectories.

如果找不到该文件，服务器会自动创建：

- `config/`
- `config/ServerProperties.json`

该文件成为服务器行为的主要持久事实来源。

## 默认端口和端点

默认情况下，生成的配置是这样对齐的：

- VoiceCraft UDP: `9050`
- `McHttp`: `http://127.0.0.1:9050/`
- `McWss`: `ws://127.0.0.1:9051/`
- `McTcp`: `127.0.0.1:9050`

注意事项：

- UDP voice traffic and some transport defaults share `9050`
- `McWss` is separated by default on `9051`
- `McTcp` is especially relevant for `GeyserVoice`

## 启动参数

VoiceCraft 服务器支持这些根参数：

- `--exit-on-invalid-properties`
  Exit if `ServerProperties.json` cannot be parsed.
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

### Run only `McTcp` for a Java bridge

```bash
./VoiceCraft.Server --transport-mode tcp --transport-host 0.0.0.0 --transport-port 9050
```

### Run only `McHttp`

```bash
./VoiceCraft.Server --transport-mode http --transport-host 0.0.0.0 --transport-port 9050
```

### 覆盖令牌而不编辑 JSON

```bash
./VoiceCraft.Server --server-key "replace-with-secure-token"
```

## 传输覆盖的行为方式

Runtime overrides do not permanently rewrite `ServerProperties.json`.

它们仅适用于当前流程，并且在以下情况下很有用：

- 从一个映像运行多个环境
- 使用面板或 systemd 插件
- 测试直接与代理拓扑
- letting another tool such as `GeyserVoice` launch the runtime with generated values

## 首次运行清单

1. 更改所有生成的登录令牌。
2. 确认您实际需要哪种交通工具：
   - `McHttp` for BDS
   - `McWss` for local worlds
   - `McTcp` for `GeyserVoice`
3. 验证主机绑定。
4. 仅打开您需要的端口。
5. Confirm `PositioningType` with your clients.
6. 在连接 Minecraft 自动化之前测试客户端连接。

## 常见的首次运行错误

- 保持生成的令牌不变
- exposing `127.0.0.1` endpoints to remote nodes
- forgetting that `McTcp` may be required by Java-side bridges
- 无需实际需要即可实现生产中的每一种传输

有关完整配置参考，请参阅 [ServerProperties.json](/server/server-properties)。
