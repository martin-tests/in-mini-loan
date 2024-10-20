export interface ApplicationForm {
  firstName: { value: string; error: string };
  lastName: { value: string; error: string };
  mobileNumber: { value: string; error: string };
  email: { value: string; error: string };
  monthlyIncome: { value: string; error: string };
}

export interface LoanDecision {
  status: null | 'approved' | 'rejected';
  firstName: string;
  loanAmount: number;
  loanPeriod: number;
  monthlyPayment: number;
}