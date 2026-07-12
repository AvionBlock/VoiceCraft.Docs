# Client-Einstellungen (UI)

Alle Änderungen an der Client-Benutzeroberfläche werden automatisch unter `Settings.json` gespeichert.

Das Rohschema, Beispiele und erweiterte Felder finden Sie unter [Settings.json](/client/settings-json).

Verwenden Sie die Benutzeroberfläche für die normale Konfiguration. Bearbeiten Sie `Settings.json` nur, wenn Sie Massenänderungen, Automatisierung oder Wiederherstellung nach einem fehlerhaften UI-Status benötigen.

## Empfohlene Setup-Reihenfolge

1. Wählen Sie Eingabe- und Ausgabegeräte aus.
2. Führen Sie einen Mikrofontest durch und stellen Sie die Empfindlichkeit ein.
3. Fügen Sie den VoiceCraft-Servereintrag hinzu.
4. Bestätigen Sie, dass `Positioning Type` mit dem Server übereinstimmt.
5. Richten Sie Push-to-Talk ein, wenn die Community dies erfordert.
6. Treten Sie Minecraft bei und schließen Sie den Bindungsfluss ab.

## Allgemein

- `Language`:
  Vom Client verwendete UI-Sprache/Gebietsschema.
- `Notification Dismiss`:
  Verzögerung beim automatischen Ausblenden für lokale Benachrichtigungen in Millisekunden.
- `Hide Server Addresses`:
  Versteckt gespeicherte IP-/Host-Einträge in der Benutzeroberfläche.
- `Disable Notifications`:
  deaktiviert lokale Toastbenachrichtigungen.

Verwenden Sie `Hide Server Addresses` für Screenshots oder öffentliche Streams. Die auf der Festplatte gespeicherte Serverliste wird nicht verschlüsselt.

## Aussehen

- `Theme`:
  ausgewähltes visuelles Thema.
- `Background Image`:
  ausgewähltes integriertes Hintergrundbild.

## Eingabe

- `Input Devices`:
  Aufnahmegerät/Mikrofonquelle.
- `Input Capture Preset`:
  Das vom Plattform-Backend verwendete Erfassungsprofil ist standardmäßig `VoiceCommunication`.
- `Input Volume`:
  Mikrofonverstärkung im Bereich `0..2`.
- `Microphone Sensitivity`:
  Sprachaktivitätsschwelle im Bereich `0..1`.
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

Guter Ausgangspunkt:

- Halten Sie `Input Volume` in der Nähe von `1`
- Erhöhen Sie die Empfindlichkeit nur, wenn keine leise Sprache erkannt wird
- Aktivieren Sie Push-to-Talk in lauten Räumen
- Verwenden Sie den Mikrofontest, bevor Sie serverseitige Einstellungen ändern

Wenn andere Spieler ständige Hintergrundgeräusche hören, verringern Sie die Eingabelautstärke, erhöhen Sie die Aktivierungsschwelle, aktivieren Sie Push-to-Talk oder ändern Sie das ausgewählte Mikrofongerät.

## Ausgabe

- `Output Devices`:
  Wiedergabegerät.
- `Output Volume`:
  Wiedergabeverstärkung im Bereich `0..2`.
- `Audio Clippers`:
  Output-Clipper/Limiter-Implementierung.
- `Test Output`:
  Senden Sie ein lokales Testsignal an das ausgewählte Gerät.

Wenn Sie die Testausgabe hören, andere Spieler jedoch nicht, ist das Wiedergabegerät wahrscheinlich in Ordnung. Überprüfen Sie als Nächstes die Serververbindung, den Bindungsfluss und die Positionsaktualisierungen.

## Netzwerk

- `Positioning Type`:
  muss mit `VoiceCraftConfig.PositioningType` auf dem Server übereinstimmen.
- `McWss Listen Ip`:
  Lokale Adresse, die von der McWss-seitigen Bridge verwendet wird.
- `McWss Host Port`:
  Lokaler McWss-Port, der für die Bedrock-Websocket-Verbindung verwendet wird.

`Positioning Type` ist die wichtigste Client/Server-Kompatibilitätseinstellung. Verwenden Sie in normalen BDS- und VoiceCraft.Java-Bereitstellungen denselben serverseitigen Modus, der in `ServerProperties.json` konfiguriert ist.

`McWss Listen Ip` und `McWss Host Port` sind nur für lokale Bedrock-Setups im McWss-Stil von Bedeutung. Sie ersetzen nicht den VoiceCraft-Servereintrag, der für den Sprach-UDP-Verkehr verwendet wird.

## HotKeys

Standardmäßig stellt VoiceCraft Bindungen für Folgendes bereit:

- `Mute`
- `Deafen`

Standard-Desktop-Bindungen sind normalerweise:

- `Mute`: `LeftControl + LeftShift + M`
- `Deafen`: `LeftControl + LeftShift + D`

Die genauen Hotkey-Werte werden in `HotKeySettings.Bindings` gespeichert.

Wenn Hotkeys nicht ausgelöst werden, prüfen Sie, ob Konflikte auf Betriebssystemebene vorliegen und ob das Clientfenster oder die Desktop-Umgebung die globale Hotkey-Erfassung zulässt.

## Steuerelemente pro Benutzer

VoiceCraft speichert auch lokale Präferenzen pro Benutzer:

- Volumenmultiplikator pro Benutzer
- Lokaler Stummschaltungsstatus pro Benutzer

Diese werden in `UserSettings.Users` gespeichert und clientseitig angewendet.

Verwenden Sie die lokale Stummschaltung oder Lautstärke pro Benutzer, wenn nur ein Spieler zu laut oder störend für Sie ist. Verwenden Sie serverseitige Moderationsbefehle, wenn das Team eine Stummschaltung oder Deaktivierung des Hörens für alle erzwingen muss.

## Fortgeschritten

- `Trigger GC`:
  Manueller Garbage-Collection-Trigger.
- `Crash`:
  absichtlicher Absturzpfad für Diagnose/Protokollierungsüberprüfung.

Erweiterte Steuerelemente dienen der Diagnose. Verwenden Sie `Crash` nicht während der normalen Wiedergabe, es sei denn, Sie überprüfen absichtlich Absturzberichte oder die Protokollerfassung.

## Was ist zu überprüfen, wenn sich die Audioqualität falsch anfühlt?

1. Client-Eingabe- und Ausgabegeräte.
2. Push-to-Talk-Status.
3. VoiceCraft-Serververbindung.
4. `Positioning Type`.
5. Minecraft-Bindungsfluss.
6. Aktualisierungen der Spielerdistanz und der Welt-ID.

![Network Settings](/images/voicecraft/settings-network.png)
