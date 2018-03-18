import { Component, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Book } from '../beans/book';
import { KPagination } from '../components/kpagination/kpagination';
import { DataContainerService } from '../services/data-container.service';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  providers: [DataContainerService]
})
export class BooksComponent implements OnInit {
  books: Book[];
  currentPage : number = 1;
  booksPerPageFilter: number = 4;
  bookNameFilter: string ="";
  bookOrderBy: string = 'name';
  reverseOrderFilter: boolean = false;


  constructor(public booksService: BooksService,
              public datacontainer:DataContainerService ) { }

  ngOnInit() { 
      this.booksService.getBooks()
      .then((books: Book[])=>{
        this.books = books;
      })
  }

  switchPage(page:number)  {
    this.currentPage = page;
  }
  
}
