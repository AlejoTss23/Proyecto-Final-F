import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../Service/authservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe(
      success => {
        if (success) {
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Login failed';
        }
      },
      error => {
        this.errorMessage = 'Login failed';
        console.error(error);
      }
    );
  }
}
