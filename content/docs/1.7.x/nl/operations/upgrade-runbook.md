# Upgrade-runbook

Gebruik dit bij upgrades van VoiceCraft of een bridge zoals `VoiceCraft.Java`.

VoiceCraft `1.7.0` wijzigt het event- en entity-propertymodel. Test daarom server, client, Bedrock-addon en Java-plugin samen.

## Volgorde

1. Maak backups van config en plugin/addon-bestanden.
2. Zet nieuwe binaries in een aparte map.
3. Zet bijpassende addon/plugin-pakketten klaar.
4. Lees release notes over packets, properties en transports.
5. Stop de oude service.
6. Kopieer config naar de nieuwe installatie.
7. Controleer port mapping-velden in `ServerProperties.json`.
8. Update addon/plugin aan Minecraft-kant.
9. Test elke route apart.

## 1.7-checks

- server meldt `1.7.0`
- UDP endpoint bindt
- McHttp, McTcp of McWss bindt
- NAT port mapping staat bewust aan of uit
- `1.7.x` client verbindt
- Minecraft-integratie authenticeert
- bind-flow werkt
- position, rotation, world ID, mute/deafen en bitmasks updaten
- entity properties werken bij effect-overrides

## Event/property migration

Event wrappers:

- `VcEventRequestPacket`
- `McApiEventRequestPacket`

Property packets:

- `VcSetPropertyRequestPacket`
- `VcOnEntityPropertyUpdatedPacket`
- `McApiSetEntityPropertyRequestPacket`
- `McApiOnEntityPropertyUpdatedPacket`

Waarden: `null`, `bool`, integer types, `float`, `double`.

Het oude cave/muffle-factorpad is verwijderd.

## Rollback

1. Stop nieuwe service.
2. Herstel oude binaries.
3. Herstel oude config.
4. Herstel oude addon/plugin.
5. Start oude service.
6. Test client, auth, bind en proximity.
