import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunningBannerComponent } from './running-banner.component';

describe('RunningBannerComponent', () => {
  let component: RunningBannerComponent;
  let fixture: ComponentFixture<RunningBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunningBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RunningBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
