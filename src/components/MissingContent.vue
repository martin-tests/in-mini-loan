<template>
  <div class="text-center py-8">
    <BaseHeading class="mt-4">Content <i>missing</i></BaseHeading>
    <BaseButton class="mt-8" @click="$router.push('/')">Back to home page</BaseButton>
  </div>
</template>

<script setup lang="ts">
import BaseHeading from '@/components/BaseHeading.vue';
import BaseButton from '@/components/inputs/BaseButton.vue';
</script>