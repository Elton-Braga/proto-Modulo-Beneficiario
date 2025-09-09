import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnalisarComponent } from '../analisar/analisar.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-cancelamentos',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './cancelamentos.component.html',
  styleUrl: './cancelamentos.component.scss',
})
export class CancelamentosComponent {
  constructor(
    public dialogRef: MatDialogRef<AnalisarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  justificativa: string = '';

  onCancelar() {
    console.log('Operação cancelada');
  }

  onConfirmar() {
    console.log('Justificativa enviada:', this.justificativa);
  }

  fechar() {
    this.dialogRef.close();
  }
}
