# Przepisy integracyjne

Są to praktyczne wzorce wdrażania dla najpopularniejszych scenariuszy VoiceCraft.

Użyj tej strony, jeśli rozumiesz podstawowe komponenty i potrzebujesz konkretnego przepisu na topologię. Każdy scenariusz zawiera listę stosu, główny powód jego wyboru, konfigurację, która ma największe znaczenie oraz punkt weryfikacji, który potwierdza, że działa.

## Scenariusz A: Serwer dedykowany Bedrock

Stos:

- `VoiceCraft.Server`
- `VoiceCraft.Addon.Core.McHttp`
- Klienci VoiceCraft

Wybierz tę opcję, gdy:

- BDS jest głównym serwerem gry
- BDS może połączyć się z punktem końcowym HTTP VoiceCraft
- chcesz najbardziej stabilnej ścieżki produkcji Bedrock

Zalecana konfiguracja:

- `McHttpConfig.Enabled = true`
- `McWssConfig.Enabled = false`
- `McTcpConfig.Enabled = false`, chyba że jest to również potrzebne

Przepływ:

1. wdrożyć `VoiceCraft.Server`
2. bezpieczny `McHttpConfig.LoginToken`
3. upewnij się, że BDS może dotrzeć do `McHttpConfig.Hostname`
4. zainstaluj `Core.McHttp`
5. uruchom `voicecraft:vcconnect <hostname> <token>`
6. zatwierdź `voicecraft:vcbind <key>`
7. połącz klienta i potwierdź zmiany bliskości ruchem

## Scenariusz B: Świat Bedrock lokalny / dla jednego gracza

Stos:

- lokalny stos VoiceCraft
- `VoiceCraft.Addon.Core.McWss`

Wybierz tę opcję, gdy:

- testujesz lokalnie
- nie uruchamiasz BDS
- dostępny jest przepływ protokołu internetowego `/connect`

Przepływ:

1. włącz `McWss`
2. zachowaj `DataTunnelCommand = voicecraft:data_tunnel`
3. zainstaluj `Core.McWss`
4. użyj `/connect`
5. uruchom `voicecraft:vcconnect <token>`
6. zatwierdź wiązanie i ruch

## Scenariusz C: Direct Paper ze środowiskiem wykonawczym zarządzanym przez VoiceCraft.Java

Stos:

- Paper/Folia
- `VoiceCraft.Java`
- środowisko wykonawcze VoiceCraft zarządzane przez wtyczki

Wybierz tę opcję, gdy:

- jeden serwer Paper/Folia powinien posiadać integrację głosową
- chcesz mniej usług zewnętrznych
- VoiceCraft.Java powinien pobrać i uruchomić VoiceCraft

Przepływ:

1. zainstaluj `VoiceCraft.Java`
2. zestaw `config.proxy.enabled = false`
3. skonfiguruj `config.voicecraft.transport.login-token`
4. włącz `config.voicecraft.auto-start`
5. załaduj ponownie i sprawdź przepływ wiązania

Jest to najprostsza konfiguracja po stronie Java, jeśli chcesz, aby wtyczka uruchamiała VoiceCraft pod maską.

## Scenariusz D: Direct Paper z zewnętrznym modułem VoiceCraft

Stos:

- Paper/Folia
- `VoiceCraft.Java`
- zarządzane zewnętrznie `VoiceCraft.Server`

Wybierz tę opcję, gdy:

- uruchomiłeś już VoiceCraft z systemd, Dockerem lub panelem
- kilka komponentów może wymagać tego samego backendu
- chcesz dzienniki zewnętrzne i zrestartuj politykę

Przepływ:

1. włącz `McTcp` w VoiceCraft
2. ustaw `config.voicecraft.transport.host`, `config.voicecraft.transport.port` i `config.voicecraft.transport.login-token` w VoiceCraft.Java
3. wyłącz zarządzanie czasem wykonawczym wtyczki, jeśli nie jest potrzebne
4. załaduj ponownie i sprawdź połączenie

## Scenariusz E: Sieć Velocity lub Bungee

Stos:

- `VoiceCraft.Java` na serwerze proxy
- `VoiceCraft.Java` na serwerach Paper
- `VoiceCraft.Server` z `McTcp`

Wybierz tę opcję, gdy:

- Velocity lub BungeeCord kieruje graczy pomiędzy serwerami zaplecza
- serwer proxy powinien być właścicielem połączenia VoiceCraft
- serwery zaplecza powinny wysyłać tylko migawki

Przepływ:

1. skonfiguruj serwer proxy jako właściciela VoiceCraft
2. skonfiguruj węzły Paper zaplecza w trybie proxy
3. przeładuj wtyczkę na wszystkich węzłach
4. zweryfikować ruch graczy między serwerami

## Minimalny fragment konfiguracji produkcyjnej

```json
{
  "VoiceCraftConfig": {
    "Port": 9050,
    "MaxClients": 250,
    "PositioningType": 0
  },
  "McHttpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-strong-token",
    "Hostname": "http://0.0.0.0:9050/",
    "MaxClients": 10
  },
  "McTcpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-strong-token",
    "Hostname": "0.0.0.0",
    "Port": 9052,
    "MaxClients": 10
  },
  "McWssConfig": {
    "Enabled": false,
    "LoginToken": "replace-with-strong-token",
    "Hostname": "ws://0.0.0.0:9051/",
    "DataTunnelCommand": "voicecraft:data_tunnel"
  }
}
```

Ten fragment przedstawia mieszane wdrożenie HTTP + TCP. Nie wiąż `McHttp` i `McTcp` z tym samym portem TCP. Port klienta UDP VoiceCraft może współdzielić numer `9050`, ponieważ jest to UDP, ale odbiorniki HTTP i surowego TCP wymagają odrębnych powiązań TCP.

## Kolejność rozwiązywania problemów

1. sprawdź dopasowanie tokena
2. sprawdź dostępność hosta/portu
3. sprawdź, czy wybrany transport jest włączony
4. sprawdź, czy topologia dodatku lub wtyczki pasuje do konfiguracji
5. dopiero wtedy zbadaj problemy na poziomie pakietu

## Co oznacza „praca”.

Przepis jest kompletny tylko wtedy, gdy wszystkie poniższe warunki są spełnione:

- `VoiceCraft.Server` rozpoczyna się bez błędów odbiornika
- łączy się co najmniej jeden klient VoiceCraft
- uwierzytelnia się transport po stronie Minecrafta
- przepływ wiązania został zakończony
- poruszanie się w grze zmienia zachowanie w pobliżu
- personel może zidentyfikować podłączonych klientów/podmioty w celu rozwiązywania problemów
