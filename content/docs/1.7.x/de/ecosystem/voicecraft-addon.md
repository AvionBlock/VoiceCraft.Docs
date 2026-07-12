# VoiceCraft.Addon (Bedrock Add-on)

Repository: [AvionBlock/VoiceCraft.Addon](https://github.com/AvionBlock/VoiceCraft.Addon)

Das Add-on verbindet Bedrock-Welten über `McHttp` oder `McWss` mit VoiceCraft und stellt Bind-Flow, UI, Events und Packet-Helfer bereit.

## Pakete

| Paket | Zweck |
|-------|-------|
| `Basic` | Bind-Flow, Settings UI, Voice-Indikatoren |
| `Core.McHttp` | HTTP-Transport für BDS |
| `Core.McWss` | WebSocket/Command-Tunnel für lokale Welten |

## 1.7 Hinweise

- Events werden über `EventRequest` geliefert.
- Entity-Properties sind der Weg für Effektwerte.
- Cave/Muffle-Factor-Pakete wurden entfernt.
- `OnEntityPropertyUpdated` meldet Property-Änderungen.

Aktualisieren Sie Stock-Pakete gemeinsam. Eigene Pakete sollten vor Produktion gegen einen 1.7-Server getestet werden.

## Befehle

- `voicecraft:vcbind <binding_key>`
- `voicecraft:vcsettings`
- `voicecraft:vcconnect <hostname> <token>` für McHttp
- `voicecraft:vcconnect_raw <ip> <port> <token>` für Auto-Connect
- `voicecraft:vcconnect <token>` für McWss
- `voicecraft:data_tunnel [max_string_length] [data]`

## `vcconnect_raw`

`voicecraft:vcconnect_raw` ist der Low-Level-Befehl für Auto-Connect. Er nimmt Host/IP, Port und Token getrennt entgegen:

```text
/voicecraft:vcconnect_raw "<IP_OR_HOST>" <PORT> "<LOGIN_TOKEN>"
```

Bei `Core.McHttp` entsteht daraus `http://<ip>:<port>`. Bei `Core.McWss` werden Host, Port und Token direkt an den WebSocket-Transport übergeben. Das `Basic`-Paket nutzt dies mit `autoConnect:ip`, `autoConnect:port` und `autoConnect:loginKey`.

## Validierung

- richtiger Transport installiert
- Behavior- und Resource-Pack aktiv
- `vcconnect` nutzt den passenden Token
- `vcbind` funktioniert
- Bewegung aktualisiert Positionen
- Properties funktionieren, wenn 1.7 Effekt-Overrides genutzt werden
