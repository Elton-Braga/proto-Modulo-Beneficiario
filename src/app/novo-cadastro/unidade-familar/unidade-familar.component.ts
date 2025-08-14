import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { NgxMaskConfig, NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { NgFor, NgIf } from '@angular/common';
//import { MOCK_DEPENDENTES } from './';

@Component({
  selector: 'app-unidade-familar',
  providers: [provideNativeDateAdapter(), provideNgxMask()],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    NgxMaskDirective,
    MatTableModule,
    MatMenu,
    MatMenuModule,

    NgIf,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  templateUrl: './unidade-familar.component.html',
  styleUrl: './unidade-familar.component.scss',
})
export class UnidadeFamilarComponent {
  @Input() codigoBeneficiario!: string;
  dataSource: UnidadeFamiliar[] = [];
  //dataSource = MOCK_DEPENDENTES
  //dataSource = ELEMENT_DATA;

  formgroup!: FormGroup;

  situacao_conjugal!: FormControl;
  data_uniao!: FormControl;
  data_separacao!: FormControl;
  renda_familiar!: FormControl;
  nome_dependente!: FormControl;
  tipo_dependente!: FormControl;
  nome!: FormControl;
  data_nascimento!: FormControl;
  data_entrada_na_familia!: FormControl;
  cpf_dependente!: FormControl;
  associacao_unidade_familiar!: FormControl;

  s_conjugal: any[] = [
    { value: '0', viewValue: 'Casado' },
    { value: '1', viewValue: 'Solteiro' },
    { value: '2', viewValue: 'Divorciado' },
    { value: '3', viewValue: 'Viúvo' },
    { value: '4', viewValue: 'União estável' },
  ];

  t_dependente: any[] = [
    { value: '0', viewValue: 'agregado' },
    { value: '1', viewValue: 'Conjuge' },
    { value: '2', viewValue: 'Pai' },
    { value: '3', viewValue: 'Filho' },
    { value: '4', viewValue: 'Mãe' },
    { value: '4', viewValue: 'Outros' },
  ];
  /*
  displayedColumns: string[] = [
    'nome',
    'CPF',
    'tipo_dependente',
    'data_nascimento',
    'data_entrada_na_familia',
    'acoes',
  ];*/

  displayedColumns: string[] = [
    'nome',
    'cpf',
    'tipo_dependente',
    'data_nascimento',
    'data_entrada_na_familia',
    'data_uniao',
    'acoes',
  ];

  associacoesDisplayedColumns: string[] = ['associacao', 'acoes'];

  associacoesDataSource: AssociacaoUnidadeFamiliar[] = [];

  unidadesFamiliares: string[] = [];

  constructor(private fb: FormBuilder) {
    this.formgroup = this.fb.group({
      situacao_conjugal: ['', Validators.required],
      data_uniao: ['', Validators.required],
      data_separacao: [''],
      renda_familiar: ['', [Validators.required, Validators.min(0)]],
      nome_dependente: ['', Validators.required],
      tipo_dependente: ['', Validators.required],
      nome: ['', Validators.required],
      data_nascimento: ['', Validators.required],
      data_entrada_na_familia: ['', Validators.required],
      cpf_dependente: [
        '',
        [Validators.required, Validators.pattern(/^\d{11}$/)],
      ],
      associacao_unidade_familiar: ['', Validators.required],
    });

    this.situacao_conjugal = this.formgroup.get(
      'situacao_conjugal'
    ) as FormControl;
    this.data_uniao = this.formgroup.get('data_uniao') as FormControl;
    this.data_separacao = this.formgroup.get('data_separacao') as FormControl;
    this.renda_familiar = this.formgroup.get('renda_familiar') as FormControl;
    this.nome_dependente = this.formgroup.get('nome_dependente') as FormControl;
    this.tipo_dependente = this.formgroup.get('tipo_dependente') as FormControl;
    this.nome = this.formgroup.get('nome') as FormControl;
    this.data_nascimento = this.formgroup.get('data_nascimento') as FormControl;
    this.data_entrada_na_familia = this.formgroup.get(
      'data_entrada_na_familia'
    ) as FormControl;
    this.cpf_dependente = this.formgroup.get('cpf_dependente') as FormControl;
    this.associacao_unidade_familiar = this.formgroup.get(
      'associacao_unidade_familiar'
    ) as FormControl;
  }

  ngOnInit() {
    const registro = MOCK_DEPENDENTES.find(
      (dep) => dep.codigo_beneficiario === this.codigoBeneficiario
    );
    this.dataSource = registro
      ? registro.dependentes.map((d) => ({ ...d, editando: false }))
      : [];

    const dadosSalvos = localStorage.getItem('dependentes');
    this.dataSource = dadosSalvos ? JSON.parse(dadosSalvos) : [];

    this.unidadesFamiliares = dadosSalvos ? JSON.parse(dadosSalvos) : [];

    const armazenadas = JSON.parse(localStorage.getItem('associacoes') || '[]');
    this.associacoesDataSource = armazenadas;
  }

  /*
  
  executarAcao(acao: string, elemento: PeriodicElement) {
    console.log(`Ação "${acao}" executada para CPF ${elemento.nome}`);
    // Aqui você pode redirecionar, abrir modal, etc.
  }
  */

  adicionarDependente() {
    const novoDependente: PeriodicElement = {
      nome: this.nome.value,
      cpf: this.cpf_dependente.value,
      tipo_dependente: this.tipo_dependente.value,
      data_nascimento: this.data_nascimento.value, // corrigido
      data_entrada_na_familia: this.data_entrada_na_familia.value, // corrigido
      data_uniao: this.data_uniao.value, // opcional, se quiser
      acoes: ['editar', 'remover'],
    };

    let dependentes = JSON.parse(localStorage.getItem('dependentes') || '[]');
    dependentes.push(novoDependente);
    localStorage.setItem('dependentes', JSON.stringify(dependentes));

    this.dataSource = dependentes;

    this.formgroup.patchValue({
      nome: '',
      cpf_dependente: '',
      tipo_dependente: '',
      data_nascimento: '',
      data_entrada_na_familia: '',
    });
  }

  executarAcao(acao: string, elemento: PeriodicElement) {
    if (acao === 'remover') {
      let dependentes = JSON.parse(localStorage.getItem('dependentes') || '[]');
      dependentes = dependentes.filter(
        (dep: PeriodicElement) => dep.cpf !== elemento.cpf
      );
      localStorage.setItem('dependentes', JSON.stringify(dependentes));
      this.dataSource = dependentes;
    }

    if (acao === 'editar') {
      this.formgroup.patchValue({
        nome: elemento.nome,
        cpf_dependente: elemento.cpf,
        tipo_dependente: elemento.tipo_dependente,
        data_nascimento: elemento.data_nascimento,
        data_entrada_na_familia: elemento.data_entrada_na_familia,
      });
    }
  }

  adicionarUnidadeFamiliar() {
    const valor = this.formgroup.get('associacao_unidade_familiar')?.value;
    if (!valor) return;

    const novaAssociacao = { associacao: valor };

    // Adiciona ao localStorage
    const armazenadas = JSON.parse(localStorage.getItem('associacoes') || '[]');
    armazenadas.push(novaAssociacao);
    localStorage.setItem('associacoes', JSON.stringify(armazenadas));

    // Atualiza a tabela
    this.associacoesDataSource = [...armazenadas];

    // Limpa o campo
    this.formgroup.get('associacao_unidade_familiar')?.reset();
  }

  /** Editar: ativa o modo edição */
  editarAssociacao(element: AssociacaoUnidadeFamiliar) {
    element.editando = true;
  }

  salvarAssociacao(element: AssociacaoUnidadeFamiliar) {
    element.editando = false;
    localStorage.setItem(
      'associacoes',
      JSON.stringify(this.associacoesDataSource)
    );
  }

  removerAssociacao(element: AssociacaoUnidadeFamiliar) {
    this.associacoesDataSource = this.associacoesDataSource.filter(
      (a) => a.associacao !== element.associacao
    );
    localStorage.setItem(
      'associacoes',
      JSON.stringify(this.associacoesDataSource)
    );
  }

  camposDependentePreenchidos(): boolean {
    return (
      !!this.formgroup.get('nome')?.valid &&
      !!this.formgroup.get('cpf_dependente')?.valid &&
      !!this.formgroup.get('data_nascimento')?.valid &&
      !!this.formgroup.get('data_entrada_na_familia')?.valid &&
      !!this.formgroup.get('tipo_dependente')?.valid
    );
  }

  editar(element: any) {
    element.editando = true;
  }

  salvar(element: any) {
    element.editando = false;
    localStorage.setItem(
      `dependentes_${this.codigoBeneficiario}`,
      JSON.stringify(this.dataSource)
    );
  }

  remover(element: any) {
    this.dataSource = this.dataSource.filter((e) => e !== element);
    localStorage.setItem(
      `dependentes_${this.codigoBeneficiario}`,
      JSON.stringify(this.dataSource)
    );
  }

  editarDependente(dep: any) {
    // Salvar alterações no localStorage
    localStorage.setItem('dependentes', JSON.stringify(this.dataSource));
  }

  removerDependente(dep: any) {
    this.dataSource = this.dataSource.filter(
      (d) => d.cpf_dependente !== dep.cpf_dependente
    );
    localStorage.setItem('dependentes', JSON.stringify(this.dataSource));
  }
}

export interface PeriodicElement {
  nome: string;
  cpf: string;
  tipo_dependente: string;

  data_nascimento: string;
  data_uniao?: string;
  data_entrada_na_familia: string;
  acoes: any;
}

interface AssociacaoUnidadeFamiliar {
  associacao: string;
  editando?: boolean; // controle de edição
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    nome: 'Hydrogen',
    cpf: '000.000.000-00',
    tipo_dependente: 'tipo de dependente',
    data_nascimento: '21/12/15',
    data_uniao: '21/12/15',
    data_entrada_na_familia: '12/12/12',
    acoes: ['editar', 'excluir'],
  },
];

