import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProject } from '../frontend models/project';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private url = "/api/getprojects";
  constructor(private http:HttpClient) { }

  getprojects():Observable<{success: Boolean, message: String, projects:IProject[]}>{
    return this.http.get<{success: Boolean, message: String, projects:IProject[]}>(this.url)
    
  }
}
