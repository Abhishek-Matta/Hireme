import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IBids } from '../frontend models/bids';
import { ProjectsService } from '../services/projects.service';
import { IProject } from '../frontend models/project';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: []
})
export class DashboardComponent implements OnInit {
  public username;
  private token: string;
  public id: string;
  specific_bids: IBids[] = [];
  specific_projects : IProject[]=[];
  userbidded: boolean;
  userposted: boolean;
  bids: IBids[] = [];


  constructor(private router:Router, private authService:AuthService,private projectService: ProjectsService) {}

    ngOnInit(){
     this.token = localStorage.getItem('token');
     const helper = new JwtHelperService();
     this.id = localStorage.getItem('userId');
     const decodedToken = helper.decodeToken(this.token);
     this.username=decodedToken.user.username;

      window.open('chat-page', "_blank", "height=500, width=400");

     this.authService.getbids()
     .subscribe(data=>
      {

        for(let i=0;i<data.bids.length;i++)
        {
          if(data.bids[i].userId===this.id)
          {
            this.specific_bids.push(data.bids[i]);
            this.userbidded=true;
          }
          else
          {
            this.userbidded=false;
          }
        }

     });

      this.projectService.getprojects()
        .subscribe(data => {
          for(let i=0;i<data.projects.length;i++)
          {
            if(data.projects[i].userId===this.id)
            {
              this.specific_projects.push(data.projects[i]);
              this.userposted=true;
            }
            else
            {
              this.userposted=false;
            }
          }
      })

      this.authService.getbids()
      .subscribe(data=>{
        this.bids = data.bids;

      });
     }

  goToLink(url:string) {
    window.open(url, "_blank","height=500, width=400");
     }
}
