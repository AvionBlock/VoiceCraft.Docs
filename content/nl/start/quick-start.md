# Snel beginnen

Deze handleiding is de snelste manier om een werkende VoiceCraft-stack te krijgen.

De handleiding loopt bewust het hele pad door: server, gegenereerde configuratie, client, Minecraft-transport en validatie. Stop niet nadat het binaire bestand van de server is gestart; op dat moment bestaat de voice-backend, maar Minecraft heeft nog geen verbinding gemaakt.

## Kies eerst uw topologie

VoiceCraft kan op verschillende manieren worden ingezet:

- Bedrock Dedicated Server: `VoiceCraft.Server` + `VoiceCraft.Addon.Core.McHttp`
- Lokale Bedrock-wereld / singleplayer: `VoiceCraft.Server` of lokale runtime + `Core.McWss`
- Java-server met Geyser/Floodgate: `GeyserVoice` + `VoiceCraft.Server`
- Direct Paper-server: `GeyserVoice` kan ook de VoiceCraft-runtime op de achtergrond downloaden en uitvoeren

Als u het niet zeker weet, begin dan met een van deze:

- Bedrock dedicated server: lees [McHttp for BDS](/minecraft/mchttp-bds)
- Java + Geyser-server: lees [GeyserVoice](/ecosystem/geyservoice)

Kies voor een eerste setup één topologie en stel alleen het transport open dat deze nodig heeft. U kunt later gemengde setups toevoegen nadat de basisbinding en proximity-flow werken.

## 1. Download de server

1. Open de [downloadpagina](/download).
2. Download het serverarchief voor uw platform:
   - `VoiceCraft.Server.Windows.x64.v1.7.0.zip`
   - `VoiceCraft.Server.Windows.x86.v1.7.0.zip`
   - `VoiceCraft.Server.Windows.arm64.v1.7.0.zip`
   - `VoiceCraft.Server.Linux.x64.v1.7.0.zip`
   - `VoiceCraft.Server.Linux.arm.v1.7.0.zip`
   - `VoiceCraft.Server.Linux.arm64.v1.7.0.zip`

Als u vanaf de broncode bouwt, zie [VoiceCraft-repository en build](/ecosystem/voicecraft-repository).

## 2. Voer de server één keer uit

Voer het uit vanuit de map waar u `config/ServerProperties.json` wilt hebben.

### Windows

```powershell
./VoiceCraft.Server.exe
```

### Linux

```bash
chmod +x ./VoiceCraft.Server
./VoiceCraft.Server
```

Na de eerste lancering genereert VoiceCraft `config/ServerProperties.json`.

Stop de server voordat u dit bestand bewerkt.

## 3. Beveilig de gegenereerde configuratie

Wijzig elk gegenereerd gedeeld token voordat u Minecraft of spelers verbindt:

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

Meestal wilt u verschillende waarden per omgeving.

Het token dat je later gebruikt, moet overeenkomen met het transport:

- BDS `McHttp` add-on gebruikt `McHttpConfig.LoginToken`
- lokale Bedrock `McWss` add-on gebruikt `McWssConfig.LoginToken`
- `GeyserVoice` gebruikt `McTcpConfig.LoginToken`

## 4. Kies het Minecraft-transport

VoiceCraft heeft momenteel 3 Minecraft-gerichte transporten:

- `McHttp`:
  Beste voor Bedrock Dedicated Server en meest stabiele Bedrock-automatisering.
- `McWss`:
  Het beste voor lokale werelden, testen en commandotunnelscenario's.
- `McTcp`:
  Het beste voor bruggen aan Java-zijde, zoals `GeyserVoice`.

Zie [Transportmodi](/server/transports) voor de volledige vergelijking.

Zorg ervoor dat het gekozen transport is ingeschakeld en gebonden is aan een adres dat de runtime aan Minecraft-kant kan bereiken.

## 5. Download de client

Download vanaf de [downloadpagina](/download) het pakket voor uw spelers:

- Windows: `VoiceCraft.Client.Windows.<arch>.v1.7.0.zip`
- Linux: `VoiceCraft.Client.Linux.<arch>.v1.7.0.zip`
- macOS: `VoiceCraft.Client.MacOS.<arch>.v1.7.0.zip`
- Android: `VoiceCraft.Client.Android.arm64.v1.7.0.zip` (APK binnen)
- iOS: `VoiceCraft.Client.iOS.arm64.v1.7.0.zip`

## 6. Voeg de server toe aan de client

1. Open de client.
2. Selecteer microfoon en afspeelapparaten.
3. Voeg een serververmelding toe in de gebruikersinterface.
4. Gebruik het VoiceCraft UDP-eindpunt van `VoiceCraftConfig.Port`.
5. Bevestig dat de client `Positioning Type` overeenkomt met `VoiceCraftConfig.PositioningType`.

Typische lokale opstelling:

- host: `127.0.0.1`
- poort: `9050`

## 7. Sluit de Minecraft-kant aan

- Voor Bedrock Dedicated Server gebruikt u [McHttp for BDS](/minecraft/mchttp-bds).
- Gebruik [McWss for Singleplayer Worlds](/minecraft/mcwss-singleplayer) voor een lokale Bedrock-wereld.
- Voor Java + Geyser/Floodgate gebruikt u [GeyserVoice](/ecosystem/geyservoice).

Deze stap geeft VoiceCraft de in-game status die nodig is voor proximity audio: speleridentiteit, bindingsgegevens, wereld-ID's, positie-updates en effectstatus.

Als u op Bedrock implementeert, houd dan deze twee pagina's bij de hand:

- [Downloadpagina](/download) voor losse releasebestanden voor client, server en add-on
- [Add-onconfigurator](/addon-configurator) voor een wereldarchief dat direct kan worden uitgepakt

## 8. Controleer de stapel

Als alles correct is geconfigureerd:

- VoiceCraft-server start zonder configuratie- of poortfouten
- client maakt verbinding zonder transportfouten
- Minecraft-integratie verifieert met het verwachte token
- entiteiten worden aangemaakt en de bindingsflow werkt
- spelers horen proximity voice wanneer ze binnen bereik zijn

Als de client verbinding maakt maar de proximity audio niet werkt, debug dan het Minecraft-transport en de bindstroom voordat u de audio-instellingen wijzigt.

## Aanbevolen volgende lezingen

- [Serverinstallatie](/server/installation)
- [Eerste serverrun](/server/first-run)
- [ServerProperties.json](/server/server-properties)
- [Runtime-overschrijvingen](/server/runtime-overrides)
- [Transportmodi](/server/transports)
- [Downloadpagina](/download)
- [Add-onconfigurator](/addon-configurator)
