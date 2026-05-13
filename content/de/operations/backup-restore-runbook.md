# Runbook sichern und wiederherstellen

Diese Seite konzentriert sich auf praktische Sicherungs- und Wiederherstellungsschritte.

Verwenden Sie es vor riskanten Änderungen: Upgrades, Token-Rotation, Transportänderungen, Host-Migration oder Wechsel zwischen Bedrock- und Java-seitigen Topologien.

## Was soll gesichert werden?

Mindestens:

- `config/ServerProperties.json`
- Service-Wrapper-Dateien
- Bereitstellungshinweise für Ports und Token

Empfohlen:

- Artefakte aus früheren Versionen
- Protokolliert den letzten bekannten Zustand
- Plugin-Konfigurationen wie `GeyserVoice/config.yml`
- Konfigurationsdateien für das Bedrock World Pack
- Add-on-Paketversionen, die derzeit weltweit installiert sind
- Service-Manager-Dateien wie Systemd-Einheiten oder Panel-Startbefehle
- Hinweise zur Laufzeitüberschreibung, wenn Startflags verwendet werden

## Bevor Sie etwas ändern

Machen Sie einen Schnappschuss, wenn Sie Folgendes tun möchten:

- Aktualisieren Sie VoiceCraft
- Transporte ändern
- Spielsteine drehen
- Switch-Topologie
- Hostbindungen oder Firewallregeln ändern
- Wechseln Sie von der Plugin-verwalteten Laufzeit zur externen Laufzeit

## Workflow wiederherstellen

1. Stoppen Sie den betroffenen Dienst.
2. Stellen Sie `ServerProperties.json` wieder her.
3. Stellen Sie die zugehörige Plugin- oder Add-on-Konfiguration wieder her, wenn sich die Topologie geändert hat.
4. Stellen Sie das passende Add-on/Plugin-Paket wieder her, wenn die Versionskompatibilität wichtig ist.
5. Starten Sie VoiceCraft neu.
6. Starten Sie die Minecraft-seitige Integration neu oder laden Sie sie neu.
7. Validieren Sie die Transportauthentifizierung und den Bindungsfluss.

## Was eine Wiederherstellung nicht automatisch behebt

- Firewall-Fehler
- Probleme mit DNS oder Host-Erreichbarkeit
- Nicht übereinstimmende Client- oder Plugin-Konfiguration
- Topologiefehler nach einer Netzwerkneugestaltung
- ein Anbieter, der den benötigten Transportweg blockiert
- Spieler, die ein neueres inkompatibles Client-Paket verwenden

## Validierung nach der Wiederherstellung

Überprüfen Sie:

1. Server startet sauber
2. Der gewählte Transport ist aktiviert
3. Token entspricht dem integrierenden Knoten
4. Player-Bindung und Audiofluss funktionieren wieder
5. Serverbefehle zeigen erwartete Clients/Entitäten an
6. In den Protokollen wird der Fehler, der die Wiederherstellung ausgelöst hat, nicht mehr angezeigt

## Benennung des Backups

Verwenden Sie Namen, die Folgendes enthalten:

- Datum
- VoiceCraft-Version
- Topologie
- Grund

Beispiel:

```text
2026-05-13-voicecraft-1.6.1-bds-before-token-rotation
```

Bei Vorfällen sind gute Namen wichtig, da sie deutlich machen, welches Backup zu welcher Topologie gehört.
