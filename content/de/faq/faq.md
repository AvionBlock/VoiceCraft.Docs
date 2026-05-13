# FAQ

Häufige Fragen zu VoiceCraft.

## Benötigt jeder Spieler die VoiceCraft-Client-App?

Ja. Spieler benötigen die Client-Anwendung. Der Server selbst nutzt die Client-App nicht.

Der Client erfasst Mikrofoneingaben und gibt Sprachaudio in der Nähe wieder. Das Minecraft-Addon oder -Plugin liefert nur Spielstatus wie Spielerposition und Bindungsdaten.

## Funktioniert VoiceCraft auf Mobilgeräten?

Ja. Android und iOS werden unterstützt.

Mobile Benutzer benötigen weiterhin einen erreichbaren VoiceCraft-Serverendpunkt und eine Mikrofonberechtigung.

## Funktioniert VoiceCraft auf der Konsole?

Heute nicht direkt auf Konsolenhardware als nativer VoiceCraft-Client.

Konsolenspieler können immer noch an einigen serverseitigen Szenarien teilnehmen, wenn der Rest des Stacks korrekt konfiguriert ist, aber die direkte Unterstützung nativer Clients ist nicht dasselbe wie Desktop- oder Mobilgeräte.

## Funktioniert VoiceCraft auf Realms?

Es kann in begrenzten Szenarien funktionieren, insbesondere wenn die clientseitige Positionierung verwendet wird, aber Realms ist eine eingeschränktere Umgebung als ein dedizierter Server.

Wenn Sie ein vorhersehbares Produktionssetup wünschen, verwenden Sie BDS mit `McHttp` oder eine Java/Geyser-Topologie mit `GeyserVoice`.

## Welchen Transport soll ich nutzen?

- Dedizierter Bedrock-Server:
  `McHttp`
- lokale Bedrock-Welt:
  `McWss`
- Java + Geyser / Floodgate:
  `McTcp` bis `GeyserVoice`

Der Transport ist für den Minecraft-Seitenstaat bestimmt. Spieler-Clients stellen weiterhin eine Verbindung zum VoiceCraft UDP-Endpunkt her.

## Benötigt GeyserVoice einen separat verwalteten VoiceCraft-Server?

Nicht immer.

Im direkten Paper-Modus kann GeyserVoice die VoiceCraft-Laufzeit unter der Haube booten und ausführen, indem es Folgendes verwendet:

- `config.voicecraft.auto-start`
- `config.voicecraft.shutdown-on-disable`
- `config.voicecraft.ready-timeout-ms`
- `config.voicecraft.install-directory`

Wenn Sie möchten, kann es auch auf einen bereits laufenden externen VoiceCraft-Server verweisen.

In aktuellen Konfigurationen befinden sich die externen Verbindungswerte unter `config.voicecraft.transport.*`.

## Kann ich VoiceCraft mit Hosting-Anbietern wie Apex, Aternos oder ähnlichen nutzen?

Es hängt davon ab, ob Ihr Provider den erforderlichen Netzwerkpfad zwischen dem Spieleserver und dem VoiceCraft-Server zulässt.

Beispiele:

- BDS mit `McHttp` benötigt ausgehende Erreichbarkeit zum VoiceCraft-HTTP-Endpunkt
- Java + GeyserVoice benötigt Erreichbarkeit zum VoiceCraft-Endpunkt `McTcp`

Einige Anbieter blockieren genau das Netzwerkverhalten, das Sie benötigen.

Erkundigen Sie sich vor dem Kauf eines Hostings, ob benutzerdefinierte UDP-Ports, ausgehendes HTTP/TCP, Sidecar-Prozesse und erforderliche Bedrock-Skriptmodule zulässig sind.

## Kann ich VoiceCraft auf demselben Computer wie den Spieleserver hosten?

Ja. Das ist üblich für:

- lokale Tests
- kleine Gemeinden
- direkte Paper + GeyserVoice-Setups

Verwenden Sie Loopback-Adressen wie `127.0.0.1` nur, wenn der Verbraucher tatsächlich auf derselben Maschine läuft.

## Kann ich nur einen Transport durchführen?

Ja. Sie können Laufzeittransporte einschränken mit:

- config schaltet in `ServerProperties.json` um
- Laufzeitüberschreibungen wie `--transport-mode`

Dies wird für die Produktion empfohlen. Machen Sie nur den Transport verfügbar, den Ihre Topologie verwendet.

## Warum höre ich niemanden, obwohl der Client eine Verbindung herstellt?

Überprüfen Sie diese der Reihe nach:

1. Geben Sie im Client die richtige VoiceCraft-Server-IP und den richtigen Port ein
2. passend zu `PositioningType`
3. korrekter Minecraft-Transporttoken
4. erfolgreicher Bindungsfluss
5. Entitäten, die Positions- und Weltaktualisierungen erhalten

Wenn `list --clientsOnly` den Spieler anzeigt, `list` jedoch keine sich ändernde Entitätsposition, debuggen Sie die Minecraft-Integration und nicht die Mikrofoneinstellungen.

## Ist `McWss` gut für die Produktion?

Normalerweise nicht die erste Wahl für größere öffentliche Umgebungen.

Es eignet sich am besten für lokale Welten, Tests und leichte Setups. `McHttp` ist normalerweise ein besserer Bedrock-Produktionstransport.

## Was ist der Unterschied zwischen Server-Stummschaltung und lokaler Stummschaltung?

- Server-Stummschaltung:
  wird vom Backend für die Zielentität oder den Zielkunden erzwungen
- lokale Stummschaltung:
  als persönliche Präferenz im `Settings.json` eines Spielers gespeichert

## Wo werden die Lautstärke pro Benutzer und die lokale Stummschaltung gespeichert?

In `Settings.json` unter `UserSettings.Users`.

## Ich betreibe Java mit Geyser. Benötige ich auch das Bedrock-Addon?

Nein. In Java + Geyser-Topologien ist die Bridge normalerweise `GeyserVoice`, nicht das Bedrock-Add-on.

Verwenden Sie das Bedrock-Addon für Bedrock-Welten/BDS. Verwenden Sie GeyserVoice, wenn die Java-seitige Infrastruktur die Quelle des Spielerstatus ist.

## Ist VoiceCraft ein von einem Drittanbieter gehosteter Sprachdienst?

Nein. VoiceCraft erfordert keinen von einem Drittanbieter gehosteten Dienst. Sie führen den Server/die Laufzeit selbst aus oder überlassen GeyserVoice die Verwaltung der Laufzeit im direkten Paper-Modus.

## Ist VoiceCraft nur ein Minecraft-Mod?

Nein. VoiceCraft ist eine Sammlung von Client-Apps, einer Server-Laufzeitumgebung, Bedrock-Add-on-Paketen und Java-seitigen Bridge-Tools. Ein funktionierendes Setup benötigt die richtige Kombination für Ihre Topologie.
