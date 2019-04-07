import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [`
  .ml-c{
    margin-left: 37rem !important;
  }
  .dropdown-menu {
    min-width: 3px !important;
  }
  `]
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  userLoggedIn : boolean = false;
   username: string;
   token: string;
   id: string;

  ngOnInit() {
    if (localStorage.length !== 0) {
      this.userLoggedIn = true;
    }

    if(this.userLoggedIn){
      this.token = localStorage.getItem('token');
      const helper = new JwtHelperService();
      this.id = localStorage.getItem('userId');
      const decodedToken = helper.decodeToken(this.token);
      this.username = decodedToken.user.username;

     }
  }



  logout(){
    this.authService.logout();

  }


}
