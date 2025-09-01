import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'usuario_logado';
  private readonly LAST_ACTIVITY_KEY = 'ultima_atividade';
  private readonly TIMEOUT_MINUTES = 30; // tempo máximo sem uso

  private mockUsuarios = [
    { cpf: '11111111111', senha: '123456', perfil: 'admin' },
    { cpf: '22222222222', senha: 'senha123', perfil: 'colaborador' },
  ];

  constructor(private router: Router) {}

  login(cpf: string, senha: string): boolean {
    const cpfLimpo = cpf.trim();

    const usuario = this.mockUsuarios.find(
      (u) => u.cpf === cpfLimpo && u.senha === senha
    );

    if (usuario) {
      localStorage.setItem(this.TOKEN_KEY, JSON.stringify(usuario));
      this.updateActivity(); // registra hora da última atividade
      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.LAST_ACTIVITY_KEY);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  updateActivity(): void {
    localStorage.setItem(this.LAST_ACTIVITY_KEY, Date.now().toString());
  }

  isSessionExpired(): boolean {
    const last = localStorage.getItem(this.LAST_ACTIVITY_KEY);
    if (!last) return true;

    const lastTime = parseInt(last, 10);
    const now = Date.now();
    const diffMinutes = (now - lastTime) / 1000 / 60;

    return diffMinutes > this.TIMEOUT_MINUTES;
  }
}
