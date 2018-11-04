import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

 

@Component({
 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  constructor(private router:Router,private http:HttpClient){}
  loginsub(form){
   this.http.post('/api/login',{
     email:form.email,
     password:form.password
 }).subscribe((res:any)=>{
    if(res.success){
         localStorage.setItem('token',res.token)
         localStorage.setItem('userid',res.userId)
       this.router.navigate(['/dashboard']);
     }
 })
}
}
