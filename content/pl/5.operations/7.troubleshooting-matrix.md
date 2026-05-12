# Matryca rozwiązywania problemów

Użyj tej strony, jeśli chcesz postawić diagnozę na podstawie objawów, a nie ogólnej listy kontrolnej.

## Objaw: klient łączy się, ale nikt nic nie słyszy

Sprawdź:

1. `PositioningType` match
2. Zakończono przepływ wiązania
3. podmioty otrzymują aktualizacje świata i pozycji
4. Klient nie jest lokalnie wyciszony lub ogłuszony
5. serwer nie wyciszył ani nie ogłuszył podmiotu

## Objaw: dodatek łączy się, ale wiązanie nigdy nie działa

Sprawdź:

1. token jest poprawny
2. tworzony jest oczekiwany podmiot
3. gracz użył prawidłowego klucza wiązania
4. Uruchamiane są zdarzenia skryptu bind

## Objaw: GeyserVoice jest zainstalowany, ale most po stronie Java nigdy nie staje się użyteczny

Sprawdź:

1. `McTcp` is enabled on VoiceCraft
2. `host`, `port`, and `login-token` match
3. Tryb bezpośredni vs proxy jest skonfigurowany celowo
4. if `auto-start` is enabled, the runtime becomes ready within timeout

## Objaw: bezpośredni tryb Paper działa po ręcznym ponownym podłączeniu, ale nie po uruchomieniu

Sprawdź:

1. `config.voicecraft.auto-start`
2. `install-directory`
3. `ready-timeout-ms`
4. Początkowa własność procesu wykonawczego

## Objaw: tryb proxy działa na jednym serwerze, ale psuje się przy przełączaniu serwera

Sprawdź:

1. proxy jest źródłem prawdy
2. węzły zaplecza nie próbują przejąć połączenia VoiceCraft
3. Przekazywanie migawek pozostaje nienaruszone pomiędzy przełącznikami
4. Logika przestrzeni nazw identyfikatorów świata pozostaje spójna

## Symptom: `McWss` is unstable

Sprawdź:

1. `CommandsPerTick`
2. `MaxByteLengthPerCommand`
3. zmiana jednostek i wielkość serii pakietów
4. whether `McHttp` would be a better fit

## Objaw: Serwer VoiceCraft uruchamia się, ale konsument transportu nie może się połączyć

Sprawdź:

1. powiązanie hosta
2. odsłonięty port
3. zapora sieciowa
4. Wybrano zły rodzaj transportu
5. Runtime zastępuje zmianę oczekiwanych wartości
