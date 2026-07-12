# Runtime Overrides

Runtime overrides ใช้ปรับค่าบางอย่างตอนเริ่ม server โดยไม่แก้ config ถาวร

เหมาะกับ container, panel host หรือ CI/CD ที่ inject ค่า host/port/token จาก environment

ควรบันทึกว่าค่าไหนมาจาก config และค่าไหนถูก override เพื่อให้ debug ง่าย
