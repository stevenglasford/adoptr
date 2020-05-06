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
    {id: 1, name: 'Bambie', userOwnerId: 2, photoUrl: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg', location: 'Fargo'},
    {id: 2, name: 'Pheobe', userOwnerId: 2, photoUrl: 'https://post.healthline.com/wp-content/uploads/sites/3/2020/02/322868_1100-1100x628.jpg', location: 'Spearfish'},
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

  getMyDogs(userId: number): Dog[] {
    let myDogs: Dog[] = [];
    for(var d of this.dogs){
      if(d.userOwnerId === userId){
        myDogs.push(d);
      }
    }
    return myDogs;
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
  getLikedDogsByUserId(userId: number): Dog[] {
    let retDogs: Dog[] = [];
    for (var v of this.views) {
      if (v.userId == userId) {
        retDogs.push(this.getDogById(v.dogId));
      }
    }
    return retDogs;
  }

  getDogById(dogId: number): Dog {
    for (var d of this.dogs) {
      if (d.id == dogId) {
        return d;
      }
    }
    // else
    return null;
  }

  getAllMessagesByUserId(userId: number): Message[] {
    let retMessages: Message[];
    for (var m of this.messages) {
      if (m.userIdFrom == userId || m.userIdTo == userId) {
        retMessages.push(m);
      }
    }
    return retMessages;
  }

  getMessagesByUserIdGrouped(userId: number): Message[][] {
    let retMessagesArray: Message[][] = new Array(50);
    for (let m of this.messages) {
      if (m.userIdFrom == userId || m.userIdTo == userId) {
        if (m.userIdFrom != userId) {
          retMessagesArray[m.userIdFrom].push(m);
        } else { // m.userIdTo != userId
          retMessagesArray[m.userIdTo].push(m);
        }
      }
    }
    // remove the nulls
    retMessagesArray = retMessagesArray.filter(msgs => msgs != null);
    return retMessagesArray;
  }

  getMessagePreviews(userId: number): Message[] {
    let allMessages: Message[][] = this.getMessagesByUserIdGrouped(userId);
    let previews: Message[] = allMessages.map(msgs => msgs.pop());
    return previews;
  }

  addNewMessage(userIdFrom: number, userIdTo: number, messageBody: string, attachmentUrl: string, datetime: Date) {
    this.messages.push(
      {userIdFrom: userIdFrom, userIdTo: userIdTo, messageBody: messageBody, 
        attachmentUrl: attachmentUrl, datetime: datetime});
  }

  addNewView(userId: number, dogId: number, liked: boolean) {
    this.views.push({userId: userId, dogId: dogId, liked: liked});
  }

  removeDog(dogId: number) {
    this.dogs = this.dogs.filter(dog => dog.id != dogId);
    this.views = this.views.filter(view => view.dogId != dogId);
  }
  addNewDog(dogName: string, ownerID: number, newProfilePhotoUrl: string, newLocation: string): boolean {
    let maximumId: number = 0;
    for (var d of this.dogs) {
      maximumId = Math.max(d.id, maximumId);
    }
    maximumId++;
    this.dogs.push(
      {id: maximumId, name: dogName, userOwnerId: ownerID, 
        photoUrl: newProfilePhotoUrl, location: newLocation});
    
    return true; // user added
  }
  //getAllMessagesByUserId(userId: number): Message[] {
  //  let retMessages: 
  //}
}
