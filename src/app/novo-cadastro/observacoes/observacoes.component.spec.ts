import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservacoesComponent } from './observacoes.component';

describe('ObservacoesComponent', () => {
  let component: ObservacoesComponent;
  let fixture: ComponentFixture<ObservacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObservacoesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObservacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
