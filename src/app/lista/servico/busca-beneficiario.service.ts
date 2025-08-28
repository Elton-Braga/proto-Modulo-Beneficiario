import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BuscaBeneficiarioService {
  constructor() {}

  private normalizarCPF(cpf: string): string {
    return cpf ? cpf.replace(/\D/g, '') : '';
  }

  /**
   * Normaliza strings (ignora maiúsculas/minúsculas e acentos)
   */
  private normalizarTexto(texto: string): string {
    return texto
      ? texto
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
      : '';
  }

  /**
   * Aplica filtros no array de beneficiários
   */
  filtrar(
    beneficiarios: any[],
    filtros: {
      cpf?: string;
      nome?: string;
      municipio?: string;
      naturalidade?: string;
      numero_processo?: string;
    }
  ): any[] {
    return beneficiarios.filter((b) => {
      let ok = true;

      // Filtro por CPF
      if (filtros.cpf) {
        ok =
          ok &&
          this.normalizarCPF(b.cpf_T1) === this.normalizarCPF(filtros.cpf);
      }

      // Filtro por Nome
      if (filtros.nome) {
        ok =
          ok &&
          this.normalizarTexto(b.nome_T1).includes(
            this.normalizarTexto(filtros.nome)
          );
      }

      // Filtro por Município
      if (filtros.municipio) {
        ok =
          ok &&
          this.normalizarTexto(b.municipio) ===
            this.normalizarTexto(filtros.municipio);
      }

      // Filtro por Naturalidade
      if (filtros.naturalidade) {
        ok =
          ok &&
          this.normalizarTexto(b.naturalidade) ===
            this.normalizarTexto(filtros.naturalidade);
      }

      // Filtro por número de processo (array)
      /*   if (filtros.numero_processo) {
        ok =
          ok &&
          b.numero_processo?.some(
            (np: string) =>
              this.normalizarTexto(np) ===
              this.normalizarTexto(filtros.numero_processo)
          );
      }
*/
      return ok;
    });
  }
}
