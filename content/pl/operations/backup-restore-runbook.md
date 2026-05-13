# Tworzenie kopii zapasowych i przywracanie elementu Runbook

Na tej stronie opisano praktyczne kroki tworzenia kopii zapasowych i przywracania.

Użyj go przed ryzykownymi zmianami: aktualizacjami, rotacją tokenów, zmianami transportu, migracją hosta lub przełączaniem między topologiami Bedrock i Java.

## Co wykonać kopię zapasową

Minimalna:

- `config/ServerProperties.json`
- pliki opakowania usługi
- uwagi dotyczące wdrażania portów i tokenów

Zalecane:

- artefakty z poprzedniej wersji
- rejestruje ostatni dobry znany stan
- konfiguracje wtyczek, takie jak `GeyserVoice/config.yml`
- Pliki konfiguracyjne pakietu Bedrock World Pack
- wersje pakietów dodatków aktualnie zainstalowane na świecie
- pliki menedżera usług, takie jak jednostki systemowe lub polecenia uruchamiania panelu
- uwagi dotyczące zastępowania środowiska wykonawczego, jeśli używane są flagi startowe

## Zanim cokolwiek zmienisz

Zrób migawkę, gdy masz zamiar:

- uaktualnij VoiceCraft
- zmienić transport
- obracać żetony
- topologia przełączania
- zmienić powiązania hosta lub reguły zapory sieciowej
- przejdź ze środowiska wykonawczego zarządzanego przez wtyczki do zewnętrznego środowiska wykonawczego

## Przywróć przepływ pracy

1. Zatrzymaj usługę, której dotyczy problem.
2. Przywróć `ServerProperties.json`.
3. Przywróć powiązaną konfigurację wtyczki lub dodatku, jeśli topologia uległa zmianie.
4. Przywróć pasujący pakiet dodatków/wtyczek, jeśli zgodność wersji ma znaczenie.
5. Uruchom ponownie VoiceCrafta.
6. Uruchom ponownie lub załaduj ponownie integrację po stronie Minecrafta.
7. Sprawdź autoryzację transportu i powiąż przepływ.

## Jakie przywracanie nie naprawia automatycznie

- błędy firewalla
- Problemy z DNS lub osiągalnością hosta
- niedopasowana konfiguracja klienta lub wtyczki
- błędy topologii po przeprojektowaniu sieci
- dostawcę, który blokuje wymaganą ścieżkę transportu
- gracze korzystający z nowszego, niekompatybilnego pakietu klienta

## Walidacja po przywróceniu

Sprawdź:

1. serwer uruchamia się czysto
2. wybrany transport jest włączony
3. token pasuje do węzła integrującego
4. powiązanie odtwarzacza i przepływ dźwięku znów działają
5. polecenia serwera pokazują oczekiwanych klientów/jednostki
6. dzienniki nie pokazują już błędu, który spowodował przywrócenie

## Nazewnictwo kopii zapasowych

Używaj nazw zawierających:

- data
- Wersja VoiceCrafta
- topologia
- powód

Przykład:

```text
2026-05-13-voicecraft-1.6.1-bds-before-token-rotation
```

Dobre nazwy mają znaczenie podczas incydentów, ponieważ pozwalają jasno określić, która kopia zapasowa należy do której topologii.
