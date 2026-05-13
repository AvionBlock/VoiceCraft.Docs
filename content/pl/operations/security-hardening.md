# Wzmocnienie zabezpieczeń

Ta strona dotyczy ograniczania ryzyka operacyjnego w rzeczywistych wdrożeniach.

Bezpieczeństwo VoiceCraft polega głównie na ograniczaniu tego, kto może dotrzeć do punktów końcowych transportu, ochronie współdzielonych tokenów i utrzymywaniu kontroli operacyjnej przeznaczonej wyłącznie dla personelu z dala od zwykłych graczy.

## 1. Obróć każdy wygenerowany token

Nigdy nie przechowuj domyślnie wygenerowanych wartości dla:

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

Traktuj je jako wspólne tajemnice.

Używaj tokena tylko z pasującą integracją:

- `McHttpConfig.LoginToken` dla BDS `McHttp`
- `McWssConfig.LoginToken` dla lokalnego Bedrock `McWss`
- `McTcpConfig.LoginToken` dla mostu GeyserVoice/Java

## 2. Odsłoń tylko wymagane transporty

Nie publikuj każdego transportu tylko dlatego, że istnieje.

Przykłady:

- Host wyłącznie Bedrock:
  zwykle tylko `McHttp`
- Host mostu Java:
  zwykle tylko `McTcp`
- lokalny host testowy:
  często tylko pętla zwrotna `McWss`

## 3. Jeśli to możliwe, używaj pętli zwrotnej

Preferuj:

- `127.0.0.1`
- `localhost`

gdy konsument korzysta z tej samej maszyny.

Używaj `0.0.0.0` tylko wtedy, gdy rzeczywiście wymagany jest zdalny dostęp.

## 4. Ścisła polityka zapory ogniowej

Zezwalaj tylko na to, czego potrzebujesz:

- Port UDP VoiceCrafta
- określony port transportowy HTTP lub TCP
- opcjonalny port websocket

Nie otwieraj szeroko portów transportowych, jeśli węzeł integrujący jest znany i ustalony.

Pamiętaj, że punkt końcowy UDP klienta i punkty końcowe transportu Minecraft obsługują różnych użytkowników. Gracze potrzebują punktu końcowego UDP dla głosu. Dodatek/wtyczka wymaga wybranego punktu końcowego transportu Minecraft.

## 5. Oddzielne środowiska

Użyj innego:

- żetony
- pliki konfiguracyjne
- katalogi
- porty

do produkcji, testowania i testów lokalnych.

## 6. Zachowaj ostrożność w przypadku środowisk wykonawczych zarządzanych przez wtyczki

Jeśli `GeyserVoice` zarządza środowiskiem wykonawczym VoiceCraft:

- kontroluj katalog instalacyjny
- zrozumieć, kto jest właścicielem zachowania związanego z ponownym uruchomieniem
- potwierdź, że dzienniki są gromadzone w przewidywalnym miejscu
- upewnij się, że wygenerowane pliki wykonawcze nie mogą być zapisywane przez niezaufanych użytkowników
- dowiedz się, czy w procesie ponownego uruchamiania oczekuje się `shutdown-on-disable`

## 7. Unikaj przypadkowego używania `DisabledPacketTypes`

Nie jest to normalna cecha hartowania.

Jest to przede wszystkim dla:

- debugowanie
- tymczasowe złagodzenie
- eksperymentowanie z protokołem

Ślepe wyłączenie typów pakietów może spowodować uszkodzenie uwierzytelniania, synchronizacji lub dźwięku.

## 8. Ogranicz polecenia operacyjne

W przypadku `GeyserVoice` zachowaj te informacje tylko dla personelu:

- `/voice connect`
- `/voice reconnect`
- `/voice disconnect`
- `/voice reload`

W przypadku konsoli serwera VoiceCraft ogranicz dostęp tylko do zaufanych operatorów. Polecenia takie jak `kick`, `mute`, `deafen` i edycja metadanych mogą mieć wpływ na aktywnych graczy.

## 9. Chroń zawartość kopii zapasowej

Kopie zapasowe mogą zawierać:

- żetony transportu
- Topologia hosta i portu
- szczegóły układu usługi

Traktuj kopie zapasowe konfiguracji jako wrażliwe dane operacyjne.

## 10. Przejrzyj artefakty wsparcia publicznego

Przed publicznym opublikowaniem zrzutów ekranu, dzienników lub konfiguracji usuń:

- żetony logowania do transportu
- publicznych adresów IP, jeżeli nie powinny one zostać ujawnione
- tajemnice opakowania usług
- wygenerowane klucze powiązania, jeśli są nadal aktywne
- identyfikatory graczy, jeśli prywatność ma znaczenie

## Lista kontrolna hartowania

- wygenerowane tokeny zostały zastąpione
- włączone tylko wymagane transporty
- pętla zwrotna używana w przypadku konsumentów korzystających z tego samego hosta
- reguły zapory sieciowej ograniczone do znanych źródeł, jeśli to możliwe
- Polecenia operacyjne GeyserVoice są ograniczone
- kopie zapasowe są bezpiecznie przechowywane
- Wersje wydania i dodatków/wtyczek są wyrównane
