# Fehlerbehebungsmatrix

Verwenden Sie diese Seite, wenn Sie eine symptombasierte Diagnose statt einer allgemeinen Checkliste wünschen.

## Symptom: Der Client stellt eine Verbindung her, aber niemand hört etwas

Überprüfen Sie:

1. `PositioningType` Übereinstimmung
2. Bindungsfluss abgeschlossen
3. Entitäten erhalten Welt- und Positionsaktualisierungen
4. Der Client ist nicht lokal stummgeschaltet oder taub
5. Der Server hat die Entität nicht stummgeschaltet oder betäubt

So überprüfen Sie:

- Führen Sie `list --clientsOnly` aus, um zu bestätigen, dass der Sprachclient vorhanden ist
- Führen Sie `list` aus und prüfen Sie, ob die zugehörige Entität eine sich ändernde Position hat
- Verwenden Sie den Client-Mikrofontest und den Ausgabetest, um lokale Audiogeräte auszuschließen

## Symptom: Das Add-on stellt eine Verbindung her, aber die Bindung funktioniert nie

Überprüfen Sie:

1. Token ist korrekt
2. Die erwartete Entität wird erstellt
3. Der Spieler hat den richtigen Bindungsschlüssel verwendet
4. Bind-Skript-Ereignisse werden ausgelöst

Häufige Ursachen:

- Der Spieler hat einen abgelaufenen oder neu generierten Bindungsschlüssel kopiert
- Die Version des Add-on-Pakets stimmt nicht mit der Server-/Client-Version überein
- Die benutzerdefinierte Add-on-Logik fängt den Stock-Bind-Fluss ab oder umgeht ihn

## Symptom: VoiceCraft.Java ist installiert, aber die Java-seitige Bridge wird nie nutzbar

Überprüfen Sie:

1. `McTcp` ist auf VoiceCraft aktiviert
2. `config.voicecraft.transport.host`, `config.voicecraft.transport.port` und `config.voicecraft.transport.login-token` stimmen überein
3. Der direkte vs. Proxy-Modus ist absichtlich konfiguriert
4. Wenn `auto-start` aktiviert ist, ist die Laufzeit innerhalb des Timeouts bereit

Überprüfen Sie außerdem, ob das Plugin auf der richtigen Ebene installiert ist: Der direkte Paper-Modus benötigt Paper/Folia, während der Proxy-Modus die Proxy- und Backend-Knoten benötigt.

## Symptom: Der Direct Paper-Modus funktioniert nach der manuellen erneuten Verbindung, jedoch nicht beim Start

Überprüfen Sie:

1. `config.voicecraft.auto-start`
2. `install-directory`
3. `ready-timeout-ms`
4. Start-Eigentümerschaft des Laufzeitprozesses

Wenn das Plugin startet, bevor die verwaltete Laufzeit bereit ist, erhöhen Sie das Timeout oder verwenden Sie einen externen VoiceCraft-Dienst mit einer eigenen Neustartrichtlinie.

## Symptom: Der Proxy-Modus funktioniert auf einem Backend, bricht jedoch beim Serverwechsel ab

Überprüfen Sie:

1. Proxy ist die Quelle der Wahrheit
2. Backend-Knoten versuchen nicht, die VoiceCraft-Verbindung zu besitzen
3. Die Snapshot-Weiterleitung bleibt über Switches hinweg erhalten
4. Die Namensraumlogik der Welt-ID bleibt konsistent

Wenn nur ein Backend ausfällt, vergleichen Sie dessen VoiceCraft.Java-Konfiguration und Plugin-Version mit einem funktionierenden Backend.

## Symptom: `McWss` ist instabil

Überprüfen Sie:

1. `CommandsPerTick`
2. `MaxByteLengthPerCommand`
3. Entitätsabwanderung und Paket-Burst-Größe
4. ob `McHttp` besser passen würde

Wenn die Welt zu einem langlebigen gemeinsam genutzten Server wird, betrachten Sie Instabilität als Zeichen für den Wechsel zu BDS + `McHttp`.

## Symptom: Der VoiceCraft-Server startet, aber der Transportkonsument kann keine Verbindung herstellen

Überprüfen Sie:

1. Hostbindung
2. freiliegender Hafen
3. Firewall
4. Falscher Transporttyp ausgewählt
5. Die Laufzeit überschreibt die Änderung der erwarteten Werte

Schnelle Aufteilung:

- Bei Client-Verbindungsproblemen handelt es sich in der Regel um UDP-Endpunkt- oder Client-Einstellungen
- Add-on-/Plugin-Verbindungsprobleme sind normalerweise `McHttp`, `McWss` oder `McTcp`
- Bindungs-/Proximitätsprobleme treten normalerweise auf, nachdem beide Verbindungen bereits bestehen
