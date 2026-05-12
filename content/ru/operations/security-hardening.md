# Security hardening

Эта страница про снижение operational risk в реальных deployment-сценариях.

## 1. Меняйте все сгенерированные токены

Никогда не оставляйте дефолтные значения для:

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

## 2. Публикуйте только нужные transports

Не нужно открывать все transports просто потому, что они существуют.

Примеры:

- Bedrock-only хост:
  обычно только `McHttp`
- Java bridge хост:
  обычно только `McTcp`

## 3. Используйте loopback, где можно

Предпочитайте:

- `127.0.0.1`
- `localhost`

если потребитель находится на той же машине.

## 4. Жёсткая firewall policy

Открывайте только нужное:

- VoiceCraft UDP port
- конкретный HTTP или TCP transport port
- optional websocket port

## 5. Разделяйте окружения

Используйте разные:

- токены
- конфиги
- директории
- порты

для production, staging и local test.
