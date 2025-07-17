import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegularizacaoComponent } from './regularizacao.component';

describe('RegularizacaoComponent', () => {
  let component: RegularizacaoComponent;
  let fixture: ComponentFixture<RegularizacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegularizacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegularizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
