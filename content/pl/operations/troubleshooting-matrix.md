# Rozwiązywanie problemów z matrycą

Użyj tej strony, jeśli chcesz postawić diagnozę na podstawie objawów, a nie ogólnej listy kontrolnej.

## Objaw: klient łączy się, ale nikt nic nie słyszy

Sprawdź:

1. `PositioningType` dopasowanie
2. Zakończono przepływ wiązania
3. jednostki otrzymują aktualizacje świata i pozycji
4. klient nie jest lokalnie wyciszony ani ogłuszony
5. serwer nie wyciszył ani nie ogłuszył jednostki

Jak zweryfikować:

- uruchom `list --clientsOnly`, aby potwierdzić, że klient głosowy istnieje
- uruchom `list` i sprawdź, czy powiązany podmiot ma zmieniającą się pozycję
- użyj testu mikrofonu klienta i testu wyjścia, aby wykluczyć lokalne urządzenia audio

## Objaw: dodatek łączy się, ale wiązanie nigdy nie działa

Sprawdź:

1. token jest poprawny
2. tworzony jest oczekiwany obiekt
3. gracz użył prawidłowego klucza wiązania
4. uruchamiają się zdarzenia skryptu bind

Najczęstsze przyczyny:

- gracz skopiował wygasły lub zregenerowany klucz wiążący
- Wersja pakietu dodatków nie jest zgodna z wersją serwera/klienta
- niestandardowa logika dodatków przechwytuje lub omija domyślny przepływ wiązania

## Objaw: zainstalowano GeyserVoice, ale most po stronie Java nigdy nie staje się użyteczny

Sprawdź:

1. `McTcp` jest włączony w VoiceCraft
2. `config.voicecraft.transport.host`, `config.voicecraft.transport.port` i `config.voicecraft.transport.login-token` pasują
3. tryb bezpośredni vs proxy jest skonfigurowany celowo
4. jeśli włączono `auto-start`, środowisko wykonawcze będzie gotowe po upływie limitu czasu

Sprawdź także, czy wtyczka jest zainstalowana na właściwej warstwie: bezpośredni tryb Paper wymaga Paper/Folia, natomiast tryb proxy wymaga węzłów proxy i backendu.

## Objaw: bezpośredni tryb Paper działa po ręcznym ponownym podłączeniu, ale nie po uruchomieniu

Sprawdź:

1. `config.voicecraft.auto-start`
2. `install-directory`
3. `ready-timeout-ms`
4. własność startowa procesu wykonawczego

Jeśli wtyczka uruchomi się, zanim zarządzane środowisko wykonawcze będzie gotowe, zwiększ limit czasu lub użyj zewnętrznej usługi VoiceCraft z własną polityką restartu.

## Objaw: tryb proxy działa na jednym serwerze, ale psuje się przy przełączaniu serwera

Sprawdź:

1. proxy jest źródłem prawdy
2. węzły zaplecza nie próbują przejąć połączenia VoiceCraft
3. przekazywanie migawek pozostaje nienaruszone między przełącznikami
4. Logika przestrzeni nazw identyfikatorów świata pozostaje spójna

Jeśli zawiedzie tylko jeden backend, porównaj jego konfigurację GeyserVoice i wersję wtyczki z działającym backendem.

## Objaw: `McWss` jest niestabilny

Sprawdź:

1. `CommandsPerTick`
2. `MaxByteLengthPerCommand`
3. zmiana jednostki i wielkość serii pakietów
4. czy `McHttp` będzie lepiej pasować

Jeśli świat staje się długo działającym serwerem współdzielonym, potraktuj niestabilność jako znak do przejścia na BDS + `McHttp`.

## Objaw: Serwer VoiceCraft uruchamia się, ale odbiorca transportu nie może się połączyć

Sprawdź:

1. wiązanie hosta
2. odsłonięty port
3. zapora sieciowa
4. wybrano niewłaściwy rodzaj transportu
5. środowisko wykonawcze zastępuje zmianę oczekiwanych wartości

Szybki podział:

- Problemy z połączeniem klienta wynikają zazwyczaj z punktu końcowego UDP lub ustawień klienta
- Problemy z połączeniem dodatków/wtyczek to zazwyczaj `McHttp`, `McWss` lub `McTcp`
- Problemy z powiązaniem/zbliżeniem zwykle pojawiają się, gdy oba połączenia już istnieją
