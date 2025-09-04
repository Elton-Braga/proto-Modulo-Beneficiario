import { Component, Inject, Input } from '@angular/core';
import { Requerimento } from './requeurimentos';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-requerimentos',
  imports: [NgFor],
  templateUrl: './requerimentos.component.html',
  styleUrl: './requerimentos.component.scss',
})
export class RequerimentosComponent {
  @Input() requerimentos: Requerimento[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
