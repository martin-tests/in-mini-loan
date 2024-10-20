<template>
  <div class="relative py-4">
    <label :for="id" class="bg-white font-regular absolute top-2 ml-4 px-2 py rounded-md text-12 leading-18 transition-all ease-linear delay-100" :class="labelClasses">{{ label }}</label>
    <input
      :id
      v-model="model"
      class="h-[3rem] px-4 text-base leading-24 rounded-[0.75rem] w-full transition-all ease-linear delay-100 border border-[#DEDEDE] hover:border-[#60378B] focus:border-2 focus:outline-none invalid:border-[#EB5757] invalid:border-2"
      :class="inputClasses"
      :type
      :min
      :max
      :placeholder
      :disabled="status === 'disabled'"
      @focus="isLabelProminent = false"
      @blur="onBlur"
    >
    <p v-if="computedExplainer" class="text-12 text-[#606060] leading-18 px-4" :class="explainerClasses">{{ computedExplainer }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { PropType } from 'vue';
import { generateUuid } from '@/utils/helpers';

export type InputStatus = 'enabled' | 'disabled' | 'error';
export type InputType = 'text' | 'number' | 'email';

const model = defineModel<string | number>();

const props = defineProps({
  status: { type: String as PropType<InputStatus>, default: 'enabled' },
  type: { type: String as PropType<InputType>, default: 'text' },
  min: Number,
  max: Number,
  label: String,
  placeholder: String,
  explainer: [String, null],
  explainerIfEmptyOnBlur: String
});

const id = generateUuid('select');

const isLabelProminent = ref(model.value ? false : true);
const computedExplainer = computed(() => props.explainerIfEmptyOnBlur && isEmptyOnBlur.value === true ? props.explainerIfEmptyOnBlur : props.explainer);
const isEmptyOnBlur = ref(false);
const isErrorState = computed(() => props.status === 'error' || isEmptyOnBlur.value);
const inputClasses = computed(() => ({'border-[#EB5757] invalid:border-2': isErrorState.value}));
const labelClasses = computed(() => ([
  {'text-[#EB5757]': isErrorState.value},
  {'top-7 !text-base !leading-24':isLabelProminent.value}
]));
const explainerClasses = computed(() => ({'text-[#EB5757]': isErrorState.value}));

const onBlur = () => {
  if (!model.value) {
    isLabelProminent.value = true;
    if (props.explainerIfEmptyOnBlur) {
      isEmptyOnBlur.value = true;
    }
  }
}

watch(model, (newVal) => {
  if (!newVal) {
    if (props.explainerIfEmptyOnBlur) {
      isEmptyOnBlur.value = true;
    }
  } else {
    isLabelProminent.value = false;
    isEmptyOnBlur.value = false;
  }
});
</script>

<style scoped>
/* Hide number input arrows in Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Hide number input arrows in Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>