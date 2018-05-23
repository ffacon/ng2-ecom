import { Component, OnInit } from '@angular/core';
import { Item } from '../beans/item';
import { UserService } from '../services/user.service';
import { Book } from '../beans/book';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  items: Item[];

  constructor(private userService: UserService) { }

  ngOnInit() {
     this.updateItems();
   }

   updateItems() {
    this.items = this.userService.basket.getItems();
  }  

  removeProduct(book: Book)  {
    this.userService.basket.removeProduct(book);
    this.updateItems();
    return false;
  }

  getTotal = () : number => {
    let res = 0;
    this.items.forEach((item: Item) => { res += item.product.price * item.qty } );
    return res;
  } 

  storeBasket = this.userService.storeBasket;

}
