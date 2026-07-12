# Transports ใน 1.7

Transports ยังเป็น `McHttp`, `McWss` และ `McTcp` แต่ protocol model เปลี่ยน:

- events ผ่าน `EventRequest`
- property updates ใช้ `SetProperty`
- `OnEntityPropertyUpdated` แจ้ง property changes
- แต่ละ transport สามารถใช้ `AutoOpenPort` ได้

## Fields ที่เกี่ยวข้อง

- `AutoOpenPort`
- `ExternalPort`
- `PortMappingLifetimeMinutes`
- `PortMappingTimeoutSeconds`

สำหรับ VPS, Docker, panel host, tunnel หรือ reverse proxy โดยมากควรปิด `AutoOpenPort` และจัดการ port เอง
