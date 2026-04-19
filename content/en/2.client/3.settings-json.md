# Settings.json

Client settings file: `Settings.json`.

## File location

- Windows: `%AppData%/voicecraft/Settings.json`
- Linux: `~/.config/voicecraft/Settings.json`
- macOS: `~/Library/Application Support/voicecraft/Settings.json`
- Android / iOS: inside the app sandbox (`ApplicationData`)

## Full example

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

## Top-level fields

- `UserGuid`:
  local client identity.
- `ServerUserGuid`:
  stored server-side identity / compatibility GUID used by the client.
- `InputSettings`:
  microphone and preprocessing.
- `OutputSettings`:
  playback settings.
- `LocaleSettings`:
  UI language.
- `NotificationSettings`:
  toast behavior.
- `ServersSettings`:
  saved VoiceCraft servers.
- `ThemeSettings`:
  selected theme and background.
- `NetworkSettings`:
  positioning mode and McWss listener values.
- `HotKeySettings`:
  configurable hotkeys.
- `UserSettings`:
  per-remote-user local preferences.

## InputSettings

- `InputDevice`:
  input device name.
- `InputCapturePreset`:
  platform capture preset, default `VoiceCommunication`.
- `InputVolume`:
  input gain `0..2`.
- `MicrophoneSensitivity`:
  activity threshold `0..1`.
- `AutomaticGainController`:
  selected AGC implementation GUID.
- `Denoiser`:
  selected denoiser GUID.
- `EchoCanceler`:
  selected echo canceler GUID.
- `PushToTalkEnabled`:
  boolean flag for push-to-talk mode.
- `PushToTalkCue`:
  boolean flag for local cue sounds.

## OutputSettings

- `OutputDevice`:
  output device name.
- `OutputVolume`:
  playback gain `0..2`.
- `AudioClipper`:
  selected clipper GUID.

## LocaleSettings

- `Culture`:
  locale such as `en-US`, `ru-RU`, `nl-NL`, `de-DE`, `pl-PL`, `zh-CN`, `zh-TW`.

## NotificationSettings

- `DisableNotifications`:
  disables client notifications.
- `DismissDelayMs`:
  notification timeout in milliseconds.

## ServersSettings

- `HideServerAddresses`:
  masks the host list in UI.
- `Servers`:
  saved server entries.

Each `Servers[]` item:

- `Name`:
  display name, max `12` chars.
- `Ip`:
  host / IP, max `30` chars.
- `Port`:
  UDP port `1..65535`.

## ThemeSettings

- `SelectedBackgroundImage`:
  built-in background GUID.
- `SelectedTheme`:
  built-in theme GUID.

## NetworkSettings

- `PositioningType`:
  `0 = Server`, `1 = Client`
- `McWssListenIp`:
  local websocket bind/listen address.
- `McWssHostPort`:
  local websocket host port.

This value must match `VoiceCraftConfig.PositioningType` on the server.

## HotKeySettings

`HotKeySettings.Bindings` is a `Dictionary<string, string>`.

Typical keys:

- `Mute`
- `Deafen`

The exact serialized value depends on the desktop input backend and key parser.

## UserSettings

`UserSettings.Users` is a dictionary keyed by remote user `Guid`.

Each value contains:

- `Volume`:
  client-side per-user volume multiplier.
- `UserMuted`:
  client-side local mute.

These values do not replace server moderation; they are personal client preferences.

## Important ranges

- `InputVolume`: `0..2`
- `OutputVolume`: `0..2`
- `MicrophoneSensitivity`: `0..1`
- `Servers[].Name`: up to `12` chars
- `Servers[].Ip`: up to `30` chars
- `Servers[].Port`: `1..65535`
- `McWssHostPort`: `0..65535`

## Good practices

- do not manually reuse `LoginToken` values as user settings
- keep `PositioningType` aligned with server
- if troubleshooting audio, reset `InputDevice` and `OutputDevice` to `Default`
- if a device disappears, let the client regenerate the matching field instead of copying an old machine's config
