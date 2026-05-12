# VoiceCraft.Addon（基岩插件）

仓库：[AvionBlock/VoiceCraft.Addon](https://github.com/AvionBlock/VoiceCraft.Addon)

该仓库包含实用的 Bedrock 插件包和用于自定义世界逻辑的脚本端 McApi 界面。

快速链接：

- [下载页面](/download)
- [插件配置器](/addon-configurator)
- [插件发布](https://github.com/AvionBlock/VoiceCraft.Addon/releases/latest)

## 套餐

1. `Basic`
   具有绑定流程、设置 UI 和游戏内语音指示器的即用型插件
2. `Core.McHttp`
   用于基于 HTTP 的集成的 Bedrock 传输包
3. `Core.McWss`
   websocket / 命令隧道传输包

## 版本对齐

VoiceCraft `v1.6.1` requires updating the addon packages together with the client/server release. This release includes in-game voice icons, auto connection quality-of-life, broadcasted events, and McHttp/McWss disconnect fixes that depend on the matching addon-side packages.

## 命名空间

跨包：

- `VoiceCraft.Namespace = "voicecraft"`

## 命令

### 基本

- `voicecraft:vcbind <binding_key>`
  permission: `Any`
- `voicecraft:vcsettings`
  permission: `GameDirectors`

### Core.McHttp

- `voicecraft:vcconnect <hostname> <token>`
  permission: `GameDirectors`

### 核心.McWss

- `voicecraft:vcconnect <token>`
  permission: `Host`
- `voicecraft:data_tunnel [max_string_length] [data]`
  permission: `Host`

## 基本包为您提供什么

- 绑定/解除绑定流
- 玩家设置用户界面
- 效果切换
- 自动化脚本事件

## 绑定流程详细信息

从目前的实施来看：

1.新的网络实体收到随机的5个字符的绑定密钥
2.实体描述随按键提示更新
3. player runs `voicecraft:vcbind <key>`
4.实体与玩家绑定
5. 离开时，解除绑定并生成新密钥

脚本事件：

- `voicecraft:onPlayerBind`
- `voicecraft:onPlayerUnbind`

VoiceCraft `v1.6.1` also broadcasts more addon-side lifecycle and packet events so custom worlds can react without polling the transport layer directly.

## 效果界面

`voicecraft:vcsettings` currently exposes:

- 能见度
- 接近度
- 定向
- 接近回声
- 回声
- 接近消音器
- 马弗炉

Effects are sent through `McApiSetEffectRequestPacket`.

## 您可以自定义的内容

- 绑定/解除绑定策略
- 基于角色或标签的限制
- 世界ID规则
- 位置/旋转更新行为
- staff forms through `@minecraft/server-ui`
- McApi 表面周围的数据包处理程序

## 目前的限制

- `Core.McWss` stability depends on command and payload limits

## 推荐设置：BDS

1. enable `McHttpConfig.Enabled = true`
2. ensure BDS can reach `McHttpConfig.Hostname`
3. copy the `Core.McHttp` package
4. run `voicecraft:vcconnect <hostname> <token>`
5. validate bind with `voicecraft:vcbind <key>`

## 推荐设置：本地世界

1. enable `McWss`
2. install `Core.McWss`
3. run `/connect`
4. run `voicecraft:vcconnect <token>`
5. keep `voicecraft:data_tunnel` aligned with server config

## 继续阅读

- [插件 API](/ecosystem/addon-api)
- [BDS 的 McHttp](/minecraft/mchttp-bds)
- [单人世界的 McWss](/minecraft/mcwss-singleplayer)
