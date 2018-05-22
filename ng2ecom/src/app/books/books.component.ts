import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Book } from '../beans/book';
import { KPagination } from '../components/kpagination/kpagination';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  booksPerPageFilter: number = 4;
  currentPage: number = 1; 
  books: Book[];
  constructor(public booksService: BooksService) { }

  ngOnInit() {
    this.booksService.getBooks().subscribe((books: Book[])=> {
        this.books = books;
      })
  }

  switchPage(page:number){
    this.currentPage = page;
  }


}
