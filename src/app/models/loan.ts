export interface Customer {
  name: string;
  address: string;
  annualNetIncome: number;
}

export interface PersonalLoan {
  id: string;
  customer: Customer;
  termMonths: number;
  annualPercentageRate: number;
}
