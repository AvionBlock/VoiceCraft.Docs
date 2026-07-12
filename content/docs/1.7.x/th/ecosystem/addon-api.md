# Addon API ใน 1.7

หน้านี้สำหรับ addon/world developers ที่ต้องปรับ custom logic ให้เข้ากับ `1.7.x`

## Event wrappers

Events ถูกส่งผ่าน:

- `McApiEventRequestPacket`
- `VcEventRequestPacket`

## Entity properties

ใช้ packet ต่อไปนี้แทนเส้นทาง cave/muffle factor แบบเก่า:

- `McApiSetEntityPropertyRequestPacket`
- `VcSetPropertyRequestPacket`
- `McApiOnEntityPropertyUpdatedPacket`
- `VcOnEntityPropertyUpdatedPacket`

`null` ใช้ลบ property และ update จะสร้าง `OnEntityPropertyUpdated`

## Migration

1. เลิกฟัง cave/muffle factor packets เก่า
2. อ่าน/ส่ง property packets ใหม่
3. รองรับ `EventRequest` wrappers
4. ทดสอบกับ server `1.7.x`
