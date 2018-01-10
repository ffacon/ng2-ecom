import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';

import {BasketComponent} from './basket/basket.component';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {BooksComponent} from './books/books.component';
import {BookDetailsComponent} from './book-details/book-details.component';
import {HomeComponent} from './home/home.component';


const appRoutes: Routes = [
	{ path:'home', component: HomeComponent },
	{ path: 'books', component: BooksComponent },	
	{ path: 'book/:id', component: BookDetailsComponent },
	{ path: 'basket', component: BasketComponent },
	{ path: 'profile', component: ProfileComponent },
	{ path: 'login', component: LoginComponent },	
	{ path: '',	redirectTo: 'home', pathMatch: 'full' }
];


export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);