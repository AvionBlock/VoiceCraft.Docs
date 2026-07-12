# Rozwiązywanie problemów

Zacznij od zidentyfikowania, która część stosu nie działa. VoiceCraft ma oddzielne ścieżki transportu klienta, serwera i Minecrafta, więc jedna część może działać, podczas gdy inna jest nadal zepsuta.

Zalecana kolejność:

1. Upewnij się, że `VoiceCraft.Server` zaczyna się czysto.
2. Upewnij się, że klient VoiceCraft może połączyć się z punktem końcowym UDP.
3. Potwierdź uwierzytelnienie transportu po stronie Minecraft.
4. Potwierdź zakończenie przepływu wiązania.
5. Potwierdź, że aktualizacje pozycji/świata zmieniają zachowanie w pobliżu.
6. Dopiero potem dostrój mikrofon, głośność, efekty lub niestandardową logikę dodatków.

## Serwer nie uruchamia się

Sprawdź:

1. `config/ServerProperties.json` jest prawidłowym kodem JSON.
2. Żaden inny proces nie korzysta już ze skonfigurowanych portów.
3. `McHttpConfig.Hostname` używa `http://.../`.
4. `McWssConfig.Hostname` używa `ws://.../`.
5. `McTcpConfig.Hostname` to zwykły host, a nie identyfikator URI.
6. zastąpienia środowiska wykonawczego nie zastępują oczekiwanych wartości konfiguracyjnych.

Jeśli serwerem zarządza systemd, Docker, panel lub autostart VoiceCraft.Java, sprawdź argumenty startowe oraz plik JSON.

## Klient nie może się połączyć

Sprawdź:

- adres serwera w kliencie wskazuje na `VoiceCraftConfig.Port`
- proces serwera jest uruchomiony
- Ruch UDP jest dozwolony przez zaporę sieciową/NAT
- adres publiczny jest poprawny z sieci gracza
- `MaxClients` nie jest wyczerpany

`PositioningType` zwykle nie blokuje nieprzetworzonego połączenia, ale niedopasowanie może sprawić, że zachowanie bliskości będzie wyglądało na uszkodzone po nawiązaniu połączenia przez klienta.

## Transport Minecrafta nie może się połączyć

Sprawdź:

- transport, z którego korzystasz jest włączony
- dodatek/wtyczka używa pasującego tokena
- punkt końcowy jest osiągalny ze środowiska wykonawczego Minecrafta
- powiązanie hosta jest poprawne w przypadku wdrożenia lokalnego i zdalnego
- rodzaj transportu pasuje do integracji

Przykłady:

- Dodatek BDS używa `McHttpConfig.LoginToken`
- lokalny świat Bedrock używa `McWssConfig.LoginToken`
- VoiceCraft.Java używa `McTcpConfig.LoginToken`

## McHttp nie działa

- Sprawdź `McHttpConfig.Enabled = true`.
- Sprawdź `McHttpConfig.Hostname`.
- Sprawdź token używany w `/voicecraft:vcconnect`.
- Upewnij się, że dodatki/pakiety zasobów są dołączone do świata.
- Upewnij się, że uprawnienia modułu BDS umożliwiają wymaganą funkcjonalność skryptu/sieci.
- Jeśli BDS jest zdalny, nie używaj `127.0.0.1`, chyba że VoiceCraft znajduje się na tym samym hoście.

## McWss nie działa

- Sprawdź `McWssConfig.Enabled = true`.
- Uruchom `/connect <host:port>` przed `/voicecraft:vcconnect`.
- Użyj `McWssConfig.LoginToken`.
- Potwierdź, że `DataTunnelCommand` pasuje do pakietu dodatków.
- Zmniejsz `CommandsPerTick`, jeśli tunel poleceń jest niestabilny.

## VoiceCraft.Java nie działa

- Sprawdź `McTcpConfig.Enabled = true`.
- Sprawdź `config.voicecraft.transport.host`.
- Sprawdź `config.voicecraft.transport.port`.
- Sprawdź `config.voicecraft.transport.login-token`.
- Potwierdź, że tryb Direct Paper vs proxy jest zamierzony.
- Jeśli włączono opcję `auto-start`, potwierdź, że zarządzane środowisko wykonawcze jest gotowe przed upływem limitu czasu.

## Brak dźwięku

Najpierw sprawdź stan klienta lokalnego:

- wybrane urządzenie wejściowe
- wybrane urządzenie wyjściowe
- stan wyciszenia/ogłuszenia
- stan „Naciśnij i mów”.
- głośność wejściowa/wyjściowa
- czułość mikrofonu
- test mikrofonu i test wyjścia

Następnie sprawdź stan serwera/Minecraft:

- klient pojawia się w `list --clientsOnly`
- Zakończono przepływ wiązania
- podmiot ma identyfikator światowy i zmienia pozycję
- `PositioningType` pasuje do klienta i serwera
- serwer nie wyciszył/ogłuszył jednostki

## Przydatna diagnostyka

- Na serwerze uruchom `list --clientsOnly`, aby zweryfikować podłączonych klientów.
- Uruchom `list` przed i po ruchu w grze, aby sprawdzić, czy pozycja istoty się zmienia.
- Tymczasowo wyłącz niestandardowe zaczepy pakietów dodatków.
- Podłącz ponownie transport Minecraft po zmianie tokena lub hosta.
- Porównaj bieżącą konfigurację z ostatnią znaną dobrą kopią zapasową.

Informacje na temat kontroli na podstawie objawów można znaleźć w [Troubleshooting Matrix](/operations/troubleshooting-matrix).
