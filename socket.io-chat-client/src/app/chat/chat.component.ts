import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [
    ChatService
  ]
})
export class ChatComponent implements OnInit {
  private messages = [];
  private connection;
  private message;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.connection = this.chatService.getMessage().subscribe(message => {
      this.messages.push(message);
    });
  }

  ngDestroy() {
    this.connection.unsubcrible();
  }

  sendMessage() {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

}
