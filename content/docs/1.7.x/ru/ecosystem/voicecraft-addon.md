# VoiceCraft.Addon (Аддон Bedrock)

Репозиторий: [AvionBlock/VoiceCraft.Addon](https://github.com/AvionBlock/VoiceCraft.Addon)

Этот репозиторий содержит готовые Bedrock addon packages и script-side McApi surface для custom world logic.

Используйте его, когда Minecraft Bedrock является источником player/entity state. Аддон подключает Bedrock worlds к VoiceCraft server через `McHttp` или `McWss`, затем даёт bind flow, UI, events и packet helpers для world scripts.

Быстрые ссылки:

- [страница загрузки](/download)
- [конфигуратор аддона](/addon-configurator)
- [Addon Releases](https://github.com/AvionBlock/VoiceCraft.Addon/releases/latest)

## Пакеты

| Пакет | Назначение | Когда использовать |
|-------|------------|-------------------|
| `Basic` | готовый bind flow, settings UI, in-game voice indicators, common script events | нужен рабочий reference или default Bedrock behavior |
| `Core.McHttp` | HTTP transport package | Bedrock Dedicated Server |
| `Core.McWss` | websocket / command-tunnel transport package | local Bedrock world или test setup |

## Version alignment

VoiceCraft `1.7.0` требует addon packages, которые понимают 1.7 event/property model, если world использует low-level packet customization.

Не обновляйте server/client, оставляя старый custom addon package. Несовпадение версий может проявиться позже: bind, event forwarding, property updates или effect customization.

## Что изменилось для addon developers в 1.7

- low-level events доставляются через `EventRequest` wrappers
- entity properties стали supported path для custom effect values
- cave/muffle factor packets удалены из core protocol path
- `OnEntityPropertyUpdated` — событие для property changes
- audio effects могут читать supported property overrides при processing

Stock packages обновляйте комплектом. Custom packages тестируйте на 1.7 server до production.

## Namespace

- `VoiceCraft.Namespace = "voicecraft"`

## Commands

### Basic

- `voicecraft:vcbind <binding_key>`
  permission: `Any`
- `voicecraft:vcsettings`
  permission: `GameDirectors`

### Core.McHttp

- `voicecraft:vcconnect <hostname> <token>`
  permission: `GameDirectors`
- `voicecraft:vcconnect_raw <ip> <port> <token>`
  permission: `GameDirectors`

### Core.McWss

- `voicecraft:vcconnect <token>`
  permission: `Host`
- `voicecraft:vcconnect_raw <ip> <port> <token>`
  permission: `GameDirectors`
- `voicecraft:data_tunnel [max_string_length] [data]`
  permission: `Host`

## `vcconnect_raw`

`voicecraft:vcconnect_raw` — low-level команда подключения для auto-connect в аддоне. Она принимает адрес раздельно: host/IP, port и token.

```text
/voicecraft:vcconnect_raw "<IP_OR_HOST>" <PORT> "<LOGIN_TOKEN>"
```

Команда проверяет, что `PORT` в диапазоне `1..65535`, и запускает подключение только когда transport отключен.

Для `Core.McHttp` она собирает `http://<ip>:<port>`. Для `Core.McWss` передаёт `ip`, `port` и token напрямую в websocket transport.

Stock `Basic` package вызывает её из auto-connect settings:

```text
vcconnect_raw "<autoConnect:ip>" <autoConnect:port> "<autoConnect:loginKey>"
```

Для ручной настройки обычно используйте обычные `vcconnect` команды, если только world automation не хранит host и port отдельно.

## Что даёт Basic package

- bind / unbind flow
- player settings UI
- effect toggles
- script events для automation
- in-game indicators

Начинайте с `Basic`, чтобы получить рабочий baseline transport/bind/position behavior.

## Bind flow

1. новая network entity получает short binding key
2. description обновляется prompt'ом с key
3. player запускает `voicecraft:vcbind <key>`
4. entity bind'ится к player
5. при leave выполняется unbind и генерируется новый key

Script events:

- `voicecraft:onPlayerBind`
- `voicecraft:onPlayerUnbind`

Binding key короткий, потому что вводится в игре. Это temporary link token, не долгосрочный secret.

## Effects UI

`voicecraft:vcsettings` содержит:

- Visibility
- Proximity
- Directional
- Proximity Echo
- Echo
- Proximity Muffle
- Muffle

Effects переключаются через effect packets и bitmasks. В `1.7.x` глубокая кастомизация эффектов должна идти через entity properties.

## Что можно кастомизировать

- bind / unbind policy
- role/tag restrictions
- world ID rules
- position / rotation update behavior
- entity property updates для effect overrides
- staff forms через `@minecraft/server-ui`
- packet handlers вокруг McApi surface

## Ограничения

- `Core.McWss` зависит от command/payload limits
- host/provider restrictions могут блокировать network path для `Core.McHttp`
- custom packet handlers нужно тестировать на целевой Bedrock version
- custom 1.6 cave/muffle packet code нужно мигрировать на properties

## Recommended setup: BDS

1. включите `McHttpConfig.Enabled = true`
2. убедитесь, что BDS видит `McHttpConfig.Hostname`
3. скопируйте `Core.McHttp`
4. выполните `voicecraft:vcconnect <hostname> <token>`
5. проверьте bind через `voicecraft:vcbind <key>`

## Recommended setup: local world

1. включите `McWss`
2. установите `Core.McWss`
3. выполните `/connect`
4. выполните `voicecraft:vcconnect <token>`
5. держите `voicecraft:data_tunnel` aligned с server config

## Validation checklist

- установлен правильный transport package
- behavior и resource packs активны
- `vcconnect` использует token из правильного server config section
- player bind'ится через `voicecraft:vcbind <key>`
- movement меняет position data в VoiceCraft
- effects UI открывается для authorized users
- property updates работают, если world использует 1.7 effect overrides

## Читать дальше

- [Addon API](/ecosystem/addon-api)
- [McHttp для BDS](/minecraft/mchttp-bds)
- [McWss для Singleplayer Worlds](/minecraft/mcwss-singleplayer)
