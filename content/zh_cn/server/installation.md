# 服务器安装

`VoiceCraft.Server` 是独立后端，接受客户端语音流量并公开面向 Minecraft 的传输。

使用此页面作为服务器设置路径。最后，您应该拥有一个正在运行的服务器、一个生成的配置、一个选择的 Minecraft 传输，以及一个用于 Minecraft 集成的清晰的下一页。

## 服务器实际包含什么

VoiceCraft 服务器同时公开多个层：

- VoiceCraft UDP 语音服务器
- `McHttp` 用于基岩集成的传输
- `McWss` 用于 websocket / 命令隧道基岩流的传输
- `McTcp` 用于 Java 端桥的传输，例如 `GeyserVoice`

您可以将它们全部启用，或者在运行时选择传输。

## 设置流程

1. 下载并解压适合您平台的服务器。
2. 从要保留配置的文件夹运行一次。
3. 生成 `config/ServerProperties.json` 后停止该进程。
4. 替换生成的登录令牌。
5. 启用与您的拓扑匹配的 Minecraft 传输。
6. 设置主机绑定和防火墙规则。
7. 再次启动服务器。
8. 在客户端中添加 VoiceCraft UDP 端点。
9. 将 Minecraft 端与匹配的插件或插件指南连接起来。

## 预构建的二进制版本

发布页面通常包括：

- Windows：
  `VoiceCraft.Server.Windows.x64.zip`、`x86`、`arm64`
- Linux：
  `VoiceCraft.Server.Linux.x64.zip`、`arm`、`arm64`

下载：[Download Page](/download)

## Windows

1. 下载`VoiceCraft.Server.Windows.<arch>.zip`。
2. 将存档解压到专用文件夹。
3. 从该文件夹启动服务器：

```powershell
./VoiceCraft.Server.exe
```

第一次运行创建 `config/ServerProperties.json`。将此文件保留在服务器文件夹中，并且不要在重新启动之间删除它。

## Linux

1. 下载`VoiceCraft.Server.Linux.<arch>.zip`。
2. 将存档解压到专用文件夹。
3. 从该文件夹启动服务器：

```bash
chmod +x ./VoiceCraft.Server
./VoiceCraft.Server
```

第一次运行创建 `config/ServerProperties.json`。将此文件保留在服务器文件夹中，并确保它包含在备份中。

## 第一次启动后

连接 Minecraft 或玩家之前，请停止服务器并打开 `config/ServerProperties.json`。

首先进行这些编辑：

1. 替换每个生成的共享令牌：
   - `McHttpConfig.LoginToken`
   - `McWssConfig.LoginToken`
   - `McTcpConfig.LoginToken`
2. 选择一种主要的 Minecraft 交通工具：
   - 基岩专用服务器：启用 `McHttpConfig`
   - 本地基岩世界：启用 `McWssConfig`
   - Java + Geyser/Floodgate：启用 `McTcpConfig`
3. 设置传输主机：
   - use `127.0.0.1` when Minecraft runs on the same machine
   - use `0.0.0.0` or a LAN/public address only when another machine must connect
4. 保持 `VoiceCraftConfig.Port` 对玩家客户端可用。
5. 保存配置后重新启动 `VoiceCraft.Server`。

For all config fields, continue with [First Server Run](/server/first-run) and [ServerProperties.json](/server/server-properties).

## 连接堆栈的其余部分

一旦服务器干净地重新启动：

1. Install the VoiceCraft client for each player from the [Download Page](/download).
2. 在客户端添加服务器条目：
   - 主机：您的 VoiceCraft 服务器地址
   - 端口：`VoiceCraftConfig.Port`，通常为 `9050`
3. Follow the Minecraft guide for your chosen transport:
   - [McHttp for BDS](/minecraft/mchttp-bds)
   - [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer)
   - [GeyserVoice](/ecosystem/geyservoice)

The server is not considered fully set up until the client connects and the Minecraft side authenticates with the same transport token.

## macOS

可能并不总是有预先构建的专用工件，但可以从源代码构建服务器：

```bash
git clone https://github.com/AvionBlock/VoiceCraft.git
cd VoiceCraft/VoiceCraft.Server
dotnet restore
dotnet publish -c Release -r osx-arm64 -p:PublishSingleFile=true
```

For Intel macOS, replace `osx-arm64` with `osx-x64`.

## Docker / containers

容器镜像是从主存储库自述文件中引用的：

- [VoiceCraft Docker Hub](https://hub.docker.com/r/sinevector241/voicecraft/tags)

容器部署在以下情况下很有用：

- 您需要专用的服务边界
- 您已经在容器中运行 BDS / Java 节点
- 您想要更轻松的重启策略和日志

After the container starts, persist and edit the generated `config/ServerProperties.json` the same way you would for a normal binary install.

## 推荐的安装布局

Linux 布局示例：

```text
/opt/voicecraft/
  VoiceCraft.Server
  config/
    ServerProperties.json
```

推荐做法：

- 将 VoiceCraft 保存在自己的目录中
- persist `config/`
- back up `ServerProperties.json`
- do not mix multiple environments in the same folder

## Ready checklist

在向玩家开放设置之前，请确认：

- `VoiceCraft.Server` starts without config or port errors
- all generated `LoginToken` values were replaced
- 仅暴露您需要的运输
- 客户端主机和端口匹配 `VoiceCraftConfig.Port`
- Minecraft addon or plugin uses the matching transport token
- 绑定流程在游戏中有效

## 作为 systemd 服务运行 (Linux)

Example `/etc/systemd/system/voicecraft.service`:

```ini
[Unit]
Description=VoiceCraft Server
After=network.target

[Service]
WorkingDirectory=/opt/voicecraft
ExecStart=/opt/voicecraft/VoiceCraft.Server
Restart=always
RestartSec=3
User=voicecraft
Group=voicecraft

[Install]
WantedBy=multi-user.target
```

应用它：

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now voicecraft
sudo systemctl status voicecraft
```

## Build from source

有关 SDK 和项目详细信息，请参阅 [VoiceCraft repository and build](/ecosystem/voicecraft-repository)。

最小流量：

```bash
git clone https://github.com/AvionBlock/VoiceCraft.git
cd VoiceCraft
dotnet restore
dotnet build -c Release
dotnet run --project VoiceCraft.Server
```

## 接下来读什么

- [First Server Run](/server/first-run)
- [ServerProperties.json](/server/server-properties)
- [Transport Modes](/server/transports)
- [Client Installation](/client/installation)
- [McHttp for BDS](/minecraft/mchttp-bds)
- [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer)
- [GeyserVoice](/ecosystem/geyservoice)
