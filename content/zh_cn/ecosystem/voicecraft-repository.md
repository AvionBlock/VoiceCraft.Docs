# VoiceCraft（仓库和构建）

仓库：[AvionBlock/VoiceCraft](https://github.com/AvionBlock/VoiceCraft)

## 仓库结构

- `VoiceCraft.Client/*`
  适用于 Windows、Linux、macOS、Android、iOS 和浏览器相关目标的平台客户端
- `VoiceCraft.Server`
  独立的 VoiceCraft 后端
- `VoiceCraft.Core`
  共享核心实用程序、音频助手、本地化、常量
- `VoiceCraft.Network`
  协议包、传输、实体、效果、世界逻辑
- 测试项目
  协议、网络和集成覆盖范围

## 仓库包含什么

仓库比“客户端+服务器”更广泛：

- 完整的客户端设置模型
- 嵌入式语言环境
- 面向 Minecraft 的传输：
  `McHttp`, `McWss`, `McTcp`
- VoiceCraft 和 McApi 层的数据包定义
- 音频效果和可视性系统

## 构建要求

从源代码来看：

- .NET SDK `9.0.312`
- `rollForward: latestMinor`

本地检查：

```bash
dotnet --info
```

## 构建解决方案

```bash
git clone https://github.com/AvionBlock/VoiceCraft.git
cd VoiceCraft

dotnet restore
dotnet build -c Release
```

## 运行服务器

```bash
dotnet run --project VoiceCraft.Server -- --language en-US
```

有用的根选项：

- `--language <locale>`
- `--exit-on-invalid-properties`
- `--transport-mode <http|tcp|wss>`
- `--transport-host <host>`
- `--transport-port <port>`
- `--server-key <token>`

## 客户端构建

示例：

```bash
dotnet build VoiceCraft.Client/VoiceCraft.Client.Windows -c Release
dotnet build VoiceCraft.Client/VoiceCraft.Client.Linux -c Release
dotnet build VoiceCraft.Client/VoiceCraft.Client.MacOS -c Release
```

移动目标通常需要自己的平台 SDK 工具链。

## 嵌入语言环境

当前的嵌入式语言环境包括：

- `en-US`
- `ru-RU`
- `nl-NL`
- `de-DE`
- `pl-PL`
- `zh-CN`
- `zh-TW`

## 生产清单

1. Run `VoiceCraft.Server` once to generate config.
2. 替换所有生成的传输令牌。
3. 决定您实际需要哪种交通工具：
   - `McHttp`
   - `McWss`
   - `McTcp`
4. 仅打开所需的端口。
5. Keep backups of `ServerProperties.json`.

## 相关文档

- [服务器安装](/server/installation)
- [ServerProperties.json](/server/server-properties)
- [传输模式](/server/transports)
- [VoiceCraft.Addon](/ecosystem/voicecraft-addon)
- [GeyserVoice](/ecosystem/geyservoice)
