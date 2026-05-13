# 设置.json

客户端设置文件：`Settings.json`。

客户端自动写入该文件。使用 UI 进行正常更改，仅编辑 JSON 进行恢复、自动化或高级故障排除。

手动编辑之前：

1. 关闭客户端。
2. 备份 `Settings.json`。
3. 一次更改一个部分。
4. 重新打开客户端并验证 UI 是否仍然加载。

## 文件位置

- Windows：`%AppData%/voicecraft/Settings.json`
- Linux：`~/.config/voicecraft/Settings.json`
- macOS：`~/Library/Application Support/voicecraft/Settings.json`
- Android / iOS：应用程序沙箱内部 (`ApplicationData`)

## 完整示例

```json
{
  "UserGuid": "7f303d4a-5105-4b4f-9de4-2448f5ddf703",
  "ServerUserGuid": "6727d672-8f9f-4916-b960-26a3e0a9cd18",
  "InputSettings": {
    "InputDevice": "Default",
    "InputCapturePreset": "VoiceCommunication",
    "InputVolume": 1.0,
    "MicrophoneSensitivity": 0.04,
    "AutomaticGainController": "00000000-0000-0000-0000-000000000000",
    "Denoiser": "00000000-0000-0000-0000-000000000000",
    "EchoCanceler": "00000000-0000-0000-0000-000000000000",
    "PushToTalkEnabled": false,
    "PushToTalkCue": true
  },
  "OutputSettings": {
    "OutputDevice": "Default",
    "OutputVolume": 1.0,
    "AudioClipper": "962fe030-08c3-4e21-a9c1-fcfea0745b6a"
  },
  "LocaleSettings": {
    "Culture": "en-US"
  },
  "NotificationSettings": {
    "DisableNotifications": false,
    "DismissDelayMs": 2000
  },
  "ServersSettings": {
    "HideServerAddresses": false,
    "Servers": [
      {
        "Name": "Local",
        "Ip": "127.0.0.1",
        "Port": 9050
      }
    ]
  },
  "ThemeSettings": {
    "SelectedBackgroundImage": "6b023e19-c9c5-4e06-84df-22833ccccd87",
    "SelectedTheme": "cf8e39fe-21cc-4210-91e6-d206e22ca52e"
  },
  "NetworkSettings": {
    "PositioningType": 0,
    "McWssListenIp": "127.0.0.1",
    "McWssHostPort": 8080
  },
  "HotKeySettings": {
    "Bindings": {
      "Mute": "LeftControl+LeftShift+M",
      "Deafen": "LeftControl+LeftShift+D"
    }
  },
  "UserSettings": {
    "Users": {
      "0f9716f4-08f1-4580-bb27-f8a4b730e89d": {
        "Volume": 1.0,
        "UserMuted": false
      }
    }
  }
}
```

## 顶级字段

- `UserGuid`：
  本地客户身份。
- `ServerUserGuid`：
  存储客户端使用的服务器端身份/兼容性 GUID。
- `InputSettings`：
  麦克风和预处理。
- `OutputSettings`：
  播放设置。
- `LocaleSettings`：
  用户界面语言。
- `NotificationSettings`：
  敬酒行为。
- `ServersSettings`：
  已保存 VoiceCraft 服务器。
- `ThemeSettings`：
  选定的主题和背景。
- `NetworkSettings`：
  定位模式和 McWss 侦听器值。
- `HotKeySettings`：
  可配置的热键。
- `UserSettings`：
  每个远程用户的本地首选项。

## 输入设置

- `InputDevice`：
  输入设备名称。
- `InputCapturePreset`：
  平台捕获预设，默认`VoiceCommunication`。
- `InputVolume`：
  输入增益`0..2`。
- `MicrophoneSensitivity`：
  活动阈值 `0..1`。
- `AutomaticGainController`：
  选择 AGC 实施 GUID。
- `Denoiser`：
  选定的降噪器 GUID。
- `EchoCanceler`：
  选择的回声消除器 GUID。
- `PushToTalkEnabled`：
  一键通模式的布尔标志。
- `PushToTalkCue`：
  本地提示声音的布尔标志。

## 输出设置

- `OutputDevice`：
  输出设备名称。
- `OutputVolume`：
  播放增益 `0..2`。
- `AudioClipper`：
  选择的剪辑器 GUID。

## 区域设置

- `Culture`：
  语言环境，例如 `en-US`、`ru-RU`、`nl-NL`、`de-DE`、`pl-PL`、`zh-CN`、`zh-TW`。

## 通知设置

- `DisableNotifications`：
  禁用客户端通知。
- `DismissDelayMs`：
  通知超时（以毫秒为单位）。

## 服务器设置

- `HideServerAddresses`：
  屏蔽 UI 中的主机列表。
- `Servers`：
  保存的服务器条目。

每个 `Servers[]` 项目：

- `Name`：
  显示名称，最多 `12` 个字符。
- `Ip`：
  主机/IP，最大 `30` 个字符。
- `Port`：
  UDP 端口 `1..65535`。

服务器条目从 `VoiceCraftConfig.Port` 指向 VoiceCraft UDP 端点。它们与 `McHttp`、`McWss` 或 `McTcp` Minecraft 传输端点不同。

## 主题设置

- `SelectedBackgroundImage`：
  内置后台 GUID。
- `SelectedTheme`：
  内置主题 GUID。

## 网络设置

- `PositioningType`：
  `0 = Server`、`1 = Client`
- `McWssListenIp`：
  本地 websocket 绑定/监听地址。
- `McWssHostPort`：
  本地 websocket 主机端口。

该值必须与服务器上的 `VoiceCraftConfig.PositioningType` 匹配。

`McWssListenIp` 和 `McWssHostPort` 用于与 McWss 相关的本地 websocket 行为。它们不会替换已保存的用于语音流量的 VoiceCraft 服务器列表。

## 热键设置

`HotKeySettings.Bindings` 是 `Dictionary<string, string>`。

典型按键：

- `Mute`
- `Deafen`

确切的序列化值取决于桌面输入后端和密钥解析器。

## 用户设置

`UserSettings.Users` 是由远程用户 `Guid` 输入的字典。

每个值包含：

- `Volume`：
  客户端每用户数量乘数。
- `UserMuted`：
  客户端本地静音。

这些值不会取代服务器审核；它们是个人客户的偏好。

## 重要范围

- `InputVolume`：`0..2`
- `OutputVolume`：`0..2`
- `MicrophoneSensitivity`：`0..1`
- `Servers[].Name`：最多 `12` 个字符
- `Servers[].Ip`：最多 `30` 个字符
- `Servers[].Port`：`1..65535`
- `McWssHostPort`：`0..65535`

## 良好做法

- 不要手动重用 `LoginToken` 值作为用户设置
- 保持 `PositioningType` 与服务器对齐
- 如果对音频进行故障排除，请将 `InputDevice` 和 `OutputDevice` 重置为 `Default`
- 如果设备消失，让客户端重新生成匹配字段，而不是复制旧机器的配置
- 如果 `Settings.json` 包含私有服务器地址，请勿公开共享
- 避免在玩家之间复制完整的设置文件；如果需要，仅复制服务器主机/端口

## 重置策略

如果手动编辑后客户端无法使用：

1. 关闭客户端。
2. 将 `Settings.json` 移到一边作为备份。
3. 启动客户端并让它生成一个新文件。
4. 重新添加服务器条目。
5. 重新配置音频设备和热键。
