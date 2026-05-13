<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  description?: string
  section?: string
  path?: string
}>(), {
  description: 'VoiceCraft Client/Server setup and configuration for Minecraft Bedrock.',
  section: 'Documentation',
  path: '/',
})
</script>

<template>
  <div class="og-root">
    <div class="og-grid" />
    <div class="og-glow og-glow-violet" />
    <div class="og-glow og-glow-mint" />

    <img
      src="/images/brand/voicecraft-icon.png"
      width="104"
      height="104"
      class="og-logo"
      alt=""
    >

    <div class="og-brand">
      VoiceCraft
    </div>
    <div class="og-brand-subtitle">
      Documentation
    </div>

    <div class="og-section">
      {{ section }}
    </div>

    <div class="og-kicker">
      Minecraft Bedrock proximity voice chat
    </div>
    <h1 class="og-title">
      {{ title }}
    </h1>
    <p class="og-description">
      {{ description }}
    </p>

    <div class="og-path">
      docs.voicecraft.chat{{ path }}
    </div>
    <div class="og-pill og-pill-client">
      Client
    </div>
    <div class="og-pill og-pill-server">
      Server
    </div>
    <div class="og-pill og-pill-addons">
      Addons
    </div>
  </div>
</template>

<style scoped>
.og-root {
  position: relative;
  display: flex;
  width: 1200px;
  height: 630px;
  overflow: hidden;
  background: linear-gradient(135deg, #00030c 0%, #020812 48%, #00110d 100%);
  color: #fff;
  font-family: "Segoe UI", Arial, sans-serif;
}

.og-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(95, 255, 224, 0.09) 1px, transparent 1px),
    linear-gradient(90deg, rgba(202, 137, 255, 0.08) 1px, transparent 1px);
  background-size: 56px 56px;
  opacity: 0.18;
}

.og-glow {
  position: absolute;
  border-radius: 999px;
  filter: blur(18px);
}

.og-glow-violet {
  top: -170px;
  right: -170px;
  width: 560px;
  height: 560px;
  background: radial-gradient(circle, rgba(153, 45, 253, 0.62), rgba(202, 137, 255, 0.16) 42%, transparent 68%);
}

.og-glow-mint {
  bottom: -220px;
  left: -150px;
  width: 640px;
  height: 640px;
  background: radial-gradient(circle, rgba(95, 255, 224, 0.52), rgba(95, 255, 224, 0.13) 40%, transparent 70%);
}

.og-logo {
  position: absolute;
  top: 46px;
  left: 58px;
  display: block;
  width: 104px;
  height: 104px;
}

.og-brand {
  position: absolute;
  top: 64px;
  left: 218px;
  color: #fff;
  font-family: Arial, "Segoe UI", sans-serif;
  font-size: 35px;
  font-weight: 700;
  line-height: 1.12;
}

.og-brand-subtitle,
.og-section,
.og-kicker,
.og-path,
.og-pill {
  color: rgba(226, 232, 240, 0.82);
  font-family: "Comfortaa", "Segoe UI", Arial, sans-serif;
}

.og-brand-subtitle {
  position: absolute;
  top: 116px;
  left: 220px;
  font-family: Arial, "Segoe UI", sans-serif;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.og-section {
  position: absolute;
  top: 67px;
  right: 70px;
  max-width: 420px;
  border: 1px solid rgba(95, 255, 224, 0.24);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.055);
  padding: 13px 22px;
  font-size: 21px;
  font-weight: 800;
  text-align: right;
}

.og-kicker {
  position: absolute;
  top: 225px;
  left: 70px;
  color: #5fffe0;
  font-size: 21px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.og-title {
  position: absolute;
  top: 268px;
  left: 68px;
  width: 970px;
  margin: 0;
  color: #fff;
  font-size: 78px;
  font-weight: 900;
  line-height: 0.96;
}

.og-description {
  position: absolute;
  top: 424px;
  left: 70px;
  width: 840px;
  margin: 0;
  color: rgba(239, 245, 244, 0.84);
  font-family: "Comfortaa", "Segoe UI", Arial, sans-serif;
  font-size: 27px;
  font-weight: 600;
  line-height: 1.32;
}

.og-path {
  position: absolute;
  left: 70px;
  bottom: 54px;
  max-width: 650px;
  color: rgba(95, 255, 224, 0.92);
  font-size: 22px;
  font-weight: 800;
}

.og-pill {
  position: absolute;
  bottom: 52px;
  height: 46px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.055);
  font-family: "Segoe UI", Arial, sans-serif;
  font-size: 17px;
  font-weight: 700;
  line-height: 46px;
  text-align: center;
}

.og-pill-client {
  right: 282px;
  width: 88px;
}

.og-pill-server {
  right: 176px;
  width: 88px;
}

.og-pill-addons {
  right: 70px;
  width: 88px;
}
</style>
