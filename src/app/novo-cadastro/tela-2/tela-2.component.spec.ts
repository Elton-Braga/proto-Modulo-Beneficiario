import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tela2Component } from './tela-2.component';

describe('Tela2Component', () => {
  let component: Tela2Component;
  let fixture: ComponentFixture<Tela2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Tela2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tela2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
