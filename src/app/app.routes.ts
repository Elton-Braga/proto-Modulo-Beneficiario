import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListaComponent } from './lista/lista.component';
import { NovoCadastroComponent } from './novo-cadastro/novo-cadastro.component';
import { Tela1Component } from './novo-cadastro/tela-1/tela-1.component';
import { Tela2Component } from './novo-cadastro/tela-2/tela-2.component';
import { UnidadeFamilarComponent } from './novo-cadastro/unidade-familar/unidade-familar.component';
import { AssentamentoComponent } from './novo-cadastro/assentamento/assentamento.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'lista',
    component: ListaComponent,
  },
  {
    path: 'novo',
    component: NovoCadastroComponent,
    children: [
      { path: '', redirectTo: 'Titular', pathMatch: 'full' },
      { path: 'Titular', component: Tela1Component },
      { path: 'Titular2', component: Tela2Component },
      { path: 'UnidadeFamiliar', component: UnidadeFamilarComponent },
      { path: 'Assentamento', component: AssentamentoComponent },
    ],
  },
];
