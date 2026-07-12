# Packet Flow

VoiceCraft มีสอง plane:

- voice plane: client ส่ง/รับเสียงผ่าน server
- state plane: addon/plugin ส่งข้อมูล entity, position, bind และ effects

หาก client ต่อได้แต่ไม่ได้ยิน proximity ให้ตรวจ bind, positioning mode และ position updates ก่อน
