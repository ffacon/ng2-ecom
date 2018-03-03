import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BooksComponent } from './books/books.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { BasketComponent } from './basket/basket.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { FilterFieldPipe } from './pipes/filter-field.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { UpdateDataPipe } from './pipes/update-data.pipe';

import {Router} from '@angular/router';
import { routing } from './app.routing';

import {UserService} from './services/user.service';
import {LocalStorageService} from './services/localStorage.service';
import {NewsService} from './services/news.service';
import {BooksService} from './services/books.service';

@NgModule({
  declarations: [
    AppComponent,
    BookDetailsComponent,
    BooksComponent,
    HomeComponent,
    ContactComponent,
    BasketComponent,
    ProfileComponent,
    LoginComponent,
    FilterFieldPipe,
    OrderByPipe,
    UpdateDataPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [UserService,  LocalStorageService, BooksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
