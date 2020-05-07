import { Component, OnInit } from '@angular/core';
import { Message } from '../message';
import { DatabaseService } from '../database.service';
import { Dog } from '../dog';
import { User } from '../user';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private db: DatabaseService) { }

  
  currentUser: string = this.db.getUserById(this.db.currentUser).username;

  likedDogs: Dog[] = [];

  //messagesArray: Message[][];
  messagePreviews: Message[] = null;

  ngOnInit(): void {
    console.log(this.db.currentUser);
    //get all of the dogs that I have liked as well as all the dogs that I own
    this.likedDogs = this.db.getMyLikedDogs(this.db.currentUser);
    // this.likedAndOwnedDogs.concat(
    //   this.db.getMyLikedDogs(/*this.db.currentUser*/this.me),
    //   this.db.getMyDogs(/*this.db.currentUser*/this.me)
    // );
  }

}
