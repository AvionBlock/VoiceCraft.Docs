# Обновление и резервная копия

Используйте эту страницу для обычных обновлений, где топология почти не меняется. Для крупных переходов, изменений протокола или смены топологии используйте [порядок обновления](/operations/upgrade-runbook).

VoiceCraft `1.7.0` — это minor-обновление. Его лучше ставить согласованно: сервер, клиенты, пакеты аддона и Java-side bridge должны быть одной ветки `1.7.x`.

## Что изменилось в 1.7.0

В `1.7.0` вошли:

- переписанный audio effect pipeline с processor-объектами на сущность
- custom entity properties для переопределения поведения эффектов
- новый event flow через `EventRequest`
- пакеты `SetProperty` / `OnEntityPropertyUpdated` вместо старого пути cave/muffle factor
- NAT port mapping через `OpenPort.Net`
- исправления iOS sample-rate и Apple privacy manifest
- обновления зависимостей, Android version `17`, release pipeline
- удаление browser/web client target

Из-за изменений wire model держите client/server `Major.Minor` одинаковыми: клиенты `1.7.x` должны использоваться с серверами `1.7.x`.

## Что сохранить перед обновлением

- `config/ServerProperties.json`
- кастомные scripts/systemd/service-manager wrappers
- историю логов, если она нужна
- конфиг VoiceCraft.Java или другого Java bridge
- конфигурацию Bedrock world packs, если используется аддон
- заметки по public/LAN hostnames, портам, firewall и port forwarding

Бэкапы содержат токены и детали топологии. Храните их как чувствительные operational-файлы.

## Безопасное обновление сервера

1. Остановите `VoiceCraft.Server`.
2. Сохраните весь `config/`.
3. Распакуйте релиз `1.7.0` в новую папку.
4. Скопируйте `ServerProperties.json` в новую установку.
5. Проверьте transport sections на новые поля NAT port mapping.
6. Запустите сервер и проверьте startup logs.
7. Убедитесь, что каждый включённый transport успешно bind'ится.
8. Подключите одного клиента и одну Minecraft-side integration до открытия сервера для всех.

Не перезаписывайте старую папку бинарников, если rollback имеет значение.

## Миграция ServerProperties.json

`1.7.0` добавляет поля port mapping в VoiceCraft endpoint и в McHttp, McTcp, McWss:

- `AutoOpenPort`
- `ExternalPort`
- `PortMappingLifetimeMinutes`
- `PortMappingTimeoutSeconds`

`AutoOpenPort` по умолчанию `false`. Оставьте его выключенным, если port forwarding уже управляется вручную, через firewall, reverse proxy, tunnel, Docker/panel host или хостинг-провайдера.

## Аддоны и bridges

Обновляйте matching addon/bridge packages вместе с сервером, если они зависят от 1.7 packet behavior.

Важные изменения:

- cave/muffle factor packets больше не основной путь кастомизации
- entity-level custom properties теперь передают effect overrides
- low-level events обёрнуты в event request packets
- subscriptions работают по event categories

Кастомный addon/bridge код, который слушал старые cave/muffle packet types, нужно перевести на `SetProperty` и `OnEntityPropertyUpdated`.

## Безопасное обновление клиента

Client settings обычно лежат в `ApplicationData/voicecraft` и переживают обновления бинарников.

Попросите небольшую тестовую группу проверить:

- выбор микрофона
- output device
- сохранённую server entry
- push-to-talk
- `Positioning Type`
- iOS capture behavior, если раньше были sample-rate или distorted-input проблемы

Browser/web client target удалён в `1.7.0`. Используйте native desktop/mobile clients.

## Совместимость

- Client и server `Major.Minor` должны совпадать.
- Patch versions могут отличаться.
- Bedrock addon packages должны совпадать с release, если используются addon-side features.
- Java-side bridges должны поддерживать 1.7 packet/property model.
- Custom packet integrations нужно отдельно протестировать.

## Подготовка rollback

Перед заменой файлов сохраните:

- предыдущую папку server binaries
- предыдущий addon/plugin package
- предыдущий config backup
- последние рабочие token/port notes

Rollback проще, когда старая папка не перезаписана.
