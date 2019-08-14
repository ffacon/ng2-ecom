import { Injectable, Inject } from '@angular/core';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';
import {User} from '../beans/user';
import { Basket} from '../beans/basket';
import { Item} from '../beans/item';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

 private _isLogged = false;
 private user: User;
 private _basket: Basket;

 private storeKey = 'ecItems';

 constructor(
   @Inject(HttpClient) private http: HttpClient,
   @Inject(LocalStorageService) private localStorage: LocalStorageService) {}


 private loadBasket = (): void => {
  const previousItemsStr: string = this.localStorage.getItem(this.storeKey);
  if (previousItemsStr) {
   const itemsToLoad =  JSON.parse(previousItemsStr) as Item[];
   this._basket = new Basket(itemsToLoad);
  } else {
  this._basket = new Basket();
  }
 }


 login = (login: string, passwd: string): Observable<User> => {
  const body = JSON.stringify({ login, password: passwd });
  const httpOptions = {
   headers: new HttpHeaders({
   'Content-Type':  'application/json'})
  };
  const headers = new  HttpHeaders({'Content-Type': 'application/json'});
  return this.http.post<User>('/api/app/login', body, httpOptions )
   .pipe(
         tap( user => { this._isLogged = true; this.user = user; this.loadBasket(); },
              error => this.logError( error)
            )
        );
 }

 logout = (): void => {
  this._isLogged = false;
  this.user = undefined;
  this._basket = undefined;
 }

 get isLogged(): boolean {
  return this._isLogged;
 }

 getUser = (): User => {
  return this.user;
 }

 get basket(): Basket {
  return this._basket;
 }

 storeBasket = (): void => {
  const itemsToStore = this._basket.getItems();
   // if (itemsToStore && itemsToStore.length > 0){
   // Even if it's empty
  this.localStorage.setItem( this.storeKey, JSON.stringify(itemsToStore));
   // }
 }

 private logError(error: any) {
  const message = `UserService got error "${error.message}".`;
  console.error(message);
 }

}
