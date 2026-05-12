# Матрица проблем

Используйте эту страницу для symptom-based диагностики, когда нужен быстрый путь от симптома к проверкам.

## Симптом: клиент подключается, но никто никого не слышит

Проверьте:

1. совпадает ли `PositioningType`
2. завершен ли bind flow
3. получают ли сущности world и position updates
4. не включен ли локальный mute/deafen у клиента
5. не замьючен/оглушен ли клиент сервером

## Симптом: addon подключается, но bind не работает

Проверьте:

1. корректен ли token
2. создается ли ожидаемая сущность
3. правильный ли binding key вводит игрок
4. срабатывают ли bind script events

## Симптом: GeyserVoice установлен, но Java-bridge не поднимается

Проверьте:

1. включен ли `McTcp` на VoiceCraft
2. совпадают ли `host`, `port` и `login-token`
3. осознанно ли выбран direct или proxy mode
4. если включен `auto-start`, успевает ли runtime стать ready в timeout

## Симптом: direct Paper mode работает после ручного реконнекта, но ломается на старте

Проверьте:

1. `config.voicecraft.auto-start`
2. `install-directory`
3. `ready-timeout-ms`
4. кто владеет запуском runtime-процесса

## Симптом: proxy mode работает на одном backend, но ломается при server switch

Проверьте:

1. proxy действительно является source of truth
2. backend-ноды не пытаются сами владеть VoiceCraft-подключением
3. snapshot forwarding не ломается на переключении
4. world ID namespacing остается консистентным

## Симптом: `McWss` нестабилен

Проверьте:

1. `CommandsPerTick`
2. `MaxByteLengthPerCommand`
3. объем entity churn и packet bursts
4. не лучше ли перейти на `McHttp`

## Симптом: VoiceCraft сервер стартует, но transport-клиент не может подключиться

Проверьте:

1. host binding
2. открытый порт
3. firewall
4. выбран ли правильный transport
5. не переписывают ли runtime overrides ожидаемые значения
