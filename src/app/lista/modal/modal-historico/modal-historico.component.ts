import { Component, Inject, Input } from '@angular/core';
import { HistoricoPNRA } from './HistoricoPNRA';
import { NgFor, NgIf } from '@angular/common';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-historico',
  imports: [NgFor],
  templateUrl: './modal-historico.component.html',
  styleUrl: './modal-historico.component.scss',
})
export class ModalHistoricoComponent {
  @Input() historicoPNRA: HistoricoPNRA[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
