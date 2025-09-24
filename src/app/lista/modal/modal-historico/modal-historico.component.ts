import { Component, Inject, Input } from '@angular/core';
import { HistoricoPNRA } from './HistoricoPNRA';
import { NgFor, NgIf } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-historico',
  imports: [NgFor, NgIf],
  templateUrl: './modal-historico.component.html',
  styleUrl: './modal-historico.component.scss',
})
export class ModalHistoricoComponent {
  @Input() historicoPNRA: HistoricoPNRA[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    if (data?.historicoPNRA) {
      this.historicoPNRA = this.removerDuplicatas(data.historicoPNRA);
    }
  }

  private removerDuplicatas(historico: HistoricoPNRA[]): HistoricoPNRA[] {
    const mapa = new Map<string, HistoricoPNRA>();

    historico.forEach((item) => {
      const chave = `${item.codigo_beneficiario}-${item.nome_PA}-${item.situacao}-${item.data_Situacao}`;
      if (!mapa.has(chave)) {
        mapa.set(chave, item);
      }
    });

    return Array.from(mapa.values());
  }
}
