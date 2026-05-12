# Transportmodi

VoiceCraft heeft meerdere naar Minecraft gerichte transportlagen. Het kiezen van de juiste is belangrijk voor de stabiliteit en eenvoud van implementatie.

## Snelle vergelijking

| Vervoer | Typisch gebruik | Standaardvorm | Beste voor |
|-----------|-------------|---------------|----------|
| `McHttp` | Bedrock Dedicated Server | HTTP endpoint | stable Bedrock server integration |
| `McWss` | local worlds / singleplayer | websocket + command tunnel | testing, local worlds, lightweight setups |
| `McTcp` | Java-side bridge | raw TCP bridge | `GeyserVoice`, proxy or Paper bridge scenarios |

## McHttp

### Beste gebruiksscenario's

- Bedrock speciale server
- stabiele Bedrock-werelden met scripts
- omgevingen waarin de spelserver een HTTP-eindpunt kan aanroepen

### Sterke punten

- eenvoudigste productietransport voor BDS
- eenvoudig eindpuntmodel
- goede pasvorm voor panelen, omgekeerde netwerklay-outs en speciale hosts

### Afwegingen

- vereist netwerkbereikbaarheid van de Bedrock-server naar VoiceCraft
- kan bij sommige hostingproviders geblokkeerd zijn

## McWss

### Beste gebruiksscenario's

- lokale Bedrock-werelden
- testen voor één speler
- setups using `/connect` and command tunneling

### Sterke punten

- werkt zonder een zelfstandige BDS HTTP-workflow
- praktisch voor ontwikkeling en lokale demo's

### Afwegingen

- minder stabiel onder zware belasting
- sensitive to `CommandsPerTick` and payload chunking limits
- meestal niet de eerste keuze voor openbare productieomgevingen

## McTcp

### Beste gebruiksscenario's

- `GeyserVoice`
- Java-server of proxybruggen
- directe Paper runtime-integratie

### Sterke punten

- direct bridge-transport voor plug-ins aan Java-zijde
- vermijdt de semantiek van HTTP-eindpunten wanneer een native TCP-bridge beter is
- aligns with current `GeyserVoice` architecture

### Afwegingen

- nog een poort om te beheren
- vooral handig als je daadwerkelijk een Java-side bridge gebruikt

## Welke moet je kiezen?

### Bedrock speciale server

Use `McHttp`.

### Basis singleplayer / lokale wereld

Use `McWss`.

### Java + Geyser/Floodgate

Use `McTcp` through `GeyserVoice`.

### Gemengd netwerk

Je kunt meer dan één transport uitvoeren, maar laat alleen zien wat je echt nodig hebt.

## Beveiligingsadvies

- vervang alle login-tokens
- bind to `127.0.0.1` when the consumer is local
- bind to `0.0.0.0` only when remote access is required
- Houd de firewallregels per transport strak
