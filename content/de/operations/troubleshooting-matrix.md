# Fehlerbehebungsmatrix

Verwenden Sie diese Seite, wenn Sie eine symptombasierte Diagnose statt einer allgemeinen Checkliste wünschen.

## Symptom: Der Client stellt eine Verbindung her, aber niemand hört etwas

Überprüfen Sie:

1. `PositioningType` match
2. Bindungsfluss abgeschlossen
3. Entitäten erhalten Welt- und Positionsaktualisierungen
4. Der Kunde ist nicht lokal stummgeschaltet oder taub
5. Der Server hat die Entität nicht stummgeschaltet oder betäubt

## Symptom: Addon stellt eine Verbindung her, aber die Bindung funktioniert nie

Überprüfen Sie:

1. Token ist korrekt
2. Die erwartete Entität wird erstellt
3. Der Spieler hat den richtigen Bindungsschlüssel verwendet
4. Bindeskript-Ereignisse werden ausgelöst

## Symptom: GeyserVoice ist installiert, aber die Java-seitige Bridge wird nie nutzbar

Überprüfen Sie:

1. `McTcp` is enabled on VoiceCraft
2. `host`, `port`, and `login-token` match
3. Der Direkt- vs. Proxy-Modus ist absichtlich konfiguriert
4. if `auto-start` is enabled, the runtime becomes ready within timeout

## Symptom: Der Direktpapiermodus funktioniert nach der manuellen erneuten Verbindung, jedoch nicht beim Start

Überprüfen Sie:

1. `config.voicecraft.auto-start`
2. `install-directory`
3. `ready-timeout-ms`
4. Start-Eigentümerschaft des Laufzeitprozesses

## Symptom: Der Proxy-Modus funktioniert auf einem Backend, bricht jedoch beim Serverwechsel ab

Überprüfen Sie:

1. Proxy ist die Quelle der Wahrheit
2. Backend-Knoten versuchen nicht, die VoiceCraft-Verbindung zu besitzen
3. Die Snapshot-Weiterleitung bleibt über Switches hinweg erhalten
4. Die Namensraumlogik der Welt-ID bleibt konsistent

## Symptom: `McWss` is unstable

Überprüfen Sie:

1. `CommandsPerTick`
2. `MaxByteLengthPerCommand`
3. Entitätsabwanderung und Paket-Burst-Größe
4. whether `McHttp` would be a better fit

## Symptom: Der VoiceCraft-Server startet, aber der Transportkonsument kann keine Verbindung herstellen

Überprüfen Sie:

1. Hostbindung
2. Freiliegender Anschluss
3. Firewall
4. Falscher Transporttyp ausgewählt
5. Die Laufzeit überschreibt die Änderung der erwarteten Werte
