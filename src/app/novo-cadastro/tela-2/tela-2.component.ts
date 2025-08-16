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

import { HttpClientModule } from '@angular/common/http';
import { ServicosService } from '../tela-2/servico/servicos.service';
import { MOCK_BENEFICIARIOS } from '../../lista/MOCK_BENEFICIATIO';
import { Beneficiario } from '../../lista/beneficiario';

@Component({
  standalone: true,
  selector: 'app-tela-2',
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
  ],
  templateUrl: './tela-2.component.html',
  styleUrl: './tela-2.component.scss',
  providers: [provideNgxMask(), provideNativeDateAdapter(), ServicosService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tela2Component {
  formgroup!: FormGroup;
  nome!: FormControl;
  cpf!: FormControl;
  items = ['Processos Adicionados'];
  itemDependente = ['Conjuge  incluído'];
  expandedIndex = 0;
  dependentes: any[] = [];
  processos: string[] = [];
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

    'Assentamento',
    'Regularização',
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
    });

    this.nome = this.formgroup.get('nome') as FormControl;
    this.cpf = this.formgroup.get('cpf') as FormControl;
  }

  ngOnInit() {
    this.beneficiarios = MOCK_BENEFICIARIOS;

    const dados = history.state;
    console.log('Dados da rota:', dados);

    (window as any).salvarFormTela1 = () =>
      this.salvarFormularioNoLocalStorage();

    if (
      dados &&
      (dados.nome_T2 ||
        dados.cpf ||
        dados.codigo_beneficiario ||
        dados.email ||
        dados.telefone)
    ) {
      this.formgroup.patchValue({
        nome: dados.nome_T2 || '',
        cpf: dados.cpf || '',
        cod_beneficiario: dados.codigo_beneficiario || '',
        email: dados.email,
        telefone: dados.telefone,
      });

      this.cpfOriginal = dados.cpf || '';
    }
  }

  salvarFormularioNoLocalStorage(): void {
    const dados = this.formgroup.value;
    localStorage.setItem('dadosCadastroBeneficiario', JSON.stringify(dados));
  }
  trackBySigla(index: number, estado: any): string {
    return estado.sigla;
  }

  //Função para recuperar os dados ao iniciar

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
}
