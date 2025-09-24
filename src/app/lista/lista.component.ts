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
import { APP_BASE_HREF, NgFor, NgIf } from '@angular/common';
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
  MatDialogModule,
} from '@angular/material/dialog';
import { ModalEspelhoComponent } from './modal/modal-espelho/modal-espelho.component';
import { ModalHistoricoComponent } from './modal/modal-historico/modal-historico.component';
import { ModalRegularizacaoComponent } from './modal/modal-regularizacao/modal-regularizacao.component';
import { Beneficiario } from './beneficiario';
import { MOCK_BENEFICIARIOS } from './MOCK_BENEFICIATIO';
import { ConjugeComponent } from './modal/conjuge/conjuge.component';
import { RegularizacaoComponent } from '../novo-cadastro/regularizacao/regularizacao.component';
import { BuscaBeneficiarioService } from './servico/busca-beneficiario.service';
import { RequerimentosComponent } from './modal/requerimentos/requerimentos.component';
import { Requerimento } from './modal/requerimentos/requeurimentos';
import { RealtorioService } from './servico/realtorio.service';

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
    MatDialogModule,
    RouterLink,
  ],
  providers: [provideNgxMask(), ServicosService, provideNativeDateAdapter()],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})
export class ListaComponent implements AfterViewInit {
  baseHref = inject(APP_BASE_HREF);
  formularioBusca!: FormGroup;
  estados: any[] = [];
  municipios: any[] = [];
  estadoSelecionado: string = '';
  dialog = inject(MatDialog);
  items = ['Filtro de Busca'];
  expandedIndex = 0;

  preencher_pendencias = 'Não';

  displayedColumns: string[] = [
    'check',
    'cod_beneficiario',
    'nome_T1',
    'cpf_T1',
    'nome_T2',
    'cpf_conjuge',
    'SR',
    'Estado',
    'municipio',
    'codigo_projeto',
    'projeto',
    'lote',
    'situacao_T1',
    'data_situacao_T2',
    'Bloqueios',
    'acoes',
  ];
  //naturalidade, municipio
  colunasDisponiveis = [
    { chave: 'check', label: 'Selecionar', visivel: true },
    {
      chave: 'cod_beneficiario',
      label: 'Codigo do Beneficiario',
      visivel: true,
    },
    { chave: 'nome_T1', label: 'Nome T1', visivel: true },
    { chave: 'cpf_T1', label: 'CPF do Titular', visivel: true },
    { chave: 'nome_T2', label: 'Nome T2', visivel: true },
    { chave: 'cpf_conjuge', label: 'CPF do COnjuge', visivel: true },
    { chave: 'SR', label: 'SR', visivel: true },
    { chave: 'Estado', label: 'Estado', visivel: true },
    { chave: 'municipio', label: 'municipio', visivel: true },
    { chave: 'codigo_projeto', label: 'Código', visivel: true },
    { chave: 'projeto', label: 'Projeto', visivel: true },
    { chave: 'lote', label: 'Lote', visivel: true },
    { chave: 'situacao_T1', label: 'Situação T1', visivel: true },
    { chave: 'data_situacao_T2', label: 'Data Situação T2', visivel: true },
    { chave: 'Bloqueios', label: 'Bloqueios', visivel: true },
    { chave: 'acoes', label: 'Ações', visivel: true },
  ];

  //dataSource = new MatTableDataSource<Beneficiario>(MOCK_BENEFICIARIOS);
  dataSource = new MatTableDataSource<Beneficiario>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  selection = new SelectionModel<Beneficiario>(true, []);
  form!: FormGroup;
  codigo_beneficiario: any;
  codigo_peojeto: any;
  cpf: any;
  ordem: any;
  check: any;

  toppings = new FormControl('');
  sr: string[] = ['SR-01', 'SR-02', 'SR-03', 'SR-04', 'SR-05'];
  situacao: string[] = [
    'assentado',
    'evadido',
    'desistente',
    'regularizado',
    'bloqueado',
    'irregular',
  ];

