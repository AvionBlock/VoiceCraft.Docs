# 系统架构

本页解释了 VoiceCraft 的主要部分以及它们之间的关系。

## 主要层

### 客户端层

`VoiceCraft.Client` handles:

- 输入捕获
- 预处理
- UDP 传输到 VoiceCraft
- 播放和本地每用户偏好

### 服务器层

`VoiceCraft.Server` handles:

- 网络实体状态
- 语音客户端会话
- 适度标志
- 效果位掩码和音频效果默认值
- 面向 Minecraft 的传输

### Minecraft 集成层

这取决于拓扑：

- `VoiceCraft.Addon` for Bedrock
- `GeyserVoice` for Java / Geyser / proxy networks

## 核心数据概念

VoiceCraft 围绕实体而不仅仅是原始套接字。

实体携带状态，例如：

- 姓名
- 标题
- 描述
- 位置
- 旋转
- 世界ID
- 静音/失聪状态
- 效果位掩码

## 为什么传输是分开的

VoiceCraft 语音流量和 Minecraft 自动化并不总是存在于同一环境中。

这就是为什么：

- 客户端与核心语音服务器对话
- Bedrock 或 Java 集成通过传输层进行对话

这种分离保持了核心平台的灵活性。
