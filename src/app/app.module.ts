import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostProjectComponent } from './post-project/post-project.component';
import { BrowseProjectsComponent } from './browse-projects/browse-projects.component';
import { DepositComponent } from './deposit/deposit.component';
import { AuthGuard } from './auth/services/auth.guard';
import { AuthService } from './auth/services/auth.service';
import { ChatService } from './services/chat.service';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    PostProjectComponent,
    BrowseProjectsComponent,
    DepositComponent,
    ChatPageComponent,
    HeaderComponent,
    ProfileComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [AuthGuard,AuthService,ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
