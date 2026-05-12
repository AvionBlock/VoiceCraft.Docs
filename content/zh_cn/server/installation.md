# 服务器安装

`VoiceCraft.Server` is the standalone backend that accepts client voice traffic and exposes Minecraft-facing transports.

## 服务器实际包含什么

VoiceCraft 服务器同时公开多个层：

- VoiceCraft UDP语音服务器
- `McHttp` transport for Bedrock integrations
- `McWss` transport for websocket / command-tunnel Bedrock flows
- `McTcp` transport for Java-side bridges such as `GeyserVoice`

您可以将它们全部启用，或者在运行时选择传输。

## 预构建的二进制版本

发布页面通常包括：

- 窗户：
  `VoiceCraft.Server.Windows.x64.zip`, `x86`, `arm64`
- Linux：
  `VoiceCraft.Server.Linux.x64.zip`, `arm`, `arm64`

下载：[下载页面](/download)

## 窗口

1. Download `VoiceCraft.Server.Windows.<arch>.zip`.
2. 将存档解压到专用文件夹。
3. 开始：

```powershell
./VoiceCraft.Server.exe
```

## Linux

1. Download `VoiceCraft.Server.Linux.<arch>.zip`.
2. 解压存档。
3. 开始：

```bash
chmod +x ./VoiceCraft.Server
./VoiceCraft.Server
```

## macOS

可能并不总是有预先构建的专用工件，但可以从源代码构建服务器：

```bash
git clone https://github.com/AvionBlock/VoiceCraft.git
cd VoiceCraft/VoiceCraft.Server
dotnet restore
dotnet publish -c Release -r osx-arm64 -p:PublishSingleFile=true
```

For Intel macOS, replace `osx-arm64` with `osx-x64`.

## Docker/容器

容器镜像是从主仓库自述文件中引用的：

- [VoiceCraft Docker 中心](https://hub.docker.com/r/sinevector241/voicecraft/tags)

容器部署在以下情况下很有用：

- 您想要一个专门的服务边界
- 您已经在容器中运行 BDS / Java 节点
- 您想要更轻松的重启策略和日志

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
- 不要在同一文件夹中混合多个环境

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

## 从源代码构建

请参阅 [VoiceCraft 仓库和构建](/ecosystem/voicecraft-repository) 了解 SDK 和项目详细信息。

最小流量：

```bash
git clone https://github.com/AvionBlock/VoiceCraft.git
cd VoiceCraft
dotnet restore
dotnet build -c Release
dotnet run --project VoiceCraft.Server
```

## 接下来要读什么

- [首次服务器运行](/server/first-run)
- [ServerProperties.json](/server/server-properties)
- [运行时覆盖](/server/runtime-overrides)
- [传输模式](/server/transports)
