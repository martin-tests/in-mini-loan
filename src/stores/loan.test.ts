import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useLoanStore } from './loan';
import type { LoanDecision } from '@/types';

// loan.test.ts

describe('useLoanStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should have the correct initial state', () => {
    const store = useLoanStore();
    expect(store.loanDecision).toEqual({
      status: null,
      firstName: '',
      loanAmount: 0,
      loanPeriod: 0,
      monthlyPayment: 0
    });
  });

  it('should set loan decision correctly', () => {
    const store = useLoanStore();
    const decision: LoanDecision = {
      status: 'approved',
      firstName: 'John',
      loanAmount: 10000,
      loanPeriod: 12,
      monthlyPayment: 850
    };
    store.setLoanDecision(decision);
    expect(store.loanDecision).toEqual(decision);
  });
});