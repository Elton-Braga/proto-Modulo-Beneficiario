import { CdkAccordionModule } from '@angular/cdk/accordion';
import { Component, Inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MOCK_BENEFICIARIOS } from '../../MOCK_BENEFICIATIO';
import { Beneficiario } from '../../beneficiario';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-espelho',
  imports: [CdkAccordionModule, MatTableModule],
  templateUrl: './modal-espelho.component.html',
  styleUrl: './modal-espelho.component.scss',
})
export class ModalEspelhoComponent {
  beneficiario: Beneficiario;

  items = ['Beneficiario 1', 'Beneficiario 2'];
  expandedIndex = 0;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Beneficiario) {
    this.beneficiario = data;
  }
}
