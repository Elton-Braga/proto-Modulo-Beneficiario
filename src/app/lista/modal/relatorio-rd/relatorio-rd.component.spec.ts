import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioRDComponent } from './relatorio-rd.component';

describe('RelatorioRDComponent', () => {
  let component: RelatorioRDComponent;
  let fixture: ComponentFixture<RelatorioRDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatorioRDComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatorioRDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
