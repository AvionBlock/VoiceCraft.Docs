---
seo:
  title: Скачать
  description: Загрузите последние сборки клиента и сервера VoiceCraft для вашей платформы.
---

Загрузите пакеты, соответствующие вашей топологии. Для большинства настроек требуется как минимум один пакет `VoiceCraft.Server` и один пакет `VoiceCraft.Client` на каждого игрока.

Кнопки клиента и сервера берут файлы из [последнего релиза GitLab](https://gitlab.avion.team/voicecraft/VoiceCraft/-/releases/permalink/latest). Имена архивов имеют вид `VoiceCraft.Client.Windows.x64.v<version>.zip` и `VoiceCraft.Server.Linux.x64.v<version>.zip`; кнопки получают фактические имена из GitLab.

Для развертывания выделенного сервера Bedrock также необходим пакет `VoiceCraft.Addon.Core.McHttp` или настроенный архив мира из [Addon Configurator](/addon-configurator). Локальные миры Bedrock обычно используют `VoiceCraft.Addon.Core.McWss`. В развертываниях Java/Geyser используется `VoiceCraft.Java` вместе с транспортом `McTcp`.

Конфигуратор использует ZIP-файлы аддона из GitLab, если они есть, а в остальных случаях берёт соответствующие пакеты из [зеркальных релизов GitHub](https://github.com/AvionBlock/VoiceCraft/releases/latest).

После загрузки перейдите к [быстрому старту](/start/quick-start) или руководству для вашего транспорта.

::voice-craft-downloads
::
