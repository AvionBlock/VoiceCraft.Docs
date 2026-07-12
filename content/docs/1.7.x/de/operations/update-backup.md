# Aktualisierung und Backup

Verwenden Sie diese Seite für normale Updates, bei denen die Topologie gleich bleibt. Für größere Änderungen verwenden Sie das [Upgrade-Runbook](/operations/upgrade-runbook).

VoiceCraft `1.7.0` ist kein reines Patch-Update. Server, Clients, Add-on-Pakete und Java-Bridges sollten gemeinsam auf `1.7.x` aktualisiert werden.

## Änderungen in 1.7.0

- neu aufgebaute Audioeffekt-Pipeline mit Prozessoren pro Entity
- benutzerdefinierte Entity-Properties für Effekt-Overrides
- Event-Flow über `EventRequest`
- `SetProperty` / `OnEntityPropertyUpdated` ersetzen den alten Cave/Muffle-Factor-Pfad
- NAT-Port-Mapping über `OpenPort.Net`
- iOS-Fixes für Sample-Rate und Apple Privacy Manifest
- aktualisierte Abhängigkeiten, Android-Version `17`, Release-Pipeline
- Entfernung des Browser/Web-Clients

Client und Server sollten dieselbe `Major.Minor`-Version verwenden. Nutzen Sie `1.7.x`-Clients mit `1.7.x`-Servern.

## Vor dem Update sichern

- `config/ServerProperties.json`
- eigene Startskripte, systemd Units, Container- oder Panel-Konfiguration
- Log-Historie, falls benötigt
- VoiceCraft.Java- oder Java-Bridge-Konfiguration
- Bedrock World-Pack-Konfiguration
- Notizen zu Hostnamen, Ports, Firewall und Portweiterleitung

## Sicheres Server-Update

1. `VoiceCraft.Server` stoppen.
2. Den Ordner `config/` sichern.
3. Release `1.7.0` in ein neues Verzeichnis entpacken.
4. `ServerProperties.json` kopieren.
5. Neue NAT-Port-Mapping-Felder prüfen.
6. Server starten und Logs prüfen.
7. Jeden aktivierten Transport testen.
8. Einen Client und eine Minecraft-Integration verbinden.

## Migration von ServerProperties.json

`1.7.0` ergänzt die Transport- und VoiceCraft-Konfiguration um:

- `AutoOpenPort`
- `ExternalPort`
- `PortMappingLifetimeMinutes`
- `PortMappingTimeoutSeconds`

`AutoOpenPort` ist standardmäßig `false`. Lassen Sie es aus, wenn Firewall, Portweiterleitung, Tunnel, Docker, Panel-Hosting oder Reverse Proxy bereits extern verwaltet werden.

## Add-ons und Bridges

Aktualisieren Sie passende Add-on- oder Bridge-Pakete zusammen mit dem Server. Eigene Integrationen müssen auf das 1.7 Event-/Property-Modell umgestellt werden.

Alter Code, der Cave/Muffle-Pakete nutzt, sollte auf `SetProperty` und `OnEntityPropertyUpdated` migriert werden.

## Client-Update

Client-Einstellungen liegen normalerweise in `ApplicationData/voicecraft` und bleiben erhalten.

Prüfen Sie trotzdem:

- Mikrofon und Ausgabegerät
- gespeicherten Servereintrag
- Push-to-talk
- `Positioning Type`
- iOS-Audioaufnahme, falls ältere Builds Probleme hatten

Der Browser/Web-Client wurde in `1.7.0` entfernt. Verwenden Sie native Desktop- oder Mobile-Clients.
