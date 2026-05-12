# Serverinstallatie

`VoiceCraft.Server` is the standalone backend that accepts client voice traffic and exposes Minecraft-facing transports.

## Wat de server eigenlijk bevat

VoiceCraft-server maakt meerdere lagen tegelijk zichtbaar:

- VoiceCraft UDP-spraakserver
- `McHttp` transport for Bedrock integrations
- `McWss` transport for websocket / command-tunnel Bedrock flows
- `McTcp` transport for Java-side bridges such as `GeyserVoice`

U kunt ze allemaal ingeschakeld laten of transporten tijdens runtime selecteren.

## Vooraf gebouwde binaire releases

De releasepagina bevat meestal:

- Ramen:
  `VoiceCraft.Server.Windows.x64.zip`, `x86`, `arm64`
-Linux:
  `VoiceCraft.Server.Linux.x64.zip`, `arm`, `arm64`

Downloaden: [Downloadpagina](/download)

## Windows

1. Download `VoiceCraft.Server.Windows.<arch>.zip`.
2. Pak het archief uit naar een speciale map.
3. Beginnen:

```powershell
./VoiceCraft.Server.exe
```

## Linux

1. Download `VoiceCraft.Server.Linux.<arch>.zip`.
2. Pak het archief uit.
3. Beginnen:

```bash
chmod +x ./VoiceCraft.Server
./VoiceCraft.Server
```

## macOS

Er is misschien niet altijd een vooraf gebouwd speciaal artefact, maar de server kan vanaf de bron worden gebouwd:

```bash
git clone https://github.com/AvionBlock/VoiceCraft.git
cd VoiceCraft/VoiceCraft.Server
dotnet restore
dotnet publish -c Release -r osx-arm64 -p:PublishSingleFile=true
```

For Intel macOS, replace `osx-arm64` with `osx-x64`.

## Docker / containers

Er wordt verwezen naar containerimages vanuit de hoofdrepository README:

- [VoiceCraft Docker Hub] (https://hub.docker.com/r/sinevector241/voicecraft/tags)

Containerimplementatie is nuttig wanneer:

- u een speciale servicegrens wilt
- u draait al BDS/Java-nodes in containers
- u eenvoudiger herstartbeleid en logboeken wilt

## Aanbevolen installatie-indeling

Voorbeeld Linux-indeling:

```text
/opt/voicecraft/
  VoiceCraft.Server
  config/
    ServerProperties.json
```

Aanbevolen praktijken:

- bewaar VoiceCraft in zijn eigen map
- persist `config/`
- back up `ServerProperties.json`
- mix niet meerdere omgevingen in dezelfde map

## Uitvoeren als systemd-service (Linux)

Example `/etc/systemd/system/voicecraft.service`:

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

Pas het toe:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now voicecraft
sudo systemctl status voicecraft
```

## Bouw vanuit de bron

Zie [VoiceCraft-repository en build](/ecosystem/voicecraft-repository) voor SDK- en projectdetails.

Minimale stroom:

```bash
git clone https://github.com/AvionBlock/VoiceCraft.git
cd VoiceCraft
dotnet restore
dotnet build -c Release
dotnet run --project VoiceCraft.Server
```

## Wat moet je nu lezen

- [Eerste serverrun] (/server/first-run)
- [ServerProperties.json](/server/server-properties)
- [Runtime-overschrijvingen] (/server/runtime-overrides)
- [Transportmodi](/server/transports)
