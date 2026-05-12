# Upgrade runbook

Используйте это при обновлении VoiceCraft или связанных мостов вроде `GeyserVoice`.

## Рекомендуемый порядок

1. сделайте backup config
2. распакуйте новые бинарники отдельно
3. подготовьте matching addon или plugin packages
4. проверьте transport и topology assumptions
5. остановите старый сервис
6. перенесите конфиг в новый install
7. обновите addon/plugin на Minecraft-side
8. запустите и проверьте

Для VoiceCraft `v1.6.1` не оставляйте старый Bedrock addon. Обновите addon вместе с client/server релизом до проверки bind flow и игровых индикаторов.

## После апдейта проверьте

1. VoiceCraft стартует
2. transport-порты слушаются
3. клиент подключается
4. addon или plugin проходит auth
5. bind flow работает
6. in-game voice icons или addon events появляются когда ожидается
7. proximity audio работает
