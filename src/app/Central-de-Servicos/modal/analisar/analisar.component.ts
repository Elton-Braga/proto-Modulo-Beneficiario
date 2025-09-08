import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle,
  MatDialogActions,
} from '@angular/material/dialog';

@Component({
  selector: 'app-analisar',
  imports: [
    MatDialogContent,
    MatDialogModule,
    MatDialogTitle,
    MatDialogActions,
  ],
  templateUrl: './analisar.component.html',
  styleUrl: './analisar.component.scss',
})
export class AnalisarComponent {
  constructor(
    public dialogRef: MatDialogRef<AnalisarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  fechar() {
    this.dialogRef.close();
  }
}
