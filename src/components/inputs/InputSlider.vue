<template>
  <div class="w-full">
    <input v-model.number="model" class="rangeinput w-full" :aria-label="label" type="range" :min :max :step>
    <div class="mt-2 flex justify-between">
      <div>{{ minLabel ?? min }}</div>
      <div>{{ maxLabel ?? max }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const model = defineModel<number>();

const props = defineProps({
  label: String,
  min: Number,
  minLabel: String,
  max: Number,
  maxLabel: String,
  step: { type: Number, default: 1 }
});

const computedBackground = computed(() => {
  const activeColor = "var(--color-night-violet)";
  const inactiveColor = "rgba(33, 9, 58, 0.1)";
  const ratio = (Number(model.value) - Number(props.min)) / (Number(props.max) - Number(props.min)) * 100;
  return `linear-gradient(90deg, ${activeColor} ${ratio}%, ${inactiveColor} ${ratio}%)`;
});
</script>

<style scoped>
.rangeinput {
  @apply appearance-none h-1 bg-night-violet cursor-pointer transition delay-300 ease-linear;
  background: v-bind(computedBackground);
}

/* Thumb: for Chrome, Safari, Edge */
.rangeinput::-webkit-slider-thumb {
  @apply appearance-none w-14 h-8 rounded-full bg-[#AA93FF] bg-center bg-no-repeat bg-[url('@/assets/svg/slider-thumb.svg')] transition duration-300 hover:shadow-[0_0_0_0.5rem_rgba(170,147,255,0.12)] active:shadow-[0_0_0_0.5rem_rgba(170,147,255,0.3)];
}

/* Thumb: for Firefox */
.rangeinput::-moz-range-thumb {
  @apply appearance-none w-14 h-8 rounded-full bg-[#AA93FF] bg-center bg-no-repeat bg-[url('@/assets/svg/slider-thumb.svg')] transition duration-300 hover:shadow-[0_0_0_0.5rem_rgba(170,147,255,0.12)] active:shadow-[0_0_0_0.5rem_rgba(170,147,255,0.3)];
}
</style>