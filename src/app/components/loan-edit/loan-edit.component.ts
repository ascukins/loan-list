import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PersonalLoan } from 'src/app/models/loan';
import { LoanStoreService } from 'src/app/services/loan-store.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-loan-edit',
  templateUrl: './loan-edit.component.html',
  styleUrls: ['./loan-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoanEditComponent implements OnInit, OnDestroy {
  subscription = new Subscription();
  loanForm: FormGroup = this.buildLoanForm();

  constructor(
    public store: LoanStoreService,
    private router: Router,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.store.selectedPersonalLoan$.subscribe((loan) => {
      if (!loan) {
        this.router.navigate(['/list'], { queryParamsHandling: 'preserve' });
      } else {
        this.loanForm = this.buildLoanForm(loan);
      }
    });
  }

  getAprValidator() {
    const aprValidator: ValidatorFn = (
      control: AbstractControl
    ): ValidationErrors | null => {
      const apr = control.get('annualPercentageRate')?.value;
      const term = control.get('termMonths')?.value;
      return !this.store.isAprValidForTerm(apr, term)
        ? { aprDoesNotMatchTerm: true }
        : null;
    };
    return aprValidator;
  }

  // TODO: In real fife I would add many more validations and agree with a product owner
  // Term: number of decimal digits
  // APR: number of decimal digits
  // Address: min number of words, min length, or even split to street/city/zip/country etc
  // Name: number of words, or split first-middle-last

  buildLoanForm(loan?: PersonalLoan) {
    return this.formBuilder.group(
      {
        id: [loan?.id],
        termMonths: [
          loan?.termMonths,
          [
            Validators.min(this.store.minLoanTerm),
            Validators.max(this.store.maxLoanTerm),
          ],
        ],
        annualPercentageRate: [
          loan?.annualPercentageRate,
          [Validators.max(this.store.maxApr)],
        ],
        customer: this.formBuilder.group({
          name: [
            loan?.customer.name,
            [
              Validators.required,
              Validators.minLength(this.store.nameMinLength),
            ],
          ],
          address: [
            loan?.customer.address,
            [Validators.maxLength(this.store.addressMaxLength)],
          ],
          annualNetIncome: [loan?.customer.annualNetIncome],
        }),
      },
      {
        validators: [this.getAprValidator()],
        updateOn: 'change',
      }
    );
  }

  handleFormCancel() {
    this.store.setSelectedLoan(null);
  }
  handleFormSubmit() {
    this.store.updatePersonalLoan(this.loanForm.value);
    this.store.setSelectedLoan(null);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
