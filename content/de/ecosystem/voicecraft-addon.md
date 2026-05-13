# VoiceCraft.Addon (Bedrock Addon)

Repository: [AvionBlock/VoiceCraft.Addon](https://github.com/AvionBlock/VoiceCraft.Addon)

Dieses Repository enthält praktische Bedrock-Add-on-Pakete und die skriptseitige McApi-Oberfläche für benutzerdefinierte Weltlogik.

Verwenden Sie es, wenn Minecraft Bedrock die Quelle des Spieler-/Entitätsstatus ist. Das Add-on verbindet Bedrock-Welten entweder über `McHttp` oder `McWss` mit dem VoiceCraft-Server und stellt dann Bindungsfluss, Benutzeroberfläche, Ereignisse und Pakethilfsprogramme für Weltskripte bereit.

Quicklinks:

- [Download-Seite](/download)
- [Add-on-Konfigurator](/addon-configurator)
- [Addon Releases](https://github.com/AvionBlock/VoiceCraft.Addon/releases/latest)

## Pakete

| Paket | Zweck | Verwenden Sie wann |
|---------|---------|----------|
| `Basic` | gebrauchsfertiger Bindungsfluss, Benutzeroberfläche für Einstellungen, Sprachanzeigen im Spiel, allgemeine Skriptereignisse | Sie möchten eine Arbeitsreferenz oder ein Standard-Bedrock-Verhalten |
| `Core.McHttp` | HTTP-Transportpaket | Sie führen Bedrock Dedicated Server aus |
| `Core.McWss` | Websocket/Command-Tunnel-Transportpaket | Sie führen eine lokale Bedrock-Welt oder ein Test-Setup aus |

Die meisten echten Bedrock-Setups kombinieren ein Transportpaket mit den Verhaltens-/UI-Teilen, die die Welt benötigt.

## Versionsausrichtung

VoiceCraft `v1.6.1` erfordert die Aktualisierung der Add-on-Pakete zusammen mit der Client/Server-Version. Diese Version umfasst Sprachsymbole im Spiel, automatische Verbindungsqualität, übertragene Ereignisse und McHttp/McWss-Trennungskorrekturen, die von den passenden Add-on-seitigen Paketen abhängen.

Aktualisieren Sie den Server/Client nicht und lassen Sie ein altes Add-on-Paket in der Welt. Nicht übereinstimmende Pakete können eine Verbindung herstellen, schlagen jedoch später während der Bindung, des Ereignisses oder des Symbolverhaltens fehl.

## Namensraum

Paketübergreifend:

- `VoiceCraft.Namespace = "voicecraft"`

## Befehle

### Einfach

- `voicecraft:vcbind <binding_key>`
  Erlaubnis: `Any`
- `voicecraft:vcsettings`
  Erlaubnis: `GameDirectors`

### Core.McHttp

- `voicecraft:vcconnect <hostname> <token>`
  Erlaubnis: `GameDirectors`

### Kern.McWss

- `voicecraft:vcconnect <token>`
  Erlaubnis: `Host`
- `voicecraft:data_tunnel [max_string_length] [data]`
  Erlaubnis: `Host`

## Was Ihnen das Basic-Paket bietet

- Bindungsfluss / entbinden
- Benutzeroberfläche für Spielereinstellungen
- Effekt schaltet um
- Skriptereignisse für die Automatisierung
- In-Game-Indikatoren, die von unterstützten Versionen verwendet werden

Beginnen Sie mit `Basic`, wenn Sie das erwartete Spielererlebnis verstehen möchten, bevor Sie benutzerdefinierte Add-On-Logik schreiben.

## Details zum Bindungsfluss

Aus der aktuellen Implementierung:

1. Eine neue Netzwerkeinheit erhält einen zufälligen 5-stelligen Bindungsschlüssel
2. Die Entitätsbeschreibung wird mit der Schlüsselaufforderung aktualisiert
3. Spieler führt `voicecraft:vcbind <key>` aus
4. Entität bindet an den Spieler
5. Im Urlaub wird die Bindung aufgehoben und ein neuer Schlüssel generiert

Skriptereignisse:

- `voicecraft:onPlayerBind`
- `voicecraft:onPlayerUnbind`

VoiceCraft `v1.6.1` sendet außerdem mehr addonseitige Lebenszyklus- und Paketereignisse, sodass benutzerdefinierte Welten reagieren können, ohne die Transportschicht direkt abzufragen.

Die Bindungstaste ist absichtlich kurz, da sie im Spiel eingegeben wird. Behandeln Sie es als temporäres Link-Token, nicht als langfristiges Geheimnis.

## Benutzeroberfläche für Effekte

`voicecraft:vcsettings` stellt derzeit Folgendes offen:

- Sichtbarkeit
- Nähe
- Richtungsweisend
- Näherecho
- Echo
- Proximity Muffle
- Muffel

Effekte werden über `McApiSetEffectRequestPacket` gesendet.

## Was Sie anpassen können

- Bindungs-/Entbindungsrichtlinie
- rollen- oder tagbasierte Einschränkungen
- Welt-ID-Regeln
- Positions-/Rotationsaktualisierungsverhalten
- Personalformulare über `@minecraft/server-ui`
- Pakethandler rund um die McApi-Oberfläche

Passen Sie es erst an, nachdem eine grundlegende Lagereinrichtung funktioniert hat. Dadurch erhalten Sie eine bekanntermaßen gute Basislinie für Transport-, Bindungs- und Positionsverhalten.

## Aktuelle Einschränkungen

- Die Stabilität von `Core.McWss` hängt von den Befehls- und Nutzlastgrenzen ab
- Host-/Provider-Einschränkungen können den von `Core.McHttp` benötigten Netzwerkpfad blockieren.
- Benutzerdefinierte Pakethandler müssen auf der Bedrock-Zielversion getestet werden

## Empfohlenes Setup: BDS

1. `McHttpConfig.Enabled = true` aktivieren
2. Stellen Sie sicher, dass BDS `McHttpConfig.Hostname` erreichen kann.
3. Kopieren Sie das Paket `Core.McHttp`
4. Führen Sie `voicecraft:vcconnect <hostname> <token>` aus
5. Validieren Sie die Bindung mit `voicecraft:vcbind <key>`

## Empfohlenes Setup: lokale Welt

1. `McWss` aktivieren
2. `Core.McWss` installieren
3. Führen Sie `/connect` aus
4. Führen Sie `voicecraft:vcconnect <token>` aus
5. Halten Sie `voicecraft:data_tunnel` an der Serverkonfiguration ausgerichtet

## Checkliste für die Validierung

- korrekte Transportverpackung installiert ist
- Sowohl Verhaltens- als auch Ressourcenpakete sind aktiv
- `vcconnect` verwendet das Token aus dem entsprechenden Serverkonfigurationsabschnitt
- Spieler kann mit `voicecraft:vcbind <key>` binden
- Spielerbewegungen ändern Positionsdaten in VoiceCraft
- Die Benutzeroberfläche für Effekte wird für autorisierte Benutzer geöffnet

## Lesen Sie weiter

- [Addon API](/ecosystem/addon-api)
- [McHttp for BDS](/minecraft/mchttp-bds)
- [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer)
