import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../services/user.service';
import { Book } from '../beans/book';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buy-zone',
  templateUrl: './buy-zone.component.html',
  styleUrls: ['./buy-zone.component.css']
})
export class BuyZoneComponent implements OnInit {

  @Input()
  book: Book;

  constructor(public userService: UserService, public router: Router) { }

  ngOnInit() {
  }

  addToBasket(book: Book) {
    this.userService.basket.addProduct(book);
    this.router.navigate(['basket']);
  }

}