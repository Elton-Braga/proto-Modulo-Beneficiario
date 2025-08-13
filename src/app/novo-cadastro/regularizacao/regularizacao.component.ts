import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  Inject,
  model,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Beneficiario } from '../../lista/beneficiario';
import { ModalRegularizacaoComponent } from '../../lista/modal/modal-regularizacao/modal-regularizacao.component';

@Component({
  selector: 'app-regularizacao',
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatCardModule,
    NgIf,
    NgxMaskDirective,
  ],
  providers: [provideNativeDateAdapter(), provideNgxMask()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './regularizacao.component.html',
  styleUrl: './regularizacao.component.scss',
})
export class RegularizacaoComponent {
  form: FormGroup;
  readonly checked = model(false);
  readonly indeterminate = model(false);
  readonly labelPosition = model<'before' | 'after'>('after');
  readonly disabled = model(false);

  tipo_regularizacao: any[] = [
    { value: 'Por Inclusão de Cônjuge', viewValue: 'Por Inclusão de Cônjuge' },
    {
      value: 'Por União de Beneficiários',
      viewValue: 'Por União de Beneficiários',
    },
    {
      value: 'Por Separação de Beneficiário',
      viewValue: 'Por Separação de Beneficiário',
    },
    {
      value: 'Excluído deixará de ser Beneficiário',
      viewValue: 'Excluído deixará de ser Beneficiário',
    },
    {
      value: 'Excluído ocupará outro lote',
      viewValue: 'Excluído ocupará outro lote',
    },
    {
      value: 'Excluido se unirá a outro Beneficiário',
      viewValue: 'Excluido se unirá a outro Beneficiário',
    },
    { value: 'Por Exclusão doTitular', viewValue: 'Por Exclusão doTitular' },

    {
      value: 'Por Exclusão da Unidade Familiar',
      viewValue: 'Por Exclusão da Unidade Familiar',
    },
    {
      value: 'Por Atribuição/Troca de Lote',
      viewValue: 'Por Atribuição/Troca de Lote',
    },
    { value: 'Bloqueio/Desbloqueio', viewValue: 'Bloqueio/Desbloqueio' },
  ];

  detalhe_regularizacao: any[] = [
    { value: 'detalhe_0', viewValue: 'detalhe 0' },
    { value: 'detalhe_1', viewValue: 'detalhe 1' },
    { value: 'detalhe_2', viewValue: 'detalhe 2' },
  ];

  /*
  1. Por Inclusão de Cônjuge
2. Por União de Beneficiários
3. Por Separação de Beneficiário
3.1. Excluído deixará de ser Beneficiário
3.2. Excluído ocupará outro lote
3.3 Excluido se unirá a outro Beneficiário
4. Por Exclusão doTitular
5. Por Exclusão da Unidade Familiar
6. Por Atribuição/Troca de Lote
7. Bloqueio/Desbloqueio
  */

  inclusao_PNRA: any[] = [
    { value: 'Default', viewValue: 'Default' },
    { value: 'Pessoa Externa ao PNRA', viewValue: 'Pessoa Externa ao PNRA' },
    { value: 'Beneficiario do PNRA', viewValue: 'Beneficiario do PNRA' },
    { value: 'Separação do casal', viewValue: 'Separação do casal' },
    { value: 'Falecimento de Titular', viewValue: 'Falecimento de Titular' },
    { value: 'Desistencia do Titular', viewValue: 'Desistencia do Titular' },
    { value: 'Evasão do Titular', viewValue: 'Evasão do Titular' },
  ];

  situacao_conjugal: any[] = [
    { value: 'Casado', viewValue: 'Casado' },
    { value: 'Solteiro', viewValue: 'Solteiro' },
    { value: 'Viúvo', viewValue: 'Viúvo' },
    { value: 'Divorciado', viewValue: 'Divorciado' },
    { value: 'União estável', viewValue: 'União estável' },
  ];

  s_conjugal: any[] = [
    { value: 'Casado', viewValue: 'Casado' },
    { value: 'Solteiro', viewValue: 'Solteiro' },
    { value: 'Viúvo', viewValue: 'Viúvo' },
    { value: 'Divorciado', viewValue: 'Divorciado' },
    { value: 'União estável', viewValue: 'União estável' },
  ];

  destino_titular_excluido: any[] = [
    { value: 'Titular desiste do PNRA', viewValue: 'Titular desiste do PNRA' },
    {
      value: 'Titular excluído vai para outro lote vago',
      viewValue: 'Titular excluído vai para outro lote vago',
    },
    {
      value: 'Titular excluído se une a outro beneficiário',
      viewValue: 'Titular excluído se une a outro beneficiário',
    },
  ];

  sr: any[] = [{ value: 'valor ficticio', viewValue: 'valor ficticio' }];

  readonly task = signal<Task>({
    name: 'Todos os dependentes',
    completed: false,
    subtasks: [
      { name: 'João da Silva', completed: false },
      { name: 'Fernando Albuquerque', completed: false },
      { name: 'Antonio Eufrasino', completed: false },
    ],
  });

  constructor(
    fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dados: Beneficiario,
    private dialogRef: MatDialogRef<ModalRegularizacaoComponent>
  ) {
    this.form = fb.group({
      tipo_regularizacao: [null, Validators.required],
      detalhe_regularizacao: [null, Validators.required],
      data_regularizacao: [null, Validators.required],
      inclusao_PNRA: ['Default', Validators.required],
      inclusao_titular: [],
      inclusao_unidade_familiar: [],
      inclusao_assentamento: [],
      cod_titular: [],
      cpf_titular2: [],
      data_uniao: [],
      situacao_conjugal: ['Solteiro'],
      destino_titular_excluido: [],
      n_lote: [],
      cod_projeto: [],
      sr: ['valor ficticio'],
      data_uniao2: [],
      cod_beneficiario: [],
    });
  }

  ngOnInit() {}

  onSubmit(): void {
    if (this.form.valid) {
      const dados = this.form.value;
      console.log('Dados da Regularização:', dados);
      // Aqui você pode persistir os dados ou enviar para API
    } else {
      this.form.markAllAsTouched();
    }
  }

  readonly partiallyComplete = computed(() => {
    const task = this.task();
    if (!task.subtasks) {
      return false;
    }
    return (
      task.subtasks.some((t) => t.completed) &&
      !task.subtasks.every((t) => t.completed)
    );
  });

  update(completed: boolean, index?: number) {
    this.task.update((task) => {
      if (index === undefined) {
        task.completed = completed;
        task.subtasks?.forEach((t) => (t.completed = completed));
      } else {
        task.subtasks![index].completed = completed;
        task.completed = task.subtasks?.every((t) => t.completed) ?? true;
      }
      return { ...task };
    });
  }

  fechar(): void {
    this.dialogRef.close(); // Fecha a modal
  }
}

export interface Task {
  name: string;
  completed: boolean;
  subtasks?: Task[];
}
