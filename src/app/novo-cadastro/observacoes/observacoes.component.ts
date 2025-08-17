import { Component } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-observacoes',
  imports: [
    MatRadioModule,
    MatDatepickerModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './observacoes.component.html',
  styleUrl: './observacoes.component.scss',
  standalone: true,
})
export class ObservacoesComponent {
  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const dadosRota = history.state;

    this.form = this.fb.group({
      observacao: [''],
      data_observacao: [
        { value: dadosRota.data_observacao || '', disabled: false },
        Validators.required,
      ],

      apto_para_beneficiario: ['', Validators.required],
    });

    // tenta carregar do localStorage
  }
}
