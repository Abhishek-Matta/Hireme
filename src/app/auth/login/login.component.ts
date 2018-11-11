import { Component} from '@angular/core'; 
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
    constructor(private authService:AuthService){}

    loginsub(form){
      this.authService.login(form.value.email,form.value.password)
    }
}
