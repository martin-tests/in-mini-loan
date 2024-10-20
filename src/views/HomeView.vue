<template>
  <main class="max-w-xl mx-auto my-4">
    <section class="bg-white py-4 flex flex-col gap-4 mx-4 md:flex-row-reverse">
      <div class="squircle w-100 md:basis-3/5 aspect-square">
        <img src="@/assets/images/IMG_0783 1.jpg" alt="">
      </div>
      <div class="squircle text-center p-8 bg-pale-khaki md:basis-2/5 flex flex-col justify-center">
        <p class="font-bold font-[Inter] text-base leading-6">Mini loan</p>
        <BaseHeading tag="h1" class="mt-4"><i>Take charge</i> of unexpected costs</BaseHeading>
        <p class="mt-2 md:mt-4">Finance unforeseen expenses with Inbank. A quick and easy application process with an instant credit decision.</p>
        <BaseButton class="w-fit my-8 mx-auto !bg-[#F0F0EA]" @click="onLinkToCalculator">Apply now</BaseButton>
      </div>
    </section>
    <section class="flex flex-col gap-4 mt-12 sm:mx-4">
      <div class="bg-light-lavender py-10 px-4 md:flex md:gap-8">
        <div class="md:flex md:flex-col md:justify-center md:text-center">
          <BaseHeading tag="h1">Calculate your <i>monthly payment</i></BaseHeading>
          <p ref="calculatorRef" class="text-base leading-24 pt-4">Estimate your monthly payments based on the chosen loan amount and time period.</p>
        </div>
        <div class="block">
          <div class="md:flex md:flex-row-reverse md:items-baseline md:gap-4">
            <InputTextNumber v-model="selectedLoanAmount" class="mt-4 md:w-48" label="Amount" :status="loanAmountStatus" type="number" :explainer="loanAmountExplainer" />
            <BaseSlider v-model="selectedLoanAmount" label="Amount" :min="minimumLoanAmount" :max="maximumLoanAmount" :step="10" />
          </div>
          <div class="md:flex md:flex-row-reverse md:items-baseline md:gap-4">
            <InputSelect v-model="selectedLoanPeriodOption" class="mt-8 md:w-48" :options="loanPeriodOptions" label="Period" />
            <BaseSlider v-model="selectedLoanPeriodIdx" class="mt-4" label="Period" :min="loanPeriodIdxs[0]" :min-label="loanPeriodOptions[0].label" :max="loanPeriodIdxs[loanPeriodIdxs.length - 1]" :max-label="loanPeriodOptions[loanPeriodOptions.length -1].label" :step="1" />
          </div>
          <p class="mt-8 text-center text-base leading-24">Monthly payment</p>
          <p class="mt-2 font-[Bitter] text-center text-32 leading-34 lg:text-68 lg:leading-72">{{ formatNumberWithCurrency(calculatedMonthlyPayment) }}</p>
          <div class="my-8 text-center">
            <BaseButton @click="isFormVisible = true">Apply now</BaseButton>
          </div>
          <p class="text-12 leading-16 opacity-60">The calculation is approximate and may differ from the conditions offered to you. Please submit a loan application to receive a personal offer. Financial services are provided by AS Inbank Finance.</p>
        </div>
      </div>
    </section>
    <BaseModal v-if="isFormVisible" class="md:p-6" title="Personal details" confirm-label="Submit" @close="closeForm" @confirm="onSubmitApplication">
      <form class="mt-4">
        <InputTextNumber v-model="form.firstName.value" label="First name" type="text" :status="form.firstName.error ? 'error' : 'enabled'" :explainer="form.firstName.error" explainer-if-empty-on-blur="Enter your first name" />
        <InputTextNumber v-model="form.lastName.value" label="Last name" type="text" explainer-if-empty-on-blur="Enter your last name" />
        <InputTextNumber v-model="form.mobileNumber.value" label="Mobile number" type="number" :status="form.mobileNumber.error ? 'error' : 'enabled'" :explainer="form.mobileNumber.error" explainer-if-empty-on-blur="Enter your phone number" />
        <InputTextNumber v-model="form.email.value" label="E-mail" type="email" :status="form.email.error ? 'error' : 'enabled'" :explainer="form.email.error" explainer-if-empty-on-blur="Enter your e-mail address" />
        <InputTextNumber v-model="form.monthlyIncome.value" label="Monthly income" type="number" :status="form.monthlyIncome.error ? 'error' : 'enabled'" :explainer="form.monthlyIncome.error" explainer-if-empty-on-blur="Enter your monthly income" />
      </form>
    </BaseModal>
  </main>
</template>

