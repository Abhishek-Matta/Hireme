import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthGuard implements CanActivate{

    constructor(
        private http: HttpClient,
        private router : Router
    ){}

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot){
        if(localStorage.getItem('token')==null){
            return false;
        }
        else
        return true;    
    }
}
