import { Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { TiendaComponent } from './componentesmenu/tienda/tienda.component';
import { DetalleCuadroComponent } from './componentesmenu/detalle-cuadro/detalle-cuadro.component';
import { IntroducirCuadrosComponent } from './administrador/introducir-cuadros/introducir-cuadros.component';
import { BorrarCuadrosComponent } from './administrador/borrar-cuadros/borrar-cuadros.component';
import { LoginComponent } from './componentesmenu/login/login.component';
import { RegisterComponent } from './componentesmenu/register/register.component';
import { InicioAdminComponent } from './administrador/inicio-admin/inicio-admin.component';
import { guardadminGuard } from './guards/guardadmin.guard';
import { ModificarCuadrosComponent } from './administrador/modificar-cuadros/modificar-cuadros.component';
import { ListarCuadrosComponent } from './administrador/listar-cuadros/listar-cuadros.component';

export const routes: Routes = [
    { path: 'inicio', component: MainComponent },
    { path: 'tienda', component: TiendaComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'inicioAdmin', canActivate: [guardadminGuard], component: InicioAdminComponent },
    { path: 'adminIntro123', canActivate: [guardadminGuard], component: IntroducirCuadrosComponent },
    { path: 'listaCuadros', canActivate: [guardadminGuard], component: ListarCuadrosComponent },
    { path: 'listaCuadros/borrar/:id', canActivate: [guardadminGuard], component: BorrarCuadrosComponent },
    { path: 'listaCuadros/modificar/:id', canActivate: [guardadminGuard], component: ModificarCuadrosComponent },
    { path: 'detall/:id', component: DetalleCuadroComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'inicio' }
];
