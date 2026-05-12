# Add-on-API

`VoiceCraft.Addon` exposes a script-driven McApi layer that is much wider than just `vcbind`.

Deze pagina is bedoeld voor add-on- en wereldontwikkelaars.

## API-oppervlak op hoog niveau

De add-on-side API onthult:

- Levenscyclus van verbinding
- pakket verzenden / ontvangen
- creatie en vernietiging van entiteiten
- wereld-ID-, positie-, rotatie-, mute-, doof- en bitmask-updates
- effectupdates
- audio-ontvangen gebeurtenissen

## Evenementen op hoog niveau

Vanuit de huidige API-laag:

- `OnConnected`
- `OnDisconnected`
- `OnPlayerBind`
- `OnPlayerUnbind`
- `OnPacket`

VoiceCraft `v1.6.1` expands this event-driven path with broadcasted events used by the addon packages, so world scripts can react to connection, binding, and packet activity without custom polling.

Scriptgebeurtenissen die door het systeem worden gebruikt, zijn onder meer:

- `voicecraft:onConnected`
- `voicecraft:onDisconnected`
- `voicecraft:onPlayerBind`
- `voicecraft:onPlayerUnbind`
- `voicecraft:onPacket`
- `voicecraft:sendPacket`

## Dekking op pakketniveau

Huidige blootgestelde pakketgebeurtenissen omvatten categorieën zoals:

- inloggen / uitloggen / ping
- reacties accepteren / weigeren / resetten
- entiteit creëren / vernietigen
- titel / beschrijving / naamupdates
- dempen / doof / server dempen / server doof
- praat / luister / effect bitmasker
- positie / rotatie / wereld-ID
- grotfactor / moffelfactor
- effectupdates
- audio ontvangen

Dit maakt de add-on-API niet alleen nuttig voor aandelenwerelden, maar ook voor aangepaste spelmodi.

## Algemene aanpassingsideeën

- automatische binding per team, rol of tag
- aangepaste bind-UI
- aangepaste effectvoorinstellingen per bioom of gebied
- regiogebaseerde wereld-ID-hertoewijzing
- hulpmiddelen voor personeelsmoderatie via server-UI-formulieren
- gescripte NPC of nep-entiteitsstemlogica

## Basisintegratiemodel

Typische add-onlogica:

1. maak verbinding met VoiceCraft-transport
2. authenticeren
3. creëer of ontdek entiteiten
4. spelers binden
5. update wereld-ID / positie / rotatie op tick of evenement
6. reageren op updates op pakketniveau

## Belangrijke implementatieopmerkingen

- `McWss` mode depends on command tunnel throughput
- effectschakelaars worden gecodeerd via bitmaskers
- Automatisering op pakketniveau moet zorgvuldig worden getest op echte Bedrock-builds
- houd add-onpakketten afgestemd op de VoiceCraft-release wanneer u afhankelijk bent van uitgezonden evenementen of in-game stempictogrammen

## Aanbevolen praktijk

- start from `Basic` if you need a working reference
- switch to `Core.McHttp` or `Core.McWss` when building a custom experience
- houd uw wereldautomatisering eerst dun en breid vervolgens de pakkethaken geleidelijk uit
