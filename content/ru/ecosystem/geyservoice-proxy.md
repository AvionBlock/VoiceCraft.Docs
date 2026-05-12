# GeyserVoice Proxy Guide

Используйте этот режим, если у вас Velocity или BungeeCord и один или несколько backend Paper серверов.

## Как работает proxy mode

- backend Paper сервера отправляют snapshots игроков на proxy
- proxy владеет основным `McTcp` соединением с VoiceCraft
- world ID и dimension могут namespaced-иться backend identity

## Схема развёртывания

Установите GeyserVoice:

- на proxy
- на каждый backend Paper сервер

## Главное правило

Proxy это source of truth для подключения к VoiceCraft.

Backend Paper ноды должны только поставлять snapshot-ы, а не владеть главным bridge-соединением.
