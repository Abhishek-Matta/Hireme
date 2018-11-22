import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IBids } from '../bids';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private dt;
  private token: string;
  public id: string;
  private bids: IBids[] =[];
  specific_bids : IBids[]=[];
  userbidded :boolean;


  constructor(private router:Router,private authService:AuthService) {}

    ngOnInit(){
     this.token = localStorage.getItem('token');
     const helper = new JwtHelperService();
     this.id = localStorage.getItem('userId');
     const decodedToken = helper.decodeToken(this.token);
     this.dt=decodedToken.user.email;

     this.authService.getbids()
     .subscribe(data=>{
      this.bids = data.bids;
     });
     
     for(let i=0;i<this.bids.length;i++){
        
      if(this.bids[i].userId===this.id)
      {
        console.log('uoi');
        this.specific_bids.push(this.bids[i]);
        this.userbidded=true;
      }
      else{
        this.userbidded=false;
      }
  }
    
   }
 
    
    
    filterBids(){
     
    }

    ss(){
      console.log(this.specific_bids);
    }
    routeToWork(){
      this.router.navigate(['/browse-projects',this.id]);
    }

  logout(){
    this.authService.logout();
  }


}
