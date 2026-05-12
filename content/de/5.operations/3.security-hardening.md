# Sicherheitshärtung

Auf dieser Seite geht es um die Reduzierung des Betriebsrisikos bei realen Einsätzen.

## 1. Drehen Sie jeden generierten Token

Behalten Sie niemals standardmäßig generierte Werte bei für:

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

Behandeln Sie sie als gemeinsame Geheimnisse.

## 2. Nur erforderliche Transporte verfügbar machen

Veröffentlichen Sie nicht jeden Transport, nur weil er existiert.

Beispiele:

- Nur-Bedrock-Host:
  usually only `McHttp`
- Java-Bridge-Host:
  usually only `McTcp`
- lokaler Testhost:
  often only loopback `McWss`

## 3. Verwenden Sie nach Möglichkeit Loopback

Bevorzugen:

- `127.0.0.1`
- `localhost`

wenn sich der Verbraucher auf derselben Maschine befindet.

Use `0.0.0.0` only when remote access is actually required.

## 4. Strenge Firewall-Richtlinie

Erlauben Sie nur das, was Sie brauchen:

- VoiceCraft UDP-Port
- Spezifischer HTTP- oder TCP-Transportport
- optionaler WebSocket-Port

Öffnen Sie Transportports nicht allgemein, wenn der integrierende Knoten bekannt und festgelegt ist.

## 5. Separate Umgebungen

Verwenden Sie verschiedene:

- Token
- Konfigurationsdateien
- Verzeichnisse
- Häfen

für Produktion, Staging und lokale Tests.

## 6. Seien Sie vorsichtig mit Plugin-verwalteten Laufzeiten

If `GeyserVoice` manages the VoiceCraft runtime:

- Behalten Sie die Kontrolle über das Installationsverzeichnis
- Verstehen, wer für das Neustartverhalten verantwortlich ist
- Bestätigen Sie, dass Protokolle an einem vorhersehbaren Ort gesammelt werden

## 7. Avoid casual use of `DisabledPacketTypes`

Dies ist keine normale Härtungsfunktion.

Es ist in erster Linie für:

- Debuggen
- vorübergehende Milderung
- Protokollexperimente

Das blinde Deaktivieren von Pakettypen kann die Authentifizierung, Synchronisierung oder Audio beeinträchtigen.

## 8. Betriebsbefehle einschränken

For `GeyserVoice`, keep these staff-only:

- `/voice connect`
- `/voice reconnect`
- `/voice disconnect`
- `/voice reload`

## 9. Backup-Inhalte schützen

Backups können Folgendes enthalten:

- Transportmarken
- Host- und Port-Topologie
- Details zum Service-Layout

Behandeln Sie Konfigurationssicherungen als vertrauliche Betriebsdaten.
