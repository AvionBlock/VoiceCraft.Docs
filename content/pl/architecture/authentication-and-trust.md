# Model uwierzytelniania i zaufania

VoiceCraft używa współdzielonych tokenów po stronie transportu Minecrafta.

## Główna zasada

Konsument transportu udowadnia, że zna skonfigurowany token współdzielony.

Przykłady:

- Bedrock addon authenticates with `McHttpConfig.LoginToken`
- `McWss` world authenticates with `McWssConfig.LoginToken`
- `GeyserVoice` authenticates with `McTcpConfig.LoginToken`

## Granice zaufania

Powinieneś myśleć warstwowo:

- zaufanie klienta gracza
- Zaufanie integracji Minecrafta
- zaufanie środowiska wykonawczego backendu

To nie jest to samo.

## Jakie tokeny chronią

Chronią granicę transportową pomiędzy VoiceCraft a węzłem integrującym.

Nie zastępują:

- reguły zapory sieciowej
- bezpieczeństwo gospodarza
- higiena uprawnień wtyczek

## Porady operacyjne

- obracaj tokeny, gdy zmienia się topologia
- nie używaj wszędzie tego samego sekretu na zawsze
- przechowuj tokeny, takie jak dane uwierzytelniające operacyjne
