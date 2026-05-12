# Schematy produkcyjne

Ta strona podsumowuje rozsądne podejścia do produkcji zamiast surowych list funkcji.

## Plan 1: Serwer działający wyłącznie na platformie Bedrock

Użyj:

- `VoiceCraft.Server`
- `McHttp`
- `VoiceCraft.Addon.Core.McHttp`

Dlaczego:

- najczystsze stabilne wdrożenie Bedrock
- najłatwiejszy do monitorowania
- najłatwiejszy do wyjaśnienia personelowi serwera

## Plan 2: Społeczność lokalna / SMP z gejzerem

Użyj:

- `VoiceCraft.Server`
- `McTcp`
- `GeyserVoice` direct Paper mode

Opcjonalnie:

- pozwól GeyserVoice zarządzać środowiskiem wykonawczym VoiceCraft, jeśli wolisz pojedynczy proces instalacji po stronie Java

## Plan 3: Duża sieć Java

Użyj:

- external `VoiceCraft.Server`
- `McTcp`
- `GeyserVoice` on proxy
- `GeyserVoice` on backend nodes

Dlaczego:

- sterowanie centralne
- czystsze skalowanie
- łatwiejsze ponowne uruchamianie bez dotykania każdego backendu

## Plan 4: Konstruktor/środowisko testowe

Użyj:

- `McWss`
- `Core.McWss`
- lokalna instancja VoiceCraft

Dlaczego:

- szybka pętla lokalna
- dobry do testowania automatyzacji dodatków

## Zalecenia operacyjne

- przechowuj dzienniki VoiceCraft oddzielnie od dzienników gier, jeśli to możliwe
- obracaj lub archiwizuj konfiguracje przed dużymi aktualizacjami
- zachowaj tajemnicę tokenów transportu
- testuj przepływ wiązania po każdej zmianie topologii
