# Settings.json

Client settings file: `Settings.json`.

## Dateispeicherort

- Windows: `%AppData%/voicecraft/Settings.json`
- Linux: `~/.config/voicecraft/Settings.json`
- macOS: `~/Library/Application Support/voicecraft/Settings.json`
- Android / iOS: inside the app sandbox (`ApplicationData`)

## Vollständiges Beispiel

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

## Felder der obersten Ebene

- `UserGuid`:
  lokale Client-Identität.
- `ServerUserGuid`:
  gespeicherte serverseitige Identitäts-/Kompatibilitäts-GUID, die vom Client verwendet wird.
- `InputSettings`:
  Mikrofon und Vorverarbeitung.
- `OutputSettings`:
  Wiedergabeeinstellungen.
- `LocaleSettings`:
  UI-Sprache.
- `NotificationSettings`:
  Toastverhalten.
- `ServersSettings`:
  gespeicherte VoiceCraft-Server.
- `ThemeSettings`:
  ausgewähltes Thema und Hintergrund.
- `NetworkSettings`:
  Positionierungsmodus und McWss-Listenerwerte.
- `HotKeySettings`:
  konfigurierbare Hotkeys.
- `UserSettings`:
  Lokale Einstellungen pro Remote-Benutzer.

## Eingabeeinstellungen

- `InputDevice`:
  Geben Sie den Namen des Eingabegeräts ein.
- `InputCapturePreset`:
  platform capture preset, default `VoiceCommunication`.
- `InputVolume`:
  input gain `0..2`.
- `MicrophoneSensitivity`:
  activity threshold `0..1`.
- `AutomaticGainController`:
  ausgewählte AGC-Implementierungs-GUID.
- `Denoiser`:
  ausgewählte Denoiser-GUID.
- `EchoCanceler`:
  ausgewählte Echounterdrückungs-GUID.
- `PushToTalkEnabled`:
  boolesches Flag für den Push-to-Talk-Modus.
- `PushToTalkCue`:
  boolesches Flag für lokale Cue-Sounds.

## Ausgabeeinstellungen

- `OutputDevice`:
  Name des Ausgabegeräts.
- `OutputVolume`:
  playback gain `0..2`.
- `AudioClipper`:
  ausgewählte Clipper-GUID.

## LocaleSettings

- `Culture`:
  locale such as `en-US`, `ru-RU`, `nl-NL`, `de-DE`, `pl-PL`, `zh-CN`, `zh-TW`.

## Benachrichtigungseinstellungen

- `DisableNotifications`:
  deaktiviert Client-Benachrichtigungen.
- `DismissDelayMs`:
  Benachrichtigungs-Timeout in Millisekunden.

## Servereinstellungen

- `HideServerAddresses`:
  maskiert die Hostliste in der Benutzeroberfläche.
- `Servers`:
  gespeicherte Servereinträge.

Each `Servers[]` item:

- `Name`:
  display name, max `12` chars.
- `Ip`:
  host / IP, max `30` chars.
- `Port`:
  UDP port `1..65535`.

## ThemeSettings

- `SelectedBackgroundImage`:
  Integrierte Hintergrund-GUID.
- `SelectedTheme`:
  integrierte Theme-GUID.

## Netzwerkeinstellungen

- `PositioningType`:
  `0 = Server`, `1 = Client`
- `McWssListenIp`:
  Lokale Websocket-Bind/Listen-Adresse.
- `McWssHostPort`:
  lokaler WebSocket-Host-Port.

This value must match `VoiceCraftConfig.PositioningType` on the server.

## HotKeySettings

`HotKeySettings.Bindings` is a `Dictionary<string, string>`.

Typische Schlüssel:

- `Mute`
- `Deafen`

Der genaue serialisierte Wert hängt vom Desktop-Eingabe-Backend und Schlüsselparser ab.

## Benutzereinstellungen

`UserSettings.Users` is a dictionary keyed by remote user `Guid`.

Jeder Wert enthält:

- `Volume`:
  Client-seitiger Volumenmultiplikator pro Benutzer.
- `UserMuted`:
  Clientseitige lokale Stummschaltung.

Diese Werte ersetzen nicht die Servermoderation; es handelt sich um persönliche Kundenpräferenzen.

## Wichtige Bereiche

- `InputVolume`: `0..2`
- `OutputVolume`: `0..2`
- `MicrophoneSensitivity`: `0..1`
- `Servers[].Name`: up to `12` chars
- `Servers[].Ip`: up to `30` chars
- `Servers[].Port`: `1..65535`
- `McWssHostPort`: `0..65535`

## Gute Praktiken

- do not manually reuse `LoginToken` values as user settings
- keep `PositioningType` aligned with server
- if troubleshooting audio, reset `InputDevice` and `OutputDevice` to `Default`
- Wenn ein Gerät verschwindet, lassen Sie den Client das entsprechende Feld neu generieren, anstatt die Konfiguration einer alten Maschine zu kopieren
