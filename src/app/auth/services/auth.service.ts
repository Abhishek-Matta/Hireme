import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { AuthData } from "../models/auth-data.model";
import { IBids } from "../../frontend models/bids";
import { AuthData2 } from "../models/auth-data2.model";
import { ToastrService } from 'ngx-toastr';


@Injectable({ providedIn: "root" })
export class AuthService {

    constructor(private http: HttpClient, private router: Router, private toastr:ToastrService) {}

    createUser(email: string, password: string, username:string) {
        const authData2: AuthData2 = { email: email, password: password, username:username };
        this.http
          .post("/api/", authData2)
          .subscribe(response => {
            console.log(response);
          });
         this.router.navigate(['/login'])
      }

      login(email: string, password: string) {
        const authData: AuthData = { email: email, password: password };
        this.http
          .post<{ token: string; userId:string; expiresIn: number;  }>(
            "/api/login",
            authData
          )
          .subscribe(response => {
            console.log(response);
            const token = response.token;

            if(token)
            {
              const expiresInDuration = response.expiresIn;
              const now = new Date();
               const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
               this.router.navigate(['/dashboard'])
              setTimeout(()=>{
                this.logout();
              }, expiresInDuration*1000 )

              localStorage.setItem("token", token);
              localStorage.setItem("userId",response.userId);
              localStorage.setItem("expiresIn", expirationDate.toISOString());
            }

          })
          // this.toastr.success('Hello world!', 'Toastr fun!');

            }


         logout(){
          localStorage.clear();
          this.router.navigate(['/home']);
        }

        getbids():Observable<{success: Boolean, message: String, bids:IBids[]}>{
          let url = "/api/getbids";
          return this.http.get<{success: Boolean, message: String, bids:IBids[]}>(url)

        }
    }
