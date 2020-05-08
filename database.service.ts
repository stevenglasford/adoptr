import { Injectable, ViewChild } from '@angular/core';
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
    {id: 3, username: 'matt.greatens', password: 'password', profilePhotoUrl: 'https://scontent-msp1-1.xx.fbcdn.net/v/t1.0-9/1487377_793565193990275_1588845896_n.jpg?_nc_cat=101&_nc_sid=dd9801&_nc_ohc=Dtm48sG6KQAAX_7LC07&_nc_ht=scontent-msp1-1.xx&oh=6dd2cc6ce02c13a03d986d54996ba33d&oe=5ED9CF99', location: 'Brainerd'},
    {id: 4, username: 'zac.johnsen', password: 'password', profilePhotoUrl: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fpbs.twimg.com%2Fprofile_images%2F1204236524054667264%2FROYC2E1L_400x400.jpg&imgrefurl=https%3A%2F%2Ftwitter.com%2Fitszachjohnson&tbnid=E9afJykJ9SdR3M&vet=12ahUKEwj68anTkaPpAhUFOawKHZ3dBVwQMyg3egQIARA0..i&docid=xdZC6spybP8gsM&w=400&h=400&q=zac%20johnsen&ved=2ahUKEwj68anTkaPpAhUFOawKHZ3dBVwQMyg3egQIARA0', location: 'Northeast'},
  ]

  dogs: Dog[] = [
    {id: 1, name: 'Bambie', userOwnerId: 2, photoUrl: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg', location: 'Fargo', description: "Grass Fed ball-loving family driven girl"},
    {id: 2, name: 'Pheobe', userOwnerId: 2, photoUrl: 'https://post.healthline.com/wp-content/uploads/sites/3/2020/02/322868_1100-1100x628.jpg', location: 'Spearfish', description: "She is Steven's dog. He knows more about her than you do"},
    {id: 3, name: 'Shadow', userOwnerId: 3, photoUrl: 'https://i.pinimg.com/originals/29/0c/19/290c192b887d0419bf8d686290bcb01b.jpg', location: 'Deceased', description: 'This girl was cremated and spread around the family property. You can adopt her so she has a home when you\'re in heaven'},
    {id: 4, name: 'Kizka', userOwnerId: 4, photoUrl:'https://www.wagmag.com/wp-content/uploads/2019/08/d.jpg', location: 'Kitchen', description: 'Kiki loves her lamby, much more than she will ever love you. She has great anxiety and a incessant tremor :)'}
  ]

  views: View[] = [
    {userId: 1, dogId: 2, liked: true},
  ]

  messages: Message[] = [
    {userIdTo: 2, userIdFrom: 1, messageBody: 'Id like to adopt', attachmentUrl: '', datetime: new Date(2000,0,0,0,0,0,0)},
    {userIdTo: 1, userIdFrom: 2, messageBody: 'Yeah, you can adopt', attachmentUrl: '', datetime: new Date(2000,0,0,0,0,0,0)},
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
      if (!this.dogViewed(userId, d.id) && (d.userOwnerId != userId)){
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

  getMyLikedDogs(userId:number): Dog[]{
    let likeDog: Dog[] = [];
    for(let d of this.dogs){
      if (this.isDogLikedByUser(userId, d.id)) {
        likeDog.push(d);
      }
    }
    return likeDog;
  }

  isDogLikedByUser(userId: number, dogId: number): boolean {
    for (let v of this.views) {
      if (v.userId == userId && v.dogId == dogId && v.liked) {
        return true;
      }
    }
    // no liking found
    return false;
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
    // this is terrible
    let retMessagesArray: Message[][] = [[],[],[],[],[],[],[],[],[],[],[]];
    //for (let ms of retMessagesArray) {
    //  console.log("print fifty times pleas")
    //  ms = new Array(0);
    //}
    for (let m of this.messages) {
      if (m.userIdFrom == userId || m.userIdTo == userId) {
        console.log("found a relevent message")
        if (m.userIdFrom != userId) {
          //retMessagesArray[2].push(m);
          retMessagesArray[m.userIdFrom].push(m);
        } else { // m.userIdTo != userId
          //retMessagesArray[2].push(m);
          retMessagesArray[m.userIdTo].push(m);
        }
      }
    }
    // remove the nulls
    retMessagesArray = retMessagesArray.filter(msgs => msgs.length > 0);
    return retMessagesArray;
  }

  getMessagePreviews(userId: number): Message[] {
    let allMessages: Message[][] = this.getMessagesByUserIdGrouped(userId);
    let previews: Message[] = allMessages.map(msgs => msgs.pop());
    for (let m of previews) {
      console.log(m.userIdFrom);
    }
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
  addNewDog(dogName: string, ownerID: number, newProfilePhotoUrl: string, newLocation: string, doggyDesc: string): boolean {
    let maximumId: number = 0;
    for (var d of this.dogs) {
      maximumId = Math.max(d.id, maximumId);
    }
    maximumId++;
    this.dogs.push(
      {id: maximumId, name: dogName, userOwnerId: ownerID, 
        photoUrl: newProfilePhotoUrl, location: newLocation, description: doggyDesc});
    
    return true; // user added
  }

  addView(uId: number, dId: number, loved: boolean){
    this.views.push({userId : uId, dogId : dId, liked : loved})
  }
  //getAllMessagesByUserId(userId: number): Message[] {
  //  let retMessages: 
  //}
}
