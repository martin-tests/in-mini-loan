<template>
  <component :is="tag" :class="activeClass">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
const props = defineProps({
  tag: {
    type: String,
    default: 'h1',
    validator: (value: string) => ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(value)
  }
});

const classes: Record<string, string> = {
  'h1': 'font-regular font-[Bitter] text-32 leading-36 lg:text-68 lg:leading-72'
};
const activeClass = classes[props.tag];
</script>