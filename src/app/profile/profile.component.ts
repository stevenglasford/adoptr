import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  user: User = {id: 3, username: 'waka', password: 'password', profilePhotoUrl: '', location: ''};
  
  constructor(private db:DatabaseService) { }
  ngOnInit(): void {
    this.user = this.db.getUserById(this.db.currentUser);
  }
  // username: string = this.user.username;

}
