# Paket- und Event-Flow

VoiceCraft hat zwei Ebenen:

- Voice-Ebene: Clients senden und empfangen Audio über `VoiceCraft.Server`.
- Minecraft-State-Ebene: Add-ons oder Java-Plugins senden Entity-, Position-, World-, Bind-, Property- und Effektupdates über `McHttp`, `McWss` oder `McTcp`.

## Ablauf

1. Server lädt `ServerProperties.json`.
2. Optional öffnet `AutoOpenPort` NAT-Mappings.
3. Client verbindet sich per UDP.
4. Minecraft-Transport authentifiziert sich.
5. Entities werden erstellt oder aktualisiert.
6. Position, World ID, Bitmasks und Properties fließen in das Servermodell.
7. Event-Subscriptions bestimmen die Weiterleitung.
8. Clients rendern das Voice-Verhalten.

## Event-Modell 1.7

Events laufen über:

- `VcEventRequestPacket`
- `McApiEventRequestPacket`

Wichtige Events:

- `OnEntityCreated`
- `OnEntityDestroyed`
- `OnEntityPositionUpdated`
- `OnEntityPropertyUpdated`
- `OnEntityAudioReceived`

## Entity-Properties

Property-Pakete:

- `VcSetPropertyRequestPacket`
- `VcOnEntityPropertyUpdatedPacket`
- `McApiSetEntityPropertyRequestPacket`
- `McApiOnEntityPropertyUpdatedPacket`

Der alte Cave/Muffle-Factor-Pfad wurde entfernt.

## Debugging

| Symptom | Erste Prüfung |
|---------|---------------|
| Client verbindet nicht | UDP endpoint, Host, Firewall |
| Add-on verbindet nicht | Transport-Token, Host, Port |
| Kein Proximity | Bind, PositioningType, Positionsupdates |
| Effekt-Overrides greifen nicht | Properties, Event-Subscription, Typen |
