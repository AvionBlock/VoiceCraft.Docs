# McHttp dla serwera dedykowanego Bedrock

`McHttp` to zalecany tryb integracji VoiceCraft dla BDS.

Skorzystaj z tego przewodnika, jeśli uruchamiasz serwer dedykowany Bedrock i chcesz, aby dodatek po stronie serwera wysyłał stan gracza do `VoiceCraft.Server`.

Docelowy kształt:

```text
VoiceCraft.Client -> VoiceCraft UDP endpoint
BDS + VoiceCraft.Addon.Core.McHttp -> VoiceCraft McHttp endpoint
```

## Dlaczego zaleca się `McHttp`

- lepiej nadaje się do środowisk serwerów dedykowanych
- prostsze niż konfiguracje oparte na tunelu poleceń
- łatwiej to uzasadnić w produkcji
- dobrze pasuje do pakietu dodatków Bedrock `VoiceCraft.Addon.Core.McHttp`
- nie zależy od lokalnego przepływu pracy gniazda internetowego `/connect` używanego przez `McWss`

## Wymagania

1. Bieganie `VoiceCraft.Server`
2. `McHttpConfig.Enabled = true`
3. `VoiceCraft.Addon.Core.McHttp.zip` z wydań albo gotowe archiwum świata z [konfiguratora dodatku](/addon-configurator)
4. BDS z wymaganymi modułami i obsługą API skryptów
5. Dostępność sieci od urządzenia BDS do VoiceCraft `McHttpConfig.Hostname`
6. Klienci VoiceCraft instalowani przez graczy

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

- używaj prawdziwego tokena, nigdy nie przechowuj wygenerowanego w produkcji
- upewnij się, że host BDS może dotrzeć do skonfigurowanego punktu końcowego
- użyj `http://127.0.0.1:9050/` tylko wtedy, gdy BDS i VoiceCraft działają na tym samym hoście
- użyj adresu LAN/adresu publicznego lub powiązania `0.0.0.0`, gdy BDS łączy się z innego komputera

## Instalacja dodatku

Najszybsza ścieżka:

- [Konfigurator dodatku](/addon-configurator), jeśli chcesz mieć gotowe do rozpakowania archiwum świata
- [Strona pobierania](/download), jeśli chcesz pobrać pakiet wydania dodatku

Ścieżka ręczna:

1. Wyodrębnij `VoiceCraft.Addon.Core.McHttp.zip`.
2. Wstaw `RP` do `<MCServer>/resource_packs/`.
3. Wstaw `BP` do `<MCServer>/behavior_packs/`.
4. Dołącz oba pakiety do świata docelowego.
5. Uruchom ponownie BDS po zmianie pakietów lub uprawnień.

Pakiet zasobów zawiera zasoby widoczne dla klienta, takie jak ikony. Pakiet zachowań uruchamia skrypty i polecenia łączące BDS z VoiceCraft.

## Uprawnienia modułu

Otwórz `<MCServer>/config/default/permissions.json` i upewnij się, że zawiera wymagane moduły:

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

Dodatek potrzebuje uprawnień do skryptów związanych z siecią, ponieważ wywołuje punkt końcowy HTTP VoiceCraft ze środowiska wykonawczego BDS.

## Dołącz pakiety do świata

W `<MCServer>/worlds/<YourWorld>/world_behavior_packs.json`:

```json
{
  "pack_id": "71ebb3ba-e9db-4546-9520-05f20b17dcb6",
  "version": [1, 6, 0]
}
```

W `world_resource_packs.json`:

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

Użyj tokena z `McHttpConfig.LoginToken`.

Do skryptowego auto-connect dodatek udostępnia także formę raw:

```text
/voicecraft:vcconnect_raw "<VOICECRAFT_HOST>" <PORT> <LOGIN_TOKEN>
```

W `Core.McHttp` buduje ona wewnętrznie `http://<VOICECRAFT_HOST>:<PORT>`. Do ręcznej konfiguracji zwykle używaj `vcconnect`, chyba że skrypt świata przechowuje host i port osobno.

Jeśli BDS działa na innym hoście niż VoiceCraft, zamień `127.0.0.1` na adres serwera VoiceCraft widoczny na komputerze BDS.

## Co się stanie po podłączeniu

Po udanym połączeniu:

- dodatek uwierzytelnia się za pomocą VoiceCraft
- świat może tworzyć/aktualizować encje za pośrednictwem McApi
- przepływ wiązania staje się dostępny poprzez `voicecraft:vcbind`
- Dostępny staje się interfejs efektów i synchronizacja stanu oparta na pakietach

Na tym etapie transport jest podłączony, ale każdy gracz nadal potrzebuje klienta VoiceCraft i działającego protokołu łączenia dla dźwięku zbliżeniowego.

## Zalecany przebieg walidacji

1. Uruchom `VoiceCraft.Server` i potwierdź `McHttpConfig.Enabled = true`.
2. Uruchom BDS z dołączonym dodatkiem.
3. Połącz świat za pomocą `vcconnect`.
4. Upewnij się, że nie jest wyświetlany błąd uwierzytelniania.
5. Połącz klienta VoiceCraft z `VoiceCraftConfig.Port`.
6. Użyj `voicecraft:vcbind <key>`.
7. Przesuń gracza w grze i potwierdź, że aktualizacje pozycji wpływają na dźwięk zależny od odległości.
8. Upewnij się, że inni gracze słyszą w oczekiwanym zakresie.

## Typowe problemy

- `HttpListenerException` w systemie Windows:
  możesz potrzebować `netsh http add iplisten 127.0.0.1`
- sieć kontenerów lub maszyn wirtualnych:
  użyj `http://0.0.0.0:9050/` lub prawidłowego adresu LAN
- dostawca usług hostingowych blokuje wychodzący protokół HTTP z BDS:
  ten transport może tam nie działać
- autoryzacja nie powiodła się:
  potwierdź, że polecenie używa `McHttpConfig.LoginToken`, a nie tokena `McWss` lub `McTcp`
- dodatek ładuje się, ale brakuje poleceń:
  potwierdź, że do świata dołączone są zarówno zachowania, jak i pakiety zasobów, a BDS został zrestartowany
- klient łączy się, ale nie ma bliskości:
  potwierdź przepływ powiązań, `PositioningType` i aktualizacje pozycji gracza

## Przeczytaj dalej

- [VoiceCraft.Addon](/ecosystem/voicecraft-addon)
- [Addon API](/ecosystem/addon-api)
- [Strona pobierania](/download)
- [Konfigurator dodatku](/addon-configurator)
