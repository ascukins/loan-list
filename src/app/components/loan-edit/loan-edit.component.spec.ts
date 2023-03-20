import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoanEditComponent } from './loan-edit.component';
// TODO: common dependency module for tests

describe('LoanEditComponent', () => {
  let component: LoanEditComponent;
  let fixture: ComponentFixture<LoanEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoanEditComponent],
      imports: [
        RouterTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatTableModule,
        MatCardModule,
        ReactiveFormsModule,
        MatButtonModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoanEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a correct title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')).toBeTruthy();
    expect(compiled.querySelector('h3')?.textContent).toContain(
      'View of edit loan'
    );
  });

  it('should contain Save button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('button.mat-primary')).toBeTruthy();
    expect(compiled.querySelector('button.mat-primary')?.textContent).toContain(
      ' Save '
    );
  });
});
