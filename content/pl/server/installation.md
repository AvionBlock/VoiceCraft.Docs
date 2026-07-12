# Instalacja serwera

`VoiceCraft.Server` to samodzielny backend, który akceptuje ruch głosowy klientów i udostępnia transporty po stronie Minecrafta.

Użyj tej strony jako ścieżki konfiguracji serwera. Na koniec powinieneś mieć działający serwer, wygenerowaną konfigurację, wybrany jeden transport Minecraft i przejrzystą następną stronę do integracji z Minecraftem.

## Co faktycznie zawiera serwer

Serwer VoiceCraft udostępnia wiele warstw jednocześnie:

- Serwer głosowy VoiceCraft UDP
- `McHttp` transport dla integracji Bedrock
- `McWss` transport dla przepływów WebSocket/tunelu poleceń Bedrock
- Transport `McTcp` dla mostów po stronie Java, takich jak `VoiceCraft.Java`

Możesz pozostawić wszystkie włączone lub wybrać transporty w czasie wykonywania.

## Przebieg konfiguracji

1. Pobierz i rozpakuj serwer dla swojej platformy.
2. Uruchom go raz z folderu, w którym chcesz zachować konfigurację.
3. Zatrzymaj proces po wygenerowaniu `config/ServerProperties.json`.
4. Zastąp wygenerowane tokeny logowania.
5. Włącz transport Minecraft pasujący do Twojej topologii.
6. Ustaw powiązania hosta i reguły zapory sieciowej.
7. Uruchom serwer ponownie.
8. Dodaj punkt końcowy UDP VoiceCraft do klienta.
9. Połącz stronę Minecraft z pasującym dodatkiem lub przewodnikiem po wtyczkach.

## Gotowe wersje binarne

Strona wydania zazwyczaj zawiera:

- Windows:
  `VoiceCraft.Server.Windows.x64.v1.7.0.zip`, `x86`, `arm64`
- Linux:
  `VoiceCraft.Server.Linux.x64.v1.7.0.zip`, `arm`, `arm64`

Pobierz: [strona pobierania](/download)

## Windows

1. Pobierz `VoiceCraft.Server.Windows.<arch>.v1.7.0.zip`.
2. Wypakuj archiwum do dedykowanego folderu.
3. Uruchom serwer z tego folderu:

```powershell
./VoiceCraft.Server.exe
```

Pierwsze uruchomienie tworzy `config/ServerProperties.json`. Zachowaj ten plik w folderze serwera i nie usuwaj go pomiędzy ponownymi uruchomieniami.

## Linux

1. Pobierz `VoiceCraft.Server.Linux.<arch>.v1.7.0.zip`.
2. Wypakuj archiwum do dedykowanego folderu.
3. Uruchom serwer z tego folderu:

```bash
chmod +x ./VoiceCraft.Server
./VoiceCraft.Server
```

Pierwsze uruchomienie tworzy `config/ServerProperties.json`. Zachowaj ten plik w folderze serwera i upewnij się, że jest uwzględniony w kopiach zapasowych.

## Po pierwszym starcie

Zatrzymaj serwer i otwórz `config/ServerProperties.json` przed połączeniem Minecrafta lub graczy.

Najpierw wykonaj te zmiany:

1. Zastąp każdy wygenerowany token współdzielony:
   - `McHttpConfig.LoginToken`
   - `McWssConfig.LoginToken`
   - `McTcpConfig.LoginToken`
2. Wybierz jeden podstawowy transport Minecraft:
   - Serwer dedykowany Bedrock: włącz `McHttpConfig`
   - lokalny świat Bedrock: włącz `McWssConfig`
   - Java + Geyser/Floodgate: włącz `McTcpConfig`
3. Ustaw hosta transportu:
   - użyj `127.0.0.1`, gdy Minecraft działa na tym samym komputerze
   - używaj `0.0.0.0` lub adresu LAN/publicznego tylko wtedy, gdy musi połączyć się inna maszyna
4. Zachowaj dostępność `VoiceCraftConfig.Port` dla klientów graczy.
5. Uruchom ponownie `VoiceCraft.Server` po zapisaniu konfiguracji.

W przypadku wszystkich pól konfiguracyjnych kontynuuj [pierwsze uruchomienie serwera](/server/first-run) i [ServerProperties.json](/server/server-properties).

