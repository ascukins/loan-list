import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoanEditComponent } from './components/loan-edit/loan-edit.component';
import { LoansComponent } from './components/loans/loans.component';

const routes: Routes = [
  { path: 'list', component: LoansComponent },
  { path: 'edit', component: LoanEditComponent },
  { path: '**', redirectTo: '/list' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