  dadosOriginais = [...MOCK_BENEFICIARIOS];
  resultados: any[] = [];
  beneficiarios = [...MOCK_BENEFICIARIOS];
  constructor(
    private relatorioService: RealtorioService,
    private router: Router,
    fb: FormBuilder,
    private servicosService: ServicosService,
    private searchService: BuscaBeneficiarioService //private location: Location
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
      data_final_situacao: [],
      situacao: [],
      numero_processo: [''],
    });
  }

  ngOnInit() {
    this.carregarEstados();
    // inicia tabela totalmente vazia
    this.dataSource.data = [];
  }

  removerMascara(cpf: string): string {
    return cpf ? cpf.replace(/\D/g, '') : '';
  }

  pesquisar() {
    const filtros = this.form.value;

    this.dataSource.data = this.dadosOriginais.filter((item) => {
      const matchCodigo = filtros.codigo_beneficiario
        ? item.codigo_beneficiario
            ?.toString()
            .includes(filtros.codigo_beneficiario) ||
          item.cod_beneficiario
            ?.toString()
            .includes(filtros.codigo_beneficiario)
        : true;

      const matchCpf = filtros.cpf
        ? this.removerMascara(item.cpf_T1)?.includes(
            this.removerMascara(filtros.cpf)
          ) ||
          this.removerMascara(item.cpf_conjuge)?.includes(
            this.removerMascara(filtros.cpf)
          )
        : true;

      const matchNome = filtros.nome_beneficiario
        ? item.nome_T1
            ?.toLowerCase()
            .includes(filtros.nome_beneficiario.toLowerCase()) ||
          item.nome_T2
            ?.toLowerCase()
            .includes(filtros.nome_beneficiario.toLowerCase())
        : true;

      const matchEstado = filtros.estados
        ? item.estados === filtros.estados
        : true;

      const matchMunicipio = filtros.municipios
        ? item.codigo_municipio?.toString() === filtros.municipios.toString()
        : true;

      const matchSR = filtros.sr?.length ? filtros.sr.includes(item.sr) : true;

      const matchProjeto = filtros.nome_projeto
        ? item.projeto
            ?.toLowerCase()
            .includes(filtros.nome_projeto.toLowerCase())
        : true;

      const matchCodProjeto = filtros.codigo_projeto
        ? item.codigo_projeto
            ?.toLowerCase()
            .includes(filtros.codigo_projeto.toLowerCase())
        : true;

      //codigo_projeto

      const matchLote = filtros.lote
        ? item.lote?.toString() === filtros.lote.toString()
        : true;

      const matchSituacao = filtros.situacao
        ? item.situacao_T1 === filtros.situacao ||
          item.situacao_T2 === filtros.situacao
        : true;

      // 🔎 Busca por numero_processo (string ou array)
      const matchNumeroProcesso = filtros.numero_processo
        ? Array.isArray(item.numero_processo)
          ? item.numero_processo.some((proc) =>
              proc.toLowerCase().includes(filtros.numero_processo.toLowerCase())
            )
          : item.numero_processo
              ?.toLowerCase()
              .includes(filtros.numero_processo.toLowerCase())
        : true;

      return (
        matchCodigo &&
        matchCpf &&
        matchNome &&
        matchEstado &&
        matchMunicipio &&
        matchSR &&
        matchCodProjeto &&
        matchProjeto &&
        matchLote &&
        matchSituacao &&
        matchNumeroProcesso
      );
    });
    //this.dataSource.data = resultados; // só agora popula
  }

  limpar() {
    this.form.reset();
    this.dataSource.data = []; // garante que tabela fica vazia ao limpar
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

  openDialogHistorico(elemento: Beneficiario) {
    const dialogRef = this.dialog.open(ModalHistoricoComponent, {
      width: '90vw',
      height: '90vh',
      maxWidth: 'none',
      data: {
        historicoPNRA: elemento.historico_PNRA, // <<< envia somente o histórico do beneficiário selecionado
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogDetalhar(elemento: Beneficiario) {
    const dialogRef = this.dialog.open(ModalRegularizacaoComponent, {
      width: '90vw',
      maxWidth: 'none',
      panelClass: 'custom-dialog-container',
      data: elemento, // <-- Aqui está a passagem do dado
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogSucessaoLote(elemento: Beneficiario) {
    const dialogRef = this.dialog.open(RegularizacaoComponent, {
      width: '90vw',
      maxWidth: 'none',
      height: '90vh',
      panelClass: 'custom-dialog-container',
      data: elemento, // <-- Aqui está a passagem do dado
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  //RegularizacaoComponent

  openDialogInclusaoConjuge(elemento: Beneficiario) {
    const dialogRef = this.dialog.open(ConjugeComponent, {
      width: '90vw',
      maxWidth: 'none',
      panelClass: 'custom-dialog-container',
      data: elemento, // <-- Aqui está a passagem do dado
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogRequerimentos(elemento: Beneficiario) {
    const dialogRef = this.dialog.open(RequerimentosComponent, {
      width: '90vw',
      maxWidth: 'none',
      panelClass: 'custom-dialog-container',
      data: elemento, // <-- Aqui está a passagem do dado
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

  carregarMunicipiosPorEstado(idEstado: any): void {
    if (!idEstado) return;

    this.servicosService.getMunicipiosPorUF(idEstado).subscribe({
      next: (dados) => (this.municipios = dados),
      error: (erro) => console.error('Erro ao carregar municípios:', erro),
    });
  }

  executarAcao(acao: string, elemento: Beneficiario) {
    console.log(`Ação "${acao}" executada para CPF ${elemento.nome_T1}`);

    // Aqui você pode redirecionar, abrir modal, etc.
    switch (acao) {
      case 'Editar':
        const {
          nome_T1,
          cpf_T1,
          nome_T2,
          numero_processo,
          codigo_beneficiario,
          email,
          telefone,

          // Novos campos adicionados:
          data_nascimento,
          estado_civil,
          falecido,
          data_falecimento,
          nome_pai,
          nome_mae,
          nacionalidade,
          naturalidade,
          municipio,
          codigo_municipio,
          tipo_documento,
          numero_documento,
          orgao_emissor,
          uf_orgao,
          numero_nis,
          data_homologacao_Titular,
          data_situacao_Conjuge,
          data_situacao_Titular,
          data_homologacao_conjuge,

          situacao_Titular,
          situacao_conjuge,

          aptoPNRA_conjuge,
          tipo_lote,
          area_lote,
          numero_lote,
          codigo_SNCR,
          denominacao_Gleba,
          denominacao_lote,
          observacao,
          data_observacao,
          municipios,
          estados,
          apto_para_beneficiario,
          motivo_situacao,
          bloqueios,
          tela_lote,
        } = elemento;

        this.router.navigate(['/novo'], {
          state: {
            nome: nome_T1,
            cpf: cpf_T1,
            nome_T2,
            numero_processo,
            codigo_beneficiario,
            email,
            telefone,
            data_nascimento,
            estado_civil,
            falecido,
            data_falecimento,
            nome_pai,
            nome_mae,
            nacionalidade,
            naturalidade,
            municipio,
            codigo_municipio,
            tipo_documento,
            numero_documento,
            orgao_emissor,
            uf_orgao,
            numero_nis,
            data_homologacao_Titular,
            data_situacao_Conjuge,
            data_situacao_Titular,
            data_homologacao_conjuge,
            situacao_Titular,
            situacao_conjuge,
            aptoPNRA_conjuge,
            tipo_lote,
            area_lote,
            numero_lote,
            codigo_SNCR,
            denominacao_Gleba,
            denominacao_lote,
            observacao,
            data_observacao,
            municipios,
            estados,
            apto_para_beneficiario,
            motivo_situacao,
            dependentes: elemento.dependentes ?? [],
            bloqueios: elemento.bloqueios ?? [],
            tela_lote: elemento.tela_lote ?? [],
          },
        });
        break;

      case 'Histórico do PNRA':
        this.openDialogHistorico(elemento);

        break;
      case 'Espelho do Beneficiário':
        this.openDialogEspelho(elemento);

        break;

      case 'Inclusão/Alteração de Cônjuge':
        this.openDialogInclusaoConjuge(elemento);
        break;

      case 'Requerimentos':
        window.open(
          'https://marcorapg.github.io/PGTPrototipo/autoservico/acompanharsolicitacoes',
          '_blank'
        );
        break;

      case 'Serviços':
        window.open(
          'https://marcorapg.github.io/PGTPrototipo/autoservico/criarsolicitacao',
          '_blank'
        );
        break;
    }

    console.log('nome 2:', elemento.nome_T2);
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

  gerarRelatorio() {
    const relatorio = MOCK_BENEFICIARIOS.map((b) => ({
      codigoBeneficiario: b.cod_beneficiario || b.codigo_beneficiario,
      nomeTitular: b.nome_T1,
      cpfTitular: this.hachurarCPF(b.cpf_T1),
      conjuge: b.nome_T2,
      dataHomologacao: b.data_homologacao_Titular,
      numeroLote: b.numero_lote,
    }));

    localStorage.setItem('dadosRelatorio', JSON.stringify(relatorio));

    // ✅ Corrigido: usa o APP_BASE_HREF diretamente
    const url = `${window.location.origin}${this.baseHref}relatorio`;

    // 🔥 Agora isso funciona no GitHub Pages
    window.open(`${window.location.origin}${this.baseHref}relatorio`, '_blank');
    //window.open(url, '_blank');
  }

  hachurarCPF(cpf: string): string {
    if (!cpf || cpf.length < 11) return cpf;
    const cpfNumerico = cpf.replace(/\D/g, '');
    return `***.***.${cpfNumerico.slice(6, 9)}-${cpfNumerico.slice(9)}`;
  }
}
