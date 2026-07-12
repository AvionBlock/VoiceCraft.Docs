# VoiceCraft Repository ใน 1.7

Repository หลักมี client, server, core, network, tests และ tools

Public mirror: [AvionBlock/VoiceCraft](https://github.com/AvionBlock/VoiceCraft)

## สิ่งที่เปลี่ยน

- version `1.6.1` -> `1.7.0`
- Android package version `17`
- เพิ่ม `OpenPort.Net` สำหรับ NAT port mapping
- event traffic ใช้ `EventRequest`
- entity properties แทน cave/muffle factor packets
- browser/web client ถูกลบ
- iOS ได้ privacy manifest และ sample-rate fix

ก่อน production ให้ตรวจ config และปิด `AutoOpenPort` ถ้า port ถูกจัดการภายนอกอยู่แล้ว
