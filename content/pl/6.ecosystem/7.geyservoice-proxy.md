# Przewodnik po serwerze proxy GeyserVoice

Użyj tego trybu, jeśli uruchamiasz Velocity lub BungeeCord z co najmniej jednym serwerem Paper.

## Jak działa tryb proxy

- backendowe serwery Paper wysyłają migawki graczy do proxy
- the proxy owns the VoiceCraft-side `McTcp` connection
- Identyfikatory i wymiary świata mogą mieć przestrzeń nazw z tożsamością zaplecza

Umożliwia to utworzenie jednego centralnego mostu głosowego dla sieci składającej się z wielu serwerów.

## Wzór wdrożenia

Zainstaluj GeyserVoice:

- na proxy
- na każdym serwerze backendowym Paper

## Podstawowa zasada

Serwer proxy jest źródłem prawdy dla połączenia VoiceCraft.

Serwery Backend Paper należy traktować jako producentów migawek, a nie jako głównego właściciela mostu.

## Konfiguracja backendu Paper

Na serwerach backendowych Paper:

- włącz tryb proxy dla węzła po stronie Paper
- nie traktuj hosta/portu/klucza backendu jako źródła prawdy

## Konfiguracja proxy

Na serwerze proxy:

- set the real `host`
- set the real `port`
- set the real `login-token`

## Przebieg konfiguracji

1. Zainstaluj wtyczkę na węzłach proxy i backend.
2. Uruchom wszystko raz, aby wygenerować konfiguracje.
3. Skonfiguruj serwer proxy z prawdziwym połączeniem VoiceCraft.
4. Skonfiguruj węzły zaplecza pod kątem zachowania przekaźnika proxy.
5. Załaduj ponownie wtyczkę.
6. Sprawdź ruch między serwerami i przepływ powiązań.

## Lista kontrolna walidacji

- gracz dołącza do backendu
- backend poprawnie wysyła migawki
- proxy pozostaje połączone z VoiceCraft
- przełączanie serwerów zaplecza zachowuje oczekiwaną tożsamość głosową

## Wzorce awarii

- backend próbuje przejąć główne połączenie
- proxy token differs from VoiceCraft `McTcpConfig.LoginToken`
- proxy może dotrzeć do Paper, ale nie do VoiceCraft
- topologia backendu ukrywa lub przepisuje wiadomości wtyczek
