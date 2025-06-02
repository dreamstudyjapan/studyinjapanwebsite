import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationEnrollmentComponent } from './application-enrollment.component';

describe('ApplicationEnrollmentComponent', () => {
  let component: ApplicationEnrollmentComponent;
  let fixture: ComponentFixture<ApplicationEnrollmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationEnrollmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
