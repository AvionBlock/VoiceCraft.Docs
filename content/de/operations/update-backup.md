# Update und Backup

Verwenden Sie diese Seite für routinemäßige Aktualisierungen, bei denen Sie erwarten, dass die Topologie gleich bleibt. Für größere Versionssprünge oder Topologieänderungen verwenden Sie [Upgrade Runbook](/operations/upgrade-runbook).

## Was vor dem Update gesichert werden muss

- `config/ServerProperties.json`
- benutzerdefinierte Skripte/systemd oder Service-Manager-Wrapper
- Protokollverlauf bei Bedarf
- GeyserVoice `config.yml`, wenn Java-seitige Integration verwendet wird
- Bedrock World Pack-Konfiguration, wenn das Add-on verwendet wird
- Hinweise für öffentliche/LAN-Hostnamen und offene Ports

Sicherungen enthalten Token und Topologiedetails. Speichern Sie sie als sensible Betriebsdateien.

## Sicheres Server-Update

1. Stoppen Sie den Server (`stop` oder über den Service Manager).
2. Sichern Sie `config/`.
3. Extrahieren Sie die neue Version in ein separates Verzeichnis.
4. Bewegen Sie Ihr `ServerProperties.json`.
5. Startprotokolle starten und validieren.
6. Bestätigen Sie, dass die ausgewählten Transportbindungen erfolgreich sind.
7. Verbinden Sie einen Client und eine Minecraft-seitige Integration, bevor Sie es für alle Spieler öffnen.

## Hinweis zu VoiceCraft 1.6.1

VoiceCraft `v1.6.1` erfordert die Aktualisierung der Bedrock-Add-on-Pakete gleichzeitig mit den Client/Server-Binärdateien. Die Version behebt die Behandlung von McHttp/McWss-Trennungen und enthält Add-on-seitige Änderungen für Sprachsymbole im Spiel, die Lebensqualität bei der automatischen Verbindung und übertragene Ereignisse.

## Sicheres Client-Update

Clienteinstellungen (`Settings.json`) werden in `ApplicationData/voicecraft` gespeichert, sodass sie Binäraktualisierungen normalerweise überdauern.

Bitten Sie dennoch eine kleine Testgruppe, Folgendes zu überprüfen:

- Mikrofonauswahl
- Ausgabegerät
- gespeicherter Servereintrag
- Push-to-Talk-Verhalten
- `Positioning Type`

## Kompatibilität

- Die Versionen von Client und Server `Major/Minor` sollten übereinstimmen.
- Patchversionen können unterschiedlich sein.
- Bedrock-Add-on-Pakete sollten mit der Server-/Client-Version übereinstimmen, wenn in den Versionshinweisen Add-on-seitiges Verhalten erwähnt wird.
- GeyserVoice sollte mit den entsprechenden Konfigurationserwartungen aktualisiert werden, wenn Java-seitige Bridges verwendet werden.

Wenn nach einem Update Probleme auftreten, beginnen Sie mit [Troubleshooting](/operations/troubleshooting).

## Rollback-Vorbereitung

Beachten Sie Folgendes, bevor Sie Dateien ersetzen:

- Binärverzeichnis des vorherigen Servers
- vorheriges Addon/Plugin-Paket
- vorheriges Konfigurations-Backup
- letzte nachweislich funktionierende Token- und Portnotizen

Ein Rollback ist viel einfacher, wenn das alte Verzeichnis noch vorhanden ist und das Update es nicht an Ort und Stelle überschrieben hat.
