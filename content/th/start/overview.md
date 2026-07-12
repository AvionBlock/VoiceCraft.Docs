# ภาพรวม

VoiceCraft ประกอบด้วยสามส่วนหลัก: `VoiceCraft.Client`, `VoiceCraft.Server` และ layer ที่เชื่อม Minecraft เข้ากับ server

| สถานการณ์ | หน้าแนะนำ | หมายเหตุ |
|---|---|---|
| ผู้เล่นทั่วไป | [ติดตั้ง client](/client/installation) | เชื่อมต่อ UDP ไปที่ VoiceCraft.Server |
| Bedrock Dedicated Server | [McHttp for BDS](/minecraft/mchttp-bds) | เหมาะกับ production |
| Local Bedrock world | [McWss Singleplayer](/minecraft/mcwss-singleplayer) | ใช้ `/connect` และ command tunnel |
| Java/Geyser | [VoiceCraft.Java](/ecosystem/voicecraft-java) | ใช้ plugin ฝั่ง Java |

Client และ server ควรเป็นรุ่น `Major.Minor` เดียวกัน และ token ของ transport ต้องตรงกับ config ฝั่ง server
