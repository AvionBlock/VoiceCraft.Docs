# Przewodnik po serwerze proxy GeyserVoice

Użyj tego trybu, jeśli uruchamiasz Velocity lub BungeeCord z co najmniej jednym serwerem Paper.

Tryb proxy utrzymuje jedno centralne połączenie VoiceCraft na serwerze proxy, podczas gdy wewnętrzne serwery Paper przesyłają strumieniowo migawki graczy za pośrednictwem wtyczek.

Docelowy kształt:

```text
Backend Paper + GeyserVoice -> proxy relay -> Velocity/Bungee + GeyserVoice -> McTcp -> VoiceCraft.Server
VoiceCraft.Client -> VoiceCraft UDP endpoint
```

## Jak działa tryb proxy

- Serwery backend Paper wysyłają migawki graczy do serwera proxy
- serwer proxy jest właścicielem połączenia `McTcp` po stronie VoiceCraft
- Identyfikatory i wymiary świata mogą mieć przestrzeń nazw z tożsamością zaplecza

Umożliwia to utworzenie jednego centralnego mostu głosowego dla sieci składającej się z wielu serwerów.

## Wzór wdrożenia

Zainstaluj GeyserVoice:

- na proxy
- na każdym serwerze backendowym Paper

## Podstawowa zasada

Serwer proxy jest źródłem prawdy dla połączenia VoiceCraft.

Serwery Backend Paper należy traktować jako producentów migawek, a nie jako głównego właściciela mostu.

## Konfiguracja Paper zaplecza

Na serwerach backendowych Paper:

- włącz tryb proxy dla węzła po stronie Paper
- nie traktuj hosta/portu/klucza backendu jako źródła prawdy

Przykład backendu Paper:

```yml
config:
  proxy:
    enabled: true
```

Backend nadal potrzebuje zainstalowanego GeyserVoice, aby mógł obserwować graczy i wysyłać migawki, ale nie powinien posiadać głównego połączenia VoiceCraft.

## Konfiguracja proxy

Na serwerze proxy:

- ustaw prawdziwy `config.voicecraft.transport.host`
- ustaw prawdziwy `config.voicecraft.transport.port`
- ustaw prawdziwy `config.voicecraft.transport.login-token`

Przykład prędkości/Bungee:

```yml
config:
  voicecraft:
    transport:
      host: "127.0.0.1"
      port: 9050
      login-token: "replace-with-token"
    voice:
      port: 1111
```

Token musi pasować do `McTcpConfig.LoginToken` na `VoiceCraft.Server`.

## Przebieg konfiguracji

1. Zainstaluj wtyczkę na węzłach proxy i zaplecza.
2. Uruchom wszystko raz, aby wygenerować konfiguracje.
3. Skonfiguruj serwer proxy z prawdziwym połączeniem VoiceCraft.
4. Skonfiguruj węzły zaplecza pod kątem zachowania przekaźnika proxy.
5. Załaduj ponownie wtyczkę.
6. Sprawdź ruch między serwerami i przepływ powiązań.

Zacznij najpierw od jednego serwera zaplecza. Po uruchomieniu aktualizacji powiązań i pozycji dodaj więcej węzłów zaplecza.

## Lista kontrolna walidacji

- gracz dołącza do backendu
- backend poprawnie wysyła migawki
- proxy pozostaje połączone z VoiceCraft
- przełączanie serwerów zaplecza pozwala zachować oczekiwaną tożsamość głosową
- Dzienniki serwera VoiceCraft pokazują pojedynczego konsumenta `McTcp` będącego własnością serwera proxy
- Identyfikatory/wymiary świata zaplecza są stabilne po zmianie serwera

## Wzory niepowodzeń

- backend próbuje przejąć główne połączenie
- token proxy różni się od VoiceCraft `McTcpConfig.LoginToken`
- proxy może dotrzeć do Paper, ale nie do VoiceCraft
- topologia zaplecza ukrywa lub przepisuje komunikaty wtyczek
- wtyczka jest zainstalowana na serwerze proxy, ale brakuje jej w jednym zapleczu
- backend `config.proxy.enabled` ma wartość false we wdrożeniu przekaźnika proxy

## Notatki operacyjne

- Jeśli to możliwe, trzymaj VoiceCraft blisko serwera proxy, aby zmniejszyć opóźnienia mostu.
- Uruchom ponownie lub załaduj ponownie węzły zaplecza po zmianie konfiguracji proxy-relay.
- Przechowuj tokeny w konfiguracji proxy, a nie duplikuj je przypadkowo w każdym backendzie.
- Ponownie sprawdź przepływ powiązań po dodaniu nowego serwera zaplecza.
