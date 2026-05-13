# Ustawienia klienta (UI)

Wszystkie zmiany w interfejsie klienta są automatycznie zapisywane w `Settings.json`.

Aby zapoznać się z surowym schematem, przykładami i polami zaawansowanymi, zobacz [Settings.json](/client/settings-json).

Użyj interfejsu użytkownika do normalnej konfiguracji. Edytuj `Settings.json` tylko wtedy, gdy potrzebujesz zbiorczych zmian, automatyzacji lub odzyskiwania po uszkodzonym stanie interfejsu użytkownika.

## Zalecana kolejność konfiguracji

1. Wybierz urządzenia wejściowe i wyjściowe.
2. Uruchom test mikrofonu i dostosuj czułość.
3. Dodaj wpis serwera VoiceCraft.
4. Potwierdź, że `Positioning Type` pasuje do serwera.
5. Ustaw funkcję „Naciśnij i mów”, jeśli społeczność tego wymaga.
6. Dołącz do Minecrafta i zakończ proces wiązania.

## Generał

- `Language`:
  Język/ustawienia regionalne interfejsu użytkownika używane przez klienta.
- `Notification Dismiss`:
  automatyczne ukrywanie opóźnienia dla lokalnych powiadomień w milisekundach.
- `Hide Server Addresses`:
  ukrywa zapisane wpisy adresu IP/hosta w interfejsie użytkownika.
- `Disable Notifications`:
  wyłącza lokalne powiadomienia toastowe.

Użyj `Hide Server Addresses` do zrzutów ekranu lub transmisji publicznych. Nie szyfruje zapisanej listy serwerów na dysku.

## Wygląd

- `Theme`:
  wybrany motyw wizualny.
- `Background Image`:
  wybrany wbudowany obraz tła.

## Wejście

- `Input Devices`:
  urządzenie przechwytujące/źródło mikrofonu.
- `Input Capture Preset`:
  profil przechwytywania używany przez zaplecze platformy, wartość domyślna to `VoiceCommunication`.
- `Input Volume`:
  wzmocnienie mikrofonu w zakresie `0..2`.
- `Microphone Sensitivity`:
  próg aktywności głosu w zakresie `0..1`.
- `Denoisers`:
  dostępna implementacja odszumiacza.
- `Automatic Gain Controllers`:
  Implementacja AGC.
- `Echo Cancelers`:
  implementacja eliminacji echa.
- `Push To Talk`:
  transmituj tylko wtedy, gdy przytrzymany jest skonfigurowany klawisz skrótu.
- `Push To Talk Cue`:
  lokalny sygnał dźwiękowy przy włączaniu/wyłączaniu przycisku PTT.
- `Microphone Test`:
  lokalny monitoring i wizualizacja działań.

Dobry punkt wyjścia:

- trzymaj `Input Volume` w pobliżu `1`
- zwiększaj czułość tylko wtedy, gdy nie zostanie wykryta cicha mowa
- włączyć funkcję „Naciśnij i mów” w hałaśliwych pomieszczeniach
- użyj testu mikrofonu przed zmianą ustawień po stronie serwera

Jeśli inni gracze słyszą ciągły hałas w tle, zmniejsz głośność wejściową, zwiększ próg aktywacji, włącz funkcję „Naciśnij i mów” lub zmień wybrane urządzenie mikrofonowe.

## Wyjście

- `Output Devices`:
  urządzenie odtwarzające.
- `Output Volume`:
  wzmocnienie odtwarzania w zakresie `0..2`.
- `Audio Clippers`:
  Implementacja obcinacza wyjściowego/limitera.
- `Test Output`:
  wyślij lokalny sygnał testowy do wybranego urządzenia.

Jeśli słyszysz sygnał testowy, ale nie słychać innych graczy, prawdopodobnie urządzenie odtwarzające działa prawidłowo. Następnie sprawdź połączenie z serwerem, przepływ powiązań i aktualizacje pozycji.

## Sieć

- `Positioning Type`:
  musi pasować do `VoiceCraftConfig.PositioningType` na serwerze.
- `McWss Listen Ip`:
  adres lokalny używany przez most po stronie McWss.
- `McWss Host Port`:
  lokalny port McWss używany do łącza internetowego Bedrock.

`Positioning Type` to najważniejsze ustawienie zgodności klient/serwer. W normalnych wdrożeniach BDS i GeyserVoice użyj tego samego trybu po stronie serwera skonfigurowanego w `ServerProperties.json`.

`McWss Listen Ip` i `McWss Host Port` mają znaczenie tylko w przypadku lokalnych konfiguracji Bedrock w stylu McWss. Nie zastępują one wpisu serwera VoiceCraft używanego dla ruchu głosowego UDP.

## Klawisze skrótu

Domyślnie VoiceCraft udostępnia powiązania dla:

- `Mute`
- `Deafen`

Domyślne powiązania pulpitu to zazwyczaj:

- `Mute`: `LeftControl + LeftShift + M`
- `Deafen`: `LeftControl + LeftShift + D`

Dokładne wartości klawiszy skrótu są przechowywane w `HotKeySettings.Bindings`.

Jeśli klawisze skrótu nie uruchamiają się, sprawdź, czy nie występują konflikty na poziomie systemu operacyjnego oraz czy okno klienta lub środowisko pulpitu umożliwia globalne przechwytywanie skrótów klawiszowych.

## Kontrola poszczególnych użytkowników

VoiceCraft przechowuje także lokalne preferencje użytkownika:

- mnożnik wolumenu na użytkownika
- Stan wyciszenia lokalnego dla każdego użytkownika

Są one przechowywane w `UserSettings.Users` i stosowane po stronie klienta.

Użyj lokalnego wyciszenia lub głośności dla każdego użytkownika, gdy tylko jeden gracz jest dla Ciebie zbyt głośny lub rozprasza. Używaj poleceń wyciszania/głuszenia serwera, gdy pracownicy muszą wymusić moderację dla wszystkich.

## Zaawansowane

- `Trigger GC`:
  ręczny wyzwalacz zbierania śmieci.
- `Crash`:
  zamierzona ścieżka awarii do celów diagnostyki/weryfikacji rejestrowania.

Zaawansowane elementy sterujące służą do diagnostyki. Nie używaj `Crash` podczas normalnej gry, chyba że celowo sprawdzasz raportowanie o awariach lub zbieranie dzienników.

## Co sprawdzić, gdy dźwięk wydaje się nieprawidłowy

1. Urządzenia wejściowe i wyjściowe klienta.
2. Stan „Naciśnij i mów”.
3. Połączenie z serwerem VoiceCraft.
4. `Positioning Type`.
5. Przepływ wiązania Minecrafta.
6. Aktualizacje odległości gracza i identyfikatora świata.

![Network Settings](/images/voicecraft/settings-network.png)
