# ServerProperties.json

Główny plik konfiguracyjny serwera: `config/ServerProperties.json`.

Plik ten tworzony jest po pierwszym uruchomieniu serwera i staje się dla niego trwałym źródłem prawdy. Zatrzymaj serwer przed edycją, chyba że menedżer procesów jest zaprojektowany tak, aby bezpiecznie przeładowywać konfigurację.

Użyj tej strony, jeśli chcesz zrozumieć, co kontroluje pole i które pola muszą pasować do klienta, dodatku lub wtyczki.

## Edytuj przepływ pracy

1. Zatrzymaj się `VoiceCraft.Server`.
2. Utwórz kopię zapasową `config/ServerProperties.json`.
3. Edytuj odpowiednią sekcję.
4. Sprawdź składnię JSON.
5. Uruchom serwer ponownie.
6. Obserwuj dzienniki pod kątem błędów analizy konfiguracji, odbiornika lub uwierzytelniania.
7. Połącz ponownie klienta i transport Minecraft.

Najważniejszymi pierwszymi zmianami są tokeny logowania do transportu i powiązania hosta.

## Pełny przykład

```json
{
  "TelemetryEnabled": true,
  "TelemetryToken": "replace-with-stable-random-token",
  "VoiceCraftConfig": {
    "Language": "en-US",
    "Port": 9050,
    "MaxClients": 100,
    "Motd": "VoiceCraft Proximity Chat!",
    "PositioningType": 0,
    "EnableVisibilityDisplay": true
  },
  "McWssConfig": {
    "Enabled": false,
    "LoginToken": "replace-with-secure-guid",
    "Hostname": "ws://127.0.0.1:9051/",
    "MaxClients": 1,
    "MaxTimeoutMs": 10000,
    "DataTunnelCommand": "voicecraft:data_tunnel",
    "CommandsPerTick": 3,
    "MaxByteLengthPerCommand": 300,
    "DisabledPacketTypes": []
  },
  "McHttpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-secure-guid",
    "Hostname": "http://127.0.0.1:9050/",
    "MaxClients": 1,
    "MaxTimeoutMs": 10000,
    "DisabledPacketTypes": []
  },
  "McTcpConfig": {
    "Enabled": false,
    "LoginToken": "replace-with-secure-guid",
    "Hostname": "127.0.0.1",
    "Port": 9050,
    "MaxClients": 1,
    "MaxTimeoutMs": 10000,
    "DisabledPacketTypes": []
  },
  "DefaultAudioEffectsConfig": {
    "1": { "EffectType": 1 },
    "2": { "WetDry": 1, "MinRange": 0, "MaxRange": 30, "EffectType": 2 },
    "4": { "WetDry": 1, "Delay": 0.5, "Range": 30, "EffectType": 4 },
    "8": { "WetDry": 1, "EffectType": 6 }
  }
}
```

## Telemetria

- `TelemetryEnabled`:
  umożliwia anonimową diagnostykę uruchamiania, pulsu i awarii z `VoiceCraft.Server`.
- `TelemetryToken`:
  stabilny pseudonimowy odcisk palca używany do grupowania zdarzeń telemetrycznych z jednej instalacji serwerowej.

Telemetria pomaga opiekunom zrozumieć kondycję środowiska wykonawczego i przyjęcie wersji. Nie należy go używać jako własnego zamiennika monitorującego; prowadź lokalne logi i monitoruj procesy dla serwerów produkcyjnych.

Jeśli nie chcesz telemetrii, ustaw:

```json
{
  "TelemetryEnabled": false
}
```

## Konfiguracja VoiceCraft

- `Language`:
  język dziennika serwera.
- `Port`:
  Port UDP dla głównego serwera VoiceCraft.
- `MaxClients`:
  maksymalna liczba połączeń klientów VoiceCraft.
- `Motd`:
  tekst zwracany przez odpowiedzi na polecenia ping/informacje.
- `PositioningType`:
  tryb pozycjonowania:
  - `0 = Server`
  - `1 = Client`
- `EnableVisibilityDisplay`:
  czy wskaźniki widoczności są wysyłane do klientów.

`Port` to punkt końcowy, który klienci graczy dodają w interfejsie klienta VoiceCraft. Nie jest to automatycznie to samo, co każdy punkt końcowy transportu w Minecraft, nawet jeśli domyślnie używa się ponownie `9050`.

`PositioningType` musi odpowiadać ustawieniom klienta. W większości konfiguracji BDS i GeyserVoice zacznij od `0 = Server`.

## McWssConfig

Używany do przepływów Bedrock przez WebSocket/tunel poleceń.

- `Enabled`:
  włączyć lub wyłączyć McWss.
- `LoginToken`:
  współdzielony token autoryzacji, zwykle używany z `/voicecraft:vcconnect <token>`.
- `Hostname`:
  host protokołu internetowego, taki jak `ws://0.0.0.0:9051/`.
- `MaxClients`:
  maksymalna liczba klientów McWss.
- `MaxTimeoutMs`:
  limit czasu bezczynności.
- `DataTunnelCommand`:
  nazwa polecenia używana w tunelu danych, zwykle `voicecraft:data_tunnel`.
- `CommandsPerTick`:
  ile pakietów poleceń jest przekazywanych w ramach jednego tiku.
- `MaxByteLengthPerCommand`:
  budżet ładunku (w bajtach) na wywołanie polecenia.
- `DisabledPacketTypes`:
  typy pakietów zablokowane w tym transporcie.

Użyj `McWss` dla światów lokalnych i testów. Tunel poleceń zależy od `DataTunnelCommand`; zmiana go tylko z jednej strony przerywa transport.

