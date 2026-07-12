# Model uwierzytelniania i zaufania

VoiceCraft używa współdzielonych tokenów po stronie transportu Minecrafta. Te tokeny decydują, czy dodatek, wtyczka lub most może wysyłać stan Minecrafta do `VoiceCraft.Server`.

Nie są to hasła graczy. Są to tajemnice operacyjne pomiędzy zaufanymi komponentami środowiska wykonawczego.

## Główna zasada

Klient transportu udowadnia, że zna skonfigurowany token współdzielony.

Przykłady:

- Dodatek Bedrock uwierzytelnia się za pomocą `McHttpConfig.LoginToken`
- Świat `McWss` uwierzytelnia się za pomocą `McWssConfig.LoginToken`
- `VoiceCraft.Java` uwierzytelnia się za pomocą `McTcpConfig.LoginToken`

| Transport | Klient | Pole tokenu |
|-----------|----------|-------------|
| `McHttp` | Pakiet dodatków BDS | `McHttpConfig.LoginToken` |
| `McWss` | lokalny dodatek do świata Bedrock | `McWssConfig.LoginToken` |
| `McTcp` | `VoiceCraft.Java` lub most po stronie Java | `McTcpConfig.LoginToken` |

## Granice zaufania

Powinieneś myśleć warstwowo:

- zaufanie klienta gracza
- Zaufanie integracji Minecrafta
- zaufanie środowiska uruchomieniowego backendu

To nie jest to samo.

Klienci gracza łączą się z serwerem głosowym i mogą wysyłać dźwięk do własnej sesji. Integracje z Minecraftem mogą aktualizować stan świata/obiektu. Dostęp do środowiska uruchomieniowego zaplecza może zmienić konfigurację, tokeny, dzienniki i zachowanie procesu. Zachowaj te granice oddzielne podczas przypisywania uprawnień i decydowania o tym, gdzie znajdują się sekrety.

## Jakie tokeny chronią

Chronią granicę transportową pomiędzy VoiceCraft a węzłem integrującym.

Nie zastępują:

- reguły zapory sieciowej
- bezpieczeństwo gospodarza
- higiena uprawnień wtyczek

Jeśli osoba atakująca otrzyma token transportowy i uda mu się dotrzeć do tego punktu końcowego transportu, może uda mu się podszyć pod integrację po stronie Minecrafta. Dlatego rotacja tokenów i osiągalność sieci mają wspólne znaczenie.

## Porada operacyjna

- obracaj żetony, gdy zmienia się topologia
- nie używaj wszędzie tego samego sekretu na zawsze
- przechowuj tokeny, takie jak dane uwierzytelniające operacyjne
- używaj różnych tokenów dla `McHttp`, `McWss` i `McTcp`, chyba że celowo potrzebujesz współdzielonej automatyzacji
- powiąż transporty z `127.0.0.1`, gdy konsument działa na tym samym hoście
- udostępniaj `0.0.0.0` tylko wtedy, gdy musi połączyć się inna maszyna
- trzymaj polecenia wtyczki/administratora ograniczone do zaufanego personelu

## Rotacja przepływu pracy

1. Zatrzymaj lub rozłącz integrację z Minecraftem.
2. Wygeneruj nowy token dla odpowiedniego transportu.
3. Zaktualizuj `config/ServerProperties.json` lub zastąpienie `--server-key` na poziomie procesu.
4. Zaktualizuj konfigurację dodatku/wtyczki lub polecenie połączenia w grze.
5. Uruchom ponownie `VoiceCraft.Server`, jeśli edytowałeś konfigurację JSON.
6. Podłącz ponownie integrację z Minecraftem i sprawdź przepływ powiązania.

## Typowe błędy

- zmiana `McHttpConfig.LoginToken`, gdy dodatek faktycznie używa `McWss`
- zmieniając tylko konfigurację VoiceCraft i zapominając o stronie dodatku/wtyczki
- udostępnianie odbiornika wieloznacznego w Internecie za pomocą ponownie użytego tokena testowego
- udostępnianie tokena produkcyjnego na zrzutach ekranu, dziennikach pomocy technicznej lub publicznych raportach o problemach
