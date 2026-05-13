# Plany produkcyjne

Ta strona podsumowuje rozsądne podejścia do produkcji zamiast surowych list funkcji.

Skorzystaj z tych planów, podejmując decyzję o standaryzacji topologii. Celowo są podzieleni: celem jest ograniczenie ruchomych części, a nie eksponowanie każdego możliwego transportu na raz.

## Plan 1: Serwer działający wyłącznie na platformie Bedrock

Użyj:

- `VoiceCraft.Server`
- `McHttp`
- `VoiceCraft.Addon.Core.McHttp`

Dlaczego:

- najczystsze stabilne wdrożenie Bedrock
- najłatwiejszy do monitorowania
- najłatwiej wytłumaczyć personelowi serwera

Zalecany kształt:

```text
BDS addon -> McHttp -> VoiceCraft.Server
players -> VoiceCraft UDP endpoint
```

Pozostaw `McWss` i `McTcp` wyłączone, chyba że masz konkretny powód, aby je uruchomić.

## Plan 2: Lokalna społeczność / SMP z Geyser

Użyj:

- `VoiceCraft.Server`
- `McTcp`
- `GeyserVoice` bezpośredni tryb Paper

Opcjonalnie:

- pozwól GeyserVoice zarządzać środowiskiem wykonawczym VoiceCraft, jeśli wolisz pojedynczy proces instalacji po stronie Java

Zalecany kształt:

```text
Paper/Folia + GeyserVoice -> McTcp -> VoiceCraft.Server
players -> VoiceCraft UDP endpoint
```

Jest to dobre rozwiązanie, gdy jeden serwer po stronie Java jest głównym autorytetem w zakresie pozycji gracza.

## Plan 3: Duża sieć Java

Użyj:

- zewnętrzny `VoiceCraft.Server`
- `McTcp`
- `GeyserVoice` na serwerze proxy
- `GeyserVoice` w węzłach zaplecza

Dlaczego:

- sterowanie centralne
- czystsze skalowanie
- łatwiejsze ponowne uruchomienie bez dotykania każdego backendu

Zalecany kształt:

```text
backend Paper nodes -> proxy relay -> proxy GeyserVoice -> McTcp -> VoiceCraft.Server
players -> VoiceCraft UDP endpoint
```

Zachowaj proxy jako jedynego właściciela połączenia VoiceCraft. Węzły zaplecza powinny generować migawki, a nie konkurować o główne połączenie `McTcp`.

## Plan 4: Konstruktor/środowisko testowe

Użyj:

- `McWss`
- `Core.McWss`
- lokalna instancja VoiceCraft

Dlaczego:

- szybka pętla lokalna
- dobry do testowania automatyzacji dodatków

Zalecany kształt:

```text
local Bedrock world -> McWss -> local VoiceCraft.Server
local client -> local VoiceCraft UDP endpoint
```

Nie traktuj tego jako domyślnego projektu produkcyjnego dla publicznego serwera Bedrock. Przejdź do `McHttp`, gdy świat stanie się długotrwały lub współdzielony.

## Wybór planu

| Potrzeba | Wybierz |
|------|--------|
| Stabilna produkcja skał macierzystych | Plan 1 |
| Jeden serwer Java/Geyser | Plan 2 |
| Sieć Velocity/Bungee | Plan 3 |
| Lokalne testowanie lub rozwój dodatków | Plan 4 |

## Zalecenia operacyjne

- jeśli to możliwe, przechowuj dzienniki VoiceCraft oddzielnie od dzienników gier
- obracaj lub archiwizuj konfiguracje przed dużymi aktualizacjami
- zachowaj tokeny transportu w tajemnicy
- testuj przepływ wiązania po każdej zmianie topologii
- eksponuj tylko transport wymagany przez wybrany plan
- zachowaj kopię zapasową `ServerProperties.json` przed zmianą portów lub tokenów
- dokument, która usługa jest właścicielem procesu VoiceCraft w Twoim środowisku
