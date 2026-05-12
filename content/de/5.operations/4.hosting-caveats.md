# Hosting-Vorbehalte

Unterschiedliche Anbieter und Bereitstellungsstile beeinflussen, welche VoiceCraft-Topologie realistisch ist.

## Bedrock-Gastgeber

`McHttp` is usually the best Bedrock transport, but only if the BDS node can reach the VoiceCraft endpoint.

Häufige Blocker:

- Ausgehende HTTP-Einschränkungen
- Fehlende Modulberechtigungen
- Welten, in denen die Skriptunterstützung eingeschränkt ist

## Shared-Hosting-Anbieter

Einige Anbieter erlauben Folgendes nicht:

- Benutzerdefinierte Listener
- Ausgehendes HTTP vom Spieleserver
- zusätzliche Sidecar-Prozesse

In diesen Umgebungen ist die technisch unterstützte Topologie möglicherweise immer noch betriebsbedingt blockiert.

## Aternos-ähnliche Einschränkungen

Bei stark eingeschränktem Hosting kann die Kommunikation im HTTP-Stil blockiert oder unpraktisch sein.

Wenn das passiert:

- Bedrock BDS + `McHttp` may not be viable
- Lokale oder clientseitige Alternativen können der einzige Weg sein

## Docker- und Container-Vorbehalte

Container helfen bei der Isolation, aber Sie benötigen trotzdem:

- Hafenveröffentlichung
- Stabile Volume-Mounts für die Konfiguration
- korrekte Cross-Container-Vernetzung

## Reverse-Proxys

VoiceCraft-Transporte sind nicht alle Reverse-Proxy-förmig:

- `McHttp` can fit HTTP tooling more naturally
- `McTcp` is raw TCP
- `McWss` behaves differently from plain HTTP

Gehen Sie nicht davon aus, dass eine Ingress-Strategie für alle funktioniert.

## Java-Netzwerkvorbehalte

For `GeyserVoice` proxy deployments:

- Der Proxy muss VoiceCraft zuverlässig erreichen
- Backend-Paper-Knoten müssen den Proxy-Nachrichtenpfad zuverlässig erreichen
- Das Eigentumsmodell muss klar bleiben

Wenn der Proxy die Bridge nicht sauber besitzen kann, wird die Topologie fragil.
