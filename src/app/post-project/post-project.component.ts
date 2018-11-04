import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';


@Component({
  selector: 'app-post-project',
  templateUrl: './post-project.component.html',
  styleUrls: ['./post-project.component.css']
})
export class PostProjectComponent implements OnInit {

  private show1var: boolean = false;
  private show2var: boolean = false;
  private show3var: boolean = false;
  token;
  myfile:any;
  constructor(private router:Router,private http:HttpClient){}

  ngOnInit() {
  }

  ngOnChanges(){
    this.show1var = false;
    this.show1var = false;
    this.show1var = false;
  }
  
  show1(){
    this.show1var = true;
  }

  show2(){
    this.show2var = true;
  }

  // onFileUpload(){
  //   this.myfile=
  // }

  projectsub(form){
      this.token=localStorage.getItem('token')

      this.http.post('/api/postproject',{
         title:form.title,
         description:form.description,
        //  file:this.myfile,
         skills:form.skills,
         budget:form.budget,
          token:this.token
      }).subscribe((res:any)=>{
          if(res.success){
              console.log('Project saved')
              //this.router.navigate(['/']);
          }
      })
  }
}


