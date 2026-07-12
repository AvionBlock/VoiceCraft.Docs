# VoiceCraft.Java Direct Paper Guide

ใช้เมื่อ Paper server ตัวเดียวต้องคุยกับ VoiceCraft โดยตรง plugin จะเชื่อมไป external backend หรือดาวน์โหลดและ start VoiceCraft เองก็ได้

```text
Paper + VoiceCraft.Java -> McTcp -> VoiceCraft.Server
VoiceCraft Client / SVC / Plasmo -> shared VoiceCraft audio bridge
```

External backend: start `VoiceCraft.Server` เอง ตั้งค่า `config.voicecraft.transport.*` และใช้ `auto-start: false`

Managed runtime: ตั้ง `config.voicecraft.auto-start: true`; files จะอยู่ใน `config.voicecraft.install-directory`

เปิด `simple-voice-chat` หรือ `plasmo` adapters เฉพาะเมื่อผู้เล่นใช้ mod เหล่านั้น
