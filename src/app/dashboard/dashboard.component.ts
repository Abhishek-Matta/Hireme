import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IBids } from '../frontend models/bids';
import { ProjectsService } from '../services/projects.service';
import { IProject } from '../frontend models/project';
import { IchatInfo } from '../frontend models/chatInfo';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: []
})
export class DashboardComponent implements OnInit {
  public username:string;
  private token: string;
  public id: string;
  specific_bids: IBids[] = [];
  specific_projects : IProject[]=[];
  userbidded: boolean;
  userposted: boolean;
  bids: IBids[] = [];
  otheruser:string;
  chatInfo: IchatInfo[];
  sender: string;
  room:string;


  constructor(private router:Router, private authService:AuthService, private projectService: ProjectsService,  private toastr:ToastrService, private http:HttpClient) {}

    ngOnInit(){
     this.token = localStorage.getItem('token');
     const helper = new JwtHelperService();
     this.id = localStorage.getItem('userId');
     const decodedToken = helper.decodeToken(this.token);
      this.username = decodedToken.user.username;

      let url = "/api/getchatInfo";
      this.http.get<{ success: Boolean, message: String, chatInfo: IchatInfo[] }>(url).subscribe(data => {

        for (let i = 0; i < data.chatInfo.length; i++){

          if (data.chatInfo[i].receiver==this.username) {

            this.toastr.success('New Message', data.chatInfo[i].sender + ' wants to chat with you').onTap
              .subscribe(() => this.toasterClickedHandler(data.chatInfo[i].room));



            break;
          }

        }
     })

     this.authService.getbids()
     .subscribe(data=>
      {

       this.bids = data.bids;

        for(let i=0;i<this.bids.length;i++)
        {
          if(this.bids[i].userId===this.id)
          {
            this.specific_bids.push(this.bids[i]);
            this.userbidded = true;
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

     }

  goToLink( otheruser: string ) {
    this.otheruser = otheruser;
    let room:string = this.username + this.otheruser;
  let wholeUrl  = "chat-page/" + room;
    window.open(wholeUrl, "_blank", "height=300, width=400");



    this.http.post('/api/chatInfoSubmit', {
      room: room,
      sender: this.username,
      receiver:this.otheruser
   }).subscribe((res:any)=>{
      console.log(res);
   })
  }

  toasterClickedHandler(room:string) {
    let wholeUrl  = "chat-page/" + room;
    window.open(wholeUrl, "_blank", "height=300, width=400");
    this.http.delete('/api/chatInfoDelete/'+ room).subscribe((data)=>console.log(data));
  }
  }


