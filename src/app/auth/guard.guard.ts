import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';

export const guardGuard: CanActivateFn = (route, state) => {
  let loginService = inject(LoginService);
  let roteador = inject(Router);

  if (state.url == '/admin/marcas/new' && !loginService.hasRole('ADMIN')) {
    window.alert('vc não tem permissão pra isso aqui');
    roteador.navigate(['/admin/dashboard']);
    return false;
  }

  return true;
};
