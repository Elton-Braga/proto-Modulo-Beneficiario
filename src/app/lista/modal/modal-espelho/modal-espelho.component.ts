import { CdkAccordionModule } from '@angular/cdk/accordion';
import { Component, Inject } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MOCK_BENEFICIARIOS } from '../../MOCK_BENEFICIATIO';
import { Beneficiario } from '../../beneficiario';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-modal-espelho',
  imports: [CdkAccordionModule, MatTableModule, MatDialogModule],
  templateUrl: './modal-espelho.component.html',
  styleUrl: './modal-espelho.component.scss',
})
export class ModalEspelhoComponent {
  beneficiario: Beneficiario;

  items = ['Beneficiarios', 'Dados do Projeto'];
  expandedIndex = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Beneficiario,
    public dialogRef: MatDialogRef<ModalEspelhoComponent>
  ) {
    this.beneficiario = data;
  }

  fechar(): void {
    console.log('Fechando modal...');
    this.dialogRef.close();
  }
}
