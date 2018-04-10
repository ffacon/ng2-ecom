import { Injectable } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

import {Book} from '../beans/book';
import {Comment} from '../beans/comment';
import { Observable, of } from 'rxjs';
import { catchError, tap , map} from 'rxjs/operators';


  

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  private books: Observable<Book[]>;
  private handleError: HandleError;
	constructor(private http: HttpClient,httpErrorHandler: HttpErrorHandler){
		this.handleError = httpErrorHandler.createHandleError('BooksService');
	}

	getBooks(): Observable<Book[]> {

		if (this.books !== undefined){
			return this.books;
		}

		return this.http.get<Book[]>('/data/books.json',{responseType: 'json'})
		  .pipe(
			  	tap( res => {
				this.includeRatingToArray(res);	
				this.books = of(res);  
				}),
			  	catchError(this.handleError('getBooks',[]))
		  );
	}

	getBook= (id: number): Observable<Book> => {
		return this.getBooks()
		.pipe(
			map(books => books.filter(book => book.id === id)[0])
		);
	}

	getRatingAverage = (book: Book):number => {

		let total = 0;

		if (!book.comments) {
			return -1;
		}

		book.comments.forEach((comment: Comment, indice: number) => {
			if (comment.rate !== undefined) {
				total += comment.rate;
			}
		});

		return Math.floor(total / book.comments.length);
	}

	private includeRating= (book: Book): void => {
		book.rating = this.getRatingAverage(book);
	}

	private includeRatingToArray(res: Book[])  {
		res.forEach( (book: Book) => {
			this.includeRating(book);
		})
		return res;	
	}

	convertFromRating= (rate: number): string => {

		if (!rate || rate < 0 || rate > 5){
			return undefined;
		}

		let classes = ['zero', 'one', 'two', 'three', 'four', 'five'];

		return classes[rate];
	}


	getRatingClass = (book: Book): string => {

		if (!book.comments){
			return undefined;
		}

		let average = book.rating || this.getRatingAverage(book);

		return 'rating ' + this.convertFromRating(average);
	}

	

}
