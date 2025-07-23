import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEspelhoComponent } from './modal-espelho.component';

describe('ModalEspelhoComponent', () => {
  let component: ModalEspelhoComponent;
  let fixture: ComponentFixture<ModalEspelhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalEspelhoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEspelhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
