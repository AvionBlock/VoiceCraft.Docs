# VoiceCraft.Addon สำหรับ 1.7

Addon เชื่อม Bedrock world กับ VoiceCraft ผ่าน `McHttp` หรือ `McWss` และให้ bind flow, UI, events และ packet helpers

## 1.7 สำหรับ addon developers

- low-level events ส่งผ่าน `EventRequest`
- entity properties ใช้สำหรับ custom effect values
- cave/muffle factor packets ถูกลบ
- `OnEntityPropertyUpdated` คือ event สำหรับ property changes

## Commands

- `voicecraft:vcbind <binding_key>`
- `voicecraft:vcsettings`
- `voicecraft:vcconnect <hostname> <token>` สำหรับ McHttp
- `voicecraft:vcconnect <token>` สำหรับ McWss
- `voicecraft:vcconnect_raw <ip> <port> <token>` สำหรับ auto-connect
- `voicecraft:data_tunnel [max_string_length] [data]`

## `vcconnect_raw`

```text
/voicecraft:vcconnect_raw "<IP_OR_HOST>" <PORT> "<LOGIN_TOKEN>"
```

สำหรับ `Core.McHttp` คำสั่งนี้สร้าง `http://<ip>:<port>` ภายใน สำหรับ `Core.McWss` จะส่ง host, port และ token ไปยัง WebSocket transport โดยตรง

`Basic` package ใช้ค่านี้จาก `autoConnect:ip`, `autoConnect:port` และ `autoConnect:loginKey`
