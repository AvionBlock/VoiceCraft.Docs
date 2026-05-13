# McHttp voor Bedrock Dedicated Server

`McHttp` is de aanbevolen VoiceCraft-integratiemodus voor BDS.

Gebruik deze handleiding als u een Bedrock Dedicated Server gebruikt en wilt dat de add-on aan de serverzijde de spelerstatus naar `VoiceCraft.Server` stuurt.

Doelvorm:

```text
VoiceCraft.Client -> VoiceCraft UDP endpoint
BDS + VoiceCraft.Addon.Core.McHttp -> VoiceCraft McHttp endpoint
```

## Waarom `McHttp` wordt aanbevolen

- beter geschikt voor dedicated serveromgevingen
- eenvoudiger dan op commandotunnels gebaseerde instellingen
- gemakkelijker om over te redeneren in de productie
- sluit goed aan bij het Bedrock add-onpakket `VoiceCraft.Addon.Core.McHttp`
- is niet afhankelijk van de lokale `/connect` websocket-workflow die wordt gebruikt door `McWss`

## Vereisten

1. `VoiceCraft.Server` uitvoeren
2. `McHttpConfig.Enabled = true`
3. `VoiceCraft.Addon.Core.McHttp.zip` uit releases, of een kant-en-klaar wereldarchief uit de [add-onconfigurator](/addon-configurator)
4. BDS met vereiste modules en script-API-ondersteuning
5. Netwerkbereikbaarheid van de BDS-machine naar de VoiceCraft `McHttpConfig.Hostname`
6. VoiceCraft-clients geïnstalleerd door spelers

## Server-side VoiceCraft-configuratie

Minimaal voorbeeld:

```json
{
  "McHttpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-token",
    "Hostname": "http://0.0.0.0:9050/",
    "MaxClients": 10,
    "MaxTimeoutMs": 10000,
    "DisabledPacketTypes": []
  }
}
```

Belangrijk:

- gebruik een echt token, houd het gegenereerde token nooit in productie
- zorg ervoor dat de BDS-host het geconfigureerde eindpunt kan bereiken
- gebruik `http://127.0.0.1:9050/` alleen als BDS en VoiceCraft op dezelfde host draaien
- gebruik een LAN/openbaar adres of `0.0.0.0`-binding wanneer BDS verbinding maakt vanaf een andere machine

## Installatie van add-ons

Snelste pad:

- [Add-onconfigurator](/addon-configurator) als u een kant-en-klaar wereldarchief wilt
- [Downloadpagina](/download) als u het losse add-on-releasepakket wilt

Handmatig pad:

1. Pak `VoiceCraft.Addon.Core.McHttp.zip` uit.
2. Plaats `RP` in `<MCServer>/resource_packs/`.
3. Plaats `BP` in `<MCServer>/behavior_packs/`.
4. Bevestig beide pakketten aan de doelwereld.
5. Start BDS opnieuw na het wijzigen van pakketten of machtigingen.

Het resourcepakket biedt voor de klant zichtbare middelen, zoals pictogrammen. Het gedragspakket voert de scripts en opdrachten uit die BDS met VoiceCraft verbinden.

## Modulemachtigingen

Open `<MCServer>/config/default/permissions.json` en zorg ervoor dat deze de vereiste modules bevat:

```json
{
  "allowed_modules": [
    "@minecraft/server-gametest",
    "@minecraft/server",
    "@minecraft/server-ui",
    "@minecraft/server-admin",
    "@minecraft/server-editor",
    "@minecraft/server-net"
  ]
}
```

De add-on heeft netwerkgerelateerde scriptmachtigingen nodig omdat deze het VoiceCraft HTTP-eindpunt aanroept vanuit de BDS-runtime.

## Bevestig pakketten aan de wereld

In `<MCServer>/worlds/<YourWorld>/world_behavior_packs.json`:

```json
{
  "pack_id": "71ebb3ba-e9db-4546-9520-05f20b17dcb6",
  "version": [1, 6, 0]
}
```

In `world_resource_packs.json`:

```json
{
  "pack_id": "30b512be-77d1-4a61-bdb7-6c2f4062f889",
  "version": [1, 0, 0]
}
```

## Maak verbinding in het spel

Uitvoeren:

```text
/voicecraft:vcconnect "http://<VOICECRAFT_HOST>:<PORT>" <LOGIN_TOKEN>
```

Voorbeeld:

```text
/voicecraft:vcconnect "http://127.0.0.1:9050" e4ad1f7e-4f90-4b21-bc15-6febe580bf1c
```

Gebruik het token van `McHttpConfig.LoginToken`.

Als BDS op een andere host draait dan VoiceCraft, vervang dan `127.0.0.1` door het adres van de VoiceCraft-server zoals gezien vanaf de BDS-machine.

## Wat gebeurt er na het verbinden

Na succesvolle verbinding:

- de add-on authenticeert met VoiceCraft
- de wereld kan entiteiten creëren/bijwerken via McApi
- bindstroom wordt beschikbaar via `voicecraft:vcbind`
- effecten UI en pakketgestuurde statussynchronisatie worden beschikbaar

In dit stadium is het transport verbonden, maar elke speler heeft nog steeds de VoiceCraft-client en een werkende bindstroom voor proximity-audio nodig.

## Aanbevolen validatiestroom

1. Start `VoiceCraft.Server` en bevestig `McHttpConfig.Enabled = true`.
2. Start BDS met de add-on eraan.
3. Verbind de wereld met `vcconnect`.
4. Bevestig dat er geen authentificatiefout wordt weergegeven.
5. Verbind een VoiceCraft-client met `VoiceCraftConfig.Port`.
6. Gebruik `voicecraft:vcbind <key>`.
7. Verplaats de speler in het spel en controleer of positie-updates de nabijheid beïnvloeden.
8. Bevestig dat andere spelers het verwachte bereik kunnen horen.

## Veelvoorkomende problemen

- `HttpListenerException` op Windows:
  je hebt mogelijk `netsh http add iplisten 127.0.0.1` nodig
- container- of VM-netwerken:
  gebruik `http://0.0.0.0:9050/` of het juiste LAN-adres
- hostingprovider blokkeert uitgaande HTTP van BDS:
  dit transport werkt daar mogelijk niet
- verificatie mislukt:
  bevestig dat de opdracht `McHttpConfig.LoginToken` gebruikt, niet het token `McWss` of `McTcp`
- add-on wordt geladen, maar opdrachten ontbreken:
  bevestig dat zowel het gedrag als de bronpakketten aan de wereld zijn gekoppeld en dat BDS opnieuw is opgestart
- client maakt verbinding maar geen proximity audio:
  bevestig de bindingsstroom, `PositioningType` en updates van de spelerspositie

## Lees het volgende

- [VoiceCraft.Addon](/ecosystem/voicecraft-addon)
- [Addon API](/ecosystem/addon-api)
- [Downloadpagina](/download)
- [Add-onconfigurator](/addon-configurator)
