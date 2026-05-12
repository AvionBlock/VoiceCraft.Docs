# Settings.json

Файл настроек клиента: `Settings.json`.

## Где лежит файл

- Windows: `%AppData%/voicecraft/Settings.json`
- Linux: `~/.config/voicecraft/Settings.json`
- macOS: `~/Library/Application Support/voicecraft/Settings.json`
- Android / iOS: внутри sandbox (`ApplicationData`)

## Полный пример

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

## Верхнеуровневые поля

- `UserGuid`
- `ServerUserGuid`
- `InputSettings`
- `OutputSettings`
- `LocaleSettings`
- `NotificationSettings`
- `ServersSettings`
- `ThemeSettings`
- `NetworkSettings`
- `HotKeySettings`
- `UserSettings`

## InputSettings

- `InputDevice`:
  имя входного устройства.
- `InputCapturePreset`:
  профиль захвата, по умолчанию `VoiceCommunication`.
- `InputVolume`:
  усиление `0..2`.
- `MicrophoneSensitivity`:
  порог активации `0..1`.
- `AutomaticGainController`:
  GUID выбранного AGC.
- `Denoiser`:
  GUID выбранного denoiser-а.
- `EchoCanceler`:
  GUID выбранного echo canceler-а.
- `PushToTalkEnabled`:
  включает push-to-talk.
- `PushToTalkCue`:
  локальный аудиосигнал для PTT.

## OutputSettings

- `OutputDevice`
- `OutputVolume`
- `AudioClipper`

## LocaleSettings

- `Culture`:
  локаль вроде `en-US`, `ru-RU`, `nl-NL`, `de-DE`, `pl-PL`, `zh-CN`, `zh-TW`.

## NotificationSettings

- `DisableNotifications`
- `DismissDelayMs`

## ServersSettings

- `HideServerAddresses`
- `Servers`

Каждый `Servers[]` элемент:

- `Name`:
  отображаемое имя, максимум `12` символов
- `Ip`:
  хост или IP, максимум `30` символов
- `Port`:
  UDP порт `1..65535`

## ThemeSettings

- `SelectedBackgroundImage`
- `SelectedTheme`

## NetworkSettings

- `PositioningType`:
  `0 = Server`, `1 = Client`
- `McWssListenIp`
- `McWssHostPort`

Этот режим обязан совпадать с `VoiceCraftConfig.PositioningType` на сервере.

## HotKeySettings

`HotKeySettings.Bindings` это `Dictionary<string, string>`.

Типичные ключи:

- `Mute`
- `Deafen`

## UserSettings

`UserSettings.Users` это словарь, где ключом выступает `Guid` удалённого пользователя.

Каждое значение содержит:

- `Volume`
- `UserMuted`

Это персональные клиентские настройки, а не серверная модерация.

## Важные диапазоны

- `InputVolume`: `0..2`
- `OutputVolume`: `0..2`
- `MicrophoneSensitivity`: `0..1`
- `Servers[].Name`: до `12` символов
- `Servers[].Ip`: до `30` символов
- `Servers[].Port`: `1..65535`
- `McWssHostPort`: `0..65535`
