# ServerProperties.json

Hoofdconfiguratie: `config/ServerProperties.json`.

VoiceCraft `1.7.0` houdt de bekende transportsecties, maar voegt NAT port mapping toe en gebruikt entity properties voor effectaanpassingen.

## Workflow

1. Stop de server.
2. Backup `ServerProperties.json`.
3. Bewerk en valideer JSON.
4. Start de server.
5. Controleer logs voor config/listener/NAT/auth.

## Nieuwe velden

In `VoiceCraftConfig`, `McHttpConfig`, `McTcpConfig`, `McWssConfig`:

- `AutoOpenPort`
- `ExternalPort`
- `PortMappingLifetimeMinutes`
- `PortMappingTimeoutSeconds`

`AutoOpenPort` probeert via `OpenPort.Net` tijdelijk router mapping te maken.

## VoiceCraftConfig

- `Port`: UDP-poort voor clients.
- `ExternalPort`: externe poort voor mapping; `0` gebruikt `Port`.
- `PositioningType`: `0 = Server`, `1 = Client`.
- `EnableVisibilityDisplay`: zichtbaarheid naar clients sturen.
- `AutoOpenPort`: UDP-poort automatisch openen.

## McHttpConfig

Voor BDS:

```json
{
  "Enabled": true,
  "LoginToken": "replace-with-token",
  "Hostname": "http://0.0.0.0:9050/",
  "AutoOpenPort": false
}
```

Gebruik `127.0.0.1` alleen als BDS en VoiceCraft op dezelfde host draaien.

## McTcpConfig

Voor Java-bridges zoals `GeyserVoice`. `Hostname` is een host, geen URI; `Port` is apart.

## McWssConfig

Voor lokale Bedrock-werelden en command tunnel. Let op `DataTunnelCommand`, `CommandsPerTick` en `MaxByteLengthPerCommand`.

## DefaultAudioEffectsConfig

- `1`: `Visibility`
- `2`: `Proximity`
- `4`: `ProximityEcho`
- `8`: `ProximityMuffle`

In `1.7.0` maken effecten processors per entity en kunnen ondersteunde properties effectvelden overschrijven.

## Notities

- vervang altijd `LoginToken`
- `0.0.0.0` maakt een listener bereikbaar
- `PositioningType` moet met de client overeenkomen
- bewaar een werkende config vóór upgrades
