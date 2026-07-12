# Integration Recipes

## BDS + McHttp

1. เปิด `McHttpConfig.Enabled`
2. ติดตั้ง addon package
3. รัน `voicecraft:vcconnect <hostname> <token>`
4. ทดสอบ bind และ position updates

## Local world + McWss

1. เปิด `McWssConfig.Enabled`
2. รัน `/connect <host:port>`
3. รัน `voicecraft:vcconnect <token>`
4. ตรวจ `voicecraft:data_tunnel`

## Java/Geyser

ใช้ `GeyserVoice` และ `McTcpConfig.LoginToken`
