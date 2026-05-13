# Hosting-Vorbehalte

Unterschiedliche Anbieter und Bereitstellungsstile beeinflussen, welche VoiceCraft-Topologie realistisch ist.

Bevor Sie eine Topologie auswählen, bestätigen Sie zwei Netzwerkpfade:

1. Spieler können den VoiceCraft UDP-Endpunkt erreichen
2. Die Minecraft-seitige Laufzeit kann den ausgewählten Transportendpunkt erreichen

Viele Hosting-Probleme entstehen dadurch, dass einer dieser Pfade blockiert wird, während der andere noch funktioniert.

## Bedrock-Hosts

`McHttp` ist normalerweise der beste Bedrock-Transport, aber nur, wenn der BDS-Knoten den VoiceCraft-Endpunkt erreichen kann.

Häufige Blocker:

- ausgehende HTTP-Einschränkungen
- fehlende Modulberechtigungen
- Welten, in denen die Skriptunterstützung eingeschränkt ist

Wenn der Anbieter ausgehendes HTTP oder erforderliche Skriptmodule blockiert, ist `McHttp` möglicherweise technisch korrekt, aber betrieblich nicht verfügbar.

## Shared-Hosting-Anbieter

Einige Anbieter erlauben Folgendes nicht:

- benutzerdefinierte Listener
- ausgehendes HTTP vom Spieleserver
- zusätzliche Sidecar-Prozesse

In diesen Umgebungen ist die technisch unterstützte Topologie möglicherweise immer noch betriebsbedingt blockiert.

Fragen Sie den Anbieter speziell nach ausgehendem HTTP/TCP vom Spieleserver und zusätzlichen Sidecar-Prozessen. Eine allgemeine Antwort „Plugins erlaubt“ reicht nicht aus.

## Aternos-ähnliche Einschränkungen

Bei stark eingeschränktem Hosting kann die Kommunikation im HTTP-Stil blockiert oder unpraktisch sein.

Wenn das passiert:

- Bedrock BDS + `McHttp` ist möglicherweise nicht realisierbar
- Lokale oder clientseitige Alternativen können der einzige Weg sein

Gehen Sie nicht davon aus, dass ein freier/eingeschränkter Host dieselbe Topologie wie ein VPS oder eine dedizierte Maschine ausführen kann.

## Docker- und Container-Vorbehalte

Container helfen bei der Isolation, aber Sie benötigen trotzdem:

- Hafenveröffentlichung
- Stabile Volume-Mounts für die Konfiguration
- korrekte Cross-Container-Vernetzung
- explizite UDP-Veröffentlichung für den VoiceCraft-Client-Endpunkt
- persistenter Speicher für verwaltete Laufzeitverzeichnisse

## Reverse-Proxys

VoiceCraft-Transporte sind nicht alle Reverse-Proxy-förmig:

- `McHttp` passt natürlicher zu HTTP-Tools
- `McTcp` ist rohes TCP
- `McWss` verhält sich anders als einfaches HTTP

Gehen Sie nicht davon aus, dass eine Ingress-Strategie für alle funktioniert.

HTTP-Tools können bei `McHttp` hilfreich sein, lösen jedoch nicht automatisch rohen `McTcp`- oder Client-UDP-Verkehr.

## Vorbehalte für Java-Netzwerke

Für `GeyserVoice`-Proxy-Bereitstellungen:

- Der Proxy muss VoiceCraft zuverlässig erreichen
- Backend-Paper-Knoten müssen den Proxy-Nachrichtenpfad zuverlässig erreichen
- Das Eigentumsmodell muss klar bleiben

Wenn der Proxy die Bridge nicht sauber besitzen kann, wird die Topologie fragil.

## Praktische Anbieter-Checkliste

Fragen oder überprüfen Sie:

- Können Spieler einen benutzerdefinierten UDP-Port erreichen?
- Kann der Spieleserver ausgehende HTTP-Anfragen stellen?
- Kann der Spieleserver rohe TCP-Ports öffnen oder eine Verbindung zu ihnen herstellen?
- Kann ich einen Sidecar-Prozess für `VoiceCraft.Server` ausführen?
- Kann ich `config/ServerProperties.json` beibehalten?
- Kann ich Bedrock-Verhaltens-/Ressourcenpakete installieren oder aktualisieren?
- Können Plugin-Nachrichten für Java-Netzwerke zuverlässig zwischen Backend und Proxy weitergeleitet werden?

Wenn eine Antwort „Nein“ lautet, wählen Sie eine Topologie, die diese Anforderung vermeidet, oder verlagern Sie VoiceCraft auf eine von Ihnen kontrollierte Infrastruktur.
