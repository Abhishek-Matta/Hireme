import { Component, OnInit} from '@angular/core';
import { ProjectsService } from '../projects.service';
import { IProject } from '../project';
import { AuthService } from '../auth/auth.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-browse-projects',
  templateUrl: './browse-projects.component.html',
  styleUrls: ['./browse-projects.component.css']
})
export class BrowseProjectsComponent implements OnInit{
  id: string;
  
  constructor(private projectService:ProjectsService, private authService: AuthService, private route:ActivatedRoute) {} 
      
  ngOnInit() {
    this.projectService.getprojects()
      .subscribe(data=>{
        this.projects = data.projects;
        this.id = this.route.snapshot.params['id']

      }); 
  }

  private filter:boolean =false;
  private da:IProject[]=[];
  private projects:IProject[]=[];
  private flag_project :boolean[]=[];

  private arr: String[] =[];
  private b:boolean[] =[];
  private flag : boolean=false;

private html: String = "HTML";
private css: String = "CSS";
private js: String = "Javascript";
private ang: String = "Angular";
private mongo: String = "MongoDB";
private express: String = "Express.js";
private node: String = "Node.js";
private php: String = "PHP";
private android: String = "Android";
private ios: String = "iOS";
private logo_design: String = "Logo Design";
private data_entry: String = "Data Entry";
private mysql: String = "MySQL";
private web_hosting: String = "Web Hosting";
private software_testing: String = "Software Testing";

changeInArray(x:String,y:number){
    this.da.forEach(e=>{
      this.da.pop();
  })

  if(!(this.b[y]))
  {
  this.arr.push(x);
  this.filterProjects();
  this.filter=true;
  }
  else
  {
    var index = this.arr.indexOf(x);
    if (index > -1) {
      this.arr.splice(index, 1);
    }
    
    this.b[y]=false;

    for(let i=1;i<16;i++)
    {
      if(this.b[i]===true)
      {
        this.filter=true;
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
  for(let i=0;i<this.projects.length;i++)
  {
    for(let j=0;j<this.projects[i].skills.length;j++)
    {
      for(let k=0;k<this.arr.length;k++)
      {
        if(this.projects[i].skills[j]===this.arr[k])
        {
            this.da.push(this.projects[i]);
            break;
        }
        if(this.flag_project[i]===true)
        {
        break;
        }
      }
    }

  }
  

}

submitbid(form,title){
 this.authService.bidsubmit(form.bidAmount, form.timeDuration, this.id,title );
}

logout(){
  this.authService.logout();
}
}
