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
import { MOCK_BENEFICIARIOS } from '../../lista/MOCK_BENEFICIATIO';
import { Beneficiario } from '../../lista/beneficiario';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

type Bloqueio = 'sim' | 'não';

@Component({
  selector: 'app-bloqueios',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
  ],
  templateUrl: './bloqueios.component.html',
  styleUrl: './bloqueios.component.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BloqueiosComponent {
  form!: FormGroup;
  beneficiarios: Beneficiario[] = [];
  bloqueio: Bloqueio = 'não';

  constructor(private fb: FormBuilder) {
    // Recupera os dados passados via state na navegação
    const dadosRota = history.state;

    // Pega o primeiro item da lista de bloqueios (caso exista)
    const bloqueio =
      dadosRota.bloqueios && dadosRota.bloqueios.length > 0
        ? dadosRota.bloqueios[0]
        : {};

    // Define valor inicial do campo "bloqueio" (sim ou não)
    const bloqueioInicial: 'sim' | 'não' =
      (bloqueio.bloqueio || '').toLowerCase() === 'sim' ? 'sim' : 'não';

    // Criação do formulário com os valores preenchidos a partir do bloqueio
    this.form = this.fb.group({
      bloqueio: [bloqueioInicial, Validators.required],

      codigoBeneficiario: [
        { value: bloqueio.codigo_beneficiario || '', disabled: true },
        [Validators.required],
      ],

      codigoTipoBloqueio: [
        bloqueio.codigo_tipo_bloqueio || '',
        [Validators.required],
      ],

      observacoes: [bloqueio.observacao || '', [Validators.required]],

      descricaoBloqueio: [
        bloqueio.descricao_bloqueio || '',
        [Validators.required],
      ],

      codigoTransacao: [bloqueio.codigo_transacao || '', [Validators.required]],

      dataBloqueio: [bloqueio.data_bloqueio || '', [Validators.required]],

      codigoSubBloqueio: [
        bloqueio.codigo_sub_bloqueio || '',
        [Validators.required],
      ],

      descricaoSubBloqueio: [
        bloqueio.descricao_sub_bloqueio || '',
        [Validators.required],
      ],

      codigoMotivoBloqueio: [
        bloqueio.codigo_motivo_bloqueio || '',
        [Validators.required],
      ],

      descricaoMotivoBloqueio: [
        bloqueio.descricao_motivo_bloqueio || '',
        [Validators.required],
      ],

      desbloqueioAtendido: [
        bloqueio.desbloqueio_atendido || '',
        [Validators.required],
      ],

      situacaoAnalise: [bloqueio.situacao_analise || '', [Validators.required]],

      dataResultado: [bloqueio.data_resultado || '', [Validators.required]],
    });
  }
  ngOnInit() {
    this.beneficiarios = MOCK_BENEFICIARIOS;

    const dados = history.state;
    console.log('Dados da rota:', dados);
  }
}
