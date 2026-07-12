# เริ่ม Server ครั้งแรก

เมื่อรัน `VoiceCraft.Server` ครั้งแรก ระบบจะสร้าง config และ token เริ่มต้น

ตรวจสอบว่า server start โดยไม่มี error, port ไม่ชนกับ process อื่น, token ถูกเก็บปลอดภัย และ firewall อนุญาต traffic ที่จำเป็น

ใช้ token จาก transport ที่เชื่อมจริง เช่น `McHttpConfig.LoginToken` สำหรับ BDS addon
