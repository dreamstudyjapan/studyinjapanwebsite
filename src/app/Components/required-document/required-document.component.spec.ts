import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequiredDocumentComponent } from './required-document.component';

describe('RequiredDocumentComponent', () => {
  let component: RequiredDocumentComponent;
  let fixture: ComponentFixture<RequiredDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequiredDocumentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequiredDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
