# API addonu

`VoiceCraft.Addon` exposes a script-driven McApi layer that is much wider than just `vcbind`.

Ta strona jest skierowana do twórców dodatków i świata.

## Powierzchnia API wysokiego poziomu

Interfejs API po stronie dodatku udostępnia:

- cykl życia połączenia
- wysyłanie/odbieranie pakietów
- tworzenie i niszczenie bytów
- aktualizacje identyfikatora świata, pozycji, obrotu, wyciszenia, ogłuszenia i maski bitowej
- aktualizacje efektów
- zdarzenia odbierane audio

## Wydarzenia na wysokim poziomie

Z bieżącej warstwy API:

- `OnConnected`
- `OnDisconnected`
- `OnPlayerBind`
- `OnPlayerUnbind`
- `OnPacket`

VoiceCraft `v1.6.1` expands this event-driven path with broadcasted events used by the addon packages, so world scripts can react to connection, binding, and packet activity without custom polling.

Zdarzenia skryptowe wykorzystywane przez system obejmują:

- `voicecraft:onConnected`
- `voicecraft:onDisconnected`
- `voicecraft:onPlayerBind`
- `voicecraft:onPlayerUnbind`
- `voicecraft:onPacket`
- `voicecraft:sendPacket`

## Zasięg na poziomie pakietu

Aktualne ujawnione zdarzenia pakietowe obejmują kategorie takie jak:

- logowanie / wylogowanie / ping
- zaakceptuj / odrzuć / zresetuj odpowiedzi
- podmiot tworzy / niszczy
- aktualizacje tytułu / opisu / nazwy
- wyciszenie / ogłuszenie / wyciszenie serwera / ogłuszenie serwera
- mów / słuchaj / efektuj maskę bitową
- pozycja / obrót / identyfikator świata
- współczynnik jaskini / współczynnik tłumienia
- aktualizacje efektów
- odebrano dźwięk

To sprawia, że API addonu jest przydatny nie tylko w światach standardowych, ale także w niestandardowych trybach gry.

## Typowe pomysły na dostosowywanie

- automatyczne wiązanie według zespołu, roli lub tagu
- niestandardowy interfejs użytkownika powiązania
- niestandardowe ustawienia efektów dla każdego biomu lub obszaru
- ponowne mapowanie identyfikatorów świata w oparciu o region
- narzędzia do moderacji personelu poprzez formularze interfejsu użytkownika serwera
- skryptowana logika głosu NPC lub fałszywej istoty

## Podstawowy model integracji

Typowa logika dodatków:

1. połącz się z transportem VoiceCraft
2. uwierzytelnić
3. tworzyć lub odkrywać byty
4. wiązać graczy
5. zaktualizuj identyfikator świata / pozycję / rotację po zaznaczeniu lub zdarzeniu
6. reaguj na aktualizacje na poziomie pakietów

## Ważne uwagi dotyczące wdrożenia

- `McWss` mode depends on command tunnel throughput
- przełączniki efektów są kodowane poprzez maski bitowe
- automatyzację na poziomie pakietów należy dokładnie przetestować na prawdziwych kompilacjach Bedrock
- Zachowaj zgodność pakietów dodatków z wersją VoiceCraft, jeśli zależą one od transmitowanych wydarzeń lub ikon głosowych w grze

## Zalecana praktyka

- start from `Basic` if you need a working reference
- switch to `Core.McHttp` or `Core.McWss` when building a custom experience
- na początku utrzymuj niewielką automatyzację świata, a następnie stopniowo rozszerzaj haki pakietów
