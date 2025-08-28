import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { ServicosService } from '../tela-1/servico/servicos.service';

@Component({
  selector: 'app-assentamento',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatRadioModule,
    ReactiveFormsModule,
  ],
  templateUrl: './assentamento.component.html',
  styleUrl: './assentamento.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssentamentoComponent {
  form!: FormGroup;

  /** listas dinâmicas exibidas em datatable */
  tiposAssentamento = [
    {
      value: 'Projeto de Assentamento (PA)',
      viewValue: 'Projeto de Assentamento (PA)',
    },
    {
      value: 'Projeto de Assentamento Dirigido (PAD)',
      viewValue: 'Projeto de Assentamento Dirigido (PAD)',
    },
    {
      value: 'Projeto de Assentamento Estadual (PAE)',
      viewValue: 'Projeto de Assentamento Estadual (PAE)',
    },
    {
      value: 'Projeto de Assentamento Florestal (PAF)',
      viewValue: 'Projeto de Assentamento Florestal (PAF)',
    },
    {
      value: 'Projeto de Desenvolvimento Sustentável (PDS)',
      viewValue: 'Projeto de Desenvolvimento Sustentável (PDS)',
    },
    {
      value: 'Projeto de Assentamento Agroextrativista (PAEex)',
      viewValue: 'Projeto de Assentamento Agroextrativista (PAEex)',
    },
    {
      value: 'Projeto Integrado de Colonização (PIC)',
      viewValue: 'Projeto Integrado de Colonização (PIC)',
    },
    {
      value: 'Projeto de Colonização Dirigida (PCD)',
      viewValue: 'Projeto de Colonização Dirigida (PCD)',
    },
  ];

  tiposAssentamento2 = [
    {
      value: 'Projeto de Assentamento (PA)',
      viewValue: 'Projeto de Assentamento (PA)',
    },
    {
      value: 'Projeto de Assentamento Dirigido (PAD)',
      viewValue: 'Projeto de Assentamento Dirigido (PAD)',
    },
    {
      value: 'Projeto de Assentamento Estadual (PAE)',
      viewValue: 'Projeto de Assentamento Estadual (PAE)',
    },
    {
      value: 'Projeto de Assentamento Florestal (PAF)',
      viewValue: 'Projeto de Assentamento Florestal (PAF)',
    },
    {
      value: 'Projeto de Desenvolvimento Sustentável (PDS)',
      viewValue: 'Projeto de Desenvolvimento Sustentável (PDS)',
    },
    {
      value: 'Projeto de Assentamento Agroextrativista (PAEex)',
      viewValue: 'Projeto de Assentamento Agroextrativista (PAEex)',
    },
    {
      value: 'Projeto Integrado de Colonização (PIC)',
      viewValue: 'Projeto Integrado de Colonização (PIC)',
    },
    {
      value: 'Projeto de Colonização Dirigida (PCD)',
      viewValue: 'Projeto de Colonização Dirigida (PCD)',
    },
  ];

  situacoesAssentado = [
    { value: 'assentado', viewValue: 'assentado' },
    { value: 'evadido', viewValue: 'evadido' },
    { value: 'desistente', viewValue: 'desistente' },
    { value: 'regularizado_1', viewValue: 'Regularizado' },
    { value: 'regularizado_2', viewValue: 'Regularizado' },
    { value: 'bloqueado', viewValue: 'bloqueado' },
  ];

  situacoesAssentado2 = [
    { value: 'assentado', viewValue: 'assentado' },
    { value: 'evadido', viewValue: 'evadido' },
    { value: 'desistente', viewValue: 'desistente' },
    { value: 'regularizado_1', viewValue: 'Regularizado' },
    { value: 'regularizado_2', viewValue: 'Regularizado' },
    { value: 'bloqueado', viewValue: 'bloqueado' },
  ];

  tipo_lote = [
    { value: 'teste1', viewValue: 'teste1' },
    { value: 'teste2', viewValue: 'teste2' },
    { value: 'teste3', viewValue: 'teste3' },
  ];
  municipios: any[] = [];
  estados: any[] = [];
  lotes: Lote[] = [];
  sr: string[] = ['021', '002', '003', '004', '005'];
  observacoes: Observacao[] = [];

  private readonly STORAGE_KEY = 'cadastroBenef';

  constructor(
    private fb: FormBuilder,
    private servicosService: ServicosService
  ) {}

  // ---------- inicialização ----------
  ngOnInit(): void {
    const dadosRota = history.state;
    const situacao = dadosRota || {};

    this.carregarEstados();
    this.form = this.fb.group({
      titular_1: [
        { value: situacao.nome || '', disabled: true },
        [Validators.required],
      ],
      data_homologacao_1: [
        { value: situacao.data_homologacao_Titular, disabled: false },
        Validators.required,
      ],
      situacao_titular: [
        { value: situacao.situacao_Titular || '', disabled: false },
        Validators.required,
      ],
      data_situacao_1: [
        situacao.data_situacao_Titular || '',
        Validators.required,
      ],
      data_situacao_2: [
        situacao.data_situacao_Conjuge || '',
        Validators.required,
      ],
      titular_2: [
        { value: situacao.nome_T2 || '', disabled: true },
        [Validators.required],
      ],
      data_homologacao_2: [
        { value: situacao.data_homologacao_conjuge, disabled: false },
        Validators.required,
      ],
      situacao_conjuge: [
        { value: situacao.situacao_conjuge || '', disabled: false },
        Validators.required,
      ],
      aptoPNRA: [
        { value: situacao.apto_para_beneficiario || '', disabled: false },
        Validators.required,
      ],

      tipo_lote: ['', Validators.required],
      area_lote: [
        '',
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
      numero_lote: ['', Validators.required],
      codigo_SNCR: ['', Validators.required],
      //link_mapa: ['', Validators.pattern(/^https?:\/\//i)],
      denominacao_Gleba: ['', Validators.required],
      denominacao_lote: ['', Validators.required],

      observacao: [''],
      data_observacao: [
        { value: situacao.data_observacao || '', disabled: false },
        Validators.required,
      ],
      municipios: ['', Validators.required],
      estados: ['', Validators.required],
      apto_para_beneficiario: ['', Validators.required],
    });

    // tenta carregar do localStorage
    const salvo = localStorage.getItem(this.STORAGE_KEY);
    if (salvo) {
      const { formValues, lotes, observacoes } = JSON.parse(salvo);
      this.form.patchValue(formValues);
      this.lotes = lotes ?? [];
      this.observacoes = observacoes ?? [];
    }
  }

  // ---------- getters de conveniência ----------
  get situacao1(): FormArray {
    return this.form.get('situacao_1') as FormArray;
  }
  get situacao2(): FormArray {
    return this.form.get('situacao_2') as FormArray;
  }

  get loteControlesValidos(): boolean {
    return ['tipo_lote', 'area_lote', 'numero_lote', 'codigo_SNCR'].every(
      (campo) => this.form.get(campo)?.valid
    );
  }

  trackByValue(index: number, item: { value: string; viewValue: string }) {
    return item.value;
  }

  // ---------- manipulação de Titular.situação (checkbox) ----------
  toggleSituacao(array: FormArray, valor: string): void {
    const idx = array.value.indexOf(valor);
    idx === -1 ? array.push(new FormControl(valor)) : array.removeAt(idx);
  }

  // ---------- inclusão de Lote ----------
  adicionarLote(): void {
    if (
      this.form.get('tipo_lote')?.invalid ||
      this.form.get('area_lote')?.invalid ||
      this.form.get('numero_lote')?.invalid ||
      this.form.get('codigo_SNCR')?.invalid ||
      this.form.get('denominacao_Gleba')?.invalid ||
      this.form.get('denominacao_lote')?.invalid
    ) {
      return;
    }

    const lote: Lote = {
      tipo_lote: this.form.value.tipo_lote,
      area_lote: this.form.value.area_lote,
      numero_lote: this.form.value.numero_lote,
      codigo_SNCR: this.form.value.codigo_SNCR,
      link_mapa: this.form.value.link_mapa,
      denominacao_Gleba: this.form.value.denominacao_Gleba,
      denominacao_lote: this.form.value.denominacao_lote,
    };

    this.lotes.push(lote);
    this.form.patchValue({
      tipo_lote: '',
      area_lote: '',
      numero_lote: '',
      codigo_SNCR: '',
      link_mapa: '',
      denominacao_Gleba: '',
      denominacao_lote: '',
    });
    this.salvarNoStorage();
  }

  // ---------- inclusão de Observação ----------
  adicionarObservacao(): void {
    const { observacao, data_observacao } = this.form.value;
    if (!observacao?.trim() || !data_observacao) {
      return;
    }
    this.observacoes.push({ observacao, data: data_observacao });
    this.form.patchValue({ observacao: '', data_observacao: '' });
    this.salvarNoStorage();
  }

  // ---------- persistência ----------
  private salvarNoStorage(): void {
    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify({
        formValues: this.form.value,
        lotes: this.lotes,
        observacoes: this.observacoes,
      })
    );
  }

  carregarEstados(): void {
    this.servicosService.getEstados().subscribe({
      next: (dados) => (this.estados = dados),
      error: (erro) => console.error('Erro ao carregar estados:', erro),
    });
    console.log('clicou', this.estados);
  }

  carregarMunicipiosPorEstado(siglaEstado: any): void {
    if (!siglaEstado) return;

    this.servicosService.getMunicipiosPorUF(siglaEstado).subscribe({
      next: (dados) => (this.municipios = dados),
      error: (erro) => console.error('Erro ao carregar municípios:', erro),
    });
  }
}

interface Lote {
  tipo_lote: string;
  area_lote: string;
  numero_lote: string;
  codigo_SNCR: string;
  link_mapa: string;
  denominacao_Gleba: string;
  denominacao_lote: string;
}

interface Observacao {
  observacao: string;
  data: string; // ISO Date
}
