import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnalisarComponent } from '../analisar/analisar.component';

@Component({
  selector: 'app-cancelamentos',
  imports: [],
  templateUrl: './cancelamentos.component.html',
  styleUrl: './cancelamentos.component.scss',
})
export class CancelamentosComponent {
  constructor(
    public dialogRef: MatDialogRef<AnalisarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  fechar() {
    this.dialogRef.close();
  }
}
