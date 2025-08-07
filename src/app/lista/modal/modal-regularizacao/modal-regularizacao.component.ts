import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Beneficiario } from '../../beneficiario';

@Component({
  selector: 'app-modal-regularizacao',
  imports: [],
  templateUrl: './modal-regularizacao.component.html',
  styleUrl: './modal-regularizacao.component.scss',
})
export class ModalRegularizacaoComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public dados: Beneficiario,
    private dialogRef: MatDialogRef<ModalRegularizacaoComponent>
  ) {}

  ngOnInit() {
    console.log(this.dados); // Para conferência
  }

  fechar(): void {
    this.dialogRef.close(); // Fecha a modal
  }
}
