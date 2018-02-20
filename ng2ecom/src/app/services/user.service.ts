import { Injectable, Inject } from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import {LocalStorageService} from './localStorage.service';

import {User} from  '../beans/user';
import { Basket} from  '../beans/basket';
import { Item} from  '../beans/item';

@Injectable()
export class UserService {

  private _isLogged: boolean = false;
	private user: User;
	private _basket: Basket;

  private storeKey = 'ecItems';

  constructor(
		@Inject(Http) private http: Http,
		@Inject(LocalStorageService) private localStorage: LocalStorageService
	){

	}


	private loadBasket= (): void => {
		
		let previousItemsStr: string = this.localStorage.getItem(this.storeKey);
		if (previousItemsStr){
			let itemsToLoad = <Item[]>JSON.parse(previousItemsStr);
			this._basket = new Basket(itemsToLoad);
		}
		else{
 			this._basket= new Basket();
		}
	}


	login= (login: string, passwd: string): Observable<User> => {

		let body = JSON.stringify({ login: login, password: passwd });
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');

		return this.http.post('/api/app/login', body, new RequestOptions({ headers: headers }))
			.map( (response: Response) => {
				return <User>response.json();
			})
			.do( (user: User) => {
				this._isLogged = true;
				this.user= user;
				this.loadBasket();
			});
	}

	logout= (): void => {
		this._isLogged = false;
		this.user = undefined;
		this._basket = undefined;
	}

	get isLogged(): boolean {
		return this._isLogged;
	}

	getUser= (): User => {
		return this.user;
	}

	get basket(): Basket {
		return this._basket;
	}

	storeBasket= (): void => {
		let itemsToStore= this._basket.getItems();
		// if (itemsToStore && itemsToStore.length > 0){
			//Even if it's empty
			this.localStorage.setItem(this.storeKey, JSON.stringify(itemsToStore));
		// }
	}

}
