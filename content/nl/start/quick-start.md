# Snelle start

Deze handleiding is de snelste manier om een werkende VoiceCraft-stack te krijgen.

## Kies eerst uw topologie

VoiceCraft kan op verschillende manieren worden ingezet:

- Bedrock Dedicated Server: `VoiceCraft.Server` + `VoiceCraft.Addon.Core.McHttp`
- Local Bedrock world / singleplayer: `VoiceCraft.Server` or local runtime + `Core.McWss`
- Java server with Geyser/Floodgate: `GeyserVoice` + `VoiceCraft.Server`
- Direct Paper server: `GeyserVoice` can also download and run the VoiceCraft runtime under the hood

Als u het niet zeker weet, begin dan met een van deze:

- Bedrock dedicated server: lees [McHttp voor BDS](/minecraft/mchttp-bds)
- Java + Geyser-server: lees [GeyserVoice] (/ecosystem/geyservoice)

## 1. Download de server

1. Open de [downloadpagina](/download).
2. Download het serverarchief voor uw platform:
   - `VoiceCraft.Server.Windows.x64.zip`
   - `VoiceCraft.Server.Windows.x86.zip`
   - `VoiceCraft.Server.Windows.arm64.zip`
   - `VoiceCraft.Server.Linux.x64.zip`
   - `VoiceCraft.Server.Linux.arm.zip`
   - `VoiceCraft.Server.Linux.arm64.zip`

Als u vanaf de broncode bouwt, raadpleeg dan [VoiceCraft-repository en build](/ecosystem/voicecraft-repository).

## 2. Voer de server één keer uit

### Ramen

```powershell
./VoiceCraft.Server.exe
```

###Linux

```bash
chmod +x ./VoiceCraft.Server
./VoiceCraft.Server
```

After first launch, VoiceCraft generates `config/ServerProperties.json`.

## 3. Beveilig de gegenereerde configuratie

Wijzig elk gegenereerd gedeeld token voordat u Minecraft of spelers verbindt:

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

Meestal wilt u verschillende waarden per omgeving.

## 4. Kies het Minecraft-transport

VoiceCraft heeft momenteel 3 Minecraft-gerichte transporten:

- `McHttp`:
  Beste voor Bedrock Dedicated Server en meest stabiele Bedrock-automatisering.
- `McWss`:
  Het beste voor lokale werelden, testen en commandotunnelscenario's.
- `McTcp`:
  Best for Java-side bridges such as `GeyserVoice`.

Zie [Transportmodi](/server/transports) voor de volledige vergelijking.

## 5. Download de client

Download vanaf de [downloadpagina](/download) het pakket voor uw spelers:

- Windows: `VoiceCraft.Client.Windows.<arch>.zip`
- Linux: `VoiceCraft.Client.Linux.<arch>.zip`
- macOS: `VoiceCraft.Client.MacOS.<arch>.dmg` or `.pkg`
- Android: `VoiceCraft.Client.Android.arm64.zip` (APK inside)
- iOS: `VoiceCraft.Client.iOS.arm64.ipa`

## 6. Voeg de server toe in de client

1. Open de client.
2. Voeg een serververmelding toe in de gebruikersinterface.
3. Use the VoiceCraft UDP endpoint from `VoiceCraftConfig.Port`.

Typische lokale opstelling:

- host: `127.0.0.1`
- port: `9050`

## 7. Sluit de Minecraft-kant aan

- Gebruik voor Bedrock Dedicated Server [McHttp for BDS](/minecraft/mchttp-bds).
- Gebruik voor een lokale Bedrock-wereld [McWss voor singleplayer-werelden] (/minecraft/mcwss-singleplayer).
- Gebruik voor Java + Geyser/Floodgate [GeyserVoice](/ecosystem/geyservoice).

Als u op Bedrock implementeert, houd dan deze twee pagina's bij de hand:

- [Downloadpagina](/download) voor onbewerkte client/server/addon-releasebestanden
- [Addon Configurator](/addon-configurator) voor een kant-en-klaar wereldarchief

## 8. Controleer de stapel

Als alles correct is geconfigureerd:

- VoiceCraft-server start zonder configuratie- of poortfouten
- client maakt verbinding zonder transportfouten
- Minecraft-integratie verifieert met het verwachte token
- creatie van entiteiten en bindingsstroomwerk
- Spelers horen een nabijheidsstem wanneer ze binnen bereik zijn

## Aanbevolen volgende lezingen

- [Serverinstallatie](/server/installation)
- [Eerste serverrun] (/server/first-run)
- [ServerProperties.json](/server/server-properties)
- [Runtime-overschrijvingen] (/server/runtime-overrides)
- [Transportmodi](/server/transports)
- [Downloadpagina](/download)
- [Addon-configurator](/addon-configurator)
