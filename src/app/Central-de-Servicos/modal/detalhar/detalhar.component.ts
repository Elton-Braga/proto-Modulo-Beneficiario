import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnalisarComponent } from '../analisar/analisar.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-detalhar',
  imports: [MatIconModule, CommonModule, NgFor],
  standalone: true,
  templateUrl: './detalhar.component.html',
  styleUrl: './detalhar.component.scss',
})
export class DetalharComponent {
  constructor(
    public dialogRef: MatDialogRef<AnalisarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('Dados recebidos no Detalhar:', data);
  }
  getValorOuDefault(valor: any, defaultText: string = 'Não informado'): string {
    if (valor === null || valor === undefined) {
      return defaultText;
    }
    if (typeof valor === 'string' && valor.trim() === '') {
      return defaultText;
    }
    return valor;
  }
  fechar() {
    this.dialogRef.close();
  }
}
