import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConjugeComponent } from './conjuge.component';

describe('ConjugeComponent', () => {
  let component: ConjugeComponent;
  let fixture: ComponentFixture<ConjugeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConjugeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConjugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
