# VoiceCraft.Addon

`VoiceCraft.Addon` เชื่อม Bedrock world กับ `VoiceCraft.Server` ผ่าน `McHttp` หรือ `McWss`

## Packages

- `Basic`: bind flow, settings UI และ voice indicators
- `Core.McHttp`: HTTP transport สำหรับ BDS
- `Core.McWss`: WebSocket/command tunnel สำหรับ local world

## Commands

- `voicecraft:vcbind <binding_key>`
- `voicecraft:vcsettings`
- `voicecraft:vcconnect <hostname> <token>`
- `voicecraft:vcconnect_raw <ip> <port> <token>`
- `voicecraft:vcconnect <token>`
- `voicecraft:data_tunnel [max_string_length] [data]`

ใช้ `vcconnect_raw` สำหรับ auto-connect เมื่อเก็บ host, port และ token แยกกัน
