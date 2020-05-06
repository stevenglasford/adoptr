import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Adoptr';
  //avoiding routing since they are finicky to setup
  //0=home page
  //1=messages
  //2=profile

  selected: number = 0;
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
