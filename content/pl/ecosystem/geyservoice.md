# GeyserVoice (Java / Java Bridge)

Repozytorium: [AvionBlock/GeyserVoice](https://github.com/AvionBlock/GeyserVoice)

`GeyserVoice` łączy infrastrukturę Java z `VoiceCraft.Server` poprzez transport `McTcp`.

W projekcie GeyserVoice ścieżka ta jest również opisana jako `McApi TCP`. W konfiguracji serwera VoiceCraft odpowiada `McTcpConfig`.

Obsługuje:

- bezpośrednie wdrożenie Paper/Folia
- Wdrożenie proxy prędkości
- Wdrożenie proxy BungeeCord
- mieszane topologie proxy + backend

## Co robi GeyserVoice

`GeyserVoice` łączy stan gracza z serwerów po stronie Java z VoiceCraft:

- cykl życia gracza
- migawki pozycji/świata
- przepływ wiązania
- Przekazywanie proxy dla sieci wieloserwerowych

To nie jest tylko prosty forwarder pakietów. W trybie Direct Paper może także zarządzać lokalnym środowiskiem wykonawczym VoiceCraft.

## Bardzo ważne: GeyserVoice może uruchomić VoiceCraft pod maską

W przypadku bezpośrednich instalacji Paper wtyczka może automatycznie:

- pobierz środowisko wykonawcze VoiceCraft
- zainstaluj go w skonfigurowanym katalogu
- rozpocząć proces
- poczekaj, aż będzie gotowe
- opcjonalnie zatrzymaj go, gdy wtyczka się wyłączy

To zachowanie jest kontrolowane przez blok `config.voicecraft.*`.

To sprawia, że GeyserVoice nadaje się zarówno do:

- przy użyciu już zarządzanego zewnętrznego `VoiceCraft.Server`
- pozwalając wtyczce na załadowanie i uruchomienie VoiceCraft

Jeśli GeyserVoice zarządza środowiskiem wykonawczym, nadal łączy się tą samą ścieżką `McTcp`/`McApi TCP`. Różnica polega na tym, kto rozpoczyna proces VoiceCraft.

## Obsługiwane platformy wtyczek

Z aktualnego kodu źródłowego:

- Paper/Folia
- Prędkość
- BungeeCord

## Ścieżki wykonawcze

Aktualnie obsługiwane ścieżki:

- `Paper -> McTcp -> VoiceCraft`
- `Paper -> Proxy relay -> McTcp -> VoiceCraft`

## Układ `config.yml`

Bieżąca struktura konfiguracji Paper:

### `config.debug`

Włącz tryb debugowania wtyczki.

### `config.lang`

Język wtyczki, na przykład `system`.

### `config.auto-reconnect`

Określa, czy wtyczka powinna automatycznie łączyć się ponownie.

### `config.proxy.enabled`

Czy bieżący węzeł po stronie Paper działa za przekaźnikiem zarządzanym przez serwer proxy.

### `config.voicecraft.*`

Blok połączenia i zarządzania czasem wykonania.

Bieżący kształt zagnieżdżony:

```yml
config:
  voicecraft:
    transport:
      host: "127.0.0.1"
      port: 9050
      login-token: "__GENERATED_LOGIN_TOKEN__"
    voice:
      port: 1111
    auto-start: true
    shutdown-on-disable: true
    invariant-globalization: true
    ready-timeout-ms: 20000
    install-directory: "voicecraft-runtime"
```

- `transport.host`
- `transport.port`
- `transport.login-token`
- `voice.port`
- `auto-start`
- `shutdown-on-disable`
- `invariant-globalization`
- `ready-timeout-ms`
- `install-directory`

Znaczenie:

- `transport.host` / `transport.port` / `transport.login-token`
  cel `VoiceCraft.Server` / `McTcp`
- `voice.port`
  Port głosowy środowiska wykonawczego VoiceCraft używany przez zarządzaną ścieżkę środowiska wykonawczego
- `auto-start`
  pozwól wtyczce automatycznie uruchomić środowisko wykonawcze VoiceCraft
- `shutdown-on-disable`
  zatrzymaj zarządzane środowisko wykonawcze po wyładowaniu wtyczki
- `invariant-globalization`
  opcja globalizacji środowiska uruchomieniowego przydatna przy uruchamianiu serwerów zarządzanych
- `ready-timeout-ms`
  jak długo wtyczka czeka, aż środowisko wykonawcze będzie gotowe
- `install-directory`
  gdzie jest zainstalowane zarządzane środowisko wykonawcze

W przypadku Velocity i BungeeCord konfiguracja zachowuje kształt `config.voicecraft.transport.*` i `config.voicecraft.voice.*`, ale nie używa pól środowiska wykonawczego zarządzanego tylko w wersji Paperj.

### `config.voice.*`

Zachowanie skierowane w stronę gracza:

- `proximity-distance`
- `proximity-toggle`
- `voice-effects`
- `not-in-voice-symbol`
- `in-voice-symbol`
- `send-bind-message`
- `send-disconnect-message`
- `send-voicecraft-disconnect-message`
- `send-connection-lost-message`
- `position-update-interval-ticks`

### `config.players`

Przechowywane dane z pamięci podręcznej automatycznego wiązania / po stronie gracza.

### `config.player-links`

Dodatkowa struktura łączy/pamięci podręcznej używana przez wtyczkę.

## Polecenia

Od `BaseVoiceCommand`:

- `connect <host> <port> <key>`
- `reconnect [true|false]`
- `disconnect`
- `settings`
- `bind <key>`
- `bindfake <key> <name>`
- `updatefake <key>`
- `clearautobind`
- `reload`

## Uprawnienia

Typowe uprawnienia:

- `voice.cmd`
- `voice.connect`
- `voice.reconnect`
- `voice.disconnect`
- `voice.settings`
- `voice.bind`
- `voice.bindfake`
- `voice.reload`

## Tryb Direct Paper

Najlepiej, gdy:

- uruchamiasz jeden serwer Paper
- chcesz najprostszej konfiguracji po stronie Java
- chcesz, aby GeyserVoice zarządzał środowiskiem wykonawczym VoiceCraft za Ciebie

Zobacz [Direct Paper Guide](/ecosystem/geyservoice-direct-paper).

## Tryb proxy

Najlepiej, gdy:

- uruchamiasz Velocity lub BungeeCord
- masz kilka serwerów backendowych Paper
- chcesz mieć jedno centralne połączenie VoiceCraft na serwerze proxy

Zobacz [Proxy Guide](/ecosystem/geyservoice-proxy).

W trybie proxy serwery Backend Paper nie powinny być traktowane jako centralny właściciel połączenia VoiceCraft. Serwer proxy jest właścicielem połączenia `McTcp`, a węzły zaplecza udostępniają migawki graczy.

## Uwagi techniczne

- kanał przesyłania wiadomości o wtyczce: `geyservoice:main`
- w trybie proxy identyfikatory światowe mogą mieć przestrzeń nazw z tożsamością zaplecza
- wtyczka używa obecnie `McTcp` jako mostu skierowanego do VoiceCraft

## Aktualne ograniczenia kodu

- `updatefake` jest nadal symbolem zastępczym
- `settings` istnieje, ale obecnie ma minimalną praktyczną logikę

## Lista kontrolna produkcji

1. Zdecyduj, czy Paper powinien sam zarządzać środowiskiem wykonawczym VoiceCraft.
2. Jeśli tak, skonfiguruj `auto-start`, `install-directory` i `ready-timeout-ms`.
3. Jeśli nie, wskaż `config.voicecraft.transport.host`, `config.voicecraft.transport.port` i `config.voicecraft.transport.login-token` na zewnętrznym serwerze VoiceCraft.
4. Ogranicz polecenia tylko dla personelu.
5. Przetestuj przepływ wiązania i aktualizacje pozycji przed udostępnieniem graczom.
6. Potwierdź `McTcpConfig.Enabled = true` po stronie VoiceCraft.
7. Potwierdź, że token pasuje do `McTcpConfig.LoginToken`.
