import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth'; // Cambia la base URL
  private jwtToken: string = '';  // Cambiamos null por un string vacío desde el inicio
  private userRole: string | null = null;

  constructor(private http: HttpClient, @Inject(JwtHelperService) private jwtHelper: JwtHelperService) {}

  // Método para el login
  login(username: string, password: string): Observable<boolean> {
    return this.http
      .post<any>(`${this.baseUrl}/login`, { username, password })
      .pipe(
        map(response => {
          if (response && response.token) {
            this.jwtToken = response.token || ''; // Siempre aseguramos un string
            localStorage.setItem('jwtToken', this.jwtToken);

            if (this.jwtToken) {
              const decodedToken = this.jwtHelper.decodeToken(this.jwtToken);
              this.userRole = decodedToken.role; // Asumimos que el rol está en el campo `role`
            }

            return true;
          }
          return false;
        }),
        catchError((error: HttpErrorResponse) => {
          console.error('Error en el login:', error);
          return throwError(() => new Error('Error en el login: ' + error.message));
        })
      );
  }

  // Método para desloguear
  logout(): void {
    this.jwtToken = ''; // Asignamos un string vacío en lugar de null
    this.userRole = null;
    localStorage.removeItem('jwtToken');
}

public getUserRole(): string | null {
  return this.userRole;
}

  // Verificar si el usuario está autenticado
  public get loggedIn(): boolean {
    return localStorage.getItem('jwtToken') !== null;
  }

  // Obtener el rol del usuario
  public get role(): string | null {
    return this.userRole;
  }

  // Obtener el token JWT almacenado
  public getToken(): string {
    const token = localStorage.getItem('jwtToken');
    return token ?? '';  // Si es null, devolvemos un string vacío
}


  // Crear usuario
  createUser(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error al crear usuario', error);
          return throwError(() => new Error('Error al crear usuario: ' + error.message));
        })
      );
  }

  // Actualizar usuario
  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${id}`, user)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error al actualizar usuario', error);
          return throwError(() => new Error('Error al actualizar usuario: ' + error.message));
        })
      );
  }

  // Eliminar usuario
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/users/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error al eliminar usuario', error);
          return throwError(() => new Error('Error al eliminar usuario: ' + error.message));
        })
      );
  }

  // Cambiar contraseña
  changePassword(id: number, newPassword: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${id}/change-password`, { newPassword })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error('Error al cambiar contraseña', error);
          return throwError(() => new Error('Error al cambiar contraseña: ' + error.message));
        })
      );
  }

  // Obtener todos los usuarios
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/users`, {
      headers: { Authorization: `Bearer ${this.getToken()}` }  // Este método garantiza que no sea null
    })
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error al obtener usuarios:', error);
        return throwError(() => new Error('Error al obtener usuarios: ' + error.message));
      })
    );
}
}



