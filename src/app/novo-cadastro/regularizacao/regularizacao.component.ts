import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, model } from '@angular/core';
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
    //{ value: 'Separação do Casal', viewValue: 'Separação do Casal' },
  ];

  situacao_conjugal: any[] = [
    { value: 'Pessoa Externa ao PNRA', viewValue: 'Pessoa Externa ao PNRA' },
    { value: 'Beneficiario do PNRA', viewValue: 'Beneficiario do PNRA' },
    //{ value: 'Separação do Casal', viewValue: 'Separação do Casal' },
  ];

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      tipo_regularizacao: [null, Validators.required],
      detalhe_regularizacao: [null, Validators.required],
      data_regularizacao: [null, Validators.required],
      inclusao_PNRA: [null, Validators.required],
      inclusao_titular: [],
      inclusao_unidade_familiar: [],
      inclusao_assentamento: [],
      cod_titular: [],
      cpf_titular2: [],
      data_uniao: [],
      situacao_conjugal: [],
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
}
