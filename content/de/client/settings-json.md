# Settings.json

Client-Einstellungsdatei: `Settings.json`.

Der Client schreibt diese Datei automatisch. Verwenden Sie die Benutzeroberfläche für normale Änderungen und bearbeiten Sie JSON nur für Wiederherstellung, Automatisierung oder erweiterte Fehlerbehebung.

Vor manuellen Änderungen:

1. Schließen Sie den Client.
2. Sichern Sie `Settings.json`.
3. Ändern Sie jeweils einen Abschnitt.
4. Öffnen Sie den Client erneut und überprüfen Sie, ob die Benutzeroberfläche weiterhin geladen wird.

## Dateispeicherort

- Windows: `%AppData%/voicecraft/Settings.json`
- Linux: `~/.config/voicecraft/Settings.json`
- macOS: `~/Library/Application Support/voicecraft/Settings.json`
- Android / iOS: in der App-Sandbox (`ApplicationData`)

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
  Plattformerfassungsvoreinstellung, Standard `VoiceCommunication`.
- `InputVolume`:
  Eingangsverstärkung `0..2`.
- `MicrophoneSensitivity`:
  Aktivitätsschwellenwert `0..1`.
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
  Wiedergabeverstärkung `0..2`.
- `AudioClipper`:
  ausgewählte Clipper-GUID.

## Gebietsschemaeinstellungen

- `Culture`:
  Gebietsschema wie `en-US`, `ru-RU`, `nl-NL`, `de-DE`, `pl-PL`, `zh-CN`, `zh-TW`.

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

Jedes `Servers[]`-Element:

- `Name`:
  Anzeigename, max. `12` Zeichen.
- `Ip`:
  Host/IP, max. `30` Zeichen.
- `Port`:
  UDP-Port `1..65535`.

Servereinträge verweisen auf den VoiceCraft UDP-Endpunkt von `VoiceCraftConfig.Port`. Sie sind nicht mit den Minecraft-Transportendpunkten `McHttp`, `McWss` oder `McTcp` identisch.

## Themeneinstellungen

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

Dieser Wert muss mit `VoiceCraftConfig.PositioningType` auf dem Server übereinstimmen.

`McWssListenIp` und `McWssHostPort` beziehen sich auf McWss-bezogenes lokales Websocket-Verhalten. Sie ersetzen nicht die gespeicherte VoiceCraft-Serverliste, die für den Sprachverkehr verwendet wird.

## HotKeySettings

`HotKeySettings.Bindings` ist ein `Dictionary<string, string>`.

Typische Schlüssel:

- `Mute`
- `Deafen`

Der genaue serialisierte Wert hängt vom Desktop-Eingabe-Backend und Schlüsselparser ab.

## Benutzereinstellungen

`UserSettings.Users` ist ein Wörterbuch, das vom Remote-Benutzer `Guid` eingegeben wurde.

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
- `Servers[].Name`: bis zu `12` Zeichen
- `Servers[].Ip`: bis zu `30` Zeichen
- `Servers[].Port`: `1..65535`
- `McWssHostPort`: `0..65535`

## Gute Praktiken

- Verwenden Sie `LoginToken`-Werte nicht manuell als Benutzereinstellungen wieder
- Halten Sie `PositioningType` am Server ausgerichtet
- Wenn Sie Audioprobleme beheben, setzen Sie `InputDevice` und `OutputDevice` auf `Default` zurück.
- Wenn ein Gerät verschwindet, lassen Sie den Client das entsprechende Feld neu generieren, anstatt die Konfiguration einer alten Maschine zu kopieren
- Geben Sie `Settings.json` nicht öffentlich weiter, wenn es private Serveradressen enthält
- Vermeiden Sie das Kopieren einer vollständigen Einstellungsdatei zwischen Spielern. Kopieren Sie bei Bedarf nur den Serverhost/-port

## Strategie zurücksetzen

Wenn der Client nach manuellen Bearbeitungen unbrauchbar wird:

1. Schließen Sie den Client.
2. Verschieben Sie `Settings.json` als Backup beiseite.
3. Starten Sie den Client und lassen Sie ihn eine neue Datei generieren.
4. Fügen Sie den Servereintrag erneut hinzu.
5. Audiogeräte und Hotkeys neu konfigurieren.
