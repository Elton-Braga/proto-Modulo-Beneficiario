import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListaComponent } from './lista/lista.component';
import { NovoCadastroComponent } from './novo-cadastro/novo-cadastro.component';
import { Tela1Component } from './novo-cadastro/tela-1/tela-1.component';
import { TelaDashboardComponent } from './tela-dashboard/tela-dashboard.component';
import { authGuard } from './login/guarda de rotas/auth.guard';

//import { authGuard } from './auth.guard'; // guarda funcional

export const routes: Routes = [
  // Rotas públicas
  { path: 'login', component: LoginComponent },

  // Rotas protegidas (precisam de login)
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'selecaodeservicos', pathMatch: 'full' },
      { path: 'lista', component: ListaComponent },
      { path: 'selecaodeservicos', component: TelaDashboardComponent },
      {
        path: 'novo',
        component: NovoCadastroComponent,
        children: [
          { path: '', redirectTo: 'Titular', pathMatch: 'full' },
          { path: 'Titular', component: Tela1Component },
        ],
      },
    ],
  },

  // Fallback
  { path: '**', redirectTo: 'login' },
];
