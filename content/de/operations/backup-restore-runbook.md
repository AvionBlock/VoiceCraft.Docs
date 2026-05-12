# Runbook sichern und wiederherstellen

Diese Seite konzentriert sich auf praktische Sicherungs- und Wiederherstellungsschritte.

## Was gesichert werden soll

Mindestens:

- `config/ServerProperties.json`
- Service-Wrapper-Dateien
- Bereitstellungshinweise für Ports und Token

Empfohlen:

- Artefakte aus früheren Versionen
- Protokolliert den letzten bekannten Zustand
- plugin configs such as `GeyserVoice/config.yml`

## Bevor Sie etwas ändern

Machen Sie einen Schnappschuss, wenn Sie Folgendes tun möchten:

- Aktualisieren Sie VoiceCraft
- Transporte wechseln
- Token drehen
- Topologie wechseln

## Workflow wiederherstellen

1. Stoppen Sie den betroffenen Dienst.
2. Restore `ServerProperties.json`.
3. Stellen Sie die zugehörige Plugin- oder Add-on-Konfiguration wieder her, wenn sich die Topologie geändert hat.
4. Starten Sie VoiceCraft neu.
5. Validieren Sie die Transportauthentifizierung und den Bindungsfluss.

## Was eine Wiederherstellung nicht automatisch behebt

- Firewall-Fehler
- Probleme mit der DNS- oder Host-Erreichbarkeit
- Nicht übereinstimmende Client- oder Plugin-Konfiguration
- Topologiefehler nach einer Netzwerkneugestaltung

## Validierung nach der Wiederherstellung

Überprüfen Sie:

1. Server startet sauber
2. Der gewählte Transport ist aktiviert
3. Token entspricht dem integrierenden Knoten
4. Player-Bindung und Audiofluss funktionieren wieder
