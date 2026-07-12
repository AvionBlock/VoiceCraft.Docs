# Addon API

Addon API ใช้เมื่อ stock behavior ไม่พอ เช่น custom bind, custom effects, region voice หรือ fake entities

## แนวคิดหลัก

- เชื่อม transport และ authenticate
- สร้างหรือค้นหา entity
- bind player
- ส่ง position/rotation/world ID
- ใช้ packet และ event hooks เฉพาะเมื่อจำเป็น

เริ่มจาก `Basic` ก่อน แล้วค่อยเพิ่ม custom logic ทีละส่วน
