import { Component, OnInit } from '@angular/core';
import { Book } from '../beans/book';
import { BooksService } from '../services/books.service';
import { KPagination } from '../components/kpagination/kpagination';
import { FilterFieldPipe } from '../pipes/filter-field.pipe';
import { UpdateDataPipe } from '../pipes/update-data.pipe';
import { OrderByPipe } from '../pipes/order-by.pipe';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  booksPerPageFilter = 4;
  currentPage = 1;
  books: Book[];

  bookNameFilter = '';
  bookOrderBy = 'name';
  reverseOrderFilter = false;
  constructor(public booksService: BooksService) { }

  ngOnInit() {
    this.booksService.getBooks().subscribe(
      (books: Book[]) => { this.books = books; });
  }

  switchPage(page: number) {
    this.currentPage = page;
  }
}
