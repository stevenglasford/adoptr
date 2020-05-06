import { Injectable } from '@angular/core';
import { Dog } from './dog';
import { Message } from './message';
import { User } from './user';
import { View } from './view';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }

  users: User[] = [
    {id: 1, username: 'luke.tollefson', password: 'password', profilePhotoUrl: '', location: 'Fargo'},
    {id: 2, username: 'steven.glasford', password: 'password', profilePhotoUrl: 'https://cdn.britannica.com/55/174255-050-526314B6/brown-Guernsey-cow.jpg', location: 'Fargo'},
  ]

  dogs: Dog[] = [
    {id: 1, name: 'Bambie', userOwnerId: 2, photoUrl: '', location: 'Fargo'},
    {id: 2, name: 'Pheobe', userOwnerId: 2, photoUrl: '', location: 'Spearfish'},
  ]

  views: View[] = [
    {userId: 1, dogId: 2, liked: true},
  ]

  messages: Message[] = [
    {userIdTo: 2, userIdFrom: 1, messageBody: 'Id like to adopt', attachmentUrl: '', datetime: null}
  ]

  public currentUser: number = null;

  verifyUser(username: string, password: string): boolean {
    for (var u of this.users) {
      if (u.username == username && u.password == password) {
        return true;
      }
    }
    // else
    return false;
  }

  getUserId(username: string): number {
    for (var u of this.users) {
      if (u.username == username) {
        return u.id;
      }
    }
    // else
    throw new Error('User not found');
  }

  getUnviewedDogs(userId: number): Dog[] {
    let retDogs: Dog[] = [];
    for (var d of this.dogs) {
      if (!this.dogViewed(userId, d.id)){
        retDogs.push(d);
      }
    }
    return retDogs;
  }

  private dogViewed(userId: number, dogId: number): boolean {
    for (var v of this.views) {
      if (v.userId == userId && v.dogId == dogId) {
        return true;
      }
    }
    // else
    return false;
  }

  // true if new user is added, false if user already existed
  addNewUser(newUsername: string, newPassword: string, newProfilePhotoUrl: string, newLocation: string): boolean {
    let maximumId: number = 0;
    for (var u of this.users) {
      maximumId = Math.max(u.id, maximumId);
      if (u.username == newUsername) {
        return false;
      }
    }
    maximumId++;
    this.users.push(
      {id: maximumId, username: newUsername, password: newPassword, 
        profilePhotoUrl: newProfilePhotoUrl, location: newLocation});
    
    return true; // user added
  }

  getUserById(userId: number): User{
     for (var u of this.users) {
       if (u.id == userId) {
         return u;
       }
     }
     return null;
  }
}
