# GeyserVoice: Proxy

ใช้รูปแบบ proxy เมื่อ network มีหลาย backend และต้องการรวม state ก่อนส่งเข้า VoiceCraft

ให้ proxy เป็นเจ้าของ connection หลักไปยัง VoiceCraft และให้ backend ส่งข้อมูลผ่านระบบที่ออกแบบไว้ หลีกเลี่ยงหลาย node แข่งกันเป็น owner เดียวกัน
