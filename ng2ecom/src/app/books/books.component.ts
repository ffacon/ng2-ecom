import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Book } from '../beans/book';
import { KPagination } from '../components/kpagination/kpagination';
import { DataContainerService } from '../services/data-container.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  booksPerPageFilter = 4;
  currentPage = 1;
  bookNameFilter = '';
  bookOrderBy = 'name';
  reverseOrderFilter = false;
  books: Book[];
  constructor(public booksService: BooksService, public dataContainerService: DataContainerService) { }

  ngOnInit() {
    this.booksService.getBooks().subscribe(
      (books: Book[]) => { this.books = books; }
    );
  }

  switchPage(page: number) {
    this.currentPage = page;
  }
}
