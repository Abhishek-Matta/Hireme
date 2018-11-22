import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IBids } from '../bids';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private userEmail;
  private token: string;
  public id: string;
  specific_bids : IBids[]=[];
  userbidded :boolean;


  constructor(private router:Router,private authService:AuthService) {}

    ngOnInit(){
     this.token = localStorage.getItem('token');
     const helper = new JwtHelperService();
     this.id = localStorage.getItem('userId');
     const decodedToken = helper.decodeToken(this.token);
     this.userEmail=decodedToken.user.email;

    

     this.authService.getbids()
     .subscribe(data=>{
      
      for(let i=0;i<data.bids.length;i++){
      
        if(data.bids[i].userId===this.id)
        {
          this.specific_bids.push(data.bids[i]);
          this.userbidded=true;
        }
        else{
          this.userbidded=false;
        }
    }
      
     });
    
 
    
   }
 
    
    
   

    ss(){
      // console.log(this.userbidded);
    }
    routeToWork(){
      this.router.navigate(['/browse-projects',this.id]);
    }

  logout(){
    this.authService.logout();
  }


}
