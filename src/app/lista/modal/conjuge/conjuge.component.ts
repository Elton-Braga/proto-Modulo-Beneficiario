import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ServicosService } from '../../../novo-cadastro/tela-1/servico/servicos.service';
import { Beneficiario } from '../../beneficiario';
import { MOCK_BENEFICIARIOS } from '../../MOCK_BENEFICIATIO';

@Component({
  standalone: true,
  selector: 'app-conjuge',
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
  providers: [provideNgxMask(), provideNativeDateAdapter(), ServicosService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './conjuge.component.html',
  styleUrl: './conjuge.component.scss',
})
export class ConjugeComponent {
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
        { value: dadosRota.nome || '', disabled: false },
        [Validators.required],
      ],
      cod_beneficiario: [
        { value: dadosRota.codigo_beneficiario || '', disabled: false },
        [Validators.required],
      ],
      cpf: [
        { value: dadosRota.cpf || '', disabled: false },
        [Validators.required],
      ],
      telefone: [
        { value: dadosRota.telefone || '', disabled: false },
        Validators.required,
      ],
      email: [
        { value: dadosRota.email || '', disabled: false },
        Validators.required,
      ],
      upload: [],
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
