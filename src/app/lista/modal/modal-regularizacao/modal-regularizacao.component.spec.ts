import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegularizacaoComponent } from './modal-regularizacao.component';

describe('ModalRegularizacaoComponent', () => {
  let component: ModalRegularizacaoComponent;
  let fixture: ComponentFixture<ModalRegularizacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalRegularizacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalRegularizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
