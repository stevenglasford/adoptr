import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from '../database.service';
import { Message } from '../message';

@Component({
  selector: 'app-message-card',
  templateUrl: './message-card.component.html',
  styleUrls: ['./message-card.component.css']
})
export class MessageCardComponent implements OnInit {

  constructor(private db: DatabaseService) { }

  @Input() message: Message;
  userBeingMessaged: string;
  messageBody: string;
  datetime: string;

  ngOnInit(): void {
    console.log("card init1");
    if (this.db.currentUser != this.message.userIdFrom) {
      this.userBeingMessaged = this.db.getUserById(this.message.userIdFrom).username;
    } else if (this.db.currentUser != this.message.userIdTo) {
      this.userBeingMessaged = this.db.getUserById(this.message.userIdTo).username;
    }
    console.log("card init2");

    this.messageBody = this.message.messageBody;
    console.log("card init3");

    this.datetime = this.message.datetime.toLocaleString();
    console.log("card init4");

  }

}
