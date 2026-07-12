# VoiceCraft-Ökosystem

VoiceCraft ist ein Ökosystem aus Client, Server und Minecraft-Integrationen.

Spieler nutzen `VoiceCraft.Client`, ein Backend betreibt `VoiceCraft.Server`, und eine Minecraft-Integration sendet Game-State in den Server.

## Repositories

| Repository | Aufgabe |
|------------|---------|
| `VoiceCraft` | Client, Server, Protocol, Transports |
| `VoiceCraft.Java` / Java Bridge | Paper, Geyser/Floodgate, Proxy |
| `VoiceCraft.Addon` | Bedrock Add-ons und McApi |

Die primäre Entwicklung liegt im GitLab-Projekt. GitHub ist Mirror und Release-Ort.

## Neu in 1.7

- neues Event-/Property-Modell
- Audioeffekt-Prozessoren
- NAT-Port-Mapping
- iOS Privacy Manifest und Netzwerkhinweis
- Entfernung des Browser/Web-Clients

## Typische Stacks

### Bedrock Dedicated Server

- `VoiceCraft.Server`
- `VoiceCraft.Addon.Core.McHttp`
- VoiceCraft Clients

### Lokale Bedrock-Welt

- lokaler VoiceCraft Stack
- `VoiceCraft.Addon.Core.McWss`
- `/connect` Flow

### Java + Geyser/Floodgate

- Java-Bridge
- `VoiceCraft.Server`
- `McTcp`

## Weiter lesen

- [VoiceCraft Repository und Build](/ecosystem/voicecraft-repository)
- [VoiceCraft.Addon](/ecosystem/voicecraft-addon)
- [Addon API](/ecosystem/addon-api)
- [Transport-Modi](/server/transports)
