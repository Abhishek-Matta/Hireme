import { Component} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent  {
    constructor(private authService:AuthService, private toastr:ToastrService){}

  loginsub(form) {
    this.authService.login(form.value.email, form.value.password)

  }

}
