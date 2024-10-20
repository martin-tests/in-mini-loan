<template>
  <div class="relative py-4">
    <label :for="id" class="bg-white font-regular absolute top-2 ml-4 px-2 py-[1px] rounded-md text-12 leading-18">{{ label }}</label>
    <select :id v-model="model" :disabled class="h-[3rem] px-4 text-base leading-24 rounded-[0.75rem] w-full border-[#60378B] border focus:border-2 focus:outline-none invalid:border-[#EB5757] invalid:border-2">
      <option v-for="option in options" :key="option.value" :value="option">{{ option.label }}</option>
    </select>
    <IconDropdown class="absolute top-7 right-2 pointer-events-none" />
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { generateUuid } from '@/utils/helpers';
import IconDropdown from '@/components/icons/IconDropdown.vue';

export interface SelectOption {
  value: string | number;
  label: string;
}

const model = defineModel<SelectOption>();

defineProps({
  options: Array as PropType<SelectOption[]>,
  label: String,
  disabled: { type: Boolean, default: false }
});

const id = generateUuid('select');
</script>

<style scoped>
select {
  -moz-appearance:none !important;
  -webkit-appearance: none !important; 
  appearance: none !important;
  padding-right: 2rem !important;
}
</style>