import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolIntroductionComponent } from './school-introduction.component';

describe('SchoolIntroductionComponent', () => {
  let component: SchoolIntroductionComponent;
  let fixture: ComponentFixture<SchoolIntroductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SchoolIntroductionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SchoolIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
