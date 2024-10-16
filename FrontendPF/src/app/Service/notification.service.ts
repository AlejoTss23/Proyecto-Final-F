import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  showMessage(message: string) {
    alert(message); // Puedes personalizar esto con alguna librería de notificaciones, como Toastr
  }
}
