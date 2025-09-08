import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
  MatDialogActions,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-analisar',
  imports: [
    MatDialogContent,
    MatDialogModule,
    MatDialogTitle,
    MatIconModule,
    MatCardModule,
    MatRadioModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './analisar.component.html',
  styleUrl: './analisar.component.scss',
})
export class AnalisarComponent {
  constructor(
    public dialogRef: MatDialogRef<AnalisarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  imprimirAnalise() {
    // Abre a janela de impressão padrão do navegador
    window.print();
  }
  fechar() {
    this.dialogRef.close();
  }
}
