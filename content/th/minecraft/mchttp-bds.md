# McHttp สำหรับ Bedrock Dedicated Server

`McHttp` คือวิธีแนะนำสำหรับเชื่อม BDS กับ VoiceCraft

## ตั้งค่า server

เปิด `McHttpConfig.Enabled = true` และตั้ง `McHttpConfig.Hostname` เป็น endpoint ที่ BDS เข้าถึงได้

```json
{
  "McHttpConfig": {
    "Enabled": true,
    "LoginToken": "replace-with-token",
    "Hostname": "http://0.0.0.0:9050/"
  }
}
```

## เชื่อมในเกม

```text
/voicecraft:vcconnect "http://<VOICECRAFT_HOST>:<PORT>" <LOGIN_TOKEN>
```

สำหรับ auto-connect script ใช้ raw form ได้:

```text
/voicecraft:vcconnect_raw "<VOICECRAFT_HOST>" <PORT> <LOGIN_TOKEN>
```

`Core.McHttp` จะสร้าง `http://<host>:<port>` ให้เอง
