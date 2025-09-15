import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListaComponent } from './lista/lista.component';
import { NovoCadastroComponent } from './novo-cadastro/novo-cadastro.component';
import { Tela1Component } from './novo-cadastro/tela-1/tela-1.component';
import { TelaDashboardComponent } from './tela-dashboard/tela-dashboard.component';
import { authGuard } from './login/guarda de rotas/auth.guard';
import { FiltrosComponent } from './Central-de-Servicos/filtros/filtros.component';
import { RelatorioRDComponent } from './lista/modal/relatorio-rd/relatorio-rd.component';

//import { authGuard } from './auth.guard'; // guarda funcional

export const routes: Routes = [
  // Rotas públicas
  { path: 'login', component: LoginComponent },
  {
    path: 'relatorio',
    component: RelatorioRDComponent,
  },
  // Rotas protegidas (precisam de login)
  {
    path: '',
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'selecaodeservicos', pathMatch: 'full' },
      { path: 'lista', component: ListaComponent },
      { path: 'selecaodeservicos', component: TelaDashboardComponent },
      { path: 'filtroservicos', component: FiltrosComponent },
      {
        path: 'novo',
        component: NovoCadastroComponent,
        children: [
          { path: '', redirectTo: 'Titular', pathMatch: 'full' },
          { path: 'Titular', component: Tela1Component },
        ],
      },
      /*{
        path: 'relatorio',
        component: RelatorioRDComponent,
      },*/
    ],
  },

  // Fallback
  { path: '**', redirectTo: 'login' },
];
