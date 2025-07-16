import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssentamentoComponent } from './assentamento.component';

describe('AssentamentoComponent', () => {
  let component: AssentamentoComponent;
  let fixture: ComponentFixture<AssentamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssentamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssentamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
