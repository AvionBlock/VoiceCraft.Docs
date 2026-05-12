# Model pozycjonowania

VoiceCraft obsługuje modele pozycjonowania zarówno po stronie serwera, jak i po stronie klienta.

## `PositioningType`

- `0 = Server`
- `1 = Client`

Ta wartość musi być wyrównana między serwerem a klientem.

## Pozycjonowanie po stronie serwera

Najlepiej, gdy:

- serwer lub warstwa integracyjna może zapewnić autorytatywny stan świata
- chcesz bardziej scentralizowanego zachowania

## Pozycjonowanie po stronie klienta

Najlepiej, gdy:

- środowisko jest ograniczone
- integracja świata po stronie serwera jest ograniczona
- niektóre ograniczenia hostingu blokują normalne ścieżki integracji

## Dlaczego niedopasowania psują oczekiwania dotyczące dźwięku

Jeśli klient i serwer nie zgadzają się co do trybu pozycjonowania, możesz zobaczyć następujące objawy:

- klienci głosowi łączą się, ale nie słyszą oczekiwanej bliskości
- istoty wydają się obecne, ale zachowują się dziwnie
- integracja wygląda częściowo na zdrową, podczas gdy logika pozycyjna jest błędna
