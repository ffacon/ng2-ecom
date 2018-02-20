import { Injectable } from '@angular/core';

/* Don't use standard storage interface, don't want the (anyway not recommended) following signatures:
   [key: string]: any;
   [index: number]: string;
*/

interface StorageItf {
	length: number;
	clear(): void;
	removeItem(key: string): void;
	key(n: number): string;
	getItem(key: string): string;
	setItem(key: string, value: string): void;
}

@Injectable()
export class LocalStorageService implements StorageItf{

	private localStorage: Storage = window.localStorage;

	public length: number = this.localStorage.length;


	clear= (): void => {
		this.localStorage.clear();
	}

	removeItem= (key: string): void => {
		this.localStorage.removeItem(key);
	} 

	key= (n: number): string => {
		return this.localStorage.key(n);
	}

	getItem= (key: string): string => {
		return this.localStorage.getItem(key);
	}

	setItem= (key: string, value: string): void => {
		this.localStorage.setItem(key, value);
	}

}
