import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-bloqueios',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
  ],
  templateUrl: './bloqueios.component.html',
  styleUrl: './bloqueios.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BloqueiosComponent {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      codigoBeneficiario: ['', Validators.required],
      codigoTipoBloqueio: ['', Validators.required],
      descricaoBloqueio: ['', [Validators.required, Validators.minLength(3)]],
      codigoTransacao: ['', Validators.required],
      dataBloqueio: [
        '',
        [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)],
      ],
      codigoSubBloqueio: ['', Validators.required],
      descricaoSubBloqueio: [
        '',
        [Validators.required, Validators.minLength(3)],
      ],
      codigoMotivoBloqueio: ['', Validators.required],
      descricaoMotivoBloqueio: [
        '',
        [Validators.required, Validators.minLength(3)],
      ],
      desbloqueioAtendido: ['', Validators.required],
      situacaoAnalise: ['', Validators.required],
      dataResultado: [
        '',
        [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)],
      ],
    });
  }
}
