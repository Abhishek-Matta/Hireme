import { Component } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
    selector: 'app-chat',
    templateUrl: './chat-page.component.html',
    styles: ['']
})
export class ChatPageComponent {

  user = this.getUsername();

  room: String = "lobby" ;
    messageText:String;
    messageArray:Array<{user:String,message:String}> = [];
    constructor(private _chatService:ChatService){
        this._chatService.newUserJoined()
        .subscribe(data=> this.messageArray.push(data));

        this._chatService.userLeftRoom()
        .subscribe(data=>this.messageArray.push(data));

        this._chatService.newMessageReceived()
          .subscribe(data => this.messageArray.push(data));

      this._chatService.joinRoom({ user: this.user, room: this.room });
    }

  ngOnInIt() {

  }

  getUsername() {
    var token = localStorage.getItem('token');
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken.user.username;
  }
    join(){
        this._chatService.joinRoom({user:this.user, room:this.room});
    }

    leave(){
        this._chatService.leaveRoom({user:this.user, room:this.room});
    }

    sendMessage()
    {
        this._chatService.sendMessage({user:this.user, room:this.room, message:this.messageText});
    }

}
