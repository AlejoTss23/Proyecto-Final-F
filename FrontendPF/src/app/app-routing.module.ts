import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { SidenavComponent } from './sidenav/sidenav.component';
import { OrdenDeTrabajoComponent } from './orden-de-trabajo/orden-de-trabajo.component';
import { AdminOrdenTrabajoComponent } from './admin-orden-trabajo/admin-orden-trabajo.component';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: SidenavComponent, canActivate: [AuthGuard], data: { requiresAuth: true } },
  { path: 'Mantenimiento', component: OrdenDeTrabajoComponent, canActivate: [AuthGuard],data: { requiresAuth: true, roles: ['ROLE_WORKER'] } },
  { path: 'admin-ordenes', component: AdminOrdenTrabajoComponent, canActivate: [AuthGuard], data: { requiresAuth: true, roles: ['ROLE_ADMIN'] } },
  { path: 'admin/usuarios', component: AdminUsuariosComponent, canActivate: [AuthGuard], data: { requiresAuth: true, role: 'ROLE_ADMIN' } },
  { path: '**', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
