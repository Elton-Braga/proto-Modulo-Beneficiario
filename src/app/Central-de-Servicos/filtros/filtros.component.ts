import { Component, OnInit, ViewChild } from '@angular/core';
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
})
export class FiltrosComponent implements OnInit {
  form!: FormGroup;
  estados: any[] = [];
  municipios: any[] = [];
  srList: string[] = ['SR-01', 'SR-02', 'SR-03', 'SR-04'];
  statusList: string[] = ['Pendente', 'Em Andamento', 'Concluído', 'Cancelado'];
  tiposServico: string[] = [
    'Vistoria',
    'Regularização',
    'Atualização Cadastral',
    'Outro',
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

  dataSource = new MatTableDataSource(
    this.extrairRequerimentos(MOCK_BENEFICIARIOS)
  );
  dataSourceOriginal: any[] = this.extrairRequerimentos(MOCK_BENEFICIARIOS);
  selection = new SelectionModel<any>(true, []);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
    const filtros = this.form.value;

    const normalizar = (valor: any): string =>
      (valor || '')
        .toString()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // remove acentos
        .replace(/[^\w\s]/g, '') // remove pontuação (útil p/ CPF e nomes)
        .trim();

    const filtrados = this.dataSourceOriginal.filter((item) => {
      return Object.keys(filtros).every((campo) => {
        const valorFiltro = filtros[campo];
        if (!valorFiltro) return true; // ignora campo vazio
        const filtroNormalizado = normalizar(valorFiltro);

        switch (campo) {
          case 'nome': // formControlName="nome"
            return (
              normalizar(item.nome_T1).includes(filtroNormalizado) ||
              normalizar(item.nome_T2).includes(filtroNormalizado)
            );

          case 'cpf': // formControlName="cpf"
            return (
              normalizar(item.cpf_T1).includes(filtroNormalizado) ||
              normalizar(item.cpf_conjuge).includes(filtroNormalizado)
            );

          case 'projetoDeAssentamento': // formControlName="projetoDeAssentamento"
            return normalizar(item.projeto).includes(filtroNormalizado);

          case 'numeroRequerimento': // formControlName="numeroRequerimento"
            return (item.requerimento || []).some((req: any) =>
              normalizar((req.numerosDoRequerimento || []).join(' ')).includes(
                filtroNormalizado
              )
            );

          case 'status': // formControlName="status"
            return (
              normalizar(item.status).includes(filtroNormalizado) ||
              (item.requerimento || []).some((req: any) =>
                normalizar(req.status).includes(filtroNormalizado)
              )
            );

          case 'tipoDeServico': // formControlName="tipoDeServico"
            return (item.requerimento || []).some((req: any) =>
              normalizar(req.tipoDeServico).includes(filtroNormalizado)
            );

          default:
            return normalizar(item[campo]).includes(filtroNormalizado);
        }
      });
    });

    this.dataSource.data = filtrados;
    this.dataSource.paginator = this.paginator;
  }

  // 🔄 Limpar filtros
  limpar(): void {
    this.form.reset();
    this.dataSource.data = this.dataSourceOriginal;
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
