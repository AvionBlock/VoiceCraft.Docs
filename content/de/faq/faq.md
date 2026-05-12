# FAQ

Häufige Fragen zu VoiceCraft.

## Benötigt jeder Spieler die VoiceCraft-Client-App?

Ja. Spieler benötigen die Client-Anwendung. Der Server selbst nutzt die Client-App nicht.

## Funktioniert VoiceCraft auf Mobilgeräten?

Ja. Android und iOS werden unterstützt.

## Funktioniert VoiceCraft auf der Konsole?

Heute nicht direkt auf Konsolenhardware als nativer VoiceCraft-Client.

Konsolenspieler können immer noch an einigen serverseitigen Szenarien teilnehmen, wenn der Rest des Stacks korrekt konfiguriert ist, aber die direkte Unterstützung nativer Clients ist nicht dasselbe wie Desktop- oder Mobilgeräte.

## Funktioniert VoiceCraft auf Realms?

Es kann in begrenzten Szenarien funktionieren, insbesondere wenn die clientseitige Positionierung verwendet wird, aber Realms ist eine eingeschränktere Umgebung als ein dedizierter Server.

## Welches Transportmittel soll ich nutzen?

- Dedizierter Bedrock-Server:
  `McHttp`
- lokale Bedrock-Welt:
  `McWss`
- Java + Geyser / Floodgate:
  `McTcp` through `GeyserVoice`

## Benötigt GeyserVoice einen separat verwalteten VoiceCraft-Server?

Nicht immer.

Im direkten Paper-Modus kann GeyserVoice die VoiceCraft-Laufzeit unter der Haube booten und ausführen, indem es Folgendes verwendet:

- `config.voicecraft.auto-start`
- `shutdown-on-disable`
- `ready-timeout-ms`
- `install-directory`

Wenn Sie möchten, kann es auch auf einen bereits laufenden externen VoiceCraft-Server verweisen.

## Kann ich VoiceCraft mit Hosting-Anbietern wie Apex, Aternos oder ähnlichen nutzen?

Es hängt davon ab, ob Ihr Provider den erforderlichen Netzwerkpfad zwischen dem Spieleserver und dem VoiceCraft-Server zulässt.

Beispiele:

- BDS with `McHttp` needs outbound reachability to the VoiceCraft HTTP endpoint
- Java + GeyserVoice needs reachability to the VoiceCraft `McTcp` endpoint

Einige Anbieter blockieren genau das Netzwerkverhalten, das Sie benötigen.

## Kann ich VoiceCraft auf demselben Computer wie den Spieleserver hosten?

Ja. Das ist üblich für:

- lokale Tests
- kleine Gemeinden
- direkte Paper + GeyserVoice-Setups

## Kann ich nur einen Transport betreiben?

Ja. Sie können Laufzeittransporte einschränken mit:

- config toggles in `ServerProperties.json`
- runtime overrides such as `--transport-mode`

## Warum höre ich niemanden, obwohl der Client eine Verbindung herstellt?

Überprüfen Sie diese der Reihe nach:

1. Korrigieren Sie die IP und den Port des VoiceCraft-Servers im Client
2. matching `PositioningType`
3. Minecraft-Transporttoken korrigieren
4. Erfolgreicher Bindungsfluss
5. Entitäten, die Positions- und Weltaktualisierungen erhalten

## Is `McWss` good for production?

Normalerweise nicht die erste Wahl für größere öffentliche Umgebungen.

It is best for local worlds, testing, and lightweight setups. `McHttp` is usually a better Bedrock production transport.

## Was ist der Unterschied zwischen Server-Stummschaltung und lokaler Stummschaltung?

- Server-Stummschaltung:
  wird vom Backend für die Zielentität oder den Zielkunden erzwungen
- lokale Stummschaltung:
  stored in a player's `Settings.json` as a personal preference

## Wo werden die Lautstärke pro Benutzer und die lokale Stummschaltung gespeichert?

In `Settings.json` under `UserSettings.Users`.

## Ich betreibe Java mit Geyser. Benötige ich auch das Bedrock-Addon?

No. In Java + Geyser topologies, the bridge is typically `GeyserVoice`, not the Bedrock addon.
