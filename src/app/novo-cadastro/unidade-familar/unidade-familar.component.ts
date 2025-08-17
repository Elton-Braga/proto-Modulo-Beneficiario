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
import { MOCK_BENEFICIARIOS } from '../../lista/MOCK_BENEFICIATIO';
import { UnidadeFamiliar } from '../../lista/unidadeFamiliar';
import { DependenteView } from './dependenteVeiw';
import { Router } from '@angular/router';
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
  dataSource: DependenteView[] = [];
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

  constructor(private fb: FormBuilder, private router: Router) {
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
    // 🔹 1. Dados vindos da navegação (rota)
    // 🔹 1. Verifica se vieram dependentes pela navegação (state da rota)
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state && navigation.extras.state['dependentes']) {
      this.dataSource = navigation.extras.state[
        'dependentes'
      ] as DependenteView[];
      return;
    }

    // 🔹 2. Verifica se existem dependentes salvos no localStorage
    const dadosSalvos = localStorage.getItem(
      `dependentes_${this.codigoBeneficiario}`
    );
    if (dadosSalvos) {
      this.dataSource = JSON.parse(dadosSalvos);
      return;
    }

    // 🔹 3. Caso contrário, usa os mocks e converte para Date
    const registro = MOCK_BENEFICIARIOS.find(
      (dep) => dep.codigo_beneficiario === this.codigoBeneficiario
    );

    this.dataSource = registro
      ? registro.dependentes.map((d) => ({
          nome: d.nome_dependente,
          cpf: d.cpf_dependente,
          tipo_dependente: d.tipo_dependente,
          data_nascimento: d.data_nascimento
            ? new Date(d.data_nascimento)
            : null,
          data_entrada_na_familia: d.data_entrada_na_familia
            ? new Date(d.data_entrada_na_familia)
            : null,
          data_uniao: d.data_uniao ? new Date(d.data_uniao) : null,
          acoes: ['editar', 'remover'],
          editando: false,
        }))
      : [];
  }

  adicionarDependente() {
    const novoDependente: PeriodicElement = {
      nome: this.nome.value,
      cpf: this.cpf_dependente.value,
      tipo_dependente: this.tipo_dependente.value,
      data_nascimento: this.data_nascimento.value,
      data_entrada_na_familia: this.data_entrada_na_familia.value,
      data_uniao: this.data_uniao.value,
      acoes: ['editar', 'remover'],
    };

    const chave = `dependentes_${this.codigoBeneficiario}`;
    let dependentes = JSON.parse(localStorage.getItem(chave) || '[]');
    dependentes.push(novoDependente);

    localStorage.setItem(chave, JSON.stringify(dependentes));
    this.dataSource = dependentes;

    this.formgroup.reset(); // limpa o formulário
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

  removerDependente(dep: DependenteView) {
    this.dataSource = this.dataSource.filter((d) => d.cpf !== dep.cpf);
    localStorage.setItem('dependentes', JSON.stringify(this.dataSource));
  }
}

export interface PeriodicElement {
  nome: string;
  cpf: string;
  tipo_dependente: string;
  data_nascimento: Date | null;
  data_uniao?: Date | null;
  data_entrada_na_familia: Date | null;
  acoes: any;
  editando?: boolean;
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
    data_nascimento: new Date('2015-12-21'),
    data_uniao: new Date('2015-12-21'),
    data_entrada_na_familia: new Date('2012-12-12'),
    acoes: ['editar', 'excluir'],
  },
];
