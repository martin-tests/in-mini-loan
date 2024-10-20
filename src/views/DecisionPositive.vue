<template>
  <main>
    <BaseCard v-if="applicationDetails" class="w-full mx-auto max-w-xl bg-white !rounded-[1rem] flex flex-col md:flex-row md:p-1">
      <div class="squircle md:hidden m-10">
        <div class="bg-[#F0F0EA] p-10">
          <img src="@/assets/images/small-loan_552x520.png" alt="">
        </div>
      </div>
      <div class="hidden md:block md:basis-1/2">
        <div class="bg-[#F0F0EA] p-10 md:rounded-l-[1rem] ">
          <img src="@/assets/images/small-loan_552x520.png" alt="">
        </div>
      </div>
      <div class="flex flex-col justify-center md:basis-1/2 md:px-10">
        <div class="text-center">
          <BaseHeading><i>Good</i> news!</BaseHeading>
          <p class="mt-2">Your loan has been approved.</p>
        </div>
        <div class="grid grid-cols-2 mt-10 border-b">
          <div class="gridcell">Loan amount</div>
          <div class="gridcell">{{ applicationDetails.loanAmount }} €</div>
          <div class="gridcell">Loan period</div>
          <div class="gridcell">{{ applicationDetails.loanPeriod }} months</div>
          <div class="gridcell">Monthly payment</div>
          <div class="gridcell">{{ applicationDetails.monthlyPayment }}</div>
        </div>
        <BaseButton class="w-full mt-10" @click="onExit">Back to home page</BaseButton>
      </div>
    </BaseCard>
    <MissingContent v-else />
  </main>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import BaseButton from '@/components/inputs/BaseButton.vue';
import BaseHeading from '@/components/BaseHeading.vue';
import BaseCard from '@/components/BaseCard.vue';
import MissingContent from '@/components/MissingContent.vue';

const router = useRouter();

const applicationDetails = window.history.state.applicationDetails;

const onExit = () => {
  router.push('/');
};
</script>

<style scoped>
.gridcell {
  @apply border-t p-2;
}
</style>