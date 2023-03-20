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

import { LoansComponent } from './loans.component';

describe('LoansComponent', () => {
  let component: LoansComponent;
  let fixture: ComponentFixture<LoansComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoansComponent],
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

    fixture = TestBed.createComponent(LoansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a table', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('mat-table')).toBeTruthy();
  });

  it('should contain name column', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('mat-header-cell.mat-column-name')
    ).toBeTruthy();
    expect(
      compiled.querySelector('mat-header-cell.mat-column-name')?.textContent
    ).toContain('Name');
  });
});
