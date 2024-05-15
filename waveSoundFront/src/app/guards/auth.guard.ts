import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../service/Token.service';

export const authGuard: CanActivateFn = (route, state) => {
  const isAuthenticated = inject(TokenService).isAuthenticated()
  if(isAuthenticated){
    return true
  }else{
    inject(Router).navigate(['/login'])
    return false;
  }
};
