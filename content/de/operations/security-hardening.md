# Sicherheitshärtung

Auf dieser Seite geht es um die Reduzierung des Betriebsrisikos bei realen Einsätzen.

Bei der Sicherheit von VoiceCraft geht es vor allem darum, zu begrenzen, wer Transportendpunkte erreichen kann, gemeinsame Token zu schützen und die operativen Kontrollen, die nur dem Personal vorbehalten sind, von regulären Spielern fernzuhalten.

## 1. Drehen Sie jeden generierten Token

Behalten Sie niemals standardmäßig generierte Werte bei für:

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

Behandeln Sie sie als gemeinsame Geheimnisse.

Verwenden Sie den Token nur mit der passenden Integration:

- `McHttpConfig.LoginToken` für BDS `McHttp`
- `McWssConfig.LoginToken` für lokales Grundgestein `McWss`
- `McTcpConfig.LoginToken` für GeyserVoice / Java Bridge

## 2. Legen Sie nur die erforderlichen Transporte frei

Veröffentlichen Sie nicht jeden Transport, nur weil er existiert.

Beispiele:

- Nur-Bedrock-Host:
  normalerweise nur `McHttp`
- Java-Bridge-Host:
  normalerweise nur `McTcp`
- lokaler Testhost:
  oft nur Loopback `McWss`

## 3. Verwenden Sie nach Möglichkeit Loopback

Bevorzugen:

- `127.0.0.1`
- `localhost`

wenn sich der Verbraucher auf derselben Maschine befindet.

Verwenden Sie `0.0.0.0` nur, wenn tatsächlich ein Fernzugriff erforderlich ist.

## 4. Strenge Firewall-Richtlinie

Erlauben Sie nur das, was Sie brauchen:

- VoiceCraft UDP-Port
- spezifischer HTTP- oder TCP-Transportport
- optionaler WebSocket-Port

Öffnen Sie Transportports nicht allgemein, wenn der integrierende Knoten bekannt und festgelegt ist.

Denken Sie daran, dass der Client-UDP-Endpunkt und die Minecraft-Transportendpunkte unterschiedliche Benutzer bedienen. Spieler benötigen den Sprach-UDP-Endpunkt. Das Addon/Plugin benötigt den ausgewählten Minecraft-Transportendpunkt.

## 5. Separate Umgebungen

Verwenden Sie verschiedene:

- Token
- Konfigurationsdateien
- Verzeichnisse
- Häfen

für Produktion, Staging und lokale Tests.

## 6. Seien Sie vorsichtig mit Plugin-verwalteten Laufzeiten

Wenn `GeyserVoice` die VoiceCraft-Laufzeit verwaltet:

- Behalten Sie die Kontrolle über das Installationsverzeichnis
- Verstehen Sie, wer für das Neustartverhalten verantwortlich ist
- Bestätigen Sie, dass Protokolle an einem vorhersehbaren Ort gesammelt werden
- Stellen Sie sicher, dass generierte Laufzeitdateien nicht von nicht vertrauenswürdigen Benutzern beschreibbar sind
- Wissen Sie, ob `shutdown-on-disable` in Ihrem Neustartprozess erwartet wird

## 7. Vermeiden Sie die gelegentliche Verwendung von `DisabledPacketTypes`

Dies ist keine normale Härtungsfunktion.

Es ist in erster Linie für:

- Debuggen
- vorübergehende Milderung
- Protokollexperimente

Das blinde Deaktivieren von Pakettypen kann die Authentifizierung, Synchronisierung oder Audio beeinträchtigen.

## 8. Beschränken Sie die operativen Befehle

Behalten Sie für `GeyserVoice` diese nur für Mitarbeiter bei:

- `/voice connect`
- `/voice reconnect`
- `/voice disconnect`
- `/voice reload`

Beschränken Sie den Zugriff für die VoiceCraft-Serverkonsole nur auf vertrauenswürdige Operatoren. Befehle wie `kick`, `mute`, `deafen` und Metadatenänderungen können sich auf Live-Player auswirken.

## 9. Schützen Sie den Backup-Inhalt

Backups können Folgendes enthalten:

- Transportmarken
- Host- und Porttopologie
- Details zum Service-Layout

Behandeln Sie Konfigurationssicherungen als vertrauliche Betriebsdaten.

## 10. Überprüfen Sie öffentliche Unterstützungsartefakte

Entfernen Sie Folgendes, bevor Sie Screenshots, Protokolle oder Konfigurationen öffentlich veröffentlichen:

- Anmeldetoken transportieren
- öffentliche IPs, wenn diese nicht offengelegt werden sollen
- Geheimnisse des Service-Wrappers
- generierte Bindeschlüssel, sofern diese noch aktiv sind
- Spieler-IDs, wenn Datenschutz wichtig ist

## Checkliste zum Härten

- generierte Token ersetzt
- Nur erforderliche Transporte aktiviert
- Loopback wird für Konsumenten auf demselben Host verwendet
- Firewall-Regeln, soweit möglich, auf bekannte Quellen beschränken
- GeyserVoice-Betriebsbefehle eingeschränkt
- Backups sicher gespeichert
- Release- und Add-on-/Plugin-Versionen bleiben aufeinander abgestimmt
