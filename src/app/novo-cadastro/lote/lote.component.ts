import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ServicosService } from '../tela-1/servico/servicos.service';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-lote',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './lote.component.html',
  styleUrls: ['./lote.component.scss'],
})
export class LoteComponent {
  form!: FormGroup;

  /** opções do campo Tipo de Lote */
  tipo_lote = [
    { value: 'teste1', viewValue: 'teste1' },
    { value: 'teste2', viewValue: 'teste2' },
    { value: 'teste3', viewValue: 'teste3' },
  ];

  lotes: Lote[] = [];
  private readonly STORAGE_KEY = 'cadastroBenef';

  constructor(
    private fb: FormBuilder,
    private servicosService: ServicosService
  ) {}

  // ---------- inicialização ----------
  ngOnInit(): void {
    this.form = this.fb.group({
      tipo_lote: ['', Validators.required],
      area_lote: [
        '',
        [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)],
      ],
      numero_lote: ['', Validators.required],
      codigo_SNCR: ['', Validators.required],
      denominacao_Gleba: ['', Validators.required],
      denominacao_lote: ['', Validators.required],
    });

    // tenta carregar do localStorage
    const salvo = localStorage.getItem(this.STORAGE_KEY);
    if (salvo) {
      const { formValues, lotes } = JSON.parse(salvo);
      this.form.patchValue(formValues);
      this.lotes = lotes ?? [];
    }
  }

  // ---------- getter conveniência ----------
  get loteControlesValidos(): boolean {
    return this.form.valid;
    /*
    return ['tipo_lote', 'area_lote', 'numero_lote', 'codigo_SNCR'].every(
      (campo) => this.form.get(campo)?.valid
    );*/
  }

  // ---------- inclusão de Lote ----------
  adicionarLote(): void {
    if (
      this.form.get('tipo_lote')?.invalid ||
      this.form.get('area_lote')?.invalid ||
      this.form.get('numero_lote')?.invalid ||
      this.form.get('codigo_SNCR')?.invalid ||
      this.form.get('denominacao_Gleba')?.invalid ||
      this.form.get('denominacao_lote')?.invalid
    ) {
      return;
    }

    const lote: Lote = {
      tipo_lote: this.form.value.tipo_lote,
      area_lote: this.form.value.area_lote,
      numero_lote: this.form.value.numero_lote,
      codigo_SNCR: this.form.value.codigo_SNCR,
      denominacao_Gleba: this.form.value.denominacao_Gleba,
      denominacao_lote: this.form.value.denominacao_lote,
    };

    this.lotes.push(lote);
    this.form.patchValue({
      tipo_lote: '',
      area_lote: '',
      numero_lote: '',
      codigo_SNCR: '',
      denominacao_Gleba: '',
      denominacao_lote: '',
    });
    this.salvarNoStorage();
  }

  // ---------- persistência ----------
  private salvarNoStorage(): void {
    localStorage.setItem(
      this.STORAGE_KEY,
      JSON.stringify({
        formValues: this.form.value,
        lotes: this.lotes,
      })
    );
  }
}

interface Lote {
  tipo_lote: string;
  area_lote: string;
  numero_lote: string;
  codigo_SNCR: string;
  denominacao_Gleba: string;
  denominacao_lote: string;
}
