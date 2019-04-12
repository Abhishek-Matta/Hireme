import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
    selector: 'app-chat',
    templateUrl: './chat-page.component.html',
    styles: ['']
})
export class ChatPageComponent {


  user = this.getUsername();
  room: String ;
  messageText: String;




    messageArray:Array<{user:String,message:String}> = [];
    constructor(private chatService:ChatService, private route:ActivatedRoute){
        this.chatService.newUserJoined()
        .subscribe(data=> this.messageArray.push(data));

        this.chatService.userLeftRoom()
        .subscribe(data=>this.messageArray.push(data));

        this.chatService.newMessageReceived()
          .subscribe(data => this.messageArray.push(data));

      this.chatService.joinRoom({ user: this.user, room: this.room });
    }

  ngOnInIt() {
    this.room = this.route.snapshot.params['x']

  }

  getUsername() {
    var token = localStorage.getItem('token');
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken.user.username;
  }
  join() {
    this.chatService.joinRoom({ user: this.user, room: this.room });
  }

    leave(){
        this.chatService.leaveRoom({user:this.user, room:this.room});
    }

    sendMessage()
    {
        this.chatService.sendMessage({user:this.user, room:this.room, message:this.messageText});
    }

}
