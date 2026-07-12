# ServerProperties.json ใน 1.7

`1.7.0` เพิ่ม NAT port mapping และใช้ entity properties สำหรับ effect customization

## Port mapping fields

- `AutoOpenPort`
- `ExternalPort`
- `PortMappingLifetimeMinutes`
- `PortMappingTimeoutSeconds`

`AutoOpenPort` ใช้ `OpenPort.Net` เพื่อพยายามสร้าง mapping ชั่วคราวบน router

## VoiceCraftConfig example

```json
{
  "Port": 9050,
  "ExternalPort": 0,
  "PortMappingLifetimeMinutes": 60,
  "PortMappingTimeoutSeconds": 5,
  "AutoOpenPort": false
}
```

## DefaultAudioEffectsConfig

Effect stack ใน 1.7 สร้าง processor ต่อ entity และอ่าน property overrides ที่รองรับได้ ใช้ property model แทน cave/muffle factor packets เก่า
