# 客户端设置（用户界面）

所有客户端 UI 更改都会自动保存到 `Settings.json`。

有关原始架构、示例和高级字段，请参阅 [Settings.json](/client/settings-json)。

使用 UI 进行正常配置。仅当您需要批量更改、自动化或从损坏的 UI 状态恢复时才编辑 `Settings.json`。

## 推荐的设置顺序

1. 选择输入和输出设备。
2. 运行麦克风测试并调整灵敏度。
3. 添加 VoiceCraft 服务器条目。
4. 确认 `Positioning Type` 与服务器匹配。
5. 如果社区需要，请设置一键通。
6. 加入 Minecraft 并完成绑定流程。

## 一般

- `Language`：
  客户端使用的 UI 语言/区域设置。
- `Notification Dismiss`：
  自动隐藏本地通知的延迟（以毫秒为单位）。
- `Hide Server Addresses`：
  隐藏 UI 中保存的 IP/主机条目。
- `Disable Notifications`：
  禁用本地 toast 通知。

使用 `Hide Server Addresses` 进行屏幕截图或公共流。它不会加密磁盘上保存的服务器列表。

## 外观

- `Theme`：
  选定的视觉主题。
- `Background Image`：
  选择内置背景图像。

## 输入

- `Input Devices`：
  捕获设备/麦克风源。
- `Input Capture Preset`：
  平台后端使用的捕获配置文件，默认为 `VoiceCommunication`。
- `Input Volume`：
  麦克风增益范围为 `0..2`。
- `Microphone Sensitivity`：
  语音活动阈值范围为 `0..1`。
- `Denoisers`：
  可用的降噪器实现。
- `Automatic Gain Controllers`：
  AGC 实施。
- `Echo Cancelers`：
  回声消除的实现。
- `Push To Talk`：
  仅在按住配置的热键时传输。
- `Push To Talk Cue`：
  PTT 接合/脱离时的本地声音提示。
- `Microphone Test`：
  本地监控和活动可视化。

好的起点：

- 使 `Input Volume` 保持在 `1` 附近
- 仅在未检测到安静语音时提高灵敏度
- 在嘈杂的房间中启用一键通
- 在更改服务器端设置之前使用麦克风测试

如果其他玩家听到持续的背景噪音，请降低输入音量、增加激活阈值、启用一键通或更改选定的麦克风设备。

## 输出

- `Output Devices`：
  播放设备。
- `Output Volume`：
  播放增益范围为 `0..2`。
- `Audio Clippers`：
  输出限幅器/限制器实现。
- `Test Output`：
  向所选设备发送本地测试信号。

如果您可以听到测试输出但听不到其他玩家的声音，则播放设备可能没问题。接下来检查服务器连接、绑定流程和位置更新。

## 网络

- `Positioning Type`：
  必须与服务器上的 `VoiceCraftConfig.PositioningType` 匹配。
- `McWss Listen Ip`：
  McWss侧网桥使用的本地地址。
- `McWss Host Port`：
  用于 Bedrock Websocket 链接的本地 McWss 端口。

`Positioning Type` 是最重要的客户端/服务器兼容性设置。在正常的 BDS 和 VoiceCraft.Java 部署中，使用 `ServerProperties.json` 中配置的相同服务器端模式。

`McWss Listen Ip` 和 `McWss Host Port` 仅适用于 McWss 风格的本地 Bedrock 设置。它们不会取代用于语音 UDP 流量的 VoiceCraft 服务器条目。

## 热键

默认情况下，VoiceCraft 公开以下绑定：

- `Mute`
- `Deafen`

默认桌面绑定通常是：

- `Mute`：`LeftControl + LeftShift + M`
- `Deafen`：`LeftControl + LeftShift + D`

准确的热键值存储在 `HotKeySettings.Bindings` 中。

如果热键未触发，请检查操作系统级别的冲突以及客户端窗口或桌面环境是否允许全局热键捕获。

## 每用户控制

VoiceCraft 还存储每个用户的本地偏好设置：

- 每用户数量乘数
- 每用户本地静音状态

它们存储在 `UserSettings.Users` 中并在客户端应用。

当只有一名玩家声音太大或分散您的注意力时，请使用每用户本地静音或音量。当工作人员需要对每个人强制进行审核时，请使用服务器静音/震耳欲聋的命令。

## 高级

- `Trigger GC`：
  手动垃圾收集触发器。
- `Crash`：
  用于诊断/日志验证的故意崩溃路径。

高级控制用于诊断。正常播放期间请勿使用 `Crash` ，除非您有意验证崩溃报告或日志收集。

## 当感觉音频有问题时要检查什么

1. 客户端输入和输出设备。
2. 一键通状态。
3. VoiceCraft 服务器连接。
4. `Positioning Type`。
5. Minecraft 绑定流程。
6. 玩家距离和世界 ID 更新。

![Network Settings](/images/voicecraft/settings-network.png)
