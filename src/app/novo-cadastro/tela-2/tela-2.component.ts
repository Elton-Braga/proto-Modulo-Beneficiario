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
      telefone: [{ value: dadosRota.telefone || '' }, Validators.required],
      email: [{ value: dadosRota.email || '' }, Validators.required],
    });

    this.nome = this.formgroup.get('nome') as FormControl;
    this.cpf = this.formgroup.get('cpf') as FormControl;
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
    const numeroProcesso = this.formgroup.get('numero_processo')?.value;

    if (!numeroProcesso) {
      alert('Informe o número do processo.');
      return;
    }

    // Verifica se o processo já foi adicionado
    if (this.processos.includes(numeroProcesso)) {
      alert('Este número de processo já foi adicionado.');
      return;
    }

    // Adiciona o processo
    this.processos.push(numeroProcesso);
    console.log('Processo adicionado:', numeroProcesso);

    // (Opcional) Limpa apenas o campo de número do processo
    this.formgroup.get('numero_processo')?.reset();
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
