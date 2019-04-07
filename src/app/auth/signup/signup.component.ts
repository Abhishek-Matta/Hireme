import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";

@Component({
  templateUrl: './signup.component.html',
  styleUrls: []
})
export class SignupComponent {

  constructor(private authService:AuthService){}

    signupsub(form){
      this.authService.createUser(form.value.email,form.value.password, form.value.username);
  }
}

