import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { SupabaseService } from '../service/supabase.service';

export const guardadminGuard: CanActivateFn = (route, state) => {
  //Con inject podemos injectar 
  const router:Router = inject(Router);
  const supabaseService:SupabaseService = inject(SupabaseService);
  //Ruta a la cual te redijira si no se cumple la norma
  const urlTree:UrlTree = router.parseUrl('./inicio');

  //Mira si loggedRol que es la variable que guarda el estado del administrador
  //si esta en true es por que es administrador i deja entrar si no es true 
  //redirije a el inicio
  return supabaseService.loggedRol.getValue() ? true : urlTree;
};
