import { Component, OnInit} from '@angular/core';
import { ProjectsService } from '../services/projects.service';
import { IProject } from '../frontend models/project';
import { AuthService } from '../auth/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { BidService } from '../services/bid.service';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-browse-projects',
  templateUrl: './browse-projects.component.html',
  styleUrls: []
})
export class BrowseProjectsComponent implements OnInit{
  userId: string;
  private token: string;
  private username: string;


  constructor(private projectService:ProjectsService, private authService: AuthService,
     private bidService:BidService, private route:ActivatedRoute) {}

  ngOnInit() {
    this.projectService.getprojects()
      .subscribe(data=>{
        this.allProjects = data.projects;
        this.userId = this.route.snapshot.params['id']

      });

      this.token = localStorage.getItem('token');
      const helper = new JwtHelperService();
      // this.id = localStorage.getItem('userId');
      const decodedToken = helper.decodeToken(this.token);
      this.username=decodedToken.user.username;
  }

  filter:boolean = false;
  filteredProjects:IProject[]=[];
  allProjects:IProject[]=[];

  arrayOfSkills: String[] =[];
  booleanArrayOfSkills: boolean[] =[];
  flag : boolean=false;

html: String = "HTML";
css: String = "CSS";
js: String = "Javascript";
ang: String = "Angular";
mongo: String = "MongoDB";
express: String = "Express.js";
node: String = "Node.js";
php: String = "PHP";
android: String = "Android";
ios: String = "iOS";
logo_design: String = "Logo Design";
data_entry: String = "Data Entry";
mysql: String = "MySQL";
web_hosting: String = "Web Hosting";
  software_testing: String = "Software Testing";

  bidPlaced: Boolean = false;

changeInArray(skill:String, skillNumber:number){
    this.filteredProjects = [];

  if(!(this.booleanArrayOfSkills[skillNumber]))
  {
  this.arrayOfSkills.push(skill);
  this.filterProjects();
  this.filter=true;
  }
  else
  {
    var index = this.arrayOfSkills.indexOf(skill);
    if (index > -1) {
      this.arrayOfSkills.splice(index, 1);
    }

    this.booleanArrayOfSkills[skillNumber]=false;

    for(let i=1;i<15;i++)
    {
      if(this.booleanArrayOfSkills[i]===true)
      {
        this.filter = true;
        this.flag = true;
        this.filterProjects();
        break;
      }
    }

    if(this.flag===false)
    {
      this.filter=false;
    }

  }

}



filterProjects(){
  for(let i=0;i<this.allProjects.length;i++)
  {
    for(let j=0;j<this.allProjects[i].skills.length;j++)
    {
      for(let k=0;k<this.arrayOfSkills.length;k++)
      {
        if(this.allProjects[i].skills[j]===this.arrayOfSkills[k])
        {
            this.filteredProjects.push(this.allProjects[i]);
            break;
        }
      }
      break;
    }

  }


}

submitbid(form,title){
  this.bidService.bidsubmit(form.bidAmount, form.timeDuration, form.bidDescription, this.userId, title, this.username);
  this.bidPlaced = true;
}

logout(){
  this.authService.logout();
}

bidPlacedFn() {
  this.bidPlaced = false;
}

}
