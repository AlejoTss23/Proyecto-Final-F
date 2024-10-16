import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from './Service/authservice.service';
import { NotificationService } from './Service/notification.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiresAuth = route.data['requiresAuth'] === true;
    const userRole = this.authService.getUserRole();

    if (requiresAuth && !this.authService.loggedIn) {
      this.router.navigate(['/login']);
      return false;
    }

    // Validar si el usuario tiene permisos basados en su rol
    if (route.data['roles'] && !route.data['roles'].includes(userRole)) {
      this.notificationService.showMessage('Acceso denegado. No tienes permisos para acceder a esta sección.');
      return false; // Evitar la navegación sin redirigir al login
    }

    return true;
  }
}