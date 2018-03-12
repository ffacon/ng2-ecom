import { Component, OnInit } from '@angular/core';

import {UserService} from '../services/user.service';
import {BooksService} from '../services/books.service';
import {Book} from '../beans/book';
import { ActivatedRoute  }  from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  public book: Book;
  private sub: any;
  private bookId :number;

	constructor(
		private route: ActivatedRoute,
		public booksService: BooksService,
		public userService: UserService){}

	ngOnInit(): void {
		this.sub = this.route.params.subscribe( params => {
		this.bookId = +params['id']; 
		// (+) converts string 'bookId' to a number
        // In a real app: dispatch action to load the details here.
    });
		


		this.booksService.getBook(this.bookId)
			.then((book: Book) => {
				this.book = book;
			});
	}

	getImagePath = (): string => {
		return '/data/imgs/books/' + this.book.id + '.jpg';
	}


	getStarsImagePath= (): string => {
		return 'assets/styles/ktheme/img/' + this.getRatingAverage() + '-stars.svg';
	}

	getRatingAverage= () : string => {
		if (!this.book) return '';
		return this.booksService.convertFromRating(this.booksService.getRatingAverage(this.book));
	}


}
