import { Component } from '@angular/core';


import {BooksService} from './services/books.service';
import {ContactService} from './services/contact.service';
import {UserService} from './services/user.service';

import { Router }   from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [UserService ]
})
export class AppComponent {
  constructor(private router: Router, public userService: UserService) {}


}
