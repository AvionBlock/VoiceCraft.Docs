# Produktions-Blueprints

Diese Seite fasst vernünftige Produktionsansätze statt roher Funktionslisten zusammen.

## Blueprint 1: Nur-Bedrock-Server

Verwendung:

- `VoiceCraft.Server`
- `McHttp`
- `VoiceCraft.Addon.Core.McHttp`

Warum:

- Sauberste stabile Bedrock-Bereitstellung
- am einfachsten zu überwachen
- dem Serverpersonal am einfachsten zu erklären

## Blueprint 2: Lokale Community / SMP mit Geyser

Verwendung:

- `VoiceCraft.Server`
- `McTcp`
- `GeyserVoice` direct Paper mode

Optional:

- Lassen Sie GeyserVoice die VoiceCraft-Laufzeit verwalten, wenn Sie einen einzelnen Java-seitigen Installationsablauf bevorzugen

## Blueprint 3: Großes Java-Netzwerk

Verwendung:

- external `VoiceCraft.Server`
- `McTcp`
- `GeyserVoice` on proxy
- `GeyserVoice` on backend nodes

Warum:

- zentrale Steuerung
- sauberere Skalierung
- einfachere Neustarts, ohne jedes Backend zu berühren

## Blueprint 4: Builder/Testumgebung

Verwendung:

- `McWss`
- `Core.McWss`
– eine lokale VoiceCraft-Instanz

Warum:

- schnelle lokale Schleife
- Gut zum Testen der Add-on-Automatisierung

## Operative Empfehlungen

- Speichern Sie VoiceCraft-Protokolle nach Möglichkeit getrennt von Spielprotokollen
- Rotieren oder archivieren Sie Konfigurationen vor großen Upgrades
- Transportmarken geheim halten
- Testen Sie den Bindungsfluss nach jeder Topologieänderung
