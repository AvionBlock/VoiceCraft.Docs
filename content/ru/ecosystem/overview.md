# Экосистема VoiceCraft

VoiceCraft — это не просто один двоичный файл. Это небольшая экосистема репозиториев и слоев среды выполнения, которые можно комбинировать по-разному.

Основная идея проста: игроки запускают `VoiceCraft.Client`, один бэкэнд запускает или управляет `VoiceCraft.Server`, а интеграция со стороны Minecraft отправляет состояние игры на сервер. Какую интеграцию вы выберете, зависит от того, является ли ваша среда выполнения Minecraft Bedrock, локальной Bedrock, Direct Paper или прокси-сетью.

## Основные репозитории

| Репозиторий | Чем он владеет | Используйте его, когда |
|------------|--------------|-------------|
| `VoiceCraft` | клиентские приложения, автономный сервер, протокол, общий основной код, транспорты для Minecraft | вам нужна среда выполнения основного сервера/клиента или вы хотите выполнить сборку из исходного кода |
| `VoiceCraft.Java` | Java-мост для Paper, Velocity и BungeeCord | вы используете Java, Geyser/Floodgate или прокси-сеть |
| `VoiceCraft.Addon` | пакеты аддона Bedrock и скриптовый интерфейс McApi | вы используете миры Bedrock или хотите настроить поведение аддона |

## Карта развертывания

```mermaid
flowchart LR
  A["VoiceCraft Client"] --> B["VoiceCraft UDP Server"]
  C["Bedrock Addon (McHttp / McWss)"] --> D["Minecraft API Transport"]
  D --> B
  E["VoiceCraft.Java (Paper / Proxy)"] --> F["McTcp Bridge"]
  F --> B
```

Интеграция клиента и Minecraft не осуществляется по одному и тому же пути. Клиент использует UDP-эндпоинт VoiceCraft. Интеграция Minecraft использует `McHttp`, `McWss` или `McTcp`.

## Типичные стеки

### Выделенный сервер Bedrock

- `VoiceCraft.Server`
- `VoiceCraft.Addon.Core.McHttp`
- клиенты VoiceCraft
- разрешения скриптов/модулей BDS, необходимые для аддона

Используйте это для производственных серверов Bedrock, где BDS может достичь HTTP-эндпоинта.

### Локальный мир Bedrock

- локальный стек VoiceCraft
- `VoiceCraft.Addon.Core.McWss`
- локальный путь WebSocket `/connect`

Используйте это для одиночной игры, демоверсий и тестирования аддонов.

### Java-сервер с Geyser/Floodgate

- `VoiceCraft.Java`
- `VoiceCraft.Server`
- опционально управляемая среда выполнения, запускаемая самим `VoiceCraft.Java`
- `McTcp` как мост, обращенный к VoiceCraft

Используйте это, когда состояние сервера на стороне Java является источником позиций игроков и процесса привязки.

### Прокси-сеть Java

- `VoiceCraft.Java` на прокси
- `VoiceCraft.Java` на внутренних серверах Paper
- `VoiceCraft.Server`, доступный через `McTcp`
- серверные узлы передают снимки на прокси

Используйте это, когда один прокси-сервер должен владеть центральным соединением VoiceCraft для нескольких внутренних серверов.

## Почему существует несколько репозиториев

- `VoiceCraft` фокусируется на базовой голосовой платформе.
- `VoiceCraft.Java` переводит среды Java или прокси в состояние, совместимое с VoiceCraft.
- `VoiceCraft.Addon` предоставляет автоматизацию мира, привязку сущностей и управление эффектами в Bedrock.

Такое разделение позволяет каждому проекту развиваться с учетом своей среды выполнения: код клиента/сервера C# в `VoiceCraft`, код плагина Java в `VoiceCraft.Java` и код скриптов/аддона Bedrock в `VoiceCraft.Addon`.

## Выбор, с чего начать

- Новый выделенный сервер Bedrock:
  начните с [быстрого старта](/start/quick-start), затем [McHttp для BDS](/minecraft/mchttp-bds).
- Локальное тестирование Bedrock:
  начните с [McWss для одиночных миров](/minecraft/mcwss-singleplayer).
- Java + Geyser/Floodgate:
  начните с [VoiceCraft.Java](/ecosystem/voicecraft-java).
- Кастомное поведение Bedrock:
  прочитайте [VoiceCraft.Addon](/ecosystem/voicecraft-addon), затем [API аддонов](/ecosystem/addon-api).

## Продолжить с

- [Репозиторий и сборка VoiceCraft](/ecosystem/voicecraft-repository)
- [Обзор VoiceCraft.Java](/ecosystem/voicecraft-java)
- [Обзор VoiceCraft.Addon](/ecosystem/voicecraft-addon)
- [API аддонов](/ecosystem/addon-api)
- [Рецепты интеграции](/ecosystem/integration-recipes)
- [Production-схемы](/ecosystem/production-blueprints)
