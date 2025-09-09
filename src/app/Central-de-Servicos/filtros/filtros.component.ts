import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';

// Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';

// Serviço
import { ServicosService } from '../../novo-cadastro/tela-1/servico/servicos.service';
import { MOCK_BENEFICIARIOS } from '../../lista/MOCK_BENEFICIATIO';
import { Beneficiario } from '../../lista/beneficiario';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { AnalisarComponent } from '../modal/analisar/analisar.component';
import { HistoricoComponent } from '../modal/historico/historico.component';
import { DetalharComponent } from '../modal/detalhar/detalhar.component';
import { CancelamentosComponent } from '../modal/cancelamentos/cancelamentos.component';
@Component({
  standalone: true,
  selector: 'app-filtros',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // Material
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatTooltipModule,
    MatCheckboxModule,
    FormsModule,
    MatPaginatorModule,
  ],
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltrosComponent implements OnInit {
  form!: FormGroup;
  estados: any[] = [];
  municipios: any[] = [];
  srList: string[] = ['SR-01', 'SR-02', 'SR-03', 'SR-04'];
  statusList: string[] = ['Pendente', 'Em Andamento', 'Concluído', 'Cancelado'];
  tiposServico: string[] = [
    'Transferencia de Assentamento',
    'Desbloqueio',
    'Altualização de unidade familiar',
    'Atualização de dados pessoais',
    'Atualização de situação',
  ];

  displayedColumns: string[] = [
    'check',
    'numeroRequerimento',
    'dataRequerimento',
    'codigoBeneficiario',
    'cpfBeneficiario',
    'nomeBeneficiario',
    'cpfConjuge',
    'nomeConjuge',
    'sr',
    'uf',
    'projetoAssentamento',
    'tipoServico',
    'perfilSolicitante',
    'status',
    'acoes',
  ];

  colunasDisponiveis = [
    { chave: 'check', label: 'Selecionar', visivel: true },
    { chave: 'numeroRequerimento', label: 'Nº Requerimento', visivel: true },
    { chave: 'dataRequerimento', label: 'Data do Requerimento', visivel: true },
    {
      chave: 'codigoBeneficiario',
      label: 'Código do Beneficiário',
      visivel: true,
    },
    { chave: 'cpfBeneficiario', label: 'CPF do Beneficiário', visivel: true },
    { chave: 'nomeBeneficiario', label: 'Nome do Beneficiário', visivel: true },
    { chave: 'cpfConjuge', label: 'CPF do Cônjuge', visivel: true },
    { chave: 'nomeConjuge', label: 'Nome do Cônjuge', visivel: true },
    { chave: 'sr', label: 'SR', visivel: true },
    { chave: 'uf', label: 'UF', visivel: true },
    {
      chave: 'projetoAssentamento',
      label: 'Projeto de Assentamento',
      visivel: true,
    },
    { chave: 'tipoServico', label: 'Tipo de Serviço', visivel: true },
    {
      chave: 'perfilSolicitante',
      label: 'Perfil do Solicitante',
      visivel: true,
    },
    { chave: 'status', label: 'Status', visivel: true },
    { chave: 'acoes', label: 'Ações', visivel: true },
  ];

  /*dataSource = new MatTableDataSource(
    this.extrairRequerimentos(MOCK_BENEFICIARIOS)
  );*/
  dataSourceOriginal: any[] = this.extrairRequerimentos(MOCK_BENEFICIARIOS);
  selection = new SelectionModel<any>(true, []);
  private beneficiariosOriginais = MOCK_BENEFICIARIOS;

  dataSource = new MatTableDataSource(
    this.extrairRequerimentos(this.beneficiariosOriginais)
  );

  readonly dialog = inject(MatDialog);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  status = [
    'Processada',
    'Processada com pendencias',
    'Deferido',
    'Indeferido',
    'Cancelado',
  ];

  ngOnInit(): void {
    this.form = this.fb.group({
      cpf: [''],
      nome: [''],
      sr: [''],
      uf: [''],
      municipio: [''],
      projetoDeAssentamento: [''],
      numeroDoRequerimento: [''],
      dataDoRequerimento: [''],
      tipoDeServico: [''],
      status: [''],
    });

    this.carregarEstados();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(
    private fb: FormBuilder,
    private servicosService: ServicosService
  ) {}

  atualizarColunasVisiveis() {
    this.displayedColumns = this.colunasDisponiveis
      .filter((c) => c.visivel)
      .map((c) => c.chave);
  }

  extrairRequerimentos(beneficiarios: any[]): any[] {
    const requerimentos: any[] = [];
    beneficiarios.forEach((beneficiario) => {
      if (beneficiario.requerimento && beneficiario.requerimento.length > 0) {
        beneficiario.requerimento.forEach((req: any) => {
          requerimentos.push({
            numeroRequerimento: req.numerosDoRequerimento?.[0] || '',
            dataRequerimento: req.dataRequerimento || '',
            codigoBeneficiario:
              req.codigoBeneficiario || beneficiario.codigo_beneficiario,
            cpfBeneficiario: req.cpfBeneficiario || beneficiario.cpf_T1,
            nomeBeneficiario: req.nomeBeneficiario || beneficiario.nome_T1,
            cpfConjuge: req.cpfConjuge || beneficiario.cpf_conjuge,
            nomeConjuge: req.nomeConjuge || beneficiario.nome_T2,
            sr: req.sr || beneficiario.sr,
            uf: req.uf || beneficiario.estados,
            projetoAssentamento:
              req.projetoAssentamento || beneficiario.projeto,
            tipoServico: req.tipoDeServico || '',
            perfilSolicitante: req.perfilDoSolicitante || '',
            status: req.status || '',
            acoes: req.acoes || [],
          });
        });
      }
    });
    return requerimentos;
  }

  // 🔎 Método de busca
  pesquisar(): void {
    const f = this.form.value;

    const normalizar = (valor: any): string =>
      (valor || '')
        .toString()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // remove acentos
        .replace(/[^\w\s]/g, '') // remove pontuação (útil p/ CPF e nomes)
        .trim();

    // Normaliza SR: extrai apenas dígitos e padStart para 3 chars (ex: "SR-01" -> "001")
    const normalizeSR = (valor: any): string => {
      const digits = (valor || '').toString().replace(/\D/g, '');
      return digits ? digits.padStart(3, '0') : '';
    };

    const beneficiariosFiltrados = this.beneficiariosOriginais.filter(
      (b: any) => {
        // ✔ Nome (nome_T1 ou nome_T2)
        const matchNome = f.nome
          ? normalizar(b.nome_T1).includes(normalizar(f.nome)) ||
            normalizar(b.nome_T2).includes(normalizar(f.nome))
          : true;

        // ✔ CPF (cpf_T1 ou cpf_conjuge) — sem máscara
        const matchCpf = f.cpf
          ? normalizar(b.cpf_T1).includes(normalizar(f.cpf)) ||
            normalizar(b.cpf_conjuge).includes(normalizar(f.cpf))
          : true;

        // ✔ Projeto de Assentamento (campo projeto no JSON)
        const matchProjeto = f.projetoDeAssentamento
          ? normalizar(b.projeto).includes(normalizar(f.projetoDeAssentamento))
          : true;

        // ✔ SR (trata formatos diferentes: "SR-01", "01", "001" etc.)
        const matchSR = f.sr
          ? (() => {
              const filtroSRs = Array.isArray(f.sr) ? f.sr : [f.sr];
              const filtroNormalized = filtroSRs.map((s: any) =>
                normalizeSR(s)
              );
              const bsr = normalizeSR(b.sr);
              return filtroNormalized.length === 0
                ? true
                : filtroNormalized.includes(bsr);
            })()
          : true;

        // ✔ UF (tenta comparar sigla/nome/id de forma tolerante)
        const matchUf = f.uf
          ? (() => {
              const fv = f.uf?.toString().toLowerCase();
              if (!fv) return true;
              // compara com sigla ou nome (campo 'estados' no mock) ou campo 'uf' caso exista
              return (
                (b.estados &&
                  b.estados.toString().toLowerCase().includes(fv)) ||
                (b.uf && b.uf.toString().toLowerCase().includes(fv)) ||
                (b.estadoId && b.estadoId?.toString() === fv) // se você tiver id nos dados
              );
            })()
          : true;

        // ✔ Município (tolerante a nome ou código)
        const matchMunicipio = f.municipio
          ? (() => {
              const mv = f.municipio?.toString();
              if (!mv) return true;
              return (
                (b.codigo_municipio && b.codigo_municipio.toString() === mv) ||
                (b.municipio &&
                  normalizar(b.municipio).includes(normalizar(mv)))
              );
            })()
          : true;

        // 🔎 Filtros que incidem dentro de requerimento
        const reqs = b.requerimento || [];
        const algumFiltroDeReq = !!(
          f.numeroDoRequerimento ||
          f.tipoDeServico ||
          f.status ||
          f.dataDoRequerimento
        );

        // ✔ Combinação dentro do MESMO requerimento (AND entre filtros de requerimento)
        const reqMatch = reqs.some((req: any) => {
          const matchNumReq = f.numeroDoRequerimento
            ? normalizar((req.numerosDoRequerimento || []).join(' ')).includes(
                normalizar(f.numeroDoRequerimento)
              )
            : true;

          const matchTipoServico = f.tipoDeServico
            ? normalizar(req.tipoDeServico).includes(
                normalizar(f.tipoDeServico)
              )
            : true;

          const matchStatusReq = f.status
            ? normalizar(req.status).includes(normalizar(f.status))
            : true;

          // se for buscado por dataDoRequerimento, compare (assumindo que o form fornece Date ou string)
          const matchDataReq = f.dataDoRequerimento
            ? (() => {
                const filtroData = f.dataDoRequerimento;
                if (!req.dataRequerimento) return false;
                // tenta comparar strings normalizadas (caso seu formato seja dd/mm/yyyy no mock)
                return normalizar(req.dataRequerimento).includes(
                  normalizar(filtroData)
                );
              })()
            : true;

          return (
            matchNumReq && matchTipoServico && matchStatusReq && matchDataReq
          );
        });

        // ✔ Status também pode bater no topo do beneficiário (quando não há filtros de requerimento)
        const matchStatusTopo = f.status
          ? normalizar(b.status).includes(normalizar(f.status))
          : true;

        // Regra final para a parte de requerimentos:
        // - Se houver QUALQUER filtro de requerimento, exige que ALGO bata em um requerimento (reqMatch).
        // - Se não houver filtro de requerimento, aceita status no topo do beneficiário.
        const matchRequerimentos = algumFiltroDeReq
          ? reqMatch
          : matchStatusTopo;

        return (
          matchNome &&
          matchCpf &&
          matchProjeto &&
          matchSR &&
          matchUf &&
          matchMunicipio &&
          matchRequerimentos
        );
      }
    );

    // Atualiza a tabela com os requerimentos dos beneficiários filtrados
    this.dataSource.data = this.extrairRequerimentos(beneficiariosFiltrados);
    this.dataSource.paginator = this.paginator;
  }

  limpar(): void {
    this.form.reset({
      cpf: '',
      nome: '',
      sr: '',
      uf: '',
      municipio: '',
      projetoDeAssentamento: '',
      numeroDoRequerimento: '',
      dataDoRequerimento: '',
      tipoDeServico: '',
      status: '',
    });

    this.selection.clear();
    this.dataSource.data = this.extrairRequerimentos(
      this.beneficiariosOriginais
    );
    this.dataSource.paginator = this.paginator;
  }

  // Seleção
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  get hasSelection(): boolean {
    return this.selection.selected.length > 0;
  }

  // Exportar dados selecionados
  exportar(tipo: string) {
    const selecionados = this.selection.selected;
    if (selecionados.length === 0) {
      alert('Nenhum registro selecionado!');
      return;
    }

    if (tipo === 'json') {
      const jsonStr = JSON.stringify(selecionados, null, 2);
      console.log('Export JSON:', jsonStr);
    } else if (tipo === 'csv') {
      const headers = Object.keys(selecionados[0]);
      const csv = [
        headers.join(','),
        ...selecionados.map((row) =>
          headers.map((field) => row[field]).join(',')
        ),
      ].join('\n');
      console.log('Export CSV:', csv);
    } else if (tipo === 'excel') {
      console.log('Export Excel ainda não implementado');
    } else if (tipo === 'pdf') {
      console.log('Export PDF ainda não implementado');
    }
  }

  executarAcao(acao: string, elemento: Beneficiario) {
    console.log(`Ação "${acao}" executada para CPF ${elemento.cpf_T1}`);

    switch (acao) {
      case 'Detalhar':
        this.dialog.open(DetalharComponent, {
          width: '90rem',
          height: '70rem',
          maxWidth: 'none',
          data: {
            ...elemento,
            bloqueios: elemento.bloqueios || [
              // se não existir, mocka um array
              {
                descricao_bloqueio: 'Documento pendente',
                situacao_analise: 'Em análise',
                descricao_sub_bloqueio: 'Falta RG',
                desbloqueio_atendido: 'Não',
                descricao_motivo_bloqueio: 'Aguardando documentação',
              },
            ],
          },
          enterAnimationDuration: '300ms',
          exitAnimationDuration: '200ms',
        });
        break;

      case 'Historico':
        this.dialog.open(HistoricoComponent, {
          width: '90rem',
          height: '70rem',
          maxWidth: 'none',
          data: elemento,
          enterAnimationDuration: '300ms',
          exitAnimationDuration: '200ms',
        });
        break;

      case 'Analisar':
        this.dialog.open(AnalisarComponent, {
          width: '90rem',
          height: '70rem',
          maxWidth: 'none',
          data: elemento,
          enterAnimationDuration: '300ms',
          exitAnimationDuration: '200ms',
        });
        break;
      case 'Cancelar':
        this.dialog.open(CancelamentosComponent, {
          width: '50rem',
          height: '27.6rem',

          maxWidth: 'none',
          data: elemento,
          enterAnimationDuration: '300ms',
          exitAnimationDuration: '200ms',
          panelClass: 'no-scroll-dialog',
        });
        break;

      default:
        console.warn(`Ação "${acao}" não tratada ainda.`);
    }
  }

  getIcon(acao: string): string {
    switch (acao.toLowerCase()) {
      case 'detalhar':
        return 'search';
      case 'analisar':
        return 'analytics';
      case 'historico':
      case 'histórico':
        return 'history';
      case 'cancelar':
        return 'cancel';
      default:
        return 'more_horiz';
    }
  }

  // Métodos das ações
  detalhar(row: any) {
    console.log('Detalhar:', row);
  }

  analisar(row: any) {
    console.log('Analisar:', row);
  }

  historico(row: any) {
    console.log('Histórico:', row);
  }

  cancelar(row: any) {
    console.log('Cancelar:', row);
  }

  carregarEstados(): void {
    this.servicosService.getEstados().subscribe((data) => {
      this.estados = data;
    });
  }

  carregarMunicipios(event: any): void {
    const estadoId = event.value;
    this.servicosService.getMunicipiosPorUF(estadoId).subscribe((data) => {
      this.municipios = data;
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Formulário enviado:', this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
}
