import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { LoanDecision } from '@/types';

export const useLoanStore = defineStore('loan', () => {
  const loanDecision = ref<LoanDecision>({
    status: null,
    firstName: '',
    loanAmount: 0,
    loanPeriod: 0,
    monthlyPayment: 0
  });

  function setLoanDecision(decision: LoanDecision) {
    loanDecision.value = decision;
  }

  return {
    loanDecision,
    setLoanDecision
  };
});