# Runbook aktualisieren

Use this when upgrading VoiceCraft or a related bridge such as `GeyserVoice`.

## Upgrade-Bestellung

Empfohlene Reihenfolge:

1. Konfiguration sichern
2. Neue Binärdateien separat bereitstellen
3. Bereitstellen passender Add-On- oder Plugin-Pakete
4. Transport- und Topologieannahmen lesen
5. Stoppen Sie den alten Dienst
6. Verschieben Sie die Konfiguration in die neue Installation
7. Aktualisieren Sie das Addon/Plugin auf der Minecraft-Seite
8. Starten und validieren

For VoiceCraft `v1.6.1`, do not leave the old Bedrock addon in place. Update the addon together with the client/server release before validating bind flow and in-game indicators.

## Warum separate Verzeichnisse helfen

Ein separates extrahiertes Verzeichnis erleichtert das Rollback, weil:

- Alte Binärdateien sind noch intakt
- Die Konfigurationsmigration ist explizit
- Sie können Release-Layouts vergleichen

## Nach dem Upgrade validieren

Mindestens:

1. VoiceCraft startet
2. Transporthäfen binden
3. Der Client stellt eine Verbindung her
4. Add-on oder Plugin authentifiziert
5. Bind Flow funktioniert
6. Sprachsymbole oder Add-on-Ereignisse im Spiel werden wie erwartet angezeigt
7. Proximity-Audio funktioniert

## Beim Upgrade von GeyserVoice

Validieren Sie außerdem:

- Verhalten beim automatischen Start zur Laufzeit
- Proxy-Eigentumsmodell
- Backend-Snapshot-Weiterleitung

## Beispiele für Rollback-Trigger

Erwägen Sie ein Rollback, wenn:

– Die Authentifizierung schlägt bei einem zuvor funktionierenden Token plötzlich fehl
- Transporte binden nicht mehr wie erwartet
– Die vom Plugin verwaltete Laufzeit wird nie bereit
– Der Sprachstatus des serverübergreifenden Proxys wird inkonsistent
