import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { SessionService } from './login/servico de autenticacao/session.service';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatIconModule, MatMenuModule, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'INCRA - Módulo Beneficiário';

  constructor(private router: Router, private sessionService: SessionService) {}

  estaNaTelaLogin(): boolean {
    return this.router.url === '/login';
  }

  isLoggedIn(): boolean {
    return this.sessionService.isLoggedIn();
  }

  logout(): void {
    this.sessionService.logout();
    this.router.navigate(['/login']);
  }
}