## Konfiguracja McHttp

Używany do serwerów dedykowanych Bedrock i integracji opartych na HTTP.

- `Enabled`
- `LoginToken`
- `Hostname`
- `MaxClients`
- `MaxTimeoutMs`
- `DisabledPacketTypes`

Typowe wiązanie BDS:

```json
{
  "Enabled": true,
  "LoginToken": "replace-with-token",
  "Hostname": "http://0.0.0.0:9050/",
  "MaxClients": 10,
  "MaxTimeoutMs": 10000,
  "DisabledPacketTypes": []
}
```

Użyj `McHttp`, gdy BDS może połączyć się z punktem końcowym HTTP VoiceCraft. Jeśli BDS i VoiceCraft działają na różnych komputerach, `127.0.0.1` wskaże niewłaściwy host z punktu widzenia BDS.

## Konfiguracja McTcp

Używane przez mosty po stronie Java, zwłaszcza `GeyserVoice`.

- `Enabled`:
  włączyć lub wyłączyć McTcp.
- `LoginToken`:
  współdzielony token uwierzytelniający dla mostu TCP.
- `Hostname`:
  powiąż nazwę hosta, na przykład `127.0.0.1` lub `0.0.0.0`.
- `Port`:
  Port nasłuchiwania TCP.
- `MaxClients`:
  maksymalną liczbę klientów transportowych.
- `MaxTimeoutMs`:
  limit czasu bezczynności.
- `DisabledPacketTypes`:
  typy pakietów zablokowane w tym transporcie.

Ważne różnice w porównaniu do `McHttp` / `McWss`:

- `Hostname` to zwykły host, a nie identyfikator URI
- `Port` to osobne pole
- to jest transport najbardziej odpowiedni dla `GeyserVoice`

Użyj `McTcp`, gdy wtyczka lub serwer proxy po stronie Java jest właścicielem ścieżki stanu Minecraft. Wartości `GeyserVoice` `config.voicecraft.transport.host`, `config.voicecraft.transport.port` i `config.voicecraft.transport.login-token` muszą być zgodne z tą sekcją.

## Domyślna konfiguracja efektów audio

Klucz słownika to maska bitowa `ushort`, wartość to obiekt JSON efektu.

Domyślna macierz:

- `1`:
  `Visibility`
- `2`:
  `Proximity`
- `4`:
  `ProximityEcho`
- `8`:
  `ProximityMuffle`

Możesz zastąpić lub rozszerzyć słownik, aby zmienić domyślne zachowanie efektu dla nowych jednostek.

Zmień je tylko wtedy, gdy zrozumiesz potok efektów. W przypadku większości wdrożeń sprawdź podstawowe zachowanie powiązań i bliskości przed zmianą efektów domyślnych.

## Wyłączone typy pakietów

Każdy transport obsługuje `DisabledPacketTypes`.

Użyj tego ostrożnie:

- jest przeznaczony do debugowania, eksperymentów ze zgodnością lub łagodzenia sytuacji awaryjnych
- wyłączenie pakietów podstawowych może przerwać logowanie, synchronizację jednostek lub dostarczanie dźwięku
- nie zmieniaj tego w środowisku produkcyjnym, jeśli nie rozumiesz przepływu pakietów

Jeśli transport działa dopiero po wyłączeniu typów pakietów, potraktuj to jako obejście problemu zgodności i udokumentuj, dlaczego jest potrzebne.

## Praktyczne wzorce produkcyjne

### Serwer dedykowany Bedrock

- `McHttpConfig.Enabled = true`
- `McWssConfig.Enabled = false`
- `McTcpConfig.Enabled = false`, chyba że uruchomisz także mosty po stronie Java

### Lokalny świat / tryb dla jednego gracza

- `McWssConfig.Enabled = true`
- `McHttpConfig.Enabled = false` lub opcjonalnie

### Most GeyserVoice/Java

- `McTcpConfig.Enabled = true`
- `McHttpConfig.Enabled = false` lub opcjonalnie
- `McWssConfig.Enabled = false`, chyba że jest to potrzebne także gdzie indziej

## Minimalne przykłady topologii

### Tylko BDS

```json
{
  "VoiceCraftConfig": {
    "Port": 9050,
    "PositioningType": 0
  },
  "McHttpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-strong-token",
    "Hostname": "http://0.0.0.0:9050/"
  },
  "McWssConfig": {
    "Enabled": false
  },
  "McTcpConfig": {
    "Enabled": false
  }
}
```

### Tylko most Java

```json
{
  "VoiceCraftConfig": {
    "Port": 9050,
    "PositioningType": 0
  },
  "McTcpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-strong-token",
    "Hostname": "0.0.0.0",
    "Port": 9050
  },
  "McHttpConfig": {
    "Enabled": false
  },
  "McWssConfig": {
    "Enabled": false
  }
}
```

## Ważne uwagi

- zawsze zastępuj wygenerowane wartości `LoginToken`
- z `Hostname: http://0.0.0.0:9050/` odbiornik HTTP łączy się z adresem wieloznacznym
- z `McTcpConfig.Hostname = 0.0.0.0` most TCP staje się osiągalny zdalnie
- zachowaj zgodność `PositioningType` z konfiguracją klienta
- zachowaj kopię ostatniej znanej dobrej konfiguracji przed aktualizacją
- używaj zastąpień w czasie wykonywania tylko wtedy, gdy menedżer procesu będzie je konsekwentnie przekazywał

Zobacz także:

- [Nadpisania w czasie wykonywania](/server/runtime-overrides)
- [Tryby transportu](/server/transports)
