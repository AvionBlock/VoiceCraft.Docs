# Wzmocnienie bezpieczeństwa

Ta strona dotyczy ograniczania ryzyka operacyjnego w rzeczywistych wdrożeniach.

## 1. Obróć każdy wygenerowany token

Nigdy nie przechowuj domyślnie wygenerowanych wartości dla:

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

Traktuj je jako wspólne tajemnice.

## 2. Odsłoń tylko wymagane transporty

Nie publikuj każdego transportu tylko dlatego, że istnieje.

Przykłady:

- Host wyłącznie Bedrock:
  usually only `McHttp`
- Host mostu Java:
  usually only `McTcp`
- lokalny host testowy:
  often only loopback `McWss`

## 3. Jeśli to możliwe, używaj pętli zwrotnej

Preferuj:

- `127.0.0.1`
- `localhost`

gdy konsument korzysta z tej samej maszyny.

Use `0.0.0.0` only when remote access is actually required.

## 4. Ścisłe zasady zapory sieciowej

Zezwalaj tylko na to, czego potrzebujesz:

- Port UDP VoiceCrafta
- określony port transportowy HTTP lub TCP
- opcjonalny port websocket

Nie otwieraj szeroko portów transportowych, jeśli węzeł integrujący jest znany i ustalony.

## 5. Oddzielne środowiska

Użyj innego:

- tokeny
- pliki konfiguracyjne
- katalogi
- porty

do produkcji, testowania i testów lokalnych.

## 6. Zachowaj ostrożność w przypadku środowisk wykonawczych zarządzanych przez wtyczki

If `GeyserVoice` manages the VoiceCraft runtime:

- kontroluj katalog instalacyjny
- zrozumieć, kto jest właścicielem zachowania związanego z ponownym uruchomieniem
- potwierdź, że logi są gromadzone w przewidywalnym miejscu

## 7. Avoid casual use of `DisabledPacketTypes`

Nie jest to normalna cecha hartowania.

Jest to przede wszystkim dla:

- debugowanie
- tymczasowe łagodzenie
- eksperymentowanie z protokołem

Ślepe wyłączenie typów pakietów może spowodować uszkodzenie uwierzytelniania, synchronizacji lub dźwięku.

## 8. Ogranicz polecenia operacyjne

For `GeyserVoice`, keep these staff-only:

- `/voice connect`
- `/voice reconnect`
- `/voice disconnect`
- `/voice reload`

## 9. Chroń zawartość kopii zapasowej

Kopie zapasowe mogą zawierać:

- tokeny transportu
- Topologia hosta i portu
- szczegóły układu usług

Traktuj kopie zapasowe konfiguracji jako wrażliwe dane operacyjne.
