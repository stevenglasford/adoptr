import { Component } from '@angular/core';
import { DatabaseService } from './database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Adoptr';
  //avoiding routing since they are finicky to setup
  //-2=add new user page
  //-1=login page
  //0=home page
  //1=messages page
  //2=profile page
  USERNAME: string = '';
  PASSWORD: string = '';
  photograph: string = '';
  location: string = '';
  isUserReal: number = -1;
  selected: number = -1;
  userIdentification = -1;
  someoneHasThatUsername: boolean = false;

  constructor(private db:DatabaseService) { }

  login():void{
    //check if the user exists in the database
    if(this.db.verifyUser(this.USERNAME,this.PASSWORD)){
      this.selected=0;
      this.isUserReal=-1;
      this.db.currentUser=this.db.getUserId(this.USERNAME);
    }
    else{
      this.isUserReal=0;
    }
  }

  addUser():void{
    this.selected=-2;
  }

  addNewUser():void{
    if(this.db.addNewUser(this.USERNAME, this.PASSWORD, this.photograph, this.location)){
      this.login();
    }
    else{
      this.someoneHasThatUsername =true;
      this.USERNAME = '';
      this.PASSWORD = '';
      this.photograph = '';
      this.location = '';
      this.selected = -2;
    }
  }

  logOut():void{
    this.USERNAME='';
    this.PASSWORD='';
    this.selected=-1;
  }

  ngOnInit() {
  }

  home(): void{
    this.selected = 0;
  }

  messages(): void{
    this.selected = 1;
  }
  profile(): void{
    this.selected = 2;
  }
}
