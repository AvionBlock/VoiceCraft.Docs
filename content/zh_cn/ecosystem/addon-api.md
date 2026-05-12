# 插件 API

`VoiceCraft.Addon` exposes a script-driven McApi layer that is much wider than just `vcbind`.

此页面针对插件和世界开发者。

## 高级 API 接口

插件端 API 公开：

- 连接生命周期
- 数据包发送/接收
- 实体的创建和销毁
- 世界 ID、位置、旋转、静音、失聪和位掩码更新
- 效果更新
- 音频接收事件

## 高级别活动

从当前的API层来看：

- `OnConnected`
- `OnDisconnected`
- `OnPlayerBind`
- `OnPlayerUnbind`
- `OnPacket`

VoiceCraft `v1.6.1` expands this event-driven path with broadcasted events used by the addon packages, so world scripts can react to connection, binding, and packet activity without custom polling.

系统使用的脚本事件包括：

- `voicecraft:onConnected`
- `voicecraft:onDisconnected`
- `voicecraft:onPlayerBind`
- `voicecraft:onPlayerUnbind`
- `voicecraft:onPacket`
- `voicecraft:sendPacket`

## 数据包级覆盖

当前暴露的数据包事件包括以下类别：

- 登录/注销/ping
- 接受/拒绝/重置响应
- 实体创建/销毁
- 标题/描述/名称更新
- 静音/失聪/服务器静音/服务器失聪
- 说话/听/效果位掩码
- 位置/旋转/世界ID
- 洞穴系数/消音系数
- 效果更新
- 收到音频

这使得插件 API 不仅对普通世界有用，而且对自定义游戏模式也有用。

## 常见的定制思路

- 按团队、角色或标签自动绑定
- 自定义绑定UI
- 每个生物群落或区域的自定义效果预设
- 基于区域的世界 ID 重新映射
- 通过服务器 UI 表单的员工审核工具
- 脚本化的 NPC 或假实体语音逻辑

## 基本集成模型

典型的插件逻辑：

1. 连接到 VoiceCraft 传输
2. 验证
3. 创建或发现实体
4.绑定玩家
5. 在刻度或事件上更新世界 ID/位置/旋转
6. 对数据包级更新做出反应

## 重要的实施说明

- `McWss` mode depends on command tunnel throughput
- 效果切换通过位掩码进行编码
- 数据包级自动化应在真实的基岩版本上仔细测试
- 当依赖广播事件或游戏内语音图标时，保持插件包与 VoiceCraft 版本保持一致

## 推荐做法

- start from `Basic` if you need a working reference
- switch to `Core.McHttp` or `Core.McWss` when building a custom experience
- 首先保持你的世界自动化精简，然后逐渐扩展数据包挂钩
