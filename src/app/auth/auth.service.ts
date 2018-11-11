import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { AuthData } from "./auth-data.model";

@Injectable({ providedIn: "root" })
export class AuthService {
    private token: string;
    private expiresIn: number;
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

            const expiresIn = response.expiresIn
            this.expiresIn = expiresIn;
            
            localStorage.setItem("token", token);
            localStorage.setItem("expiration", expiresIn.toString());
            
            if(token)
            {
              this.router.navigate(['/dashboard'])
            }
          })
                 }
    }