# Aktualizacja i kopia zapasowa

Użyj tej strony do rutynowych aktualizacji tam, gdzie oczekujesz, że topologia pozostanie taka sama. W przypadku większych skoków wersji lub zmian topologii użyj [Upgrade Runbook](/operations/upgrade-runbook).

## Co wykonać kopię zapasową przed aktualizacją

- `config/ServerProperties.json`
- niestandardowe opakowanie skryptów/systemd lub menedżera usług
- historię logowania, jeśli to konieczne
- VoiceCraft.Java `config.yml`, jeśli używana jest integracja po stronie Java
- Konfiguracja pakietu Bedrock World Pack, jeśli używany jest dodatek
- uwagi dotyczące nazw hostów publicznych/LAN i otwartych portów

Kopie zapasowe zawierają tokeny i szczegóły topologii. Przechowuj je jako poufne pliki operacyjne.

## Bezpieczna aktualizacja serwera

1. Zatrzymaj serwer (`stop` lub za pośrednictwem menedżera usług).
2. Utwórz kopię zapasową `config/`.
3. Wyodrębnij nową wersję do osobnego katalogu.
4. Przenieś swój `ServerProperties.json`.
5. Uruchom i sprawdź dzienniki uruchamiania.
6. Potwierdź pomyślnie wybrane powiązanie transportowe.
7. Połącz jednego klienta i jedną integrację po stronie Minecrafta przed otwarciem dla wszystkich graczy.

## Uwaga dotycząca VoiceCraft 1.6.1

VoiceCraft `v1.6.1` wymaga aktualizacji pakietów dodatków Bedrock w tym samym czasie, co pliki binarne klient/serwer. To wydanie naprawia obsługę rozłączeń McHttp/McWss i wprowadza zmiany po stronie dodatków dotyczące ikon głosowych w grze, jakości życia automatycznego połączenia i transmitowanych wydarzeń.

## Bezpieczna aktualizacja klienta

Ustawienia klienta (`Settings.json`) są przechowywane w `ApplicationData/voicecraft`, więc zazwyczaj przetrwają aktualizacje binarne.

Nadal poproś małą grupę testową o weryfikację:

- wybór mikrofonu
- urządzenie wyjściowe
- zapisany wpis serwera
- zachowanie typu „naciśnij i mów”.
- `Positioning Type`

## Kompatybilność

- Wersje klienta i serwera `Major/Minor` powinny być zgodne.
- Wersje poprawek mogą się różnić.
- Pakiety dodatków Bedrock powinny odpowiadać wydaniu serwera/klienta, jeśli uwagi do wydania wspominają o zachowaniu po stronie dodatku.
- W przypadku korzystania z mostów po stronie Java należy zaktualizować usługę VoiceCraft.Java, dostosowując ją do oczekiwań konfiguracyjnych.

Jeśli po aktualizacji pojawią się problemy, zacznij od [Troubleshooting](/operations/troubleshooting).

## Przygotowanie do wycofania

Przed wymianą plików zachowaj:

- poprzedni katalog binarny serwera
- poprzedni pakiet dodatków/wtyczek
- poprzednia kopia zapasowa konfiguracji
- ostatni znany dobry token i notatki dotyczące portu

Przywracanie zmian jest znacznie łatwiejsze, gdy stary katalog nadal istnieje, a aktualizacja nie nadpisała go na miejscu.
