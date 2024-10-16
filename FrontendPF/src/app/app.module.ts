import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { OrdenDeTrabajoComponent } from './orden-de-trabajo/orden-de-trabajo.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminOrdenTrabajoComponent } from './admin-orden-trabajo/admin-orden-trabajo.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';

export function tokenGetter() {
  return localStorage.getItem('jwtToken');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrdenDeTrabajoComponent,
    AdminOrdenTrabajoComponent,
    AdminUsuariosComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SidenavComponent,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModule,
    
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:8080'],
        disallowedRoutes: ['localhost:8080/auth/login'],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
