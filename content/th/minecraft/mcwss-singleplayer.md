# McWss สำหรับ Singleplayer Worlds

`McWss` ใช้กับ local Bedrock world ผ่าน WebSocket และ command tunnel

1. เปิด `McWssConfig.Enabled = true`
2. ติดตั้ง `VoiceCraft.Addon.Core.McWss`
3. ใน Minecraft รัน:

```text
/connect <VOICECRAFT_HOST>:<MCWSS_PORT>
```

4. authenticate addon:

```text
/voicecraft:vcconnect <LOGIN_TOKEN>
```

สำหรับ auto-connect script ใช้:

```text
/voicecraft:vcconnect_raw "<MCWSS_HOST>" <PORT> <LOGIN_TOKEN>
```

เก็บ `voicecraft:data_tunnel` ให้ตรงกับ `McWssConfig.DataTunnelCommand`
