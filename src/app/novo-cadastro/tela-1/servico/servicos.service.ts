import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicosService {
  private baseUrl = 'https://servicodados.ibge.gov.br/api/v1/localidades';

  constructor(private http: HttpClient) {}

  // Lista todos os estados

  getEstados(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/estados?orderBy=nome`);
  }

  // Lista municípios por UF (id numérico do estado)
  getMunicipiosPorUF(uf: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/estados/${uf}/municipios`);
  }
}
