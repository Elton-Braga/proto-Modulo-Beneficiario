import { NgIf } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
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
  ],
  providers: [provideNativeDateAdapter()],
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
    { value: 'tipo_0', viewValue: 'tipo 0' },
    { value: 'tipo_1', viewValue: 'tipo 1' },
    { value: 'tipo_2', viewValue: 'tipo 2' },
  ];

  detalhe_regularizacao: any[] = [
    { value: 'detalhe_0', viewValue: 'detalhe 0' },
    { value: 'detalhe_1', viewValue: 'detalhe 1' },
    { value: 'detalhe_2', viewValue: 'detalhe 2' },
  ];

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
    { value: 'Pessoa Externa ao PNRA', viewValue: 'Titular desiste do PNRA' },
    { value: 'Beneficiario do PNRA', viewValue: 'Beneficiario do PNRA' },
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
      { name: 'Dependente 1', completed: false },
      { name: 'Dependente 2', completed: false },
      { name: 'Dependente 3', completed: false },
    ],
  });

  constructor(fb: FormBuilder) {
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
      situacao_conjugal: [],
      destino_titular_excluido: [],
      n_lote: [],
      cod_projeto: [],
      sr: ['valor ficticio'],
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
}

export interface Task {
  name: string;
  completed: boolean;
  subtasks?: Task[];
}
