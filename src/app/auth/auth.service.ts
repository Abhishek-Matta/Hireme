import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { JwtHelperService } from '@auth0/angular-jwt';

import { AuthData } from "./auth-data.model";

@Injectable({ providedIn: "root" })
export class AuthService {
    private token: string;
    private decodedToken: any;
    constructor(private http: HttpClient, private router: Router) {}

    createUser(email: string, password: string) {
        const authData: AuthData = { email: email, password: password };
        this.http
          .post("/api/", authData)
          .subscribe(response => {
            console.log(response);
          });
         
      }


      login(email: string, password: string) {
        const authData: AuthData = { email: email, password: password };
        this.http
          .post<{ token: string; expiresIn: number }>(
            "/api/login",
            authData
          )
          .subscribe(response => {
            console.log(response);
            const token = response.token;
            this.token = token;
            localStorage.setItem("token", token);
            if(token)
            {
              this.router.navigate(['/dashboard'])
            }
            const helper = new JwtHelperService();
            this.decodedToken = helper.decodeToken(this.token);
            
          })

                 }

          
            token$(){
                 
                  return this.decodedToken.asObservable();
                  
                }
    }