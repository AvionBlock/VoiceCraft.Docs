# Uaktualnij element Runbook

Użyj tego podczas aktualizacji VoiceCraft lub powiązanego mostu, takiego jak `GeyserVoice`.

Ten element Runbook przeznaczony jest dla uaktualnień, które mogą mieć wpływ na zgodność między serwerem, klientem, dodatkiem Bedrock i elementami wtyczek po stronie Java. Celem jest utrzymanie ścieżki wycofywania, jednocześnie udowadniając, że cały stos nadal działa.

## Zamówienie aktualizacji

Zalecana kolejność:

1. Utwórz kopię zapasową plików konfiguracyjnych i wtyczek/dodatków.
2. Umieść nowe pliki binarne w oddzielnym katalogu.
3. Pakiety dodatków lub wtyczek dopasowujących się do etapu.
4. Przeczytaj uwagi do wersji dotyczące założeń dotyczących transportu i topologii.
5. Zatrzymaj starą usługę.
6. Przenieś lub skopiuj konfigurację do nowej instalacji.
7. Zaktualizuj dodatek/wtyczkę po stronie Minecraft.
8. Rozpocznij i sprawdź poprawność jednej ścieżki na raz.

W przypadku VoiceCraft `v1.6.1` nie zostawiaj starego dodatku Bedrock na miejscu. Zaktualizuj dodatek wraz z wersją klienta/serwera przed sprawdzeniem przepływu powiązań i wskaźników w grze.

## Dlaczego oddzielne katalogi pomagają

Oddzielny wyodrębniony katalog ułatwia wycofywanie zmian, ponieważ:

- stare pliki binarne są nadal nienaruszone
- Migracja konfiguracji jest jawna
- możesz porównać układy wydań

## Zatwierdź po aktualizacji

Minimalnie:

1. Uruchamia się VoiceCraft.
2. Porty transportowe wiążą.
3. Klient łączy się.
4. Dodatek lub wtyczka uwierzytelnia.
5. Przepływ wiązania działa.
6. Ikony głosowe w grze lub zdarzenia związane z dodatkami pojawiają się wtedy, gdy są oczekiwane.
7. Dźwięk zbliżeniowy działa.
8. Polecenia serwera, takie jak `list --clientsOnly`, pokazują oczekiwanych klientów.

## W przypadku aktualizacji GeyserVoice

Sprawdź także:

- zachowanie automatycznego uruchamiania w czasie wykonywania
- model własności proxy
- przekazywanie migawek backendu
- Wartości `config.voicecraft.transport.*`
- `McTcpConfig.LoginToken` dopasowanie

W przypadku sieci proxy najpierw sprawdź jeden backend, a następnie przełącz serwer.

## W przypadku aktualizacji pakietów dodatków Bedrock

Sprawdź także:

- zarówno zachowanie, jak i pakiety zasobów są aktualizowane
- Uprawnienia BDS nadal obejmują wymagane moduły
- `voicecraft:vcconnect` używa prawidłowego tokenu transportowego
- `voicecraft:vcbind <key>` działa dla prawdziwego gracza
- wskaźniki/zdarzenia w grze odpowiadają oczekiwanemu zachowaniu po wydaniu

## Przykłady wyzwalaczy wycofywania

Rozważ wycofanie, gdy:

- auth nagle kończy się niepowodzeniem na wcześniej działającym tokenie
- transporty nie wiążą się już zgodnie z oczekiwaniami
- Środowisko wykonawcze zarządzane przez wtyczki nigdy nie jest gotowe
- stan głosu serwera proxy między serwerami staje się niespójny
- pasujący pakiet dodatków/wtyczek nie jest dostępny dla nowej wersji serwera/klienta

## Przepływ pracy przywracania

1. Zatrzymaj nową usługę.
2. Przywróć poprzedni katalog binarny.
3. Przywróć poprzednie konfiguracje `ServerProperties.json` i wtyczek/dodatków.
4. Przywróć poprzedni pakiet dodatków/wtyczek po stronie Minecraft.
5. Uruchom starą usługę.
6. Sprawdź poprawność klienta, autoryzację transportu, powiązanie i bliskość.
