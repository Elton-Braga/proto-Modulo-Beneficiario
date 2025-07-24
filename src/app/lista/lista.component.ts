import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
  ViewEncapsulation,
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
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { ModalEspelhoComponent } from './modal/modal-espelho/modal-espelho.component';
import { ModalHistoricoComponent } from './modal/modal-historico/modal-historico.component';
import { ModalRegularizacaoComponent } from './modal/modal-regularizacao/modal-regularizacao.component';
import { Beneficiario } from './beneficiario';
import { MOCK_BENEFICIARIOS } from './MOCK_BENEFICIATIO';

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
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})
export class ListaComponent implements AfterViewInit {
  formularioBusca!: FormGroup;
  estados: any[] = [];
  municipios: any[] = [];
  estadoSelecionado: string = '';
  dialog = inject(MatDialog);
  items = ['Filtro de Busca'];
  expandedIndex = 0;

  displayedColumns: string[] = [
    'check',
    'codigo_projeto',
    'projeto',
    'lote',
    'nome_T1',
    'situacao_T1',
    'nome_T2',
    'situacao_T2',
    'data_situacao_T2',
    'regularizacao',
    'periodo_regularizacao',
    'status',
    'acoes',
  ];

  colunasDisponiveis = [
    { chave: 'check', label: 'Selecionar', visivel: true },
    { chave: 'codigo_projeto', label: 'Código', visivel: true },
    { chave: 'projeto', label: 'Projeto', visivel: true },
    { chave: 'lote', label: 'Lote', visivel: true },
    { chave: 'nome_T1', label: 'Nome T1', visivel: true },
    { chave: 'situacao_T1', label: 'Situação T1', visivel: true },
    { chave: 'nome_T2', label: 'Nome T2', visivel: true },
    { chave: 'situacao_T2', label: 'Situação T2', visivel: true },
    { chave: 'data_situacao_T2', label: 'Data Situação T2', visivel: true },
    { chave: 'regularizacao', label: 'Regularização', visivel: true },
    { chave: 'periodo_regularizacao', label: 'Período', visivel: true },
    { chave: 'status', label: 'Status', visivel: true },
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

  openDialogEspelho(elemento: Beneficiario) {
    const dialogRef = this.dialog.open(ModalEspelhoComponent, {
      width: '90vw',
      height: '90vh',
      maxWidth: 'none',
      data: elemento, // <<<< Aqui você envia o objeto
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogHistorico() {
    const dialogRef = this.dialog.open(ModalHistoricoComponent, {
      width: '90vw',
      height: '90vh',
      maxWidth: 'none',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogRegularizacao() {
    const dialogRef = this.dialog.open(ModalRegularizacaoComponent, {
      width: '90vw',
      maxWidth: 'none',
      panelClass: 'custom-dialog-container',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
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

  executarAcao(acao: string, elemento: Beneficiario) {
    console.log(`Ação "${acao}" executada para CPF ${elemento.nome_T1}`);
    // Aqui você pode redirecionar, abrir modal, etc.
    switch (acao) {
      case 'Editar':
        this.router.navigate(['novo']);
        break;
      case 'Visualizar':
        this.openDialogRegularizacao();
        // lógica para visualizar
        break;
      case 'Histórico':
        this.openDialogHistorico();
        // lógica para histórico
        break;
      case 'Espelho PDF':
        this.openDialogEspelho(elemento);
        // lógica para PDF
        break;
    }
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
