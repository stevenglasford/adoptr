import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { MyListingsComponent } from './my-listings/my-listings.component';
import { MessagesComponent } from './messages/messages.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { MessageCardComponent } from './message-card/message-card.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    MyListingsComponent,
    MessagesComponent,
    ProfileComponent,
    LoginComponent,
    HeaderComponent,
    MessageCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
