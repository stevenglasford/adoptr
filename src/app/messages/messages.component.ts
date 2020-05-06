import { Component, OnInit } from '@angular/core';
import { Message } from '../message';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private db: DatabaseService) { }

  //messagesArray: Message[][];
  messagePreviews: Message[];

  ngOnInit(): void {
    //this.messagesArray = this.db.getMessagesByUserIdGrouped(this.db.currentUser);
    this.messagePreviews = this.db.getMessagePreviews(this.db.currentUser);
  }

}
