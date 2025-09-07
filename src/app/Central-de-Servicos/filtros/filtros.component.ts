import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

// Serviço
import { ServicosService } from '../../novo-cadastro/tela-1/servico/servicos.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MOCK_BENEFICIARIOS } from '../../lista/MOCK_BENEFICIATIO';
import { MatCheckboxModule } from '@angular/material/checkbox';
//import { MatTableDataSource } from '@angular/material/table';

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
  ],
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss'],
})
export class FiltrosComponent implements OnInit {
  form!: FormGroup;
  estados: any[] = [];
  municipios: any[] = [];
  srList: string[] = ['001', '002', '003', '004'];
  statusList: string[] = ['Pendente', 'Em Andamento', 'Concluído', 'Cancelado'];
  tiposServico: string[] = [
    'Vistoria',
    'Regularização',
    'Atualização Cadastral',
    'Outro',
  ];

  displayedColumns: string[] = [
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

  atualizarColunasVisiveis() {
    this.displayedColumns = this.colunasDisponiveis
      .filter((c) => c.visivel)
      .map((c) => c.chave);
  }

  dataSource = new MatTableDataSource(
    this.extrairRequerimentos(MOCK_BENEFICIARIOS)
  );

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

  getIcon(acao: string): string {
    switch (acao.toLowerCase()) {
      case 'detalhar':
        return 'info';
      case 'analisar':
        return 'check_circle';
      case 'historico':
      case 'histórico':
        return 'history';
      case 'cancelar':
        return 'cancel';
      default:
        return 'help_outline'; // ícone genérico para ações desconhecidas
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

  constructor(
    private fb: FormBuilder,
    private servicosService: ServicosService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      cpf: ['', [Validators.required]],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      sr: ['', Validators.required],
      uf: ['', Validators.required],
      municipio: ['', Validators.required],
      projetoDeAssentamento: [''],
      numeroDoRequerimento: ['', Validators.required],
      dataDoRequerimento: ['', Validators.required],
      tipoDeServico: ['', Validators.required],
      status: ['Pendente', Validators.required],
    });

    this.carregarEstados();
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

  limpar() {}
  pesquisar() {}
}
