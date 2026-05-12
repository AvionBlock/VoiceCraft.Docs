# McHttp dla serwera dedykowanego Bedrock

`McHttp` is the recommended VoiceCraft integration mode for BDS.

## Why `McHttp` is recommended

- lepiej dostosowane do środowisk serwerów dedykowanych
- prostsze niż konfiguracje oparte na tunelu poleceń
- łatwiej uzasadnić w produkcji
- aligns well with the Bedrock addon package `VoiceCraft.Addon.Core.McHttp`

## Wymagania

1. Running `VoiceCraft.Server`
2. `McHttpConfig.Enabled = true`
3. `VoiceCraft.Addon.Core.McHttp.zip` from releases, or a ready world archive from the [Addon Configurator](/addon-configurator)
4. BDS z wymaganymi modułami i obsługą API skryptów

## Konfiguracja VoiceCraft po stronie serwera

Minimalny przykład:

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

Ważne:

- użyj prawdziwego tokena, nigdy nie przechowuj wygenerowanego w produkcji
- upewnij się, że host BDS może dotrzeć do skonfigurowanego punktu końcowego

## Instalacja dodatków

Najszybsza ścieżka:

- [Konfigurator dodatków](/addon-configurator), jeśli chcesz mieć gotowe do rozpakowania archiwum świata
- [Strona pobierania](/download), jeśli chcesz otrzymać surowy pakiet wydań dodatków

Ścieżka ręczna:

1. Extract `VoiceCraft.Addon.Core.McHttp.zip`.
2. Put `RP` into `<MCServer>/resource_packs/`.
3. Put `BP` into `<MCServer>/behavior_packs/`.

## Uprawnienia modułu

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

## Dołącz pakiety do świata

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

## Połącz się w grze

Uruchom:

```text
/voicecraft:vcconnect "http://<VOICECRAFT_HOST>:<PORT>" <LOGIN_TOKEN>
```

Przykład:

```text
/voicecraft:vcconnect "http://127.0.0.1:9050" e4ad1f7e-4f90-4b21-bc15-6febe580bf1c
```

Use the token from `McHttpConfig.LoginToken`.

## Co się stanie po połączeniu

Po udanym połączeniu:

- dodatek uwierzytelnia się za pomocą VoiceCraft
- świat może tworzyć/aktualizować encje poprzez McApi
- bind flow becomes available through `voicecraft:vcbind`
- Dostępny jest interfejs efektów i synchronizacja stanu oparta na pakietach

## Zalecany przepływ walidacji

1. connect the world with `vcconnect`
2. potwierdź, że nie pojawia się błąd uwierzytelniania
3. pozwól, aby pojawiła się jednostka VoiceCraft
4. use `voicecraft:vcbind <key>`
5. potwierdź, że gracz jest powiązany i widoczny w VoiceCraft

## Typowe problemy

- `HttpListenerException` on Windows:
  you may need `netsh http add iplisten 127.0.0.1`
- sieć kontenerowa lub maszyn wirtualnych:
  use `http://0.0.0.0:9050/` or the correct LAN address
- dostawca hostingu blokuje wychodzący HTTP z BDS:
  ten transport może tam nie działać

## Przeczytaj dalej

- [Dodatek VoiceCraft](/ecosystem/voicecraft-addon)
- [API dodatku](/ecosystem/addon-api)
- [Strona pobierania](/download)
- [Konfigurator dodatków](/addon-configurator)
