import { Component} from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent  {
    constructor(private authService:AuthService){}

  loginsub(form) {
      this.authService.login(form.value.email, form.value.password)
    }
}
