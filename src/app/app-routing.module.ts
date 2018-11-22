import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostProjectComponent } from './post-project/post-project.component';
import { BrowseProjectsComponent } from './browse-projects/browse-projects.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {path:'', redirectTo:'/home', pathMatch:'full'},
  {path:'home', component:HomeComponent, },
  {path:'signup', component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'post-project', component:PostProjectComponent},
  {path:'browse-projects', component:BrowseProjectsComponent },
  {path:'browse-projects/:id', component:BrowseProjectsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
