import { CdkAccordionModule } from '@angular/cdk/accordion';
import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-espelho',
  imports: [CdkAccordionModule],
  templateUrl: './modal-espelho.component.html',
  styleUrl: './modal-espelho.component.scss',
})
export class ModalEspelhoComponent {
  items = ['Dados do Titular 1', 'Dados do Titular 1'];
  expandedIndex = 0;
}
