import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Dog } from '../dog';
import { DatabaseService } from '../database.service';
import { View } from '../view';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  user: User = {id: 3, username: 'waka', password: 'password', profilePhotoUrl: '', location: ''};
  views : View[];
  unviewedDogs : Dog[];
  currentDog: Dog;
  
  
  constructor(private db: DatabaseService) { }
  

  ngOnInit(): void {
    this.views = this.db.views;
    this.user = this.db.getUserById(this.db.currentUser);
    this.unviewedDogs = this.db.getUnviewedDogs(this.user.id);
    this.updateCurrentDog()
    
  }

  loveDog(): void{
    this.db.addView(this.user.id, this.currentDog.id, true);
    this.updateViews();
    this.updateCurrentDog(); 
  }


  hateDog() : void{
    this.db.addView(this.user.id, this.currentDog.id, false);
    this.updateViews();
    this.updateCurrentDog();
  }


  updateViews() : void{
    this.views = this.db.views;
  }


  updateCurrentDog() : void{
    this.unviewedDogs = this.db.getUnviewedDogs(this.user.id);
    if(this.unviewedDogs.length != 0){
      this.currentDog = this.unviewedDogs[0];
    }
    else{
      this.currentDog = null;
    }
  }
}
