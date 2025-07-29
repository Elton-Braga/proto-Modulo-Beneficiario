import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numeroProcessoSei',
})
export class NumeroProcessoSeiPipe implements PipeTransform {
  transform(value: string | number): string {
    const str = value.toString().padStart(13, '0'); // garante 13 dígitos
    const parte1 = str.slice(0, 9);
    const parte2 = str.slice(9, 13);
    return `${parte1}/${parte2}`;
  }
}
