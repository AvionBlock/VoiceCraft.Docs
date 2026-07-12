# Hosting Caveats

บาง host จำกัด outbound HTTP, websocket หรือ UDP traffic

## ตรวจสอบก่อน deploy

- เปิด UDP port ได้หรือไม่
- BDS เข้าถึง `McHttpConfig.Hostname` ได้หรือไม่
- Docker/panel มี port mapping ถูกต้องหรือไม่
- `AutoOpenPort` เหมาะกับสภาพแวดล้อมนี้หรือไม่

บน VPS/hosting ส่วนใหญ่ควรตั้ง port forwarding/firewall เองแทน auto mapping
