# Transports

Transport คือทางที่ Minecraft integration ส่งข้อมูลสถานะเข้า `VoiceCraft.Server` ไม่ใช่เส้นทางเสียงหลักของ client

| Transport | ใช้กับ | หมายเหตุ |
|---|---|---|
| `McHttp` | Bedrock Dedicated Server | แนะนำสำหรับ production BDS |
| `McWss` | local Bedrock world | ใช้ `/connect` และ command tunnel |
| `McTcp` | Java/Geyser bridge | ใช้กับ plugin ฝั่ง Java |

ทุก transport ใช้ token ของตัวเอง ตรวจให้ตรงก่อน bind ผู้เล่น
