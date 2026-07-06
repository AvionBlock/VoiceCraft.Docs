# Addon API

`VoiceCraft.Addon` предоставляет script-driven McApi layer, который шире, чем просто `vcbind`.

Эта страница для addon и world developers. Она описывает API model для `1.7.x`.

Используйте API, когда stock addon behavior недостаточно: custom binding rules, custom effects, region-specific voice behavior, scripted fake entities, staff tools или game-mode-specific visibility logic.

## Что изменилось в 1.7

VoiceCraft `1.7.0` меняет low-level API surface:

- packet events оборачиваются в event request packets
- custom entity properties заменяют старый cave/muffle factor packet path

Кастомный addon code под `1.6.x` может потребовать migration перед `1.7.x`.

## High-level API surface

Addon-side API покрывает:

- connection lifecycle
- packet send / receive
- entity creation и destruction
- world ID, position, rotation, mute, deafen и bitmask updates
- custom entity properties
- effect updates
- audio-received и audio-data events

VoiceCraft даёт transport и state model; world logic решает, как теги, роли, регионы, dimensions или scripted entities маппятся на voice behavior.

## Script events

Обычные script events:

- `voicecraft:onConnected`
- `voicecraft:onDisconnected`
- `voicecraft:onPlayerBind`
- `voicecraft:onPlayerUnbind`
- `voicecraft:onPacket`
- `voicecraft:sendPacket`

Для обычной кастомизации предпочитайте high-level lifecycle hooks. Packet-level hooks используйте, когда нужен точный контроль над entities, effects или protocol behavior.

## Packet model 1.7

Новые event wrapper packets:

- `McApiEventRequestPacket`
- `VcEventRequestPacket`

Новые property packets:

- `McApiSetEntityPropertyRequestPacket`
- `McApiOnEntityPropertyUpdatedPacket`
- `VcSetPropertyRequestPacket`
- `VcOnEntityPropertyUpdatedPacket`

Удалённые или superseded packet paths:

- `McApiSetEntityCaveFactorRequestPacket`
- `McApiOnEntityCaveFactorUpdatedPacket`
- `McApiSetEntityMuffleFactorRequestPacket`
- `McApiOnEntityMuffleFactorUpdatedPacket`
- `VcSetCaveFactorRequestPacket`
- `VcOnEntityCaveFactorUpdatedPacket`
- `VcSetMuffleFactorRequestPacket`
- `VcOnEntityMuffleFactorUpdatedPacket`

Если cave/muffle factor packets использовались для audio behavior, перенесите их в named properties, которые читает нужный effect.

## Entity properties

Entity properties — named typed values на VoiceCraft entity.

Поддерживаемые типы:

- `null`
- `boolean`
- signed/unsigned integer widths от byte до long
- `float`
- `double`

Правила:

- property keys ограничены max string length протокола
- `null` удаляет property
- updates создают `OnEntityPropertyUpdated`
- effect implementations clamp'ят supported override values при evaluation

Используйте properties для effect parameters, region flags, custom game-state values и metadata, которая должна идти вместе с entity.

## Packet-level coverage

Доступные категории:

- login / logout / ping
- accept / deny / reset responses
- entity create / destroy
- title / description / name updates
- mute / deafen / server mute / server deafen
- talk / listen / effect bitmask
- position / rotation / world ID
- custom property updates
- effect updates
- audio received / audio data received

Packet-level hooks мощные, но их легко использовать чрезмерно. Не делайте лишние high-frequency custom loops.

## Audio effect customization

`1.7.0` переписывает effect stack вокруг per-entity processors. Effects могут cache'ить state и читать entity properties при обработке audio.

Default bitmasks:

- `1`: visibility
- `2`: proximity
- `4`: proximity echo
- `8`: proximity muffle

Custom properties могут переопределять поддерживаемые поля вроде range или wet/dry behavior, если effect implementation это поддерживает.

## Migration checklist from 1.6

- Замените cave/muffle factor packet usage на property packets.
- Обрабатывайте `EventRequest` wrappers при чтении low-level events.
- Подпишитесь на нужные event categories.
- Перетестируйте custom effects минимум с двумя игроками.
- Держите addon packages aligned с VoiceCraft server/client release.

## Debugging custom logic

1. Убедитесь, что stock addon подключается и bind работает.
2. Добавьте один custom event или packet hook.
3. Проверьте, видит ли сервер entity updates.
4. Проверьте movement across worlds/dimensions, если меняете world IDs.
5. Проверьте property updates отдельно от audio effects.
6. Отключите custom code перед тем, как винить transport или audio settings.
