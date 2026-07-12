# Systemarchitektur

VoiceCraft ist ein Proximity-Voice-Stack: Client, Server und Minecraft-Integration arbeiten getrennt zusammen.

## Schichten

| Schicht | Aufgabe |
|---------|---------|
| `VoiceCraft.Client` | Mikrofon, Voice-Pakete, Wiedergabe, lokale Einstellungen |
| `VoiceCraft.Server` | Sessions, Entities, Moderation, Effekte, Transports |
| Minecraft-Integration | Positions- und Lifecycle-Daten aus Minecraft |

## Client

Der Client nutzt UDP zum VoiceCraft-Server. In `1.7.0` werden native Desktop- und Mobile-Clients unterstützt; der Web-Client wurde entfernt.

## Server

Der Server verwaltet:

- Client-Sessions
- Entity-State und Bind-State
- Entity-Properties
- Effekt-Bitmasks und Default-Effekte
- `McHttp`, `McWss`, `McTcp`
- optionales NAT-Port-Mapping

## Minecraft-Integration

- `Core.McHttp` für BDS
- `Core.McWss` für lokale Welten
- Java-Bridges über `McTcp`

## Audioeffekte in 1.7

Effekte erzeugen `IAudioEffectProcessor`-Instanzen pro Entity, cachen Werte und können unterstützte Entity-Properties lesen. Deshalb ersetzen Properties die alten Cave/Muffle-Factor-Pakete.

## Zuerst konfigurieren

1. Server starten und Config prüfen.
2. Passenden Minecraft-Transport wählen.
3. `AutoOpenPort` bewusst konfigurieren.
4. Client mit `VoiceCraftConfig.Port` verbinden.
5. Transport-Token prüfen.
6. Bind und Positionsupdates testen.
