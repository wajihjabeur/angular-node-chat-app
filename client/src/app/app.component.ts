import { FirstServiceService } from './first-service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [FirstServiceService],
})
export class AppComponent {
  constructor(private _shared: FirstServiceService) {
    this._shared.newUserJoined().subscribe((data) => this.msgArray.push(data));
    this._shared
      .newMessageReceived()
      .subscribe((data) => this.receivedMsgArr.push(data));
  }
  username = '';
  room = '';
  msgArray: any = [];
  msg = '';

  receivedMsgArr: any = [];

  send() {
    this._shared.sendMessage({
      username: this.username,
      room: this.room,
      message: this.msg,
    });
  }

  join() {
    this._shared.joinRoom({ username: this.username, room: this.room });
  }
}
