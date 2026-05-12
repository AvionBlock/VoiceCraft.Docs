# Overzicht

VoiceCraft is een nabijheidsstemplatform voor Minecraft Bedrock Edition en gerelateerde bridge-scenario's.

Het bestaat uit verschillende lagen:

1. `VoiceCraft.Client`
   desktop- en mobiele client-apps
2. `VoiceCraft.Server`
   zelfstandige backend voor spraaktransport, statussynchronisatie en transporteindpunten
3. Transporten gericht op Minecraft
   `McHttp`, `McWss`, and `McTcp`
4. ecosysteemintegraties
   `VoiceCraft.Addon` for Bedrock and `GeyserVoice` for Java / proxy stacks

## Hoe het werkt

1. The client connects to `VoiceCraft.Server` over UDP.
2. De server houdt entiteiten, posities, wereld-ID's, effect-bitmaskers en moderatiestatus bij.
3. Een transport aan de Minecraft-zijde werkt de server bij met de gameplay-status:
   - `McHttp` for BDS
   - `McWss` for local Bedrock worlds
   - `McTcp` for `GeyserVoice`
4. De client geeft nabijheidsaudio weer volgens de serverstatus en geselecteerde lokale instellingen.

## Ondersteunde clientplatforms

- Windows (`x86`, `x64`, `arm64`)
- Linux (`x64`, `arm32`, `arm64`)
- macOS (`x64`, `arm64`)
- Android (`arm64`)
- iOS (`arm64`, `.ipa`)

## Wat VoiceCraft flexibel maakt

- meerdere Minecraft-transporten
- Bedrock add-on API-oppervlak
- Java-side bridge via `GeyserVoice`
- configureerbare effecten en entiteitmetadata
- zowel positioneringsmodi aan de serverzijde als aan de clientzijde

## Wat moet je nu lezen

- [Snelle start](/start/quick-start)
- [Downloaden](/download)
- [Transportmodi](/server/transports)
- [Systeemarchitectuur] (/architecture/system-architecture)
- [Ecosysteemoverzicht](/ecosystem/overview)
