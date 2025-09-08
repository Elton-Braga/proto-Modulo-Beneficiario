import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnalisarComponent } from '../analisar/analisar.component';

@Component({
  selector: 'app-detalhar',
  imports: [],
  templateUrl: './detalhar.component.html',
  styleUrl: './detalhar.component.scss',
})
export class DetalharComponent {
  constructor(
    public dialogRef: MatDialogRef<AnalisarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  fechar() {
    this.dialogRef.close();
  }
}