## Połącz resztę stosu

Po czystym ponownym uruchomieniu serwera:

1. Zainstaluj klienta VoiceCraft dla każdego gracza ze [strony pobierania](/download).
2. Dodaj wpis serwera w kliencie:
   - host: adres twojego serwera VoiceCraft
   - port: `VoiceCraftConfig.Port`, zwykle `9050`
3. Postępuj zgodnie z przewodnikiem Minecraft dotyczącym wybranego transportu:
   - [McHttp for BDS](/minecraft/mchttp-bds)
   - [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer)
   - [VoiceCraft.Java](/ecosystem/voicecraft-java)

Serwer nie jest uważany za w pełni skonfigurowany, dopóki klient się nie połączy, a strona Minecraft nie uwierzytelni się przy użyciu tego samego tokena transportowego.

## macOS

Nie zawsze istnieje gotowy, dedykowany artefakt, ale serwer można zbudować ze źródła:

```bash
git clone https://gitlab.avion.team/voicecraft/VoiceCraft.git
cd VoiceCraft/VoiceCraft.Server
dotnet restore
dotnet publish -c Release -r osx-arm64 -p:PublishSingleFile=true
```

W przypadku systemu Intel macOS zamień `osx-arm64` na `osx-x64`.

## Docker/kontenery

Obrazy kontenerów znajdują się w głównym repozytorium README:

- [VoiceCraft Docker Hub](https://hub.docker.com/r/sinevector241/voicecraft/tags)

Wdrożenie kontenera jest przydatne, gdy:

- chcesz mieć dedykowaną granicę usług
- uruchomiłeś już węzły BDS/Java w kontenerach
- chcesz łatwiejszych zasad i dzienników ponownego uruchamiania

Po uruchomieniu kontenera utrzymuj i edytuj wygenerowany plik `config/ServerProperties.json` w taki sam sposób, jak w przypadku normalnej instalacji binarnej.

## Zalecany układ instalacji

Przykładowy układ Linux:

```text
/opt/voicecraft/
  VoiceCraft.Server
  config/
    ServerProperties.json
```

Zalecane praktyki:

- przechowuj VoiceCraft w jego własnym katalogu
- utrzymuj się `config/`
- wykonaj kopię zapasową `ServerProperties.json`
- nie mieszaj wielu środowisk w tym samym folderze

## Gotowa lista kontrolna

Zanim udostępnisz graczom konfigurację, potwierdź:

- `VoiceCraft.Server` uruchamia się bez błędów konfiguracji i portu
- wszystkie wygenerowane wartości `LoginToken` zostały zastąpione
- odsłonięty jest tylko niezbędny transport
- Host klienta i port są zgodne z `VoiceCraftConfig.Port`
- Dodatek lub wtyczka Minecraft używa pasującego tokena transportowego
- przepływ powiązania działa w grze

## Uruchom jako usługę systemową (Linux)

Przykład `/etc/systemd/system/voicecraft.service`:

```ini
[Unit]
Description=VoiceCraft Server
After=network.target

[Service]
WorkingDirectory=/opt/voicecraft
ExecStart=/opt/voicecraft/VoiceCraft.Server
Restart=always
RestartSec=3
User=voicecraft
Group=voicecraft

[Install]
WantedBy=multi-user.target
```

Zastosuj to:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now voicecraft
sudo systemctl status voicecraft
```

## Kompiluj ze źródła

Zobacz [repozytorium i budowanie VoiceCraft](/ecosystem/voicecraft-repository), aby uzyskać szczegółowe informacje na temat SDK i projektu.

Minimalny przepływ:

```bash
git clone https://gitlab.avion.team/voicecraft/VoiceCraft.git
cd VoiceCraft
dotnet restore
dotnet build -c Release
dotnet run --project VoiceCraft.Server
```

## Co czytać dalej

- [Pierwsze uruchomienie serwera](/server/first-run)
- [ServerProperties.json](/server/server-properties)
- [Tryby transportu](/server/transports)
- [Instalacja klienta](/client/installation)
- [McHttp for BDS](/minecraft/mchttp-bds)
- [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer)
- [VoiceCraft.Java](/ecosystem/voicecraft-java)
