# Upgrade Runbook สำหรับ 1.7

1. Backup `ServerProperties.json`, world และ addon/plugin code
2. ติดตั้ง `1.7.0` ใน folder ใหม่
3. Merge config และตรวจ fields ใหม่
4. อัปเดต addon/bridge ให้รองรับ event/property model
5. Start server และตรวจว่าแสดง `1.7.0`
6. เชื่อม client `1.7.x`
7. ทดสอบ bind, position updates, effects และ property overrides

## จุดที่ต้องตรวจ

- `VcEventRequestPacket`
- `McApiEventRequestPacket`
- `VcOnEntityPropertyUpdatedPacket`
- `McApiOnEntityPropertyUpdatedPacket`
- `DefaultAudioEffectsConfig`
- `AutoOpenPort`
