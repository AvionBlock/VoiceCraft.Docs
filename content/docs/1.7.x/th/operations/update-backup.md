# อัปเดตเป็น 1.7

VoiceCraft `1.7.0` ไม่ใช่ patch เล็ก ควรอัปเดต server, clients, addon packages และ Java bridge ไปด้วยกัน

## สิ่งที่เปลี่ยน

- event flow ผ่าน `EventRequest`
- `SetProperty` / `OnEntityPropertyUpdated` แทน cave/muffle factor path
- NAT port mapping ผ่าน `OpenPort.Net`
- iOS sample-rate fix และ Apple privacy manifest
- browser/web client ถูกลบ

## Config ใหม่

`1.7.0` เพิ่ม fields:

- `AutoOpenPort`
- `ExternalPort`
- `PortMappingLifetimeMinutes`
- `PortMappingTimeoutSeconds`

ค่า default ของ `AutoOpenPort` คือ `false` ให้เปิดเฉพาะเมื่อ router/LAN รองรับและต้องการให้ VoiceCraft เปิด port ให้เอง
