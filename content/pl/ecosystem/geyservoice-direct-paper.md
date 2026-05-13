# Przewodnik GeyserVoice Direct Paper

Użyj tego trybu, gdy jeden serwer Paper / Folia powinien komunikować się bezpośrednio z VoiceCraft.

Tryb Direct Paper to najprostsza topologia po stronie Java: serwer Paper albo łączy się z zewnętrznym `VoiceCraft.Server`, albo pozwala GeyserVoice pobrać i uruchomić lokalne środowisko wykonawcze VoiceCraft.

Docelowy kształt:

```text
Paper/Folia + GeyserVoice -> McTcp/McApi TCP -> VoiceCraft.Server
VoiceCraft.Client -> VoiceCraft UDP endpoint
```

## Dwa sposoby jego uruchomienia

### Opcja A: zewnętrzny serwer VoiceCraft

Uruchomiłeś już gdzieś `VoiceCraft.Server` i skierowałeś na niego GeyserVoice.

### Opcja B: środowisko wykonawcze zarządzane przez wtyczki

GeyserVoice może załadować VoiceCraft za Ciebie:

- pobierz środowisko wykonawcze
- zainstaluj środowisko wykonawcze
- rozpocznij działanie
- poczekaj na gotowość
- opcjonalnie zatrzymaj środowisko wykonawcze za pomocą wtyczki

Jest to jedna z najważniejszych aktualnych funkcji dla bezpośrednich użytkowników Paper.

## Zalecana konfiguracja

```yml
config:
  debug: false
  lang: "system"
  auto-reconnect: true

  proxy:
    enabled: false

  voicecraft:
    transport:
      host: "127.0.0.1"
      port: 9050
      login-token: "replace-with-token"
    voice:
      port: 1111
    auto-start: true
    shutdown-on-disable: true
    invariant-globalization: true
    ready-timeout-ms: 20000
    install-directory: "voicecraft-runtime"

  voice:
    proximity-distance: 30
    proximity-toggle: true
    voice-effects: true
    send-bind-message: true
    send-disconnect-message: true
    send-voicecraft-disconnect-message: true
    send-connection-lost-message: true
    position-update-interval-ticks: 5
```

Użyj `config.voicecraft.transport.host`, `config.voicecraft.transport.port` i `config.voicecraft.transport.login-token` dla połączenia VoiceCraft `McTcp`. Muszą one pasować do strony serwera VoiceCraft, jeśli używasz zewnętrznego środowiska wykonawczego.

## Kroki konfiguracji

1. Zainstaluj GeyserVoice na Paper.
2. Uruchom serwer raz.
3. Edytuj `plugins/GeyserVoice/config.yml`.
4. Zdecyduj, czy `auto-start` ma być włączony.
5. Upewnij się, że `config.voicecraft.transport.login-token` pasuje do VoiceCraft `McTcpConfig.LoginToken`.
6. Uruchom `/voice reload`.
7. Przetestuj przepływ wiązania w grze.

Jeśli `auto-start` to `true`, upewnij się, że `install-directory` można zapisać w procesie Paper. Jeśli `auto-start` to `false`, upewnij się, że zewnętrzny serwer VoiceCraft już działa i jest osiągalny.

## Kiedy `auto-start` jest dobrym pomysłem

- konfiguracja na jednym serwerze
- chcesz mniej ruchomych elementów
- nie zarządzasz już VoiceCraft za pomocą systemd / Docker / panel

## Kiedy zewnętrzne środowisko wykonawcze jest lepsze

- zarządzasz już VoiceCraft centralnie
- chcesz mieć inną politykę ponownego uruchamiania lub rejestrowanie
- uruchamiasz kilka węzłów Java na jednym backendie VoiceCraft
- chcesz, aby menedżer procesów, taki jak systemd, Docker lub panel hostingowy, był właścicielem ponownych uruchomień

## Rozwiązywanie problemów

- środowisko wykonawcze nigdy nie jest gotowe:
  zwiększyć `ready-timeout-ms`
- wtyczka może łączyć się ręcznie, ale nie podczas uruchamiania:
  sprawdź `auto-start` i `install-directory`
- gracze dołączają, ale dane głosowe nie są wiążące:
  sprawdź token, host, port i przepływ powiązań
- zewnętrzny VoiceCraft nigdy nie widzi wtyczki:
  potwierdź `McTcpConfig.Enabled = true`, powiązanie hosta, zaporę sieciową i `config.voicecraft.transport.*`
- klient łączy się, ale stan Java nie wpływa na bliskość:
  sprawdź `/voice bind`, interwał aktualizacji pozycji i tryb pozycjonowania po stronie serwera

## Lista kontrolna walidacji

- Logi Paper pokazują włączoną funkcję GeyserVoice
- Środowisko wykonawcze VoiceCraft działa lub zostało uruchomione automatycznie
- `McTcpConfig.LoginToken` pasuje do `config.voicecraft.transport.login-token`
- gracz może połączyć się z klientem VoiceCraft
- gracz może ukończyć `/voice bind <key>`
- poruszanie się w grze zmienia zachowanie w pobliżu
