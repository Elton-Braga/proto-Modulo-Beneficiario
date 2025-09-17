import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-lote',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
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

  colunasTabela: string[] = [
    'codigoProjeto',
    'nomeProjeto',
    'agrovilaContato',
    'codigoContato',
    'loteIndividualContato',
    'nomeLote',
    'numeroLote',
    'codigoMunicipioComunincra',
    'acoes',
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      codigoProjeto: ['', Validators.required],
      nomeProjeto: ['', Validators.required],
      agrovilaContato: ['', Validators.required],
      codigoContato: ['', Validators.required],
      loteIndividualContato: ['', Validators.required],
      nomeLote: ['', Validators.required],
      numeroLote: ['', Validators.required],
      codigoMunicipioComunincra: ['', Validators.required],
    });
  }

  adicionarLote(): void {
    if (!this.form.valid) return;

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
  codigoProjeto: string;
  nomeProjeto: string;
  agrovilaContato: string;
  codigoContato: string;
  loteIndividualContato: string;
  nomeLote: string;
  numeroLote: string;
  codigoMunicipioComunincra: string;
  editando?: boolean;
}
