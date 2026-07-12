# สถาปัตยกรรมระบบใน 1.7

VoiceCraft `1.7.0` ยังใช้โครงสร้าง client/server/integration เหมือนเดิม แต่มีการเปลี่ยน protocol และ effect pipeline สำคัญ

## Client

รองรับ native desktop และ mobile clients เป็นหลัก browser/web client ถูกลบออกจาก core repository แล้ว

## Server

Server จัดการ voice sessions, Minecraft transports, entity state และ audio effects

## Integration

Bedrock addon หรือ Java-side plugin ส่งสถานะ Minecraft ผ่าน `McHttp`, `McWss` หรือ `McTcp`

## Effect pipeline

Effect สร้าง `IAudioEffectProcessor` ต่อ entity และอ่าน entity properties เพื่อ override ค่า effect ได้ เส้นทาง cave/muffle factor packet แบบเก่าถูกแทนด้วย property model

## NAT mapping

Endpoint หลักและ transports สามารถใช้ `AutoOpenPort` ได้ แต่ควรเปิดเฉพาะ LAN/router ที่รองรับ UPnP/NAT-PMP
