# VoiceCraft（存储库和构建）

主仓库：[gitlab.avion.team/voicecraft/VoiceCraft](https://gitlab.avion.team/voicecraft/VoiceCraft)

GitHub 仅作为公开镜像：[AvionBlock/VoiceCraft](https://github.com/AvionBlock/VoiceCraft)

`VoiceCraft` 存储库包含核心运行时。这是客户端、服务器、共享协议、网络模型和发布版本的来源。

您不需要从源代码构建正常部署。使用预构建版本，除非您正在开发 VoiceCraft 本身、调试特定构建或生成自定义运行时。

## 存储库结构

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

## 存储库包含什么

存储库比“客户端+服务器”更广泛：

- 完整的客户端设置模型
- 嵌入式语言环境
- 面向 Minecraft 的传输：
  `McHttp`、`McWss`、`McTcp`
- VoiceCraft 和 McApi 层的数据包定义
- 音频效果和可视性系统

了解这个存储库不是什么也很重要：VoiceCraft 不是一个单一的 Minecraft 模组或插件。核心运行时与客户端和 Minecraft 端集成（例如 `VoiceCraft.Addon` 或 `GeyserVoice`）协同工作。

## 构建要求

从源代码来看：

- .NET SDK `9.0.312`
- `rollForward: latestMinor`

本地检查：

```bash
dotnet --info
```

## 构建解决方案

当您想要验证完整的解决方案或生成本地二进制文件时，请使用此选项：

```bash
git clone https://gitlab.avion.team/voicecraft/VoiceCraft.git
cd VoiceCraft

dotnet restore
dotnet build -c Release
```

如果恢复失败，请确认已安装的 .NET SDK 与存储库 `global.json` 期望相符。

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

额外的 `--` 将参数传递给服务器项目而不是 `dotnet run` 本身。

对于部署，优先选择已发布的版本工件或 `dotnet publish` 输出，而不是直接从源运行。

## 客户端构建

示例：

```bash
dotnet build VoiceCraft.Client/VoiceCraft.Client.Windows -c Release
dotnet build VoiceCraft.Client/VoiceCraft.Client.Linux -c Release
dotnet build VoiceCraft.Client/VoiceCraft.Client.MacOS -c Release
```

移动目标通常需要自己的平台 SDK 工具链。

桌面构建更加简单，因为所需的 SDK 是 .NET/Avalonia 工具链的一部分。移动构建可能需要核心解决方案构建之外的特定于平台的签名和打包步骤。

## 嵌入式语言环境

当前的嵌入式语言环境包括：

- `en-US`
- `ru-RU`
- `nl-NL`
- `de-DE`
- `pl-PL`
- `zh-CN`
- `zh-TW`

## 生产清单

1. 运行 `VoiceCraft.Server` 一次以生成配置。
2. 替换所有生成的传输令牌。
3. 决定您实际需要哪种传输：
   - `McHttp`
   - `McWss`
   - `McTcp`
4. 仅打开所需的端口。
5. 保留 `ServerProperties.json` 的备份。
6. 安装匹配的 Minecraft 端集成。
7. 确认客户端和 Minecraft 集成通过其单独的端点进行连接。

## 何时使用此页面

- 您想要构建或调试核心 VoiceCraft
- 您需要了解哪个项目拥有客户端/服务器行为
- 您正在检查某个功能是否属于核心、插件或 GeyserVoice
- 您正在准备自定义发布工件

## 相关文档

- [服务器安装](/server/installation)
- [ServerProperties.json](/server/server-properties)
- [传输模式](/server/transports)
- [VoiceCraft.Addon](/ecosystem/voicecraft-addon)
- [GeyserVoice](/ecosystem/geyservoice)
