# VoiceCraft.Addon（基岩插件）

存储库：[AvionBlock/VoiceCraft.Addon](https://github.com/AvionBlock/VoiceCraft.Addon)

该存储库包含实用的 Bedrock 插件包和用于自定义世界逻辑的脚本端 McApi 界面。

当 Minecraft 基岩是玩家/实体状态的来源时使用它。该插件通过 `McHttp` 或 `McWss` 将基岩世界连接到 VoiceCraft 服务器，然后公开世界脚本的绑定流、UI、事件和数据包帮助程序。

快速链接：

- [Download Page](/download)
- [Addon Configurator](/addon-configurator)
- [Addon Releases](https://github.com/AvionBlock/VoiceCraft.Addon/releases/latest)

## 套餐

| 套餐 | 目的 | 使用时 |
|---------|---------|----------|
| `Basic` | 即用型绑定流程、设置 UI、游戏内语音指示器、常见脚本事件 | 您需要工作参考或默认基岩行为 |
| `Core.McHttp` | HTTP传输包 | 您运行基岩专用服务器 |
| `Core.McWss` | websocket / 命令隧道传输包 | 您运行本地基岩世界或测试设置 |

大多数真实的基岩设置将传输包与世界所需的行为/UI 部分结合起来。

## 版本对齐

VoiceCraft `v1.6.1` 需要更新插件包以及客户端/服务器版本。此版本包括游戏内语音图标、自动连接生活质量、广播事件以及依赖于匹配插件端包的 McHttp/McWss 断开连接修复。

不要升级服务器/客户端并留下旧的插件包。不匹配的包可以连接，但稍后会在绑定、事件或图标行为期间失败。

## 命名空间

跨包：

- `VoiceCraft.Namespace = "voicecraft"`

## 命令

### 基本

- `voicecraft:vcbind <binding_key>`
  权限：`Any`
- `voicecraft:vcsettings`
  权限：`GameDirectors`

### 核心.McHttp

- `voicecraft:vcconnect <hostname> <token>`
  权限：`GameDirectors`

### 核心.McWss

- `voicecraft:vcconnect <token>`
  权限：`Host`
- `voicecraft:data_tunnel [max_string_length] [data]`
  权限：`Host`

## 基本套餐为您提供什么

- 绑定/解除绑定流
- 播放器设置界面
- 效果切换
- 用于自动化的脚本事件
- 支持版本使用的游戏内指标

如果您想在编写自定义插件逻辑之前了解预期的玩家体验，请从 `Basic` 开始。

## 绑定流程详细信息

从目前的实施来看：

1. 新的网络实体收到随机的 5 个字符的绑定密钥
2. 实体描述随按键提示更新
3. 玩家运行 `voicecraft:vcbind <key>`
4. 实体绑定到玩家
5. 休假时，会发生解除绑定并生成新密钥

脚本事件：

- `voicecraft:onPlayerBind`
- `voicecraft:onPlayerUnbind`

VoiceCraft `v1.6.1` 还广播更多插件端生命周期和数据包事件，因此自定义世界可以做出反应，而无需直接轮询传输层。

绑定键故意很短，因为它是在游戏中输入的。将其视为临时链接令牌，而不是长期秘密。

## 效果界面

`voicecraft:vcsettings` 目前公开：

- 能见度
- 邻近性
- 定向
- 接近回波
- 回声
- 接近消音器
- 马弗炉

效果通过 `McApiSetEffectRequestPacket` 发送。

## 您可以定制什么

- 绑定/解除绑定策略
- 基于角色或标签的限制
- 世界ID规则
- 位置/旋转更新行为
- 员工表格通过 `@minecraft/server-ui`
- McApi 表面周围的数据包处理程序

仅在基本库存设置生效后进行自定义。这为您提供了传输、绑定和位置行为的已知良好基线。

## 目前的限制

- `Core.McWss` 稳定性取决于命令和有效负载限制
- 主机/提供商限制可能会阻止 `Core.McHttp` 所需的网络路径
- 自定义数据包处理程序需要在目标 Bedrock 版本上进行测试

## 推荐设置：BDS

1. 启用 `McHttpConfig.Enabled = true`
2. 确保BDS可以达到`McHttpConfig.Hostname`
3. 复制 `Core.McHttp` 包
4. 运行 `voicecraft:vcconnect <hostname> <token>`
5. 使用 `voicecraft:vcbind <key>` 验证绑定

## 推荐设置：本地世界

1. 启用 `McWss`
2. 安装 `Core.McWss`
3. 运行 `/connect`
4. 运行 `voicecraft:vcconnect <token>`
5. 保持 `voicecraft:data_tunnel` 与服务器配置保持一致

## 验证清单

- 安装了正确的传输包
- 行为包和资源包均处于活动状态
- `vcconnect` 使用匹配服务器配置部分中的令牌
- 播放器可以与 `voicecraft:vcbind <key>` 绑定
- 玩家移动会改变 VoiceCraft 中的位置数据
- 效果 UI 向授权用户开放

## 阅读下一篇

- [Addon API](/ecosystem/addon-api)
- [McHttp for BDS](/minecraft/mchttp-bds)
- [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer)
