# สถาปัตยกรรมระบบ

VoiceCraft แยกหน้าที่ชัดเจน:

- Client รับไมโครโฟน ส่ง voice packets และเล่นเสียง
- Server จัดการ sessions, entities, effects และ transports
- Minecraft integration ส่งตำแหน่ง world ID และ lifecycle events

เสียงของ client ใช้ UDP endpoint หลัก ส่วน Minecraft state ใช้ `McHttp`, `McWss` หรือ `McTcp`
