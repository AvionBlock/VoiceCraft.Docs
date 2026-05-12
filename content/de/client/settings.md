# Client-Einstellungen (UI)

All client UI changes are auto-saved to `Settings.json`.

Das Rohschema, Beispiele und erweiterte Felder finden Sie unter [Settings.json](/client/settings-json).

## Allgemein

- `Language`:
  Vom Client verwendete UI-Sprache/Gebietsschema.
- `Notification Dismiss`:
  Verzögerung beim automatischen Ausblenden für lokale Benachrichtigungen in Millisekunden.
- `Hide Server Addresses`:
  Versteckt gespeicherte IP-/Host-Einträge in der Benutzeroberfläche.
- `Disable Notifications`:
  deaktiviert lokale Toastbenachrichtigungen.

## Aussehen

- `Theme`:
  ausgewähltes visuelles Thema.
- `Background Image`:
  ausgewähltes integriertes Hintergrundbild.

## Eingabe

- `Input Devices`:
  Aufnahmegerät/Mikrofonquelle.
- `Input Capture Preset`:
  capture profile used by the platform backend, default is `VoiceCommunication`.
- `Input Volume`:
  microphone gain in range `0..2`.
- `Microphone Sensitivity`:
  voice activity threshold in range `0..1`.
- `Denoisers`:
  verfügbare Denoiser-Implementierung.
- `Automatic Gain Controllers`:
  AGC-Implementierung.
- `Echo Cancelers`:
  Implementierung der Echounterdrückung.
- `Push To Talk`:
  nur senden, während der konfigurierte Hotkey gedrückt gehalten wird.
- `Push To Talk Cue`:
  Lokaler akustischer Hinweis, wenn PTT aktiviert/deaktiviert wird.
- `Microphone Test`:
  lokale Überwachung und Aktivitätsvisualisierung.

## Ausgabe

- `Output Devices`:
  Wiedergabegerät.
- `Output Volume`:
  playback gain in range `0..2`.
- `Audio Clippers`:
  Output-Clipper/Limiter-Implementierung.
- `Test Output`:
  Senden Sie ein lokales Testsignal an das ausgewählte Gerät.

## Netzwerk

- `Positioning Type`:
  must match `VoiceCraftConfig.PositioningType` on the server.
- `McWss Listen Ip`:
  Lokale Adresse, die von der McWss-seitigen Bridge verwendet wird.
- `McWss Host Port`:
  Lokaler McWss-Port, der für die Bedrock-Websocket-Verbindung verwendet wird.

## HotKeys

Standardmäßig stellt VoiceCraft Bindungen für Folgendes bereit:

- `Mute`
- `Deafen`

Standard-Desktop-Bindungen sind normalerweise:

- `Mute`: `LeftControl + LeftShift + M`
- `Deafen`: `LeftControl + LeftShift + D`

Exact hotkey values are stored in `HotKeySettings.Bindings`.

## Steuerelemente pro Benutzer

VoiceCraft speichert auch lokale Präferenzen pro Benutzer:

- Volumenmultiplikator pro Benutzer
- Lokaler Stummschaltungsstatus pro Benutzer

These are stored in `UserSettings.Users` and are applied client-side.

## Fortgeschritten

- `Trigger GC`:
  Manueller Garbage-Collection-Trigger.
- `Crash`:
  absichtlicher Absturzpfad für Diagnose/Protokollierungsüberprüfung.

![Netzwerkeinstellungen](/images/voicecraft/settings-network.png)
