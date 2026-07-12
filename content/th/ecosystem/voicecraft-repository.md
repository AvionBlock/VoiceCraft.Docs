# VoiceCraft Repository

Repository หลัก: [gitlab.avion.team/voicecraft/VoiceCraft](https://gitlab.avion.team/voicecraft/VoiceCraft)

GitHub เป็น public mirror เท่านั้น: [AvionBlock/VoiceCraft](https://github.com/AvionBlock/VoiceCraft)

Repository หลักประกอบด้วย client, server, core, network, tests และ tools

สำหรับ deploy ปกติให้ใช้ release build ไม่จำเป็นต้อง build จาก source ยกเว้นกำลังพัฒนา/debug core

## หมายเหตุ 1.7

- project version เป็น `1.7.0`
- browser/web client ถูกลบออกจาก core repository
- เพิ่ม NAT port mapping ผ่าน `OpenPort.Net`
- iOS ได้ privacy manifest และ sample-rate fixes
