import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ServicosService } from '../tela-1/servico/servicos.service';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-lote',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTableModule,
    FormsModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './lote.component.html',
  styleUrls: ['./lote.component.scss'],
})
export class LoteComponent {
  form!: FormGroup;
  lotes: Lote[] = [];
  loteSelecionado?: Lote;
  indexSelecionado?: number;
  tipo_lote = [
    { value: 'teste1', viewValue: 'teste1' },
    { value: 'teste2', viewValue: 'teste2' },
    { value: 'teste3', viewValue: 'teste3' },
  ];

  colunasTabela: string[] = [
    'tipo_lote',
    'area_lote',
    'numero_lote',
    'codigo_SNCR',
    'denominacao_Gleba',
    'denominacao_lote',
    'acoes', // adiciona a coluna de ações
  ];

  constructor(
    private fb: FormBuilder,
    private servicosService: ServicosService,
    private router: Router
  ) {}

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

    // Recupera dados enviados pela rota
    // ✅ Recupera via history.state
    const state = history.state as any;
    if (state?.tela_lote) {
      this.lotes = state.tela_lote.map((l: Lote) => ({
        ...l,
        editando: false,
      }));
    }
  }

  adicionarLote(): void {
    if (!this.form.valid) {
      return;
    }

    const lote: Lote = {
      ...this.form.value,
      editando: false,
    };
    this.lotes = [...this.lotes, lote];

    this.form.reset();
  }

  editarLote(lote: Lote): void {
    lote.editando = true;
  }

  salvarLote(lote: Lote): void {
    lote.editando = false;
    // Aqui pode chamar service para persistir alterações, se necessário
  }

  excluirLote(index: number): void {
    this.lotes.splice(index, 1);
    this.lotes = [...this.lotes];
  }

  get loteControlesValidos(): boolean {
    return this.form.valid;
  }
}

interface Lote {
  tipo_lote: string;
  area_lote: string;
  numero_lote: string;
  codigo_SNCR: string;
  denominacao_Gleba: string;
  denominacao_lote: string;
  editando?: boolean; // controle de edição
}
