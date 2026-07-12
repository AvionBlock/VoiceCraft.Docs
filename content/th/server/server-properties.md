# ServerProperties.json

`ServerProperties.json` เป็นไฟล์ config หลักของ `VoiceCraft.Server`

## ส่วนสำคัญ

- `VoiceCraftConfig`: endpoint หลักของ voice UDP clients
- `McHttpConfig`: HTTP transport สำหรับ BDS
- `McWssConfig`: WebSocket/command tunnel สำหรับ local worlds
- `McTcpConfig`: transport สำหรับ Java-side plugin/bridge
- `DefaultAudioEffectsConfig`: ค่า effect เริ่มต้น

เปลี่ยน token ก่อน production, เปิดเฉพาะ transport ที่ใช้จริง และตั้ง `AutoOpenPort` เป็น `false` หาก port ถูกจัดการภายนอกแล้ว
