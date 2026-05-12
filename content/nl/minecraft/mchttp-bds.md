# McHttp voor Bedrock Dedicated Server

`McHttp` is the recommended VoiceCraft integration mode for BDS.

## Why `McHttp` is recommended

- beter geschikt voor dedicated serveromgevingen
- eenvoudiger dan op commandotunnels gebaseerde instellingen
- gemakkelijker te redeneren in de productie
- aligns well with the Bedrock addon package `VoiceCraft.Addon.Core.McHttp`

## Vereisten

1. Running `VoiceCraft.Server`
2. `McHttpConfig.Enabled = true`
3. `VoiceCraft.Addon.Core.McHttp.zip` from releases, or a ready world archive from the [Addon Configurator](/addon-configurator)
4. BDS met vereiste modules en script-API-ondersteuning

## VoiceCraft-configuratie aan de serverzijde

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

## Installatie van add-ons

Snelste pad:

- [Addon Configurator](/addon-configurator) als u een kant-en-klaar wereldarchief wilt
- [Downloadpagina](/download) als u het onbewerkte add-on-releasepakket wilt

Handmatig pad:

1. Extract `VoiceCraft.Addon.Core.McHttp.zip`.
2. Put `RP` into `<MCServer>/resource_packs/`.
3. Put `BP` into `<MCServer>/behavior_packs/`.

## Modulerechten

Open `<MCServer>/config/default/permissions.json` and ensure it contains the required modules:

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

Use the token from `McHttpConfig.LoginToken`.

## Wat gebeurt er na het verbinden

Na succesvolle verbinding:

- de add-on authenticeert met VoiceCraft
- de wereld kan entiteiten aanmaken/bijwerken via McApi
- bind flow becomes available through `voicecraft:vcbind`
- effecten UI en pakketgestuurde statussynchronisatie worden beschikbaar

## Aanbevolen validatiestroom

1. connect the world with `vcconnect`
2. Bevestig dat er geen authentificatiefout wordt weergegeven
3. laat een VoiceCraft-entiteit verschijnen
4. use `voicecraft:vcbind <key>`
5. Bevestig dat de speler gebonden en zichtbaar is in VoiceCraft

## Veelvoorkomende problemen

- `HttpListenerException` on Windows:
  you may need `netsh http add iplisten 127.0.0.1`
- container- of VM-netwerken:
  use `http://0.0.0.0:9050/` or the correct LAN address
- hostingprovider blokkeert uitgaande HTTP van BDS:
  dit transport werkt daar mogelijk niet

## Lees het volgende

- [VoiceCraft.Addon] (/ecosystem/voicecraft-addon)
- [Add-on-API](/ecosystem/addon-api)
- [Downloadpagina](/download)
- [Addon-configurator](/addon-configurator)
