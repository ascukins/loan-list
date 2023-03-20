import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { PersonalLoan } from 'src/app/models/loan';
import { LoanStoreService } from 'src/app/services/loan-store.service';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoansComponent implements OnDestroy {
  subscription = new Subscription();
  constructor(
    public store: LoanStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.route.queryParamMap
        .pipe(map((params: ParamMap) => params.get('filter')))
        .subscribe((filter) => this.store.updateFilter(filter || ''))
    );
  }

  applyFilter(target: any) {
    this.router.navigate([], {
      queryParams: {
        filter: String(target?.value || ''),
      },
    });
  }

  onRowClick(loan: PersonalLoan) {
    this.store.setSelectedLoan(loan);
    this.router.navigate(['/edit'], { queryParamsHandling: 'merge' });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
