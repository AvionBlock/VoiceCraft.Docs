# Runbook kopii zapasowej i przywracania

Na tej stronie opisano praktyczne kroki tworzenia kopii zapasowych i przywracania.

## Co utworzyć kopię zapasową

Minimalna:

- `config/ServerProperties.json`
- pliki opakowania usługi
- uwagi dotyczące wdrażania portów i tokenów

Zalecane:

- artefakty z poprzednich wersji
- logi wokół ostatniego dobrego znanego stanu
- plugin configs such as `GeyserVoice/config.yml`

## Zanim cokolwiek zmienisz

Zrób migawkę, gdy masz zamiar:

- uaktualnij VoiceCraft
- zmienić transport
- obracaj tokeny
- topologia przełączania

## Przywróć przepływ pracy

1. Zatrzymaj usługę, której dotyczy problem.
2. Restore `ServerProperties.json`.
3. Przywróć powiązaną konfigurację wtyczki lub dodatku, jeśli topologia uległa zmianie.
4. Uruchom ponownie VoiceCraft.
5. Sprawdź autoryzację transportu i powiąż przepływ.

## Którego przywrócenia nie naprawia się automatycznie

- błędy zapory sieciowej
- Problemy z DNS lub osiągalnością hosta
- niedopasowana konfiguracja klienta lub wtyczki
- błędy topologii po przeprojektowaniu sieci

## Walidacja po przywróceniu

Sprawdź:

1. serwer uruchamia się czysto
2. wybrany transport jest włączony
3. token pasuje do węzła integrującego
4. Powiązanie odtwarzacza i przepływ dźwięku znów działają
