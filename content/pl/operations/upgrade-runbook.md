# Runbook aktualizacji

Use this when upgrading VoiceCraft or a related bridge such as `GeyserVoice`.

## Kolejność aktualizacji

Zalecana kolejność:

1. wykonaj kopię zapasową konfiguracji
2. Przygotuj nowe pliki binarne osobno
3. pakiety dodatków lub wtyczek dopasowujących się do etapu
4. czytać założenia dotyczące transportu i topologii
5. zatrzymaj starą usługę
6. przenieś konfigurację do nowej instalacji
7. zaktualizuj dodatek/wtyczkę po stronie Minecrafta
8. uruchom i zatwierdź

For VoiceCraft `v1.6.1`, do not leave the old Bedrock addon in place. Update the addon together with the client/server release before validating bind flow and in-game indicators.

## Dlaczego oddzielne katalogi są pomocne

Oddzielny wyodrębniony katalog ułatwia wycofywanie zmian, ponieważ:

- stare pliki binarne są nadal nienaruszone
- migracja konfiguracji jest jawna
- możesz porównać układy wydań

## Sprawdź po aktualizacji

Minimalnie:

1. Uruchamia się VoiceCraft
2. wiążą porty transportowe
3. klient łączy się
4. dodatek lub wtyczka uwierzytelnia
5. przepływ wiązania działa
6. Ikony głosowe w grze lub zdarzenia związane z dodatkami pojawiają się wtedy, gdy są oczekiwane
7. Dźwięk zbliżeniowy działa

## Jeśli aktualizujesz GeyserVoice

Sprawdź także:

- zachowanie podczas automatycznego uruchamiania
- model własności proxy
- przekazywanie migawek backendu

## Przykłady wyzwalaczy wycofywania

Rozważ wycofanie, gdy:

- autoryzacja nagle kończy się niepowodzeniem na wcześniej działającym tokenie
- transporty nie są już wiązane zgodnie z oczekiwaniami
- środowisko wykonawcze zarządzane przez wtyczki nigdy nie jest gotowe
- stan głosu międzyserwerowego proxy staje się niespójny
