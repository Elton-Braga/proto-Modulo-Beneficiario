import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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
  ],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './regularizacao.component.html',
  styleUrl: './regularizacao.component.scss',
})
export class RegularizacaoComponent {
  form: FormGroup;
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
    { value: 'inclusao_0', viewValue: 'inclusao 0' },
    { value: 'inclusao_1', viewValue: 'inclusao 1' },
    { value: 'inclusao_2', viewValue: 'inclusao 2' },
  ];

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      tipo_regularizacao: [null, Validators.required],
      detalhe_regularizacao: [null, Validators.required],
      data_regularizacao: [null, Validators.required],
      inclusao_PNRA: [null, Validators.required],
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
