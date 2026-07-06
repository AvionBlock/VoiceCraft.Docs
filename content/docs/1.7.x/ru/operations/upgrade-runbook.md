# Порядок обновления

Используйте эту страницу при обновлении VoiceCraft или связанного bridge, например `GeyserVoice`.

VoiceCraft `1.7.0` меняет event и entity-property model, поэтому это не обычный patch update. Обновление нужно проверять как связку server, client, Bedrock addon и Java-side plugin.

## Порядок действий

1. Сохраните config и plugin/addon files.
2. Подготовьте новые binaries в отдельной папке.
3. Подготовьте matching addon/plugin packages.
4. Прочитайте release notes по packets, properties и transports.
5. Остановите старый service.
6. Перенесите config в новую установку.
7. Проверьте `ServerProperties.json` на новые port mapping fields.
8. Обновите addon/plugin на Minecraft-side.
9. Запускайте и проверяйте по одному пути за раз.

Для `1.7.0` не оставляйте `1.6.x` custom addon/bridge, если он зависит от cave/muffle factor packets. Сначала перенесите custom logic на entity properties.

## Что особенно проверить в 1.7

1. `VoiceCraft.Server` показывает `1.7.0`.
2. Core VoiceCraft UDP endpoint bind'ится.
3. Включённые McHttp, McTcp или McWss bind'ятся.
4. NAT port mapping либо намеренно открывается, либо остаётся выключенным.
5. Клиент `1.7.x` подключается.
6. Minecraft integration проходит auth.
7. Bind flow работает на реальном игроке.
8. Position, rotation, world ID, mute/deafen и bitmasks обновляются.
9. Entity properties обновляются, если integration использует effect overrides.
10. Proximity, visibility, echo и muffle эффекты звучат корректно.

## Event/property migration

`1.7.0` переносит low-level event traffic в event request packets:

- VoiceCraft protocol: `VcEventRequestPacket`
- McApi protocol: `McApiEventRequestPacket`

Новые property packets:

- VoiceCraft protocol: `VcSetPropertyRequestPacket`, `VcOnEntityPropertyUpdatedPacket`
- McApi protocol: `McApiSetEntityPropertyRequestPacket`, `McApiOnEntityPropertyUpdatedPacket`

Поддерживаемые значения:

- `null`
- `bool`
- signed/unsigned integer widths от byte до long
- `float`
- `double`

Старый cave/muffle factor packet path удалён. Используйте properties для effect-specific values и override behavior.

## Audio effect migration

Effect stack теперь использует `IAudioEffectProcessor`. Это улучшает изоляцию состояния и позволяет эффектам предсказуемо читать entity properties.

Проверьте:

- `DefaultAudioEffectsConfig` содержит ожидаемые bitmask keys
- custom effect JSON использует поддерживаемые поля
- per-entity property overrides clamp'ятся effect implementation
- custom worlds не отправляют non-finite position/rotation values

## NAT port mapping

`AutoOpenPort` доступен для core VoiceCraft UDP endpoint и Minecraft transports.

Используйте его только если:

- сервер за домашним/LAN router с UPnP или NAT-PMP
- operator разрешает automatic mapping
- понятно, какой endpoint станет внешне доступным

Не используйте его для VPS, Docker/panel hosting, managed networks, reverse proxies, tunnels или loopback-only integrations.

## Если обновляется GeyserVoice

Дополнительно проверьте:

- runtime auto-start behavior
- proxy ownership model
- backend snapshot forwarding
- `config.voicecraft.transport.*`
- соответствие `McTcpConfig.LoginToken`
- custom property packets, если bridge отправляет effect overrides

## Если обновляются Bedrock addon packages

Дополнительно проверьте:

- behavior и resource packs обновлены оба
- BDS permissions всё ещё содержат нужные modules
- `voicecraft:vcconnect` использует правильный transport token
- `voicecraft:vcbind <key>` работает для реального игрока
- addon scripts используют property updates для 1.7 effect customization

## Когда откатываться

Рассмотрите rollback, если:

- auth внезапно ломается на рабочем token
- transports перестали bind'иться
- появляются packet parsing errors после подключения custom integration
- custom effects перестали реагировать на world state
- plugin-managed runtime не становится ready
- matching addon/plugin package недоступен для нового release

## Rollback

1. Остановите новый service.
2. Верните предыдущую binary directory.
3. Верните предыдущий `ServerProperties.json` и plugin/addon configs.
4. Верните предыдущий addon/plugin package на Minecraft-side.
5. Запустите старый service.
6. Проверьте client, transport auth, bind и proximity.
