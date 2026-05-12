# settings.json

Client settings file: `Settings.json`.

## Bestandslocatie

- Windows: `%AppData%/voicecraft/Settings.json`
- Linux: `~/.config/voicecraft/Settings.json`
- macOS: `~/Library/Application Support/voicecraft/Settings.json`
- Android / iOS: inside the app sandbox (`ApplicationData`)

## Volledig voorbeeld

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

## Velden op het hoogste niveau

- `UserGuid`:
  lokale klantidentiteit.
- `ServerUserGuid`:
  opgeslagen identiteit/compatibiliteits-GUID aan de serverzijde die door de client wordt gebruikt.
- `InputSettings`:
  microfoon en voorbewerking.
- `OutputSettings`:
  afspeelinstellingen.
- `LocaleSettings`:
  UI-taal.
- `NotificationSettings`:
  toast gedrag.
- `ServersSettings`:
  opgeslagen VoiceCraft-servers.
- `ThemeSettings`:
  gekozen thema en achtergrond.
- `NetworkSettings`:
  positioneringsmodus en McWss-luisteraarwaarden.
- `HotKeySettings`:
  configureerbare sneltoetsen.
- `UserSettings`:
  lokale voorkeuren per externe gebruiker.

## Invoerinstellingen

- `InputDevice`:
  naam van het invoerapparaat.
- `InputCapturePreset`:
  platform capture preset, default `VoiceCommunication`.
- `InputVolume`:
  input gain `0..2`.
- `MicrophoneSensitivity`:
  activity threshold `0..1`.
- `AutomaticGainController`:
  geselecteerde AGC-implementatie-GUID.
- `Denoiser`:
  geselecteerde ruisonderdrukkings-GUID.
- `EchoCanceler`:
  geselecteerde echo-onderdrukker GUID.
- `PushToTalkEnabled`:
  Booleaanse vlag voor push-to-talk-modus.
- `PushToTalkCue`:
  Booleaanse vlag voor lokale signaalgeluiden.

## Uitvoerinstellingen

- `OutputDevice`:
  naam van het uitvoerapparaat.
- `OutputVolume`:
  playback gain `0..2`.
- `AudioClipper`:
  geselecteerde clipper-GUID.

## Lokale instellingen

- `Culture`:
  locale such as `en-US`, `ru-RU`, `nl-NL`, `de-DE`, `pl-PL`, `zh-CN`, `zh-TW`.

## Meldingsinstellingen

- `DisableNotifications`:
  schakelt klantmeldingen uit.
- `DismissDelayMs`:
  time-out voor meldingen in milliseconden.

## ServersInstellingen

- `HideServerAddresses`:
  maskeert de hostlijst in de gebruikersinterface.
- `Servers`:
  opgeslagen servergegevens.

Each `Servers[]` item:

- `Name`:
  display name, max `12` chars.
- `Ip`:
  host / IP, max `30` chars.
- `Port`:
  UDP port `1..65535`.

## Thema-instellingen

- `SelectedBackgroundImage`:
  ingebouwde achtergrond-GUID.
- `SelectedTheme`:
  ingebouwde thema-GUID.

## Netwerkinstellingen

- `PositioningType`:
  `0 = Server`, `1 = Client`
- `McWssListenIp`:
  lokaal websocket bind-/luisteradres.
- `McWssHostPort`:
  lokale websocket-hostpoort.

This value must match `VoiceCraftConfig.PositioningType` on the server.

## Sneltoetsinstellingen

`HotKeySettings.Bindings` is a `Dictionary<string, string>`.

Typische toetsen:

- `Mute`
- `Deafen`

De exacte geserialiseerde waarde is afhankelijk van de backend van de desktopinvoer en de sleutelparser.

## Gebruikersinstellingen

`UserSettings.Users` is a dictionary keyed by remote user `Guid`.

Elke waarde bevat:

- `Volume`:
  Volumevermenigvuldiger per gebruiker aan de clientzijde.
- `UserMuted`:
  Lokaal dempen aan de clientzijde.

Deze waarden vervangen de servermoderatie niet; het zijn persoonlijke klantvoorkeuren.

## Belangrijke bereiken

- `InputVolume`: `0..2`
- `OutputVolume`: `0..2`
- `MicrophoneSensitivity`: `0..1`
- `Servers[].Name`: up to `12` chars
- `Servers[].Ip`: up to `30` chars
- `Servers[].Port`: `1..65535`
- `McWssHostPort`: `0..65535`

## Goede praktijken

- do not manually reuse `LoginToken` values as user settings
- keep `PositioningType` aligned with server
- if troubleshooting audio, reset `InputDevice` and `OutputDevice` to `Default`
- als een apparaat verdwijnt, laat de client dan het overeenkomende veld opnieuw genereren in plaats van de configuratie van een oude machine te kopiëren
