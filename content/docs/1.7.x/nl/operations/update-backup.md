# Update en backup

Gebruik deze pagina voor normale updates waarbij de topologie gelijk blijft. Gebruik voor grotere wijzigingen de [upgrade-runbook](/operations/upgrade-runbook).

VoiceCraft `1.7.0` is geen gewone patch. Server, clients, addonpakketten en Java-bridges horen samen naar `1.7.x` te gaan.

## Wat is veranderd in 1.7.0

- nieuwe audio-effectpipeline met processors per entity
- custom entity properties voor effect-overrides
- event-flow via `EventRequest`
- `SetProperty` / `OnEntityPropertyUpdated` vervangt het oude cave/muffle-factorpad
- NAT port mapping via `OpenPort.Net`
- iOS sample-rate fixes en Apple privacy manifest
- dependency updates, Android version `17`, release pipeline
- browser/web client verwijderd

Client en server moeten dezelfde `Major.Minor` gebruiken.

## Back-up maken

- `config/ServerProperties.json`
- eigen scripts, systemd, container- of panelconfiguratie
- logs indien nodig
- VoiceCraft.Java- of Java-bridge-config
- Bedrock world pack-configuratie
- notities over hostnamen, poorten en firewall

## Veilige serverupdate

1. Stop `VoiceCraft.Server`.
2. Maak een backup van `config/`.
3. Pak `1.7.0` uit in een nieuwe map.
4. Kopieer `ServerProperties.json`.
5. Controleer de nieuwe NAT port mapping-velden.
6. Start de server en controleer logs.
7. Test elke ingeschakelde transport.
8. Verbind een client en een Minecraft-integratie.

## Configmigratie

Nieuwe velden:

- `AutoOpenPort`
- `ExternalPort`
- `PortMappingLifetimeMinutes`
- `PortMappingTimeoutSeconds`

Laat `AutoOpenPort` uit als poorten al via firewall, reverse proxy, tunnel, Docker, panel of provider worden beheerd.

## Addons en bridges

Update bijpassende addon/bridge-pakketten samen met de server. Code die oude cave/muffle-packets gebruikt, moet naar `SetProperty` en `OnEntityPropertyUpdated`.

## Clientupdate

Controleer:

- microfoon en uitvoerapparaat
- opgeslagen server
- push-to-talk
- `Positioning Type`
- iOS opname als oudere builds sample-rateproblemen hadden

De browser/web client is verwijderd in `1.7.0`.
