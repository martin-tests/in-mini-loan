<template>
  <main class="bg-[#FBFBF9]">
    <BaseCard v-if="loanDecision && loanDecision.status === 'rejected'" class="bg-white text-center w-full max-w-[792px] mx-auto">
      <BaseHeading v-if="loanDecision.firstName"><i>Dear</i> {{ loanDecision.firstName }}</BaseHeading>
      <p class="text-base leading-16 mt-2">Unfortunately, your loan was denied.</p>
      <div class="text-14 leading-20 opacity-75 mt-8 border-t border-b py-4">In addition to your income and expenses, a number of other factors play a role in loan decisions.</div>
      <BaseButton class="w-full mt-8" @click="onExit">Exit</BaseButton>
    </BaseCard>
    <MissingContent v-else />
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useLoanStore } from '@/stores/loan';
import BaseHeading from '@/components/BaseHeading.vue';
import BaseButton from '@/components/inputs/BaseButton.vue';
import BaseCard from '@/components/BaseCard.vue';
import MissingContent from '@/components/MissingContent.vue';

defineProps({
  firstName: String
});

const router = useRouter();
const store = useLoanStore();

const loanDecision = store.loanDecision;

const onExit = () => {
  router.push('/');
};
</script>