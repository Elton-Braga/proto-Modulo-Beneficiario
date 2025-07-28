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
import { NgFor, NgIf } from '@angular/common';

@Component({
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
    NgFor,
  ],
  templateUrl: './tela-1.component.html',
  styleUrl: './tela-1.component.scss',
  providers: [provideNgxMask(), provideNativeDateAdapter(), ServicosService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tela1Component {
  formgroup!: FormGroup;
  nome!: FormControl;
  cpf!: FormControl;
  apelido!: FormControl;
  genero!: FormControl;
  data_nasc!: FormControl;
  estado_civil!: FormControl;
  data_falecimento!: FormControl;
  pai!: FormControl;
  mae!: FormControl;
  nacionalidade!: FormControl;
  naturalidade!: FormControl;
  municipio!: FormControl;
  cod_municipio!: FormControl;
  tipo_identificaçao!: FormControl;
  numero!: FormControl;
  orgao_expedicao!: FormControl;
  data_expedicao!: FormControl;
  nis!: FormControl;
  telefone!: FormControl;
  email!: FormControl;
  numero_processo!: FormControl;
  selectedValue!: string;
  estados: any[] = [];
  municipios: any[] = [];
  codigoMunicipio: string = '';
  items = ['Processos'];
  expandedIndex = 0;
  dependentes: any[] = [];
  processos: string[] = [];

  foods: any[] = [
    { value: 'steak-0', viewValue: 'Masculino' },
    { value: 'pizza-1', viewValue: 'Feminino' },
  ];

  tipo_identificacao: any[] = [
    { value: 'RG', viewValue: 'Identidade Civil' },
    { value: 'RGM', viewValue: 'Identidade Funcional Militar' },
    { value: 'RGF', viewValue: 'Carteira de Habilitação' },
  ];

  Estado_civil: any[] = [
    { value: 'steak-0', viewValue: 'Casado' },
    { value: 'pizza-1', viewValue: 'Solteiro' },
    { value: 'steak-0', viewValue: 'Viuvo' },
    { value: 'pizza-1', viewValue: 'Divorciado' },
  ];

  pais: any[] = [
    { value: 'br', viewValue: 'Brasileiro' },
    { value: 'outro', viewValue: 'Outro' },
  ];

  constructor(fb: FormBuilder, private localidadesService: ServicosService) {
    this.formgroup = fb.group({
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      apelido: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      data_nasc: ['', [Validators.required]],
      estado_civil: ['', [Validators.required]],
      data_falecimento: [''],
      pai: ['', [Validators.required]],
      mae: ['', [Validators.required]],
      nacionalidade: ['', [Validators.required]],
      naturalidade: ['', [Validators.required]],
      municipio: ['', [Validators.required]],
      cod_municipio: ['', [Validators.required]],
      tipo_identificacao: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      orgao_expedicao: ['', [Validators.required]],
      data_expedicao: ['', [Validators.required]],
      nis: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      numero_processo: ['', [Validators.required]],
    });

    this.nome = this.formgroup.get('nome') as FormControl;
    this.cpf = this.formgroup.get('cpf') as FormControl;
    this.apelido = this.formgroup.get('apelido') as FormControl;
    this.genero = this.formgroup.get('genero') as FormControl;
    this.data_nasc = this.formgroup.get('data_nasc') as FormControl;
    this.estado_civil = this.formgroup.get('estado_civil') as FormControl;
    this.data_falecimento = this.formgroup.get(
      'data_falecimento'
    ) as FormControl;
    this.pai = this.formgroup.get('pai') as FormControl;
    this.mae = this.formgroup.get('mae') as FormControl;
    this.nacionalidade = this.formgroup.get('nacionalidade') as FormControl;
    this.naturalidade = this.formgroup.get('naturalidade') as FormControl;
    this.municipio = this.formgroup.get('municipio') as FormControl;
    this.cod_municipio = this.formgroup.get('cod_municipio') as FormControl;
    this.tipo_identificaçao = this.formgroup.get(
      'tipo_identificaçao'
    ) as FormControl;
    this.numero = this.formgroup.get('numero') as FormControl;
    this.orgao_expedicao = this.formgroup.get('orgao_expedicao') as FormControl;
    this.data_expedicao = this.formgroup.get('data_expedicao') as FormControl;
    this.nis = this.formgroup.get('nis') as FormControl;
    this.telefone = this.formgroup.get('telefone') as FormControl;
    this.email = this.formgroup.get('email') as FormControl;
    this.numero_processo = this.formgroup.get('numero_processo') as FormControl;
  }

  ngOnInit() {
    this.carregarFormularioDoLocalStorage();
    this.localidadesService.getEstados().subscribe((estados) => {
      this.estados = estados;
    });

    // Expor função globalmente
    (window as any).salvarFormTela1 = () =>
      this.salvarFormularioNoLocalStorage();

    // Carrega municípios quando o estado mudar

    // Atualiza o código do município quando selecionado
    this.formgroup
      .get('municipio')
      ?.valueChanges.subscribe((municipioSelecionado) => {
        const municipio = this.municipios.find(
          (m) => m.nome === municipioSelecionado
        );
        if (municipio) {
          this.formgroup.get('cod_municipio')?.setValue(municipio.id);
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

  carregarMunicipios(uf: string) {
    this.localidadesService.getMunicipiosPorUF(uf).subscribe((municipios) => {
      this.municipios = municipios;
    });
  }

  atualizarCodigoMunicipio(nome: string) {
    const municipioSelecionado = this.municipios.find((m) => m.nome === nome);
    if (municipioSelecionado) {
      this.codigoMunicipio = municipioSelecionado.id;

      // Atualiza o FormGroup com o código, mesmo que o input esteja desabilitado
      this.formgroup.patchValue({ cod_municipio: municipioSelecionado.id });
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

  adicionarDependente() {
    if (this.dependentes.length >= 1) {
      alert('Apenas um dependente pode ser adicionado.');
      return;
    }

    if (this.formgroup.valid) {
      const novoDependente = this.formgroup.value; // ou selecione apenas os campos que quiser

      this.dependentes.push(novoDependente);

      // Se quiser limpar o formulário após adicionar:
      this.formgroup.reset();

      // Ou emitir evento, salvar em storage, etc.
      console.log('Dependente adicionado:', novoDependente);
    } else {
      alert(
        'Preencha todos os campos obrigatórios para adicionar o dependente.'
      );
    }
  }
}
