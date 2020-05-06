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
  //-1=login page
  //0=home page
  //1=messages page
  //2=profile page
  USERNAME: string = '';
  PASSWORD: string = '';
  isUserReal: number = -1;
  selected: number = -1;

  constructor(private db:DatabaseService) { }

  login():void{
    //check if the user exists in the database
    if(this.db.verifyUser(this.USERNAME,this.PASSWORD)){
      this.selected=0;
      this.isUserReal=-1;
    }
    else{
      this.isUserReal=0;
    }
  }

  logOut():void{
    this.USERNAME='';
    this.PASSWORD='';
    this.selected=-1;
  }

  ngOnInit() {
    this.db.currentUser = 2;
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
