import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { generateMockLoanArray } from '../data-mock/data-mock';
import { PersonalLoan } from '../models/loan';
import { Store } from './store';

// Since this is a test task, let's have fun and implement own state RxJs management instead of MobX or NgRx :)

interface LoansState {
  personalLoans: PersonalLoan[];
  filteredPersonalLoans: PersonalLoan[];
  filter: string;
  selectedPersonalLoan: PersonalLoan | null;
}

const initialPersonalLoans = generateMockLoanArray();

const initialState: LoansState = {
  personalLoans: initialPersonalLoans,
  filteredPersonalLoans: initialPersonalLoans,
  filter: '',
  selectedPersonalLoan: null,
};

@Injectable({
  providedIn: 'root',
})
export class LoanStoreService extends Store<LoansState> {
  // TODO: I would put this into a separate loan validation service, but don't have time for it now :)
  minLoanTerm = 12;
  maxLoanTerm = 96;
  minAprMoreThan2Y = 1.5;
  minApr2YAndLess = 1.34;
  minApr = Math.min(this.minApr2YAndLess, this.minAprMoreThan2Y);
  maxApr = 3.99;

  isAprValidForTerm = (apr: number, term: number) => {
    if (term > 24) {
      return apr >= this.minAprMoreThan2Y;
    } else {
      return apr >= this.minApr2YAndLess;
    }
  };
  nameMinLength = 3;
  addressMaxLength = 255;

  personalLoans$: Observable<PersonalLoan[]> = this.select(
    (state) => state.personalLoans
  );
  filteredPersonalLoans$: Observable<PersonalLoan[]> = this.select(
    (state) => state.filteredPersonalLoans
  );
  filter$: Observable<string> = this.select((state) => state.filter);
  selectedPersonalLoan$: Observable<PersonalLoan | null> = this.select(
    (state) => state.selectedPersonalLoan
  );
  constructor() {
    super(initialState);
  }

  filterLoans(loans: PersonalLoan[], filter: string): PersonalLoan[] {
    const upperFilter = filter.toUpperCase();
    if (!upperFilter) return loans;
    return loans.filter(
      (l) =>
        l.id.toUpperCase().includes(upperFilter) ||
        l.customer.address.toUpperCase().includes(upperFilter) ||
        l.customer.name.toUpperCase().includes(upperFilter)
    );
  }

  updatePersonalLoan(loan: PersonalLoan) {
    const personalLoans = [...this.state.personalLoans];
    const currentLoanIndex = personalLoans.findIndex((l) => l.id === loan.id);
    if (currentLoanIndex === -1) {
      personalLoans.push(loan);
    } else {
      personalLoans[currentLoanIndex] = loan;
    }
    this.setState({
      personalLoans,
      filteredPersonalLoans: this.filterLoans(personalLoans, this.state.filter),
    });
  }

  updateFilter(filter: string) {
    this.setState({
      filteredPersonalLoans: this.filterLoans(this.state.personalLoans, filter),
      filter,
    });
  }

  setSelectedLoan(loan: PersonalLoan | null) {
    this.setState({
      selectedPersonalLoan: loan,
    });
  }
}
