import { ChangeDetectionStrategy, Component } from '@angular/core';
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
    NgFor,
    NgIf,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,

  templateUrl: './unidade-familar.component.html',
  styleUrl: './unidade-familar.component.scss',
})
export class UnidadeFamilarComponent {
  formgroup!: FormGroup;

  situacao_conjugal!: FormControl;
  data_uniao!: FormControl;
  data_separacao!: FormControl;
  renda_familiar!: FormControl;
  nome_dependente!: FormControl;
  tipo_dependente!: FormControl;
  nome!: FormControl;
  data_nascimento!: FormControl;
  data_na_familia!: FormControl;
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

  displayedColumns: string[] = [
    'nome',
    'CPF',
    'tipo_dependente',
    'data_nasc',
    'data_entrada_na_familia',
    'acoes',
  ];

  associacoesDisplayedColumns: string[] = ['associacao', 'acoes'];

  associacoesDataSource: AssociacaoUnidadeFamiliar[] = [];

  dataSource = ELEMENT_DATA;
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
      data_na_familia: ['', Validators.required],
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
    this.data_na_familia = this.formgroup.get('data_na_familia') as FormControl;
    this.cpf_dependente = this.formgroup.get('cpf_dependente') as FormControl;
    this.associacao_unidade_familiar = this.formgroup.get(
      'associacao_unidade_familiar'
    ) as FormControl;
  }

  ngOnInit() {
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
      data_nasc: this.data_nascimento.value,
      data_entrada_na_familia: this.data_na_familia.value,
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
      data_na_familia: '',
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
        data_nascimento: elemento.data_nasc,
        data_na_familia: elemento.data_entrada_na_familia,
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

  editarAssociacao(element: AssociacaoUnidadeFamiliar) {
    console.log('Editar:', element);
    // lógica de edição opcional
  }

  removerAssociacao(element: AssociacaoUnidadeFamiliar) {
    const armazenadas = JSON.parse(localStorage.getItem('associacoes') || '[]');
    const atualizadas = armazenadas.filter(
      (a: AssociacaoUnidadeFamiliar) => a.associacao !== element.associacao
    );
    localStorage.setItem('associacoes', JSON.stringify(atualizadas));
    this.associacoesDataSource = [...atualizadas];
  }

  camposDependentePreenchidos(): boolean {
    return (
      !!this.formgroup.get('nome')?.valid &&
      !!this.formgroup.get('cpf_dependente')?.valid &&
      !!this.formgroup.get('data_nascimento')?.valid &&
      !!this.formgroup.get('data_na_familia')?.valid &&
      !!this.formgroup.get('tipo_dependente')?.valid
    );
  }
}

export interface PeriodicElement {
  nome: string;
  cpf: string;
  tipo_dependente: string;
  data_nasc: string;
  data_entrada_na_familia: string;
  acoes: any;
}

interface AssociacaoUnidadeFamiliar {
  associacao: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    nome: 'Hydrogen',
    cpf: '000.000.000-00',
    tipo_dependente: 'tipo de dependente',
    data_nasc: '21/12/15',
    data_entrada_na_familia: '12/12/12',
    acoes: ['editar', 'excluir'],
  },
];
