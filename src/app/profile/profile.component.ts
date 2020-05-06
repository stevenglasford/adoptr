import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { DatabaseService } from '../database.service';
import { Dog } from '../dog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  user: User = {id: 3, username: 'waka', password: 'password', profilePhotoUrl: '', location: ''};
  usersDogs: Dog
  dogName: string = '';
  dogOwner: string = this.user.username;
  dogPhoto: string = '';
  dogLocation: string = '';
  //debugging set to false in production
  isSelected: boolean = false;
  myDogs: Dog[] = [];


  constructor(private db:DatabaseService) { }
  ngOnInit(): void {
    this.user = this.db.getUserById(this.db.currentUser);
    this.myDogs = this.db.getMyDogs(this.db.currentUser);
  }
  // username: string = this.user.username;
  addDog():void {
    this.db.addNewDog(this.dogName,this.user.id,this.dogPhoto,this.dogLocation);
    // console.log(this.dogName);
    // console.log(this.user.id);
    // console.log(this.dogPhoto);
    // console.log(this.dogLocation);
    //reset the fields after the data is sent to the service
    this.dogName='';
    this.dogOwner='';
    this.dogPhoto='';
    this.dogLocation='';
    this.isSelected=false;

    
  }

  iWantToAdd(): void{
    this.isSelected = true;
  }
  
}
