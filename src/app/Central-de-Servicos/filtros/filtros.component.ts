import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

// Serviço
import { ServicosService } from '../../novo-cadastro/tela-1/servico/servicos.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'app-filtros',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    // Material
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    RouterLink,
    MatIconModule,
  ],
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.scss'],
})
export class FiltrosComponent implements OnInit {
  form!: FormGroup;
  estados: any[] = [];
  municipios: any[] = [];
  srList: string[] = ['001', '002', '003', '004'];
  statusList: string[] = ['Pendente', 'Em Andamento', 'Concluído', 'Cancelado'];
  tiposServico: string[] = [
    'Vistoria',
    'Regularização',
    'Atualização Cadastral',
    'Outro',
  ];

  constructor(
    private fb: FormBuilder,
    private servicosService: ServicosService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      cpf: ['', [Validators.required]],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      sr: ['', Validators.required],
      uf: ['', Validators.required],
      municipio: ['', Validators.required],
      projetoDeAssentamento: [''],
      numeroDoRequerimento: ['', Validators.required],
      dataDoRequerimento: ['', Validators.required],
      tipoDeServico: ['', Validators.required],
      status: ['Pendente', Validators.required],
    });

    this.carregarEstados();
  }

  carregarEstados(): void {
    this.servicosService.getEstados().subscribe((data) => {
      this.estados = data;
    });
  }

  carregarMunicipios(event: any): void {
    const estadoId = event.value;
    this.servicosService.getMunicipiosPorUF(estadoId).subscribe((data) => {
      this.municipios = data;
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Formulário enviado:', this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  limpar() {}
  pesquisar() {}
}
