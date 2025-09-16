import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { routes } from './app/app.routes';
import { environment } from './environments/environment'; // <-- importa o ambiente correto
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: APP_BASE_HREF, useValue: '/proto-Modulo-Beneficiario/' },
    provideRouter(routes),
    provideHttpClient(),
  ],
});
