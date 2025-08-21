import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskConfig, NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { ServicosService } from '../tela-1/servico/servicos.service';
import { HttpClientModule } from '@angular/common/http';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import {
  NgComponentOutlet,
  NgFor,
  NgIf,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault,
} from '@angular/common';
import { NumeroProcessoSeiPipe } from '../../pipes/numero-processo-sei.pipe';
import { MatTableModule } from '@angular/material/table';
import { Beneficiario } from '../../lista/beneficiario';
import { MOCK_BENEFICIARIOS } from '../../lista/MOCK_BENEFICIATIO';

import { UnidadeFamilarComponent } from '../unidade-familar/unidade-familar.component';
import { AssentamentoComponent } from '../assentamento/assentamento.component';
import { Tela2Component } from '../tela-2/tela-2.component';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CdkTableModule } from '@angular/cdk/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoteComponent } from '../lote/lote.component';
import { ObservacoesComponent } from '../observacoes/observacoes.component';
import { BloqueiosComponent } from '../bloqueios/bloqueios.component';
//import { LoteComponent } from "../lote/lote.component";

interface AbaAcordeon {
  titulo: string;
  componente: any;
  visivel: boolean;
}

export interface Processo {
  numero: string;
  editando?: boolean;
}

@Component({
  standalone: true,
  selector: 'app-tela-1',
  imports: [
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    CdkAccordionModule,
    NgIf,
    //NgFor,
    //NumeroProcessoSeiPipe,
    MatTableModule,
    UnidadeFamilarComponent,
    AssentamentoComponent,
    Tela2Component,
    MatMenu,
    MatMenuModule,
    MatCheckboxModule,
    CdkTableModule,
    MatSortModule,
    MatPaginatorModule,
    LoteComponent,
    ObservacoesComponent,
    BloqueiosComponent,
  ],
  templateUrl: './tela-1.component.html',
  styleUrl: './tela-1.component.scss',
  providers: [provideNgxMask(), provideNativeDateAdapter(), ServicosService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tela1Component {
  processoSelecionado?: Processo;
  processos: Processo[] = [];
  formgroup!: FormGroup;
  nome!: FormControl;
  cpf!: FormControl;
  items = ['Processos Adicionados'];
  itemDependente = ['Conjuge  incluído'];
  expandedIndex = 0;
  dependentes: any[] = [];
  //processos: string[] = [];
  numero_processo!: FormControl;
  displayedColumns: string[] = ['cpf', 'nome', 'acoes'];
  selectedValue!: string;
  beneficiarios: Beneficiario[] = [];
  cpfInvalido = false;
  cpfOriginal = ''; // defina isso com o CPF vindo da rota
  cpfIgualAoOriginal = false;

  itemsTelas = [
    'Beneficiário',
    'Conjuge',
    'Unidade Familiar',
    'Situação',
    'Lote',
    'Observações',
    'Bloqueios',
    //'Assentamento',
  ];
  expandedIndexTelas = 0;
  expandirAcordeonDependente = false;

  constructor(fb: FormBuilder) {
    const dadosRota = history.state;

    this.formgroup = fb.group({
      nome: [
        { value: dadosRota.nome || '', disabled: true },
        [Validators.required],
      ],
      cod_beneficiario: [
        { value: dadosRota.codigo_beneficiario || '', disabled: true },
        [Validators.required],
      ],
      cpf: [
        { value: dadosRota.cpf || '', disabled: true },
        [Validators.required],
      ],

      data_nascimento: [
        dadosRota.data_nascimento ? new Date(dadosRota.data_nascimento) : null,
        Validators.required,
      ],
      estado_civil: [dadosRota.estado_civil || ''],
      falecido: [dadosRota.falecido || false],
      data_falecimento: [
        dadosRota.data_falecimento
          ? new Date(dadosRota.data_falecimento)
          : null,
      ],

      nome_pai: [dadosRota.nome_pai || ''],
      nome_mae: [dadosRota.nome_mae || ''],
      nacionalidade: [dadosRota.nacionalidade || ''],
      naturalidade: [dadosRota.naturalidade || ''],
      municipio: [dadosRota.municipio || ''],
      codigo_municipio: [dadosRota.codigo_municipio || ''],
      tipo_documento: [dadosRota.tipo_documento || 'RG'],
      numero_documento: [dadosRota.numero_documento || ''],
      orgao_emissor: [dadosRota.orgao_emissor || ''],
      uf_orgao: [dadosRota.uf_orgao || ''],
      numero_nis: [dadosRota.numero_nis || ''],

      telefone: [
        { value: dadosRota.telefone || '', disabled: false },
        Validators.required,
      ],
      email: [
        { value: dadosRota.email || '', disabled: false },
        Validators.required,
      ],

      numero_processo: ['', [Validators.required]], // 🔹 agora sempre vazio
    });

    // 🔹 processo vindo da rota salvo direto na lista (não no form)
    if (dadosRota.numero_processo) {
      this.processos.push({
        numero: Array.isArray(dadosRota.numero_processo)
          ? dadosRota.numero_processo[0]
          : dadosRota.numero_processo,
        editando: false,
      });
    }
  }

  ngOnInit() {
    this.beneficiarios = MOCK_BENEFICIARIOS;

    const dados = history.state;
    console.log('Dados da rota:', dados);

    this.carregarFormularioDoLocalStorage();

    (window as any).salvarFormTela1 = () =>
      this.salvarFormularioNoLocalStorage();

    if (
      dados &&
      (dados.nome ||
        dados.cpf ||
        dados.numero_processo ||
        dados.codigo_beneficiario ||
        dados.email ||
        dados.telefone)
    ) {
      this.formgroup.patchValue({
        nome: dados.nome || '',
        cpf: dados.cpf || '',
        cod_beneficiario: dados.codigo_beneficiario || '',
        email: dados.email,
        telefone: dados.telefone,
        /* o campo de numero do processo aparece pre-preenchido
        numero_processo:
          (Array.isArray(dados.numero_processo)
            ? dados.numero_processo[0]
            : dados.numero_processo) || '',*/
      });

      this.cpfOriginal = dados.cpf || '';
    }

    this.formgroup.get('falecido')?.valueChanges.subscribe((falecido) => {
      const dataFalecimentoControl = this.formgroup.get('data_falecimento');
      if (falecido) {
        dataFalecimentoControl?.enable();
      } else {
        dataFalecimentoControl?.disable();
        dataFalecimentoControl?.reset();
      }
    });
  }

  salvarFormularioNoLocalStorage(): void {
    const dados = this.formgroup.value;
    localStorage.setItem('dadosCadastroBeneficiario', JSON.stringify(dados));
  }
  trackBySigla(index: number, estado: any): string {
    return estado.sigla;
  }

  //Função para recuperar os dados ao iniciar
  carregarFormularioDoLocalStorage(): void {
    const dados = localStorage.getItem('dadosCadastroBeneficiario');
    if (dados) {
      this.formgroup.patchValue(JSON.parse(dados));
    }
  }

  validarCpf() {
    const cpf = this.formgroup.get('cpf')?.value;

    const beneficiario = this.beneficiarios.find((b) => b.cpf_T1 === cpf);

    if (beneficiario) {
      this.formgroup.patchValue({ nome: beneficiario.nome_T1 });
      this.cpfInvalido = false;
      this.cpfIgualAoOriginal = cpf === this.cpfOriginal;
    } else {
      this.formgroup.patchValue({ nome: '' });
      this.cpfInvalido = true;
      this.cpfIgualAoOriginal = false;
    }
  }

  adicionarProcesso() {
    const numero = this.formgroup.get('numero_processo')?.value?.trim();
    if (!numero) return;

    if (this.processos.some((p) => p.numero === numero)) {
      alert('Este processo já foi adicionado.');
      return;
    }

    this.processos = [...this.processos, { numero, editando: false }];
    this.formgroup.get('numero_processo')?.reset();
  }

  trackByNumero(index: number, item: Processo): string {
    return item.numero;
  }

  onNumeroChange(event: Event, index: number) {
    const valor = (event.target as HTMLInputElement).value;

    const atual = this.processos[index];
    this.processos = [
      ...this.processos.slice(0, index),
      { ...atual, numero: valor },
      ...this.processos.slice(index + 1),
    ];
  }

  editarProcesso(p: Processo) {
    const i = this.processos.indexOf(p);
    if (i > -1) {
      this.processos = this.processos.map((x, idx) =>
        idx === i ? { ...x, editando: true } : x
      );
    }
  }

  salvarProcesso(p: Processo) {
    const i = this.processos.indexOf(p);
    if (i > -1) {
      this.processos = this.processos.map((x, idx) =>
        idx === i ? { ...x, editando: false } : x
      );
    }
  }

  excluirProcesso(p: Processo) {
    this.processos = this.processos.filter((proc) => proc !== p);
  }
  adicionarDependente(): void {
    if (this.dependentes.length >= 1) {
      alert('Apenas um dependente pode ser adicionado.');
      return;
    }

    if (this.formgroup.valid) {
      const novoDependente = this.formgroup.value;

      this.dependentes.push({ ...novoDependente });
      this.formgroup.reset();

      console.log('Dependente adicionado:', novoDependente);
    } else {
      alert(
        'Preencha todos os campos obrigatórios para adicionar o dependente.'
      );
    }
  }

  editarDependente(index: number): void {
    const dependente = this.dependentes[index];
    this.formgroup.patchValue(dependente);
    this.dependentes.splice(index, 1); // Remove da tabela para ser atualizado
  }

  removerDependente(index: number): void {
    this.dependentes.splice(index, 1);
  }
}
