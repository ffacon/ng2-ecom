import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Book } from '../beans/book';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  books: Book[];
  constructor(public booksService: BooksService ) { }

  ngOnInit() { 
      this.booksService.getBooks()
      .then((books: Book[])=>{
        this.books = books;
      })
  }

}
