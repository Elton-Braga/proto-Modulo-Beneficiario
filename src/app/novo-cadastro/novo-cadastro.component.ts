import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  NavigationEnd,
} from '@angular/router';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-novo-cadastro',
  imports: [
    MatButtonModule,
    RouterLink,
    BreadcrumbModule,
    RouterOutlet,
    NgIf,
    MatIconModule,
  ],
  templateUrl: './novo-cadastro.component.html',
  styleUrl: './novo-cadastro.component.scss',
})
export class NovoCadastroComponent {
  items: any[] = [];
  home = { icon: 'pi pi-home', routerLink: '/inicio' };

  etapas = ['Titular', 'Titular2', 'UnidadeFamiliar', 'Assentamento'];
  etapaAtualIndex = 0;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // Pega a URL real da rota após o NavigationEnd
        const currentUrl = this.router.url;
        const partes = currentUrl.split('/');
        const etapa = partes[partes.length - 1]; // pega a última parte da URL
        this.etapaAtualIndex = this.etapas.indexOf(etapa);
        this.atualizarBreadcrumb();
      });

    // Evita breadcrumb vazio ao carregar direto (F5)
    const etapaInicial = this.router.url.split('/').pop();
    this.etapaAtualIndex = this.etapas.indexOf(etapaInicial ?? '');
    this.atualizarBreadcrumb();
  }

  atualizarBreadcrumb() {
    this.items = this.etapas
      .slice(0, this.etapaAtualIndex + 1)
      .map((etapa) => ({
        label: this.capitalizar(etapa),
      }));
  }

  capitalizar(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  voltar() {
    if (this.etapaAtualIndex > 0) {
      const rotaAnterior = this.etapas[this.etapaAtualIndex - 1];
      this.router.navigate([rotaAnterior], { relativeTo: this.route });
    } else {
      // Está na primeira etapa, volta para a tela de lista
      this.router.navigate(['/lista']);
    }
  }

  avancar() {
    // Tenta salvar os dados da tela atual, se houver
    if ((window as any).salvarFormTela1) {
      (window as any).salvarFormTela1();
    }

    if (this.etapaAtualIndex < this.etapas.length - 1) {
      const rota = this.etapas[this.etapaAtualIndex + 1];
      this.router.navigate([rota], { relativeTo: this.route });
    }
  }

  ehUltimaEtapa(): boolean {
    return this.etapaAtualIndex === this.etapas.length - 1;
  }

  salvar() {
    console.log('Dados salvos!', this.avancar());
    // Aqui poderá chamar serviço de API, exibir snackbar etc.
  }
}
