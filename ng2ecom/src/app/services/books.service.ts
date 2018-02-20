import { Injectable } from '@angular/core';

import {Http, Response} from '@angular/http';
import {Book} from '../beans/book';
import {Comment} from '../beans/comment';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class BooksService {

  private books: Promise<Book[]>;

	constructor(private http: Http){}

	getBooks= (): Promise<Book[]> => {

		if (this.books !== undefined){
			return this.books;
		}

		this.books= this.http.get('/data/books.json')
      .toPromise()
			.then((response: Response) => {
				let books: Book[] = <Book[]>response.json();
				books.forEach( (book: Book) => {
					this.includeRating(book);
				} )
				return books;
			});

		return this.books;
	}

	getBook= (id: number): Promise<Book> => {

		return this.getBooks()
			.then((books: Book[]) => {
				let filteredBooks = books.filter((book: Book) => book.id === id);
				if (filteredBooks.length === 1) {
					return filteredBooks[0];
				}
			});
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


	convertFromRating= (rate: number): string => {

		if (!rate || rate < 0 || rate > 5){
			return undefined;
		}

		let classes = ['zero', 'one', 'two', 'three', 'four', 'five'];

		return classes[rate];
	}


	getRatingClass = (book: Book): string => {

		let classes = ['zero', 'one', 'two', 'three', 'four', 'five'];

		if (!book.comments){
			return undefined;
		}

		let average = book.rating || this.getRatingAverage(book);

		return 'rating ' + this.convertFromRating(average);
	}

}
