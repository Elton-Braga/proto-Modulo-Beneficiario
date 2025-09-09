import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnalisarComponent } from '../analisar/analisar.component';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-historico',
  imports: [MatTableModule],
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.scss',
})
export class HistoricoComponent {
  displayedColumns = ['status', 'cpf', 'dataHora'];
  dados = [
    {
      status: 'Processado',
      cpf: '123.456.789-00',
      dataHora: '01/09/2025 14:32',
    },
    { status: 'Pendente', cpf: '987.654.321-00', dataHora: '02/09/2025 09:15' },
    {
      status: 'Em análise',
      cpf: '111.222.333-44',
      dataHora: '03/09/2025 16:48',
    },
    {
      status: 'Deferido',
      cpf: '555.666.777-88',
      dataHora: '04/09/2025 11:03',
    },
    {
      status: 'Indeferido',
      cpf: '222.333.444-55',
      dataHora: '05/09/2025 18:27',
    },
    {
      status: 'Processado com pendencias',
      cpf: '999.888.777-66',
      dataHora: '06/09/2025 08:05',
    },
  ];
  constructor(
    public dialogRef: MatDialogRef<AnalisarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  fechar() {
    this.dialogRef.close();
  }
}
