# Authentication & Trust

Transport ฝั่ง Minecraft ใช้ token เพื่อยืนยันว่า addon/plugin มีสิทธิ์ส่ง state เข้า server

## Token ที่พบบ่อย

- `McHttpConfig.LoginToken`
- `McWssConfig.LoginToken`
- `McTcpConfig.LoginToken`

เก็บ token เป็นความลับ และเปลี่ยนเมื่อสงสัยว่ารั่ว
