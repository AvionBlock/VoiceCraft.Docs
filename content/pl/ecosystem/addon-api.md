# API dodatku

`VoiceCraft.Addon` udostępnia opartą na skryptach warstwę McApi, która jest znacznie szersza niż tylko `vcbind`.

Ta strona jest skierowana do twórców dodatków i świata.

Użyj interfejsu API, gdy standardowe zachowanie dodatków nie wystarczy: niestandardowe reguły powiązania, niestandardowe efekty, zachowanie głosu specyficzne dla regionu, fałszywe byty skryptowe, narzędzia personelu lub logika widoczności specyficzna dla trybu gry.

Zacznij od standardowego pakietu `Basic`. Gdy transport, wiązanie i bliskość zadziałają, stopniowo dodawaj niestandardową logikę pakietów/zdarzeń.

## Powierzchnia API wysokiego poziomu

Interfejs API po stronie dodatku udostępnia:

- cykl życia połączenia
- wysyłanie/odbieranie pakietów
- tworzenie i niszczenie bytów
- Aktualizacje identyfikatora świata, pozycji, obrotu, wyciszenia, wygłuszenia i maski bitowej
- aktualizacje efektów
- zdarzenia odbierane dźwiękiem

Interfejs API istnieje, aby świat mógł decydować, jakie znaczenie ma głos w rozgrywce. VoiceCraft zapewnia model transportu i stanu; Twoja logika dodatku może decydować o sposobie mapowania tagów, ról, regionów, wymiarów lub jednostek skryptowych na ten model.

## Wydarzenia na wysokim poziomie

Z bieżącej warstwy API:

- `OnConnected`
- `OnDisconnected`
- `OnPlayerBind`
- `OnPlayerUnbind`
- `OnPacket`

VoiceCraft `v1.6.1` rozszerza tę sterowaną zdarzeniami ścieżkę o emitowane zdarzenia używane przez pakiety dodatków, dzięki czemu skrypty światowe mogą reagować na połączenia, powiązania i aktywność pakietów bez niestandardowego odpytywania.

Zdarzenia skryptowe wykorzystywane przez system obejmują:

- `voicecraft:onConnected`
- `voicecraft:onDisconnected`
- `voicecraft:onPlayerBind`
- `voicecraft:onPlayerUnbind`
- `voicecraft:onPacket`
- `voicecraft:sendPacket`

## Zasięg na poziomie pakietu

Aktualne ujawnione zdarzenia pakietowe obejmują kategorie takie jak:

- zaloguj się / wyloguj / pinguj
- akceptuj / odrzucaj / resetuj odpowiedzi
- tworzenie/usuwanie podmiotu
- aktualizacje tytułu / opisu / nazwy
- wyciszenie / ogłuszenie / wyciszenie serwera / ogłuszenie serwera
- rozmawiaj/słuchaj/efektuj maskę bitową
- pozycja / rotacja / identyfikator świata
- współczynnik jaskini/czynnik tłumienia
- aktualizacje efektów
- odebrany dźwięk

To sprawia, że interfejs API dodatków jest przydatny nie tylko w światach standardowych, ale także w niestandardowych trybach gry.

Haki na poziomie pakietów są potężne, ale łatwo je też nadużywać. Preferuj zdarzenia cyklu życia wysokiego poziomu w celu normalnego dostosowywania i przechwytywania pakietów tylko wtedy, gdy potrzebujesz kontroli na niskim poziomie.

## Typowe pomysły na dostosowywanie

- automatyczne wiązanie według zespołu, roli lub tagu
- niestandardowy interfejs użytkownika powiązania
- niestandardowe ustawienia efektów dla każdego biomu lub obszaru
- Ponowne mapowanie identyfikatorów świata w oparciu o region
- narzędzia do moderacji personelu za pośrednictwem formularzy interfejsu użytkownika serwera
- skryptowana logika głosu NPC lub fałszywej istoty

## Podstawowy model integracji

Typowa logika dodatków:

1. połącz się z transportem VoiceCraft
2. uwierzytelnić
3. tworzyć lub odkrywać byty
4. wiązać graczy
5. zaktualizuj identyfikator świata / pozycję / rotację po zaznaczeniu lub zdarzeniu
6. reagować na aktualizacje na poziomie pakietów

W przypadku BDS oznacza to zwykle `Core.McHttp`. W przypadku światów lokalnych oznacza to zwykle `Core.McWss`.

## Ważne uwagi dotyczące wdrożenia

- Tryb `McWss` zależy od przepustowości tunelu poleceń
- przełączniki efektów są kodowane poprzez maski bitowe
- automatyzację na poziomie pakietów należy dokładnie przetestować na prawdziwych kompilacjach Bedrock
- utrzymuj pakiety dodatków zgodne z wersją VoiceCraft, jeśli zależą one od transmitowanych wydarzeń lub ikon głosowych w grze
- unikaj wysyłania niepotrzebnych aktualizacji o wysokiej częstotliwości; aktualizacje pozycji są przydatne, ale hałaśliwe niestandardowe pętle pakietów mogą powodować niestabilność
- traktuj tokeny logowania do transportu jako dane uwierzytelniające serwera, a nie wartości widoczne dla gracza

## Zalecana praktyka

- zacznij od `Basic`, jeśli potrzebujesz działającego odniesienia
- podczas tworzenia niestandardowego środowiska przełącz się na `Core.McHttp` lub `Core.McWss`
- na początku utrzymuj niewielką automatyzację świata, a następnie stopniowo rozszerzaj haki pakietów
- sprawdzaj każdą niestandardową funkcję z co najmniej dwoma graczami, aby ćwiczyć bliskość i zachowanie wiązania

## Debugowanie logiki niestandardowej

1. Potwierdź, że dodatek podstawowy może się połączyć i powiązać.
2. Dodaj jedno niestandardowe zdarzenie lub hak pakietu.
3. Sprawdź, czy serwer VoiceCraft nadal widzi aktualizacje jednostek.
4. Przetestuj ruch między światami/wymiarami, jeśli Twoja logika zmienia identyfikatory światów.
5. Wyłącz kod niestandardowy przed obwinianiem ustawień transportu lub dźwięku.
