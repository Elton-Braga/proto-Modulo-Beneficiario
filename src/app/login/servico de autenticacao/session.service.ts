import { Injectable, NgZone } from '@angular/core';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private intervalId: any;

  constructor(private auth: AuthService, private ngZone: NgZone) {}

  iniciarMonitoramento() {
    // eventos que "resetam" o contador
    ['click', 'mousemove', 'keydown', 'scroll'].forEach((evento) => {
      window.addEventListener(evento, () => this.auth.updateActivity());
    });

    // checagem periódica
    this.ngZone.runOutsideAngular(() => {
      this.intervalId = setInterval(() => {
        if (this.auth.isSessionExpired()) {
          this.ngZone.run(() => this.auth.logout());
        }
      }, 60000); // verifica a cada 1 min
    });
  }

  pararMonitoramento() {
    if (this.intervalId) clearInterval(this.intervalId);
  }
}
