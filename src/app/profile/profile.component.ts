import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: ['']
})
export class ProfileComponent implements OnInit {
 email: string;
 username: string;
  constructor() { }

  ngOnInit() {
  }

}
