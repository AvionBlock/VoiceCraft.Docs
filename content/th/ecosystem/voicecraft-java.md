# VoiceCraft.Java (Java bridge)

Repository/site: [VoiceCraft.Java](https://java.voicecraft.chat)

VoiceCraft.Java คือ plugin ฝั่ง Java สำหรับ VoiceCraft และเป็นชื่อใหม่ที่ใช้แทน GeyserVoice ในเอกสารนี้ plugin เชื่อม Paper, Velocity หรือ BungeeCord ไปยัง VoiceCraft backend ผ่าน McTcp

ใช้เป็น proximity voice layer ร่วมกันสำหรับ VoiceCraft Client, Simple Voice Chat, Plasmo Voice และผู้เล่น Bedrock บน Java cross-play server

## รองรับ

- Direct Paper mode
- Velocity/BungeeCord proxy mode
- managed VoiceCraft runtime บน Paper
- external VoiceCraft backend
- Simple Voice Chat adapter
- Plasmo Voice adapter
- bind flow ด้วย `/voice bind <key>`
- config/message templates: `en`, `ru`, `nl`, `ja`

Direct Paper: `Paper -> VoiceCraft.Java -> VoiceCraft`

Proxy network: `Paper backends -> Velocity/BungeeCord -> VoiceCraft`

ใน proxy mode ต้องติดตั้ง VoiceCraft.Java ทั้งบน Paper backend ทุกตัวและบน proxy โดย proxy เป็นเจ้าของ McTcp connection และ backend ส่ง snapshots ผ่าน `voicecraft-java:main`

Paper ใช้ config version `3`; Velocity และ BungeeCord ใช้ config version `2`; ต้องใช้ Java 21
