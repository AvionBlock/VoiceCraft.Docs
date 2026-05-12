# Przepływ pakietów i zdarzeń

Ta strona wyjaśnia przepływ koncepcyjny, zamiast wymieniać każdy typ pakietu.

## Przepływ na wysokim poziomie

1. Konsument transportu uwierzytelnia się za pomocą VoiceCraft
2. byty są tworzone lub odkrywane
3. Aktualizacje metadanych wpływają do modelu świata VoiceCraft
4. Stan związany z dźwiękiem jest zsynchronizowany
5. Klienci renderują powstałe zachowanie głosowe

## Typowe kategorie wydarzeń

- logowanie / wylogowanie
- ping/informacja
- podmiot tworzy / niszczy
- aktualizacje metadanych
- aktualizacje moderacji
- aktualizacje efektów
- zdarzenia przesyłania dźwięku

## Dlaczego to ma znaczenie

Podczas debugowania warto dowiedzieć się, czy Twoim problemem jest:

- warstwa autoryzacji
- warstwa encji
- synchronizacja metadanych
- tor audio

Większość prawdziwych niepowodzeń ma miejsce, gdy jedna z tych warstw jest uszkodzona, podczas gdy inne nadal wyglądają zdrowo.
