import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'usuario_logado';

  // mock centralizado aqui
  private mockUsuarios = [
    { cpf: '11111111111', senha: '123456', perfil: 'admin' },
    { cpf: '22222222222', senha: 'senha123', perfil: 'colaborador' },
  ];

  constructor(private router: Router) {}

  login(cpf: string, senha: string): boolean {
    const cpfLimpo = cpf.trim(); // Remove espaços extras

    const usuario = this.mockUsuarios.find(
      (u) => u.cpf === cpfLimpo && u.senha === senha
    );

    if (usuario) {
      localStorage.setItem(this.TOKEN_KEY, JSON.stringify(usuario));
      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }
}
