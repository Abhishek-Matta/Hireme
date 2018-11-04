import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {Router } from '@angular/router';




@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private http:HttpClient,private router:Router){}

    signupsub(form){
      this.http.post('/api',{
       
        email:form.email,
        password:form.password,
    }).subscribe((res:any)=>{
        
        console.log(res.message)
        // this.router.navigate(['/dashboard']);
    })
  }
}
  
