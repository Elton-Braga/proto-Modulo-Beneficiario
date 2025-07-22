import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListaComponent } from './lista/lista.component';
import { NovoCadastroComponent } from './novo-cadastro/novo-cadastro.component';
import { Tela1Component } from './novo-cadastro/tela-1/tela-1.component';
import { Tela2Component } from './novo-cadastro/tela-2/tela-2.component';
import { UnidadeFamilarComponent } from './novo-cadastro/unidade-familar/unidade-familar.component';
import { AssentamentoComponent } from './novo-cadastro/assentamento/assentamento.component';
import { RegularizacaoComponent } from './novo-cadastro/regularizacao/regularizacao.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  { path: '', redirectTo: 'lista', pathMatch: 'full' },
  {
    path: 'lista',
    component: ListaComponent,
  },

  { path: 'Titular', component: Tela1Component },
  { path: 'Titular2', component: Tela2Component },
  { path: 'UnidadeFamiliar', component: UnidadeFamilarComponent },
  { path: 'Assentamento', component: AssentamentoComponent },
  { path: 'Regularizacao', component: RegularizacaoComponent },
  {
    path: 'novo',
    component: NovoCadastroComponent,
    children: [
      { path: '', redirectTo: 'Titular', pathMatch: 'full' },
      { path: 'Titular', component: Tela1Component },
      { path: '', redirectTo: 'Titular1', pathMatch: 'full' },
      { path: 'Titular2', component: Tela2Component },
      { path: 'UnidadeFamiliar', component: UnidadeFamilarComponent },
      { path: 'Assentamento', component: AssentamentoComponent },
      { path: 'Regularizacao', component: RegularizacaoComponent },
    ],
  },
];
