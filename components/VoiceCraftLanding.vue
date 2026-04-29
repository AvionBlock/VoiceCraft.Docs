<script setup lang="ts">
import { computed } from "vue";

type Slide = {
  title: string;
  description: string;
  image: string;
};

const { t, locale } = useI18n();

const landingTitle = computed(() => t("landing.title"));
const landingDescription = computed(() => t("landing.subtitle"));

defineOgImage("Landing", {
  title: computed(() => landingTitle.value.slice(0, 60)),
  description: landingDescription,
});

const quickStartPath = computed(() =>
  locale.value === "ru" ? "/ru/start/quick-start" : "/en/start/quick-start",
);
const downloadPath = computed(() =>
  locale.value === "ru" ? "/ru/download" : "/en/download",
);

const slideImages = [
  "/images/voicecraft/main-page.png",
  "/images/voicecraft/settings-network.png",
  "/images/voicecraft/settings-voice.png",
];

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
  <section class="vc-landing-wrap space-y-8 md:space-y-10">
    <div class="vc-hero vc-reveal rounded-2xl p-6 md:p-10">
      <div class="mx-auto max-w-4xl text-center space-y-6">
        <h1 class="nuni-800-60 tracking-tight">
          {{ landingTitle }}
        </h1>
        <p class="mx-auto max-w-3xl comf-500-20 text-muted">
          {{ landingDescription }}
        </p>
        <div class="flex flex-wrap justify-center gap-3">
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

    <div class="vc-glass vc-tour vc-reveal rounded-2xl p-5 md:p-8 space-y-5">
      <div class="flex items-center justify-between gap-3">
        <div>
          <p class="comf-500-20 uppercase tracking-wider text-violet-300/90">
            {{ t("landing.productTour") }}
          </p>
          <h2 class="nuni-800-40">
            {{ t("landing.interfaceTitle") }}
          </h2>
        </div>
        <div class="flex items-center gap-2">
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

      <div class="grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-stretch">
        <div class="space-y-3 md:pr-4 flex flex-col justify-center">
          <p class="comf-500-40">
            {{ slides[currentSlide]?.title || "" }}
          </p>
          <p class="comf-500-20 text-muted">
            {{ slides[currentSlide]?.description || "" }}
          </p>
          <div class="flex gap-2 pt-2">
            <button
              v-for="(_, index) in slides"
              :key="index"
              class="vc-dot"
              :class="{ 'vc-dot-active': currentSlide === index }"
              @click="currentSlide = index"
            />
          </div>
        </div>

        <div
          class="overflow-hidden rounded-xl border border-white/20 bg-black/30 shadow-2xl"
        >
          <div class="aspect-video">
            <img
              :key="slides[currentSlide]?.image"
              :src="slides[currentSlide]?.image"
              :alt="slides[currentSlide]?.title"
              class="h-full w-full object-cover vc-image-reveal"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