import { UnidadeFamiliar } from './unidadeFamiliar';
export const MOCK_DEPENDENTES: {
  codigo_beneficiario: string;
  dependentes: UnidadeFamiliar[];
}[] = [
  {
    codigo_beneficiario: '000',
    dependentes: [
      {
        situacao_conjugal: 'Casado',
        data_uniao: new Date('2005-06-15'),
        renda_familiar: 3500,
        nome_dependente: 'Maria de Souza',
        tipo_dependente: 'Conjuge',
        nome: 'Maria de Souza',
        data_nascimento: new Date('1985-08-10'),
        data_entrada_na_familia: new Date('2005-06-15'),
        cpf_dependente: '12345678901',
        associacao_unidade_familiar: 'Associação Rural Piratini',
      },
      {
        situacao_conjugal: 'Casado',
        data_uniao: new Date('2005-06-15'),
        renda_familiar: 3500,
        nome_dependente: 'João Pedro da Silva',
        tipo_dependente: 'Filho',
        nome: 'João Pedro da Silva',
        data_nascimento: new Date('2010-09-25'),
        data_entrada_na_familia: new Date('2010-09-25'),
        cpf_dependente: '98765432100',
        associacao_unidade_familiar: 'Associação Rural Piratini',
      },
    ],
  },
  {
    codigo_beneficiario: '0001',
    dependentes: [
      {
        situacao_conjugal: 'Casado',
        data_uniao: new Date('2010-03-20'),
        renda_familiar: 4200,
        nome_dependente: 'Patrícia Lima',
        tipo_dependente: 'Conjuge',
        nome: 'Patrícia Lima',
        data_nascimento: new Date('1988-01-15'),
        data_entrada_na_familia: new Date('2010-03-20'),
        cpf_dependente: '45678912345',
        associacao_unidade_familiar: 'Associação Rural Piratini',
      },
    ],
  },
  {
    codigo_beneficiario: '0002',
    dependentes: [
      {
        situacao_conjugal: 'Casado',
        data_uniao: new Date('2008-07-05'),
        renda_familiar: 3100,
        nome_dependente: 'Pedro Martins',
        tipo_dependente: 'Conjuge',
        nome: 'Pedro Martins',
        data_nascimento: new Date('1982-04-12'),
        data_entrada_na_familia: new Date('2008-07-05'),
        cpf_dependente: '32165498700',
        associacao_unidade_familiar: 'Associação Rural Piratini',
      },
      {
        situacao_conjugal: 'Casado',
        data_uniao: new Date('2008-07-05'),
        renda_familiar: 3100,
        nome_dependente: 'Lucas Barbosa',
        tipo_dependente: 'Filho',
        nome: 'Lucas Barbosa',
        data_nascimento: new Date('2012-03-11'),
        data_entrada_na_familia: new Date('2012-03-11'),
        cpf_dependente: '65498732100',
        associacao_unidade_familiar: 'Associação Rural Piratini',
      },
    ],
  },
  // ... continuar para os outros beneficiários
  {
    codigo_beneficiario: '0003',
    dependentes: [
      {
        situacao_conjugal: 'Solteiro',
        data_uniao: new Date('2020-01-01'),
        renda_familiar: 2800,
        nome_dependente: 'Fernanda Oliveira',
        tipo_dependente: 'Filha',
        nome: 'Fernanda Oliveira',
        data_nascimento: new Date('2002-07-15'),
        data_entrada_na_familia: new Date('2002-07-15'),
        cpf_dependente: '11223344556',
        associacao_unidade_familiar: 'Associação Rural Piratini',
      },
    ],
  },
  {
    codigo_beneficiario: '0004',
    dependentes: [
      {
        situacao_conjugal: 'Casado',
        data_uniao: new Date('2003-09-10'),
        renda_familiar: 5000,
        nome_dependente: 'Carlos Mendes',
        tipo_dependente: 'Conjuge',
        nome: 'Carlos Mendes',
        data_nascimento: new Date('1978-11-22'),
        data_entrada_na_familia: new Date('2003-09-10'),
        cpf_dependente: '22334455667',
        associacao_unidade_familiar: 'Associação Rural Piratini',
      },
    ],
  },
  {
    codigo_beneficiario: '0005',
    dependentes: [
      {
        situacao_conjugal: 'Casado',
        data_uniao: new Date('2015-05-18'),
        renda_familiar: 3600,
        nome_dependente: 'Juliana Rocha',
        tipo_dependente: 'Conjuge',
        nome: 'Juliana Rocha',
        data_nascimento: new Date('1990-02-14'),
        data_entrada_na_familia: new Date('2015-05-18'),
        cpf_dependente: '33445566778',
        associacao_unidade_familiar: 'Associação Rural Piratini',
      },
      {
        situacao_conjugal: 'Casado',
        data_uniao: new Date('2015-05-18'),
        renda_familiar: 3600,
        nome_dependente: 'Felipe Rocha',
        tipo_dependente: 'Filho',
        nome: 'Felipe Rocha',
        data_nascimento: new Date('2018-09-09'),
        data_entrada_na_familia: new Date('2018-09-09'),
        cpf_dependente: '99887766554',
        associacao_unidade_familiar: 'Associação Rural Piratini',
      },
    ],
  },
  {
    codigo_beneficiario: '0006',
    dependentes: [
      {
        situacao_conjugal: 'Viúvo',
        data_uniao: new Date('1995-12-01'),
        data_separacao: new Date('2010-08-20'),
        renda_familiar: 2500,
        nome_dependente: 'Ana Beatriz Costa',
        tipo_dependente: 'Filha',
        nome: 'Ana Beatriz Costa',
        data_nascimento: new Date('1996-03-05'),
        data_entrada_na_familia: new Date('1996-03-05'),
        cpf_dependente: '44556677889',
        associacao_unidade_familiar: 'Associação Rural Piratini',
      },
    ],
  },
  {
    codigo_beneficiario: '0007',
    dependentes: [
      {
        situacao_conjugal: 'Casado',
        data_uniao: new Date('2007-04-04'),
        renda_familiar: 4000,
        nome_dependente: 'Ricardo Alves',
        tipo_dependente: 'Conjuge',
        nome: 'Ricardo Alves',
        data_nascimento: new Date('1983-06-12'),
        data_entrada_na_familia: new Date('2007-04-04'),
        cpf_dependente: '55667788990',
        associacao_unidade_familiar: 'Associação Rural Piratini',
      },
    ],
  },
  {
    codigo_beneficiario: '0008',
    dependentes: [
      {
        situacao_conjugal: 'Casado',
        data_uniao: new Date('2001-02-17'),
        renda_familiar: 4700,
        nome_dependente: 'Simone Farias',
        tipo_dependente: 'Conjuge',
        nome: 'Simone Farias',
        data_nascimento: new Date('1979-10-30'),
        data_entrada_na_familia: new Date('2001-02-17'),
        cpf_dependente: '66778899001',
        associacao_unidade_familiar: 'Associação Rural Piratini',
      },
      {
        situacao_conjugal: 'Casado',
        data_uniao: new Date('2001-02-17'),
        renda_familiar: 4700,
        nome_dependente: 'André Farias',
        tipo_dependente: 'Filho',
        nome: 'André Farias',
        data_nascimento: new Date('2005-08-21'),
        data_entrada_na_familia: new Date('2005-08-21'),
        cpf_dependente: '77665544332',
        associacao_unidade_familiar: 'Associação Rural Piratini',
      },
    ],
  },
  {
    codigo_beneficiario: '0009',
    dependentes: [
      {
        situacao_conjugal: 'Casado',
        data_uniao: new Date('2012-11-11'),
        renda_familiar: 3300,
        nome_dependente: 'Tatiane Lopes',
        tipo_dependente: 'Conjuge',
        nome: 'Tatiane Lopes',
        data_nascimento: new Date('1991-07-19'),
        data_entrada_na_familia: new Date('2012-11-11'),
        cpf_dependente: '88990011223',
        associacao_unidade_familiar: 'Associação Rural Piratini',
      },
    ],
  },
  {
    codigo_beneficiario: '00010',
    dependentes: [
      {
        situacao_conjugal: 'Solteiro',
        data_uniao: new Date('2019-05-25'),
        renda_familiar: 2950,
        nome_dependente: 'Roberto Silva',
        tipo_dependente: 'Filho',
        nome: 'Roberto Silva',
        data_nascimento: new Date('2000-12-12'),
        data_entrada_na_familia: new Date('2000-12-12'),
        cpf_dependente: '99001122334',
        associacao_unidade_familiar: 'Associação Rural Piratini',
      },
    ],
  },
];
