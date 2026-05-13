# Model pozycjonowania

VoiceCraft obsługuje modele pozycjonowania zarówno po stronie serwera, jak i po stronie klienta.

Pozycjonowanie decyduje o tym, kto dostarcza dane o lokalizacji, od których zależy dźwięk zbliżeniowy. Jeśli zostanie wybrany niewłaściwy tryb, klienci będą mogli pomyślnie nawiązać połączenie, ale nadal słyszą niewłaściwe osoby, nie słyszą nikogo lub ignorują zmiany odległości.

## `PositioningType`

- `0 = Server`
- `1 = Client`

Ta wartość musi być wyrównana między serwerem a klientem.

Ustaw wartość serwera w:

```text
VoiceCraftConfig.PositioningType
```

Ustaw wartość klienta w ustawieniach sieci klienta lub `Settings.json`.

## Pozycjonowanie po stronie serwera

Najlepiej, gdy:

- serwer lub warstwa integracji może zapewnić autorytatywny stan świata
- chcesz bardziej scentralizowanego zachowania
- uruchamiasz BDS z `McHttp`
- uruchamiasz Java/Geyser z `GeyserVoice`
- chcesz, aby narzędzia personelu/moderacji analizowały stan jednostki będącej własnością serwera

W tym modelu integracja po stronie Minecrafta wysyła aktualizacje pozycji i świata do `VoiceCraft.Server`. Klient otrzymuje wystarczający stan, aby lokalnie renderować dźwięk zbliżeniowy.

Użyj tego jako domyślnego w przypadku wdrożeń produkcyjnych.

## Pozycjonowanie po stronie klienta

Najlepiej, gdy:

- środowisko jest ograniczone
- Integracja świata po stronie serwera jest ograniczona
- niektóre ograniczenia hostingu blokują normalne ścieżki integracji

W tym modelu oczekuje się, że klient zapewni lub uzyska więcej własnego kontekstu pozycjonowania. Jest to przydatne w środowiskach ograniczonych lub eksperymentalnych, ale łatwiej jest je źle skonfigurować, ponieważ każdy klient musi zgodzić się z ustawieniami serwera.

Używaj tej opcji tylko wtedy, gdy wiesz, dlaczego pozycjonowanie po stronie serwera nie jest praktyczne w przypadku konfiguracji docelowej.

## Wybór trybu

| Konfiguracja | Zalecany tryb | Powód |
|-------|------------------|--------|
| Serwer dedykowany Bedrock + `McHttp` | `0 = Server` | Dodatek BDS może zgłosić autorytatywny stan świata |
| Lokalny świat Bedrock + `McWss` | Zwykle `0 = Server` | Addon nadal może przesyłać stan przez tunel |
| Java + Geyser/Floodgate + `GeyserVoice` | `0 = Server` | Wtyczka śledzi cykl życia i pozycję gracza |
| Eksperymentalna konfiguracja wyłącznie lokalna | Zależy | Używaj po stronie klienta tylko wtedy, gdy integracja nie może zapewnić stanu |

## Dlaczego niedopasowania psują oczekiwania audio

Jeśli klient i serwer nie zgadzają się co do trybu pozycjonowania, możesz zobaczyć następujące objawy:

- klienci głosowi łączą się, ale nie słyszą oczekiwanej bliskości
- istoty wydają się obecne, ale zachowują się dziwnie
- integracja wydaje się częściowo zdrowa, natomiast logika pozycyjna jest błędna

## Kroki walidacji

1. Sprawdź `VoiceCraftConfig.PositioningType` w `ServerProperties.json`.
2. Sprawdź ustawienia sieciowe klienta.
3. Uruchom ponownie klienta po zmianie wartości lokalnej.
4. Podłącz ponownie transport Minecraft.
5. Przesuń gracza w grze i potwierdź zmiany zachowania serwera/klienta wraz z odległością.

Jeśli konfiguracja nadal się nie powiedzie, następnie debuguj przepływ powiązania. Prawidłowy tryb pozycjonowania nie może pomóc, jeśli sesja głosowa nie jest powiązana z jednostką w grze.
