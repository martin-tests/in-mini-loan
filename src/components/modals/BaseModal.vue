<template>
  <div class="fixed inset-0 z-50 flex justify-center overflow-auto bg-black/[.5]">
    <div class="h-auto my-auto mx-auto p-4 md:p-8 w-full max-w-[540px] bg-white rounded-[1rem]" role="alertdialog" :aria-labelledby="modalTitleId">
      <div class="mt-2 flex justify-between">
        <h2 :id="modalTitleId" class="text-20 leading-28 font-medium">{{ title }}</h2>
        <button class="cursor-pointer" type="button" aria-label="Close" @click="$emit('close')">
          <IconClose />
        </button>
      </div>
      <slot></slot>
      <div class="w-full text-center mt-4">
        <BaseButton @click="$emit('confirm')">{{ confirmLabel }}</BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { generateUuid } from '@/utils/helpers';
import BaseButton from '@/components/inputs/BaseButton.vue';
import IconClose from '@/components/icons/IconClose.vue';

defineProps({
  title: String,
  confirmLabel: { type: String, default: 'Confirm' }
});

defineEmits(['close', 'confirm']);

const modalTitleId = generateUuid('modal-title');
</script>