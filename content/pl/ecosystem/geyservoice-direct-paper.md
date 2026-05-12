# Przewodnik GeyserVoice Direct Paper

Użyj tego trybu, gdy jeden serwer Paper / Folia powinien komunikować się bezpośrednio z VoiceCraft.

## Dwa sposoby uruchomienia

### Opcja A: zewnętrzny serwer VoiceCraft

You already run `VoiceCraft.Server` somewhere and point GeyserVoice at it.

### Opcja B: środowisko wykonawcze zarządzane przez wtyczkę

GeyserVoice może załadować VoiceCraft za Ciebie:

- pobierz środowisko wykonawcze
- zainstaluj środowisko wykonawcze
- rozpocznij działanie
- poczekaj na gotowość
- opcjonalnie zatrzymaj runtime za pomocą wtyczki

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
    host: "127.0.0.1"
    port: 9050
    login-token: "replace-with-token"
    auto-start: true
    shutdown-on-disable: true
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

## Kroki konfiguracji

1. Zainstaluj GeyserVoice na Paper.
2. Uruchom serwer raz.
3. Edit `plugins/GeyserVoice/config.yml`.
4. Decide whether `auto-start` should be enabled.
5. Ensure the `login-token` matches VoiceCraft `McTcpConfig.LoginToken`.
6. Run `/voice reload`.
7. Przetestuj przepływ wiązania w grze.

## When `auto-start` is a good idea

- konfiguracja na jednym serwerze
- chcesz mniej ruchomych elementów
- nie zarządzasz już VoiceCraftem za pomocą systemd / Docker / panel

## Gdy zewnętrzne środowisko wykonawcze jest lepsze

- zarządzasz już VoiceCraftem centralnie
- chcesz innej polityki ponownego uruchamiania lub rejestrowania
- uruchamiasz kilka węzłów Java na jednym backendie VoiceCraft

## Rozwiązywanie problemów

- środowisko wykonawcze nigdy nie jest gotowe:
  increase `ready-timeout-ms`
- wtyczka może łączyć się ręcznie, ale nie podczas uruchamiania:
  check `auto-start` and `install-directory`
- gracze dołączają, ale dane głosowe nie są wiążące:
  sprawdź token, host, port i przepływ powiązań
