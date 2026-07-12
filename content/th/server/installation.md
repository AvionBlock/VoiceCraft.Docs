# ติดตั้ง Server

`VoiceCraft.Server` คือ backend ที่รับ voice clients และรับข้อมูลสถานะจาก Minecraft integration

1. ดาวน์โหลด server จากหน้า releases
2. แตกไฟล์ไปยัง folder แยก
3. รัน server หนึ่งครั้งเพื่อสร้าง `ServerProperties.json`
4. ตั้งค่า `VoiceCraftConfig.Port`
5. เปิด transport ที่ต้องใช้ เช่น `McHttp`, `McWss` หรือ `McTcp`
6. เปิด firewall/port forwarding ให้ถูกต้อง

ถ้าใช้ `AutoOpenPort` ให้เข้าใจว่าเหมาะกับ router/LAN ที่รองรับ UPnP หรือ NAT-PMP เท่านั้น
