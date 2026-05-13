# VoiceCraft.Addon (Bedrock-add-on)

Opslagplaats: [AvionBlock/VoiceCraft.Addon](https://github.com/AvionBlock/VoiceCraft.Addon)

Deze repository bevat praktische Bedrock add-on-pakketten en het McApi-oppervlak aan de scriptzijde voor aangepaste wereldlogica.

Gebruik het wanneer Minecraft Bedrock de bron is van de speler/entiteitsstatus. De add-on verbindt Bedrock-werelden met de VoiceCraft-server via `McHttp` of `McWss`, en stelt vervolgens de bindstroom, UI, gebeurtenissen en pakkethelpers voor wereldscripts beschikbaar.

Snelle links:

- [Download Page](/download)
- [Addon Configurator](/addon-configurator)
- [Addon Releases](https://github.com/AvionBlock/VoiceCraft.Addon/releases/latest)

## Pakketten

| Pakket | Doel | Gebruik wanneer |
|---------|---------|----------|
| `Basic` | kant-en-klare bindstroom, gebruikersinterface voor instellingen, stemindicatoren in de game, algemene scriptgebeurtenissen | je wilt een werkreferentie of standaard Bedrock-gedrag |
| `Core.McHttp` | HTTP-transportpakket | u gebruikt Bedrock Dedicated Server |
| `Core.McWss` | websocket / command-tunnel transportpakket | je runt een lokale Bedrock-wereld of testopstelling |

De meeste echte Bedrock-opstellingen combineren een transportpakket met de gedrags-/UI-onderdelen die de wereld nodig heeft.

## Versie-uitlijning

VoiceCraft `v1.6.1` vereist het bijwerken van de add-onpakketten samen met de client/server-release. Deze release bevat in-game stempictogrammen, automatische verbindingskwaliteit, uitgezonden evenementen en McHttp/McWss-oplossingen voor het verbreken van de verbinding die afhankelijk zijn van de overeenkomende add-on-side pakketten.

Upgrade de server/client niet en laat een oud add-onpakket in de wereld achter. Niet-overeenkomende pakketten kunnen verbinding maken, maar mislukken later tijdens bindings-, gebeurtenis- of pictogramgedrag.

## Naamruimte

Voor alle pakketten:

- `VoiceCraft.Namespace = "voicecraft"`

## Commando's

### Basis

- `voicecraft:vcbind <binding_key>`
  toestemming: `Any`
- `voicecraft:vcsettings`
  toestemming: `GameDirectors`

### Kern.McHttp

- `voicecraft:vcconnect <hostname> <token>`
  toestemming: `GameDirectors`

### Kern.McWss

- `voicecraft:vcconnect <token>`
  toestemming: `Host`
- `voicecraft:data_tunnel [max_string_length] [data]`
  toestemming: `Host`

## Wat het Basispakket u biedt

- stroom binden/ontbinden
- gebruikersinterface voor spelerinstellingen
- effect schakelt
- scriptgebeurtenissen voor automatisering
- in-game indicatoren gebruikt door ondersteunde releases

Begin vanaf `Basic` als je de verwachte spelerservaring wilt begrijpen voordat je aangepaste add-onlogica schrijft.

## Bind stroomdetails

Van de huidige implementatie:

1. een nieuwe netwerkentiteit ontvangt een willekeurige bindende sleutel van 5 tekens
2. entiteitsbeschrijving wordt bijgewerkt met de sleutelprompt
3. speler loopt `voicecraft:vcbind <key>`
4. entiteit bindt aan de speler
5. bij verlof wordt de verbinding verbroken en wordt er een nieuwe sleutel gegenereerd

Scriptgebeurtenissen:

- `voicecraft:onPlayerBind`
- `voicecraft:onPlayerUnbind`

VoiceCraft `v1.6.1` zendt ook meer levenscyclus- en pakketgebeurtenissen aan de add-onzijde uit, zodat aangepaste werelden kunnen reageren zonder de transportlaag rechtstreeks te ondervragen.

De bindende sleutel is opzettelijk kort omdat deze in het spel wordt getypt. Behandel het als een tijdelijk linktoken, niet als een langetermijngeheim.

## Effecten-UI

`voicecraft:vcsettings` toont momenteel:

- Zichtbaarheid
- Nabijheid
- Directioneel
- Nabijheidsecho
- Echo
- Nabijheid dempen
- Dempen

Effecten worden verzonden via `McApiSetEffectRequestPacket`.

## Wat u kunt aanpassen

- beleid binden/ontbinden
- op rollen of tags gebaseerde beperkingen
- wereld ID-regels
- updategedrag positie/rotatie
- personeelsformulieren via `@minecraft/server-ui`
- pakketbehandelaars rond het McApi-oppervlak

Alleen aanpassen nadat een basisvoorraadconfiguratie werkt. Dat geeft u een bekende goede basislijn voor transport-, bind- en positiegedrag.

## Huidige beperkingen

- De stabiliteit van `Core.McWss` is afhankelijk van de commando- en payloadlimieten
- host-/providerbeperkingen kunnen het netwerkpad blokkeren dat vereist is door `Core.McHttp`
- aangepaste pakketbehandelaars moeten worden getest op de doelversie van Bedrock

## Aanbevolen opstelling: BDS

1. schakel `McHttpConfig.Enabled = true` in
2. zorg ervoor dat BDS `McHttpConfig.Hostname` kan bereiken
3. kopieer het `Core.McHttp` pakket
4. voer `voicecraft:vcconnect <hostname> <token>` uit
5. valideer de binding met `voicecraft:vcbind <key>`

## Aanbevolen opstelling: lokale wereld

1. schakel `McWss` in
2. installeer `Core.McWss`
3. voer `/connect` uit
4. voer `voicecraft:vcconnect <token>` uit
5. houd `voicecraft:data_tunnel` afgestemd op de serverconfiguratie

## Validatiechecklist

- het juiste transportpakket is geïnstalleerd
- zowel gedrags- als resourcepakketten zijn actief
- `vcconnect` gebruikt het token uit de overeenkomende serverconfiguratiesectie
- speler kan binden met `voicecraft:vcbind <key>`
- beweging van de speler verandert positiegegevens in VoiceCraft
- effecten UI wordt geopend voor geautoriseerde gebruikers

## Lees het volgende

- [Addon API](/ecosystem/addon-api)
- [McHttp for BDS](/minecraft/mchttp-bds)
- [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer)
