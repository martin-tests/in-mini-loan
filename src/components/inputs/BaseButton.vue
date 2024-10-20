<template>
  <button
    type="button"
    class="rounded-full px-4 py-2 cursor-pointer bg-plump-purple hover:bg-plump-purple-lighter focus:bg-plump-purple-lighter active:bg-plump-purple-darker disabled:cursor-not-allowed disabled:bg-[#DEDEDE] disabled:text-[#9C9C9C]"
    :disabled
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps({
  text: String,
  disabled: { type: Boolean, default: false }
});
</script>