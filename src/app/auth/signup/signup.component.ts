import { Component } from "@angular/core";
import { AuthService } from "../auth.service";





@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private authService:AuthService){}

    signupsub(form){
      this.authService.createUser(form.value.email,form.value.password);
  }
}
  
