import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RealtorioService {
  private dadosRelatorio: any[] = [];

  setDados(dados: any[]) {
    this.dadosRelatorio = dados;
  }

  getDados(): any[] {
    return this.dadosRelatorio;
  }

  clearDados() {
    this.dadosRelatorio = [];
  }
}
