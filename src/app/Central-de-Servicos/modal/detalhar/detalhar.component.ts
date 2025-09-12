import { Component, inject, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';
import { AnalisarComponent } from '../analisar/analisar.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgFor } from '@angular/common';
import { Beneficiario } from '../../../lista/beneficiario';

@Component({
  selector: 'app-detalhar',
  imports: [MatIconModule, CommonModule, NgFor],
  standalone: true,
  templateUrl: './detalhar.component.html',
  styleUrl: './detalhar.component.scss',
})
export class DetalharComponent {
  readonly dialog = inject(MatDialog);
  constructor(
    public dialogRef: MatDialogRef<AnalisarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('Dados recebidos no Detalhar:', data);
  }
  getValorOuDefault(valor: any, defaultText: string = 'Não informado'): string {
    if (
      valor === null ||
      valor === undefined ||
      (typeof valor === 'string' && valor.trim() === '')
    ) {
      return defaultText;
    }
    return valor;
  }

  formatarData(valor: string | Date | null): string {
    if (!valor) return 'Não informado';
    const data = new Date(valor);
    return isNaN(data.getTime())
      ? 'Data inválida'
      : data.toLocaleDateString('pt-BR');
  }

  abrirDetalhar(elemento: Beneficiario) {
    console.log('clicou');

    this.dialog.open(AnalisarComponent, {
      width: '90rem',
      height: '70rem',
      maxWidth: 'none',
      data: elemento,
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '200ms',
    });
  }
  fechar() {
    this.dialogRef.close();
  }
}
