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
import { NumeroProcessoSeiPipe } from '../../pipes/numero-processo-sei.pipe';
import { MatTableModule } from '@angular/material/table';

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
    NumeroProcessoSeiPipe,
    MatTableModule,
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
  items = ['Processos'];
  itemDependente = ['Novo Dependente / Titular'];
  expandedIndex = 0;
  dependentes: any[] = [];
  processos: string[] = [];
  numero_processo!: FormControl;
  displayedColumns: string[] = ['cpf', 'nome', 'apelido', 'acoes'];
  selectedValue!: string;

  constructor(fb: FormBuilder, private localidadesService: ServicosService) {
    this.formgroup = fb.group({
      nome: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      numero_processo: ['', [Validators.required]],
    });

    this.nome = this.formgroup.get('nome') as FormControl;
    this.cpf = this.formgroup.get('cpf') as FormControl;
    this.numero_processo = this.formgroup.get('numero_processo') as FormControl;
  }

  ngOnInit() {
    this.carregarFormularioDoLocalStorage();
    // Expor função globalmente
    (window as any).salvarFormTela1 = () =>
      this.salvarFormularioNoLocalStorage();
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
