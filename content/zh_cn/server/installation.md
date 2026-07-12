# 服务器安装

`VoiceCraft.Server` 是独立后端，用于接收客户端语音流量，并公开面向 Minecraft 的传输。

使用此页面作为服务器设置路径。完成后，您应该拥有一个正在运行的服务器、一份生成的配置、一个已选择的 Minecraft 传输，以及下一步 Minecraft 集成指南。

## 服务器实际包含什么

VoiceCraft 服务器同时公开多个层：

- VoiceCraft UDP 语音服务器
- `McHttp`，用于 Bedrock 集成的传输
- `McWss`，用于 WebSocket/命令隧道 Bedrock 流程的传输
- `McTcp` 用于 Java 端桥的传输，例如 `VoiceCraft.Java`

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
9. 将 Minecraft 端接到匹配的附加包或插件指南。

## 预构建的二进制版本

发布页面通常包括：

- Windows：
  `VoiceCraft.Server.Windows.x64.v1.7.0.zip`、`x86`、`arm64`
- Linux：
  `VoiceCraft.Server.Linux.x64.v1.7.0.zip`、`arm`、`arm64`

下载：[下载页面](/download)

## Windows

1. 下载 `VoiceCraft.Server.Windows.<arch>.v1.7.0.zip`。
2. 将存档解压到专用文件夹。
3. 从该文件夹启动服务器：

```powershell
./VoiceCraft.Server.exe
```

第一次运行创建 `config/ServerProperties.json`。将此文件保留在服务器文件夹中，并且不要在重新启动之间删除它。

## Linux

1. 下载 `VoiceCraft.Server.Linux.<arch>.v1.7.0.zip`。
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
2. 选择一个主要的 Minecraft 传输：
   - Bedrock 专用服务器：启用 `McHttpConfig`
   - 本地 Bedrock 世界：启用 `McWssConfig`
   - Java + Geyser/Floodgate：启用 `McTcpConfig`
3. 设置传输主机：
   - 当 Minecraft 与 VoiceCraft 在同一台机器上运行时，使用 `127.0.0.1`
   - 只有在另一台机器必须连接时，才使用 `0.0.0.0` 或 LAN/公网地址
4. 保持 `VoiceCraftConfig.Port` 对玩家客户端可用。
5. 保存配置后重新启动 `VoiceCraft.Server`。

所有配置字段请继续阅读 [服务器首次运行](/server/first-run) 和 [ServerProperties.json](/server/server-properties)。

## 连接堆栈的其余部分

一旦服务器干净地重新启动：

1. 从 [下载页面](/download) 为每位玩家安装 VoiceCraft 客户端。
2. 在客户端添加服务器条目：
   - 主机：您的 VoiceCraft 服务器地址
   - 端口：`VoiceCraftConfig.Port`，通常为 `9050`
3. 按照所选传输对应的 Minecraft 指南操作：
   - [McHttp for BDS](/minecraft/mchttp-bds)
   - [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer)
   - [VoiceCraft.Java](/ecosystem/voicecraft-java)

只有在客户端成功连接，并且 Minecraft 端使用相同传输令牌完成身份验证后，服务器才算完成设置。

## macOS

可能并不总是有预先构建的专用工件，但可以从源代码构建服务器：

```bash
git clone https://gitlab.avion.team/voicecraft/VoiceCraft.git
cd VoiceCraft/VoiceCraft.Server
dotnet restore
dotnet publish -c Release -r osx-arm64 -p:PublishSingleFile=true
```

对于 Intel macOS，请将 `osx-arm64` 替换为 `osx-x64`。

## Docker / 容器

容器镜像是从主存储库自述文件中引用的：

- [VoiceCraft Docker Hub](https://hub.docker.com/r/sinevector241/voicecraft/tags)

容器部署在以下情况下很有用：

- 您需要专用的服务边界
- 您已经在容器中运行 BDS / Java 节点
- 您想要更轻松的重启策略和日志

容器启动后，请像普通二进制安装一样保留并编辑生成的 `config/ServerProperties.json`。

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
- 保留 `config/`
- 备份 `ServerProperties.json`
- 不要在同一个文件夹中混用多个环境

## 完成检查表

在向玩家开放设置之前，请确认：

- `VoiceCraft.Server` 启动时没有配置或端口错误
- 所有生成的 `LoginToken` 值都已替换
- 仅暴露您需要的传输
- 客户端主机和端口匹配 `VoiceCraftConfig.Port`
- Minecraft 附加包或插件使用匹配的传输令牌
- 绑定流程在游戏中有效

## 作为 systemd 服务运行 (Linux)

示例 `/etc/systemd/system/voicecraft.service`：

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

## 从源代码构建

有关 SDK 和项目详细信息，请参阅 [VoiceCraft 仓库和构建](/ecosystem/voicecraft-repository)。

最小流程：

```bash
git clone https://gitlab.avion.team/voicecraft/VoiceCraft.git
cd VoiceCraft
dotnet restore
dotnet build -c Release
dotnet run --project VoiceCraft.Server
```

## 接下来阅读

- [服务器首次运行](/server/first-run)
- [ServerProperties.json](/server/server-properties)
- [传输模式](/server/transports)
- [客户端安装](/client/installation)
- [McHttp for BDS](/minecraft/mchttp-bds)
- [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer)
- [VoiceCraft.Java](/ecosystem/voicecraft-java)
