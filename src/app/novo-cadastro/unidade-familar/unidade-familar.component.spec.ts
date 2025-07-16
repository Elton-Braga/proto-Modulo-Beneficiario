import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadeFamilarComponent } from './unidade-familar.component';

describe('UnidadeFamilarComponent', () => {
  let component: UnidadeFamilarComponent;
  let fixture: ComponentFixture<UnidadeFamilarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnidadeFamilarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnidadeFamilarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
