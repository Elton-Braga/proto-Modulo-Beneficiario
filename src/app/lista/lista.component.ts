import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { NgFor, NgIf } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxMaskConfig, NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-lista',
  imports: [
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatPaginatorModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatMenuModule,
    NgFor,
    NgIf,
    MatCheckboxModule,
    FormsModule,
    NgxMaskDirective,
  ],
  providers: [provideNgxMask()],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss',
})
export class ListaComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'check',
    'beneficiario',
    'data_transferencia',
    'codigo',
    'nome_projeto',
    'acoes',
  ];

  colunasDisponiveis = [
    { chave: 'check', label: 'Selecionar', visivel: true },
    { chave: 'beneficiario', label: 'CPF', visivel: true },
    {
      chave: 'data_transferencia',
      label: 'Data de Transferência',
      visivel: true,
    },
    { chave: 'codigo', label: 'Código', visivel: true },
    { chave: 'nome_projeto', label: 'Projeto', visivel: true },
    { chave: 'acoes', label: 'Ações', visivel: true },
  ];

  dataSource = new MatTableDataSource<Beneficiario>(MOCK_BENEFICIARIOS);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  selection = new SelectionModel<Beneficiario>(true, []);
  form!: FormGroup;
  codigo_beneficiario: any;
  codigo_peojeto: any;
  cpf: any;
  ordem: any;
  check: any;

  toppings = new FormControl('');
  tipo_busca: string[] = ['Nome do Beneficiario', 'Codigo do Beneficiario'];

  constructor(private router: Router, fb: FormBuilder) {
    this.form = fb.group({
      codigo_beneficiario: [],
      codigo_projeto: [],
      cpf: [],
      ordem: [],
      tipo_busca: [],
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.atualizarColunasVisiveis();
  }

  formatarData(dataNumerica: number): string {
    const str = dataNumerica.toString();
    const ano = +str.substring(0, 4);
    const mes = +str.substring(4, 6) - 1;
    const dia = +str.substring(6, 8);
    const data = new Date(ano, mes, dia);
    return new Intl.DateTimeFormat('pt-BR').format(data);
  }

  executarAcao(acao: string, elemento: Beneficiario) {
    console.log(`Ação "${acao}" executada para CPF ${elemento.beneficiario}`);
    // Aqui você pode redirecionar, abrir modal, etc.
    if (acao === 'editar') {
      this.router.navigate(['/novo']);
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Beneficiario): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.check + 1
    }`;
  }

  atualizarColunasVisiveis() {
    this.displayedColumns = this.colunasDisponiveis
      .filter((c) => c.visivel)
      .map((c) => c.chave);
  }
}

/*area de mock */

export interface Beneficiario {
  check: any;
  beneficiario: string;
  data_transferencia: number;
  codigo: number;
  nome_projeto: string;
  acoes: any;
}

export const MOCK_BENEFICIARIOS: Beneficiario[] = [
  {
    check: 1,
    beneficiario: '12345678900',
    data_transferencia: 20240115,
    codigo: 101,
    nome_projeto: 'Projeto Esperança',
    acoes: ['visualizar', 'editar'],
  },
  {
    check: 2,
    beneficiario: '23456789011',
    data_transferencia: 20240210,
    codigo: 102,
    nome_projeto: 'Projeto Liberdade',
    acoes: ['visualizar'],
  },
  {
    check: 3,
    beneficiario: '34567890122',
    data_transferencia: 20240305,
    codigo: 103,
    nome_projeto: 'Projeto Vida Nova',
    acoes: ['editar'],
  },
  {
    check: 4,
    beneficiario: '45678901233',
    data_transferencia: 20240401,
    codigo: 104,
    nome_projeto: 'Projeto Cidadania',
    acoes: ['visualizar', 'remover'],
  },
  {
    check: 5,
    beneficiario: '56789012344',
    data_transferencia: 20240510,
    codigo: 105,
    nome_projeto: 'Projeto Esperança',
    acoes: ['visualizar', 'editar', 'remover'],
  },
  {
    check: 6,
    beneficiario: '67890123455',
    data_transferencia: 20240612,
    codigo: 106,
    nome_projeto: 'Projeto Sementes',
    acoes: ['visualizar'],
  },
  {
    check: 7,
    beneficiario: '78901234566',
    data_transferencia: 20240720,
    codigo: 107,
    nome_projeto: 'Projeto Terra Livre',
    acoes: ['editar'],
  },
  {
    check: 6,
    beneficiario: '89012345677',
    data_transferencia: 20240830,
    codigo: 108,
    nome_projeto: 'Projeto Raízes',
    acoes: ['remover'],
  },
  {
    check: 9,
    beneficiario: '90123456788',
    data_transferencia: 20240901,
    codigo: 109,
    nome_projeto: 'Projeto Água Doce',
    acoes: ['visualizar', 'editar'],
  },
  {
    check: 10,
    beneficiario: '01234567899',
    data_transferencia: 20241015,
    codigo: 110,
    nome_projeto: 'Projeto Recomeço',
    acoes: ['visualizar'],
  },
  {
    check: 11,
    beneficiario: '11223344556',
    data_transferencia: 20240120,
    codigo: 111,
    nome_projeto: 'Projeto Horizonte',
    acoes: ['visualizar', 'remover'],
  },
  {
    check: 12,
    beneficiario: '22334455667',
    data_transferencia: 20240225,
    codigo: 112,
    nome_projeto: 'Projeto Semente Viva',
    acoes: ['editar'],
  },
  {
    check: 13,
    beneficiario: '33445566778',
    data_transferencia: 20240330,
    codigo: 113,
    nome_projeto: 'Projeto Novo Caminho',
    acoes: ['visualizar'],
  },
  {
    check: 14,
    beneficiario: '44556677889',
    data_transferencia: 20240412,
    codigo: 114,
    nome_projeto: 'Projeto Brasil Verde',
    acoes: ['editar', 'remover'],
  },
  {
    check: 15,
    beneficiario: '55667788990',
    data_transferencia: 20240518,
    codigo: 115,
    nome_projeto: 'Projeto Vale Rural',
    acoes: ['visualizar', 'editar'],
  },
  {
    check: 16,
    beneficiario: '66778899001',
    data_transferencia: 20240622,
    codigo: 116,
    nome_projeto: 'Projeto Esperança',
    acoes: ['remover'],
  },
  {
    check: 17,
    beneficiario: '77889900112',
    data_transferencia: 20240728,
    codigo: 117,
    nome_projeto: 'Projeto Liberdade',
    acoes: ['visualizar'],
  },
  {
    check: 18,
    beneficiario: '88990011223',
    data_transferencia: 20240831,
    codigo: 118,
    nome_projeto: 'Projeto Cidadania',
    acoes: ['editar'],
  },
  {
    check: 19,
    beneficiario: '99001122334',
    data_transferencia: 20240905,
    codigo: 119,
    nome_projeto: 'Projeto Raízes',
    acoes: ['visualizar', 'editar'],
  },
  {
    check: 20,
    beneficiario: '10011223345',
    data_transferencia: 20241020,
    codigo: 120,
    nome_projeto: 'Projeto Terra Livre',
    acoes: ['remover'],
  },
];
