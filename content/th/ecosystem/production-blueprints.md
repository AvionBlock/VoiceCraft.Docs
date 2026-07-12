# Production Blueprints

## BDS production

ใช้ `VoiceCraft.Server` + `VoiceCraft.Addon.Core.McHttp` และเปิด firewall เฉพาะ port ที่จำเป็น

## Java/Geyser

ใช้ `GeyserVoice` กับ `McTcp` และแยก log ของ VoiceCraft ออกจาก game server

## Local testing

ใช้ `McWss` สำหรับทดสอบ ไม่ใช่ตัวเลือกหลักสำหรับ public production ขนาดใหญ่
