# settings.json

Client settings file: `Settings.json`.

## 檔案位置

- Windows: `%AppData%/voicecraft/Settings.json`
- Linux: `~/.config/voicecraft/Settings.json`
- macOS: `~/Library/Application Support/voicecraft/Settings.json`
- Android / iOS: inside the app sandbox (`ApplicationData`)

## 完整範例

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

## 頂級字段

- `UserGuid`:
  本地客戶身分。
- `ServerUserGuid`:
  儲存客戶端使用的伺服器端身分/相容性 GUID。
- `InputSettings`:
  麥克風和預處理。
- `OutputSettings`:
  播放設定。
- `LocaleSettings`:
  使用者介面語言。
- `NotificationSettings`:
  敬酒行為。
- `ServersSettings`:
  已儲存 VoiceCraft 伺服器。
- `ThemeSettings`:
  選定的主題和背景。
- `NetworkSettings`:
  定位模式和 McWss 偵聽器值。
- `HotKeySettings`:
  可配置的熱鍵。
- `UserSettings`:
  每個遠端使用者的本機首選項。

## 輸入設定

- `InputDevice`:
  輸入設備名稱。
- `InputCapturePreset`:
  platform capture preset, default `VoiceCommunication`.
- `InputVolume`:
  input gain `0..2`.
- `MicrophoneSensitivity`:
  activity threshold `0..1`.
- `AutomaticGainController`:
  選擇 AGC 實作 GUID。
- `Denoiser`:
  選定的降噪器 GUID。
- `EchoCanceler`:
  選擇的迴聲消除器 GUID。
- `PushToTalkEnabled`:
  一鍵通模式的布林標誌。
- `PushToTalkCue`:
  本地提示聲音的布爾標誌。

## 輸出設定

- `OutputDevice`:
  輸出設備名稱。
- `OutputVolume`:
  playback gain `0..2`.
- `AudioClipper`:
  選擇的剪輯器 GUID。

## 區域設置

- `Culture`:
  locale such as `en-US`, `ru-RU`, `nl-NL`, `de-DE`, `pl-PL`, `zh-CN`, `zh-TW`.

## 通知設定

- `DisableNotifications`:
  禁用客戶端通知。
- `DismissDelayMs`:
  通知超時（以毫秒為單位）。

## 伺服器設定

- `HideServerAddresses`:
  屏蔽 UI 中的主機清單。
- `Servers`:
  保存的伺服器條目。

Each `Servers[]` item:

- `Name`:
  display name, max `12` chars.
- `Ip`:
  host / IP, max `30` chars.
- `Port`:
  UDP port `1..65535`.

## 主題設定

- `SelectedBackgroundImage`:
  內建後台 GUID。
- `SelectedTheme`:
  內建主題 GUID。

## 網路設定

- `PositioningType`:
  `0 = Server`, `1 = Client`
- `McWssListenIp`:
  本地 websocket 綁定/監聽位址。
- `McWssHostPort`:
  本地 websocket 主機連接埠。

This value must match `VoiceCraftConfig.PositioningType` on the server.

## 熱鍵設定

`HotKeySettings.Bindings` is a `Dictionary<string, string>`.

典型按鍵：

- `Mute`
- `Deafen`

確切的序列化值取決於桌面輸入後端和金鑰解析器。

## 使用者設定

`UserSettings.Users` is a dictionary keyed by remote user `Guid`.

每個值包含：

- `Volume`:
  客戶端每用戶數量乘數。
- `UserMuted`:
  客戶端本地靜音。

這些值不會取代伺服器審核；它們是個人客戶的偏好。

## 重要範圍

- `InputVolume`: `0..2`
- `OutputVolume`: `0..2`
- `MicrophoneSensitivity`: `0..1`
- `Servers[].Name`: up to `12` chars
- `Servers[].Ip`: up to `30` chars
- `Servers[].Port`: `1..65535`
- `McWssHostPort`: `0..65535`

## 良好實踐

- do not manually reuse `LoginToken` values as user settings
- keep `PositioningType` aligned with server
- if troubleshooting audio, reset `InputDevice` and `OutputDevice` to `Default`
- 如果設備消失，讓客戶端重新產生匹配字段，而不是複製舊機器的配置
