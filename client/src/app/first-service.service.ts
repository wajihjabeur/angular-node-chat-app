import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class FirstServiceService {
  private socket = io('http://localhost:3000');

  joinRoom(data: any) {
    this.socket.emit('join', data);
  }

  newUserJoined() {
    let observale = new Observable((observer) => {
      this.socket.on('new user joined', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observale;
  }

  sendMessage(data: any) {
    this.socket.emit('message', data);
  }
  newMessageReceived() {
    let observale = new Observable((observer) => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observale;
  }
}
