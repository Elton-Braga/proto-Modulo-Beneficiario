import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const usuarioLogado = localStorage.getItem('usuario_logado');

  if (usuarioLogado) {
    return true; // autenticado
  }

  router.navigate(['/login']);
  return false;
};
