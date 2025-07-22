import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
} from '@angular/core';
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
  ReactiveFormsModule,
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
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ServicosService } from '../novo-cadastro/tela-1/servico/servicos.service';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

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
    CdkAccordionModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDatepickerModule,
  ],
  providers: [provideNgxMask(), ServicosService, provideNativeDateAdapter()],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaComponent implements AfterViewInit {
  formularioBusca!: FormGroup;
  estados: any[] = [];
  municipios: any[] = [];
  estadoSelecionado: string = '';

  items = ['Filtro de Busca'];
  expandedIndex = 0;

  displayedColumns: string[] = [
    'check',
    'nome_T2',
    'periodo_regularizacao',
    'codigo_projeto',
    'nome_T1',
    'acoes',
  ];

  colunasDisponiveis = [
    { chave: 'check', label: 'Selecionar', visivel: true },
    { chave: 'nome_T2', label: 'CPF', visivel: true },
    {
      chave: 'periodo_regularizacao',
      label: 'Data de Transferência',
      visivel: true,
    },
    { chave: 'codigo_projeto', label: 'Código', visivel: true },
    { chave: 'nome_T1', label: 'Projeto', visivel: true },
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
  sr: string[] = ['021', '002', '003', '004', '005'];
  situacao: string[] = [
    'Em andamento',
    'Atualizado',
    'Cancelado',
    'Em Análise',
  ];

  constructor(
    private router: Router,
    fb: FormBuilder,
    private servicosService: ServicosService
  ) {
    this.form = fb.group({
      codigo_beneficiario: [],
      codigo_projeto: [],
      cpf: [],
      ordem: [],
      tipo_busca: [],
      nome_beneficiario: [],
      estados: [],
      municipios: [],
      sr: [],
      nome_projeto: [],
      lote: [],
      data_situacao: [],
      situacao: [],
    });
  }

  ngOnInit() {
    this.carregarEstados();
  }

  trackByValue(index: number, item: any): string {
    return item.value;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.atualizarColunasVisiveis();
  }

  carregarEstados(): void {
    this.servicosService.getEstados().subscribe({
      next: (dados) => (this.estados = dados),
      error: (erro) => console.error('Erro ao carregar estados:', erro),
    });
  }

  carregarMunicipiosPorEstado(siglaEstado: string): void {
    if (!siglaEstado) return;

    this.servicosService.getMunicipiosPorUF(siglaEstado).subscribe({
      next: (dados) => (this.municipios = dados),
      error: (erro) => console.error('Erro ao carregar municípios:', erro),
    });
  }

  formatarData(dataNumerica: number): string {
    const str = dataNumerica.toString();
    const ano = +str.substring(0, 4);
    const mes = +str.substring(4, 6) - 1;
    const dia = +str.substring(6, 8);
    const data = new Date(ano, mes, dia);
    return new Intl.DateTimeFormat('pt-BR').format(data);
  }

  executarAcaoParaRotas(acao: string, element: any) {}

  executarAcao(acao: string, elemento: Beneficiario) {
    console.log(`Ação "${acao}" executada para CPF ${elemento.nome_T1}`);
    // Aqui você pode redirecionar, abrir modal, etc.
    switch (acao) {
      case 'Editar':
        this.router.navigate(['novo']);
        break;
      case 'Visualizar':
        // lógica para visualizar
        break;
      case 'Histórico':
        // lógica para histórico
        break;
      case 'Espelho PDF':
        // lógica para PDF
        break;
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
  codigo_projeto: string;
  projeto: any;
  lote: number;
  nome_T1: string;
  situacao_T1: any;
  nome_T2: string;
  situacao_T2: any;
  data_situacao_T2: any;
  regularizacao: string;
  periodo_regularizacao: string;
  status: string;
  acoes: string[];
}
export const MOCK_BENEFICIARIOS: Beneficiario[] = [
  {
    check: 1,
    codigo_projeto: 'RS0195000',
    projeto: 'PA Piratini',
    lote: 101,
    nome_T1: 'João da Silva',
    situacao_T1: 'assentado',
    nome_T2: 'Maria de Souza',
    situacao_T2: 'irregular',
    data_situacao_T2: '12/04/2015',
    regularizacao: 'Assentamento',
    periodo_regularizacao: '24/11/1986',
    status: 'Deferido',
    acoes: ['Visualizar', 'Editar', 'Histórico', 'Espelho PDF'],
  },
  {
    check: 2,
    codigo_projeto: 'RS0195001',
    projeto: 'PA Piratini',
    lote: 102,
    nome_T1: 'Carlos Henrique Almeida',
    situacao_T1: 'irregular',
    nome_T2: 'Patrícia Lima',
    situacao_T2: 'assentado',
    data_situacao_T2: '03/06/2017',
    regularizacao: 'Inclusão',
    periodo_regularizacao: '12/03/2002',
    status: 'Negado',
    acoes: ['Visualizar', 'Editar', 'Histórico', 'Espelho PDF'],
  },
  {
    check: 3,
    codigo_projeto: 'RS0195002',
    projeto: 'PA Piratini',
    lote: 103,
    nome_T1: 'Ana Clara Barbosa',
    situacao_T1: 'evadido',
    nome_T2: 'Pedro Martins',
    situacao_T2: 'enviado',
    data_situacao_T2: '15/09/2010',
    regularizacao: 'Transferido',
    periodo_regularizacao: '03/05/1998',
    status: 'Em Análise',
    acoes: ['Visualizar', 'Editar', 'Histórico', 'Espelho PDF'],
  },
  {
    check: 4,
    codigo_projeto: 'RS0195003',
    projeto: 'PA Piratini',
    lote: 104,
    nome_T1: 'Bruna Reis Andrade',
    situacao_T1: 'enviado',
    nome_T2: 'Tiago Carvalho',
    situacao_T2: 'irregular',
    data_situacao_T2: '28/07/2012',
    regularizacao: 'Falecimento',
    periodo_regularizacao: '15/08/2001',
    status: 'Suspenso',
    acoes: ['Visualizar', 'Editar', 'Histórico', 'Espelho PDF'],
  },
  {
    check: 5,
    codigo_projeto: 'RS0195004',
    projeto: 'PA Piratini',
    lote: 105,
    nome_T1: 'Felipe Augusto Nunes',
    situacao_T1: 'assentado',
    nome_T2: 'Juliana Ramos',
    situacao_T2: 'assentado',
    data_situacao_T2: '04/12/2019',
    regularizacao: 'Desistente',
    periodo_regularizacao: '01/04/2004',
    status: 'Cancelado',
    acoes: ['Visualizar', 'Editar', 'Histórico', 'Espelho PDF'],
  },
  {
    check: 6,
    codigo_projeto: 'RS0195005',
    projeto: 'PA Piratini',
    lote: 106,
    nome_T1: 'Rafael Silveira Gomes',
    situacao_T1: 'enviado',
    nome_T2: 'Fernanda Costa',
    situacao_T2: 'evadido',
    data_situacao_T2: '10/10/2020',
    regularizacao: 'Assentamento',
    periodo_regularizacao: '18/10/2003',
    status: 'Deferido',
    acoes: ['Visualizar', 'Editar', 'Histórico', 'Espelho PDF'],
  },
  {
    check: 7,
    codigo_projeto: 'RS0195006',
    projeto: 'PA Piratini',
    lote: 107,
    nome_T1: 'Camila Teixeira Rocha',
    situacao_T1: 'assentado',
    nome_T2: 'Lucas Rocha',
    situacao_T2: 'irregular',
    data_situacao_T2: '20/05/2018',
    regularizacao: 'Transferido',
    periodo_regularizacao: '02/09/2002',
    status: 'Negado',
    acoes: ['Visualizar', 'Editar', 'Histórico', 'Espelho PDF'],
  },
  {
    check: 8,
    codigo_projeto: 'RS0195007',
    projeto: 'PA Piratini',
    lote: 108,
    nome_T1: 'Letícia Moura Leal',
    situacao_T1: 'irregular',
    nome_T2: 'Bruno Farias',
    situacao_T2: 'assentado',
    data_situacao_T2: '11/01/2022',
    regularizacao: 'Inclusão',
    periodo_regularizacao: '19/01/2010',
    status: 'Em Análise',
    acoes: ['Visualizar', 'Editar', 'Histórico', 'Espelho PDF'],
  },
  {
    check: 9,
    codigo_projeto: 'RS0195008',
    projeto: 'PA Piratini',
    lote: 109,
    nome_T1: 'Érica Silva Cunha',
    situacao_T1: 'evadido',
    nome_T2: 'André Souza',
    situacao_T2: 'enviado',
    data_situacao_T2: '08/08/2016',
    regularizacao: 'Falecimento',
    periodo_regularizacao: '30/07/1999',
    status: 'Suspenso',
    acoes: ['Visualizar', 'Editar', 'Histórico', 'Espelho PDF'],
  },
  {
    check: 10,
    codigo_projeto: 'RS0195009',
    projeto: 'PA Piratini',
    lote: 110,
    nome_T1: 'Hugo Carvalho Neves',
    situacao_T1: 'assentado',
    nome_T2: 'Tatiane Lopes',
    situacao_T2: 'assentado',
    data_situacao_T2: '17/02/2023',
    regularizacao: 'Desistente',
    periodo_regularizacao: '12/12/2008',
    status: 'Cancelado',
    acoes: ['Visualizar', 'Editar', 'Histórico', 'Espelho PDF'],
  },
  // Registros 11 a 20 omitidos por brevidade, posso completar se desejar
];
