import { Component } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RealtorioService } from '../../servico/realtorio.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-relatorio-rd',
  imports: [
    CommonModule, // necessário para *ngIf, *ngFor etc.
    MatTableModule, // necessário para mat-table, mat-cell, mat-header-cell etc.
  ],
  templateUrl: './relatorio-rd.component.html',
  styleUrl: './relatorio-rd.component.scss',
})
export class RelatorioRDComponent {
  displayedColumns: string[] = [
    'codigoBeneficiario',
    'nomeTitular',
    'cpfTitular',
    'conjuge',
    'dataHomologacao',
    'numeroLote',
  ];

  dataSource = new MatTableDataSource<any>([]);

  constructor(private relatorioService: RealtorioService) {}

  ngOnInit(): void {
    const dados = localStorage.getItem('dadosRelatorio');
    this.dataSource.data = dados ? JSON.parse(dados) : [];
  }
}
