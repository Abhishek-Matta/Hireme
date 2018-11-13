import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  private dt;
  constructor(private router:Router,private authService:AuthService) {
    
    }

    ngOnInIt(){
      this.authService.token$().subscribe(dt=>{
          this.dt=dt;
      })
    }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);

}

cc(){
  console.log(this.dt);
}
}
