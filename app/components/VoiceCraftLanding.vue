<script setup lang="ts">
import { computed } from "vue";

type Slide = {
  title: string;
  description: string;
  image: string;
};

const { t } = useI18n();
const localePath = useLocalePath();

const landingTitle = computed(() => t("landing.title"));
const landingDescription = computed(() => t("landing.subtitle"));

const quickStartPath = computed(() => localePath("/start/quick-start"));
const downloadPath = computed(() => localePath("/download"));

const slideImages = [
  "/images/voicecraft/main-page.png",
  "/images/voicecraft/settings-network.png",
  "/images/voicecraft/settings-voice.png",
] as const;

const slides = computed<Slide[]>(() => [
  {
    title: t("landing.slides.0.title"),
    description: t("landing.slides.0.description"),
    image: slideImages[0],
  },
  {
    title: t("landing.slides.1.title"),
    description: t("landing.slides.1.description"),
    image: slideImages[1],
  },
  {
    title: t("landing.slides.2.title"),
    description: t("landing.slides.2.description"),
    image: slideImages[2],
  },
]);

const currentSlide = ref(0);

function nextSlide() {
  if (!slides.value.length) return;
  currentSlide.value = (currentSlide.value + 1) % slides.value.length;
}

function prevSlide() {
  if (!slides.value.length) return;
  currentSlide.value =
    (currentSlide.value - 1 + slides.value.length) % slides.value.length;
}

let intervalId: ReturnType<typeof setInterval> | undefined;
onMounted(() => {
  intervalId = setInterval(nextSlide, 6000);
});
onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>

<template>
  <section class="vc-landing-wrap">
    <div class="vc-hero vc-reveal vc-landing-hero">
      <div class="vc-landing-hero-inner">
        <h1 class="nuni-800-60 vc-landing-title">
          {{ landingTitle }}
        </h1>
        <p class="comf-500-20 text-muted vc-landing-subtitle">
          {{ landingDescription }}
        </p>
        <div class="vc-landing-actions">
          <UButton
            size="xl"
            color="primary"
            trailing-icon="i-lucide-arrow-right"
            class="vc-btn-main comf-500-20"
            :to="quickStartPath"
          >
            {{ t("landing.quickStart") }}
          </UButton>
          <UButton
            size="xl"
            color="neutral"
            variant="outline"
            class="vc-btn-outline comf-500-20"
            :to="downloadPath"
          >
            {{ t("landing.downloadRelease") }}
          </UButton>
        </div>
      </div>
    </div>

    <div class="vc-glass vc-tour vc-reveal">
      <div class="vc-tour-header">
        <div>
          <p class="comf-500-20 vc-tour-eyebrow">
            {{ t("landing.productTour") }}
          </p>
          <h2 class="nuni-800-40 vc-tour-title">
            {{ t("landing.interfaceTitle") }}
          </h2>
        </div>
        <div class="vc-tour-controls">
          <UButton
            class="vc-icon-btn"
            color="neutral"
            variant="soft"
            icon="i-lucide-chevron-left"
            @click="prevSlide"
          />
          <UButton
            class="vc-icon-btn"
            color="neutral"
            variant="soft"
            icon="i-lucide-chevron-right"
            @click="nextSlide"
          />
        </div>
      </div>

      <div class="vc-tour-grid">
        <div class="vc-tour-copy">
          <p class="comf-500-40 vc-tour-slide-title">
            {{ slides[currentSlide]?.title || "" }}
          </p>
          <p class="comf-500-20 text-muted vc-tour-slide-description">
            {{ slides[currentSlide]?.description || "" }}
          </p>
          <div class="vc-tour-dots">
            <button
              v-for="(_, index) in slides"
              :key="index"
              class="vc-dot"
              :class="{ 'vc-dot-active': currentSlide === index }"
              @click="currentSlide = index"
            />
          </div>
        </div>

        <div class="vc-tour-media">
          <div class="vc-tour-aspect">
            <img
              :key="slides[currentSlide]?.image"
              :src="slides[currentSlide]?.image"
              :alt="slides[currentSlide]?.title"
              class="vc-tour-image vc-image-reveal"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