<script setup lang="ts">
import { computed,reactive, ref, watch, useTemplateRef } from 'vue';
import type { ApplicationForm } from '@/types';
import { useRouter } from 'vue-router';
import { useLoanStore } from '@/stores/loan';
import { formatNumberWithCurrency, validateEmail } from '@/utils/helpers';
import BaseButton from '@/components/inputs/BaseButton.vue';
import BaseSlider from '@/components/inputs/InputSlider.vue';
import InputSelect from '@/components/inputs/InputSelect.vue';
import InputTextNumber, { type InputStatus } from '@/components/inputs/InputTextNumber.vue';
import BaseHeading from '@/components/BaseHeading.vue';
import BaseModal from '@/components/modals/BaseModal.vue';

const router = useRouter();
const store = useLoanStore();

const calculatorRef = useTemplateRef('calculatorRef');

const onLinkToCalculator = () => {
  calculatorRef.value?.scrollIntoView({ behavior: 'smooth' });
};

const minimumLoanAmount = 300;
const maximumLoanAmount = 7200;
const selectedLoanAmount = ref(minimumLoanAmount);
const loanAmountStatus = ref<InputStatus>('enabled');
const loanAmountExplainer = ref<string | null>(null);

const loanPeriods = [3, 6, 9, 12, 18, 24, 36, 48];
const selectedLoanPeriod = ref(loanPeriods[loanPeriods.length - 1]);
const loanPeriodOptions = loanPeriods.map((month) => ({ value: month, label: `${month} months`}));
const selectedLoanPeriodOption = ref(loanPeriodOptions[loanPeriodOptions.length - 1]);
const loanPeriodIdxs = Array(loanPeriods.length).fill(0).map((_, idx) => idx);
const selectedLoanPeriodIdx = ref(loanPeriodIdxs[loanPeriodIdxs.length - 1]);
const calculatedMonthlyPayment = computed(() => selectedLoanAmount.value / selectedLoanPeriod.value);

const isFormVisible = ref(false);

const form = reactive<ApplicationForm>({
  firstName: { value: '', error: '' },
  lastName: { value: '', error: '' },
  mobileNumber: { value: '', error: '' },
  email: { value: '', error: '' },
  monthlyIncome: { value: '', error: '' }
});
const determineLoanDecision = (form: ApplicationForm) => {
  const minimumIncomeForPositiveDecision = 1000;
  const isLoanApproved = Number(form.monthlyIncome.value) >= minimumIncomeForPositiveDecision;
  return isLoanApproved;
};
const validateFormAndGiveFeedbackOnErrors = (form: ApplicationForm) => {
  const minimumIncome = 100;
  const areAllFieldsFilled = Object.values(form).every((field) => field.value.toString().trim());
  if (!areAllFieldsFilled) {
    return false;
  }
  if (!(form.mobileNumber.value.toString().length === 7 || form.mobileNumber.value.toString().length === 8) || !form.mobileNumber.value.toString().startsWith('55')) {
    form.mobileNumber.error = 'Mobile number must start with 55 and be 7 or 8 digits long';
    return false;
  } else {
    form.mobileNumber.error = '';
  }
  if (!validateEmail(form.email.value)) {
    form.email.error = 'Invalid e-mail address';
    return false;
  } else {
    form.email.error = '';
  }
  if (Number(form.monthlyIncome.value) < minimumIncome) {
    form.monthlyIncome.error = `Monthly income must be at least ${minimumIncome} €`
    return false;
  } else {
    form.monthlyIncome.error = '';
  }
  return true;
};

const onSubmitApplication = () => {
  const isApplicationValid = validateFormAndGiveFeedbackOnErrors(form);
  if (!isApplicationValid) {
    return;
  }
  const isLoanApproved = determineLoanDecision(form);
  store.setLoanDecision({
    status: isLoanApproved ? 'approved' : 'rejected',
    firstName: form.firstName.value,
    loanAmount: selectedLoanAmount.value,
    loanPeriod: selectedLoanPeriod.value,
    monthlyPayment: calculatedMonthlyPayment.value
  });
  if (isLoanApproved) {
    router.push('/application-progress');
  } else {
    router.push('/application-feedback');
  }
};

const closeForm = () => {
  isFormVisible.value = false;
};

watch(selectedLoanAmount, (newVal) => {
  if (newVal < minimumLoanAmount || newVal > maximumLoanAmount) {
    loanAmountStatus.value = 'error';
    loanAmountExplainer.value = `Amount must be between ${minimumLoanAmount} and ${maximumLoanAmount}`;
  } else {
    loanAmountStatus.value = 'enabled';
    loanAmountExplainer.value = null;
  }
});

watch(selectedLoanPeriodIdx, (newVal) => {
  selectedLoanPeriod.value = loanPeriods[newVal];
  selectedLoanPeriodOption.value = loanPeriodOptions[newVal];
});

watch(selectedLoanPeriodOption, (newVal) => {
  selectedLoanPeriod.value = newVal.value;
  selectedLoanPeriodIdx.value = loanPeriods.indexOf(newVal.value);
});
</script>