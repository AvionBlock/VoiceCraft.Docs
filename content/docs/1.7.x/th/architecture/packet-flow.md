# Packet Flow ใน 1.7

## Voice flow

1. Client login ไปยัง VoiceCraft UDP server
2. Server ตรวจ version และ token/session
3. Audio packets ถูกส่งและประมวลผลตาม entity/effect state

## Event flow

ใน `1.7.0` low-level events ถูก wrap ผ่าน:

- `VcEventRequestPacket`
- `McApiEventRequestPacket`

Event สำคัญสำหรับ custom code:

- `OnEntityPropertyUpdated`
- `VcOnEntityPropertyUpdatedPacket`
- `McApiOnEntityPropertyUpdatedPacket`

## Property flow

ใช้ `SetProperty` เพื่อส่งค่า custom effect เช่น cave echo หรือ underwater muffle แทน packet แบบเก่า
