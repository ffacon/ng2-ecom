import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {User} from '../beans/user';
import {UserService} from '../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  errorMessage: string= undefined;
  login: string;
  password: string;

  ngOnInit() {
  }

  logUserWIthObservable() {
    
    this.userService.login(this.login,this.password).subscribe(
        (user:User) => { this.router.navigate(['home'])}, // success path
        error =>  this.errorMessage = `server status: ${error}`
      );
    }

  logUser() {
    this.userService.login(this.login,this.password).toPromise()
    .then((user:User) => {
      this.router.navigate(['home']);
    }).catch((err ) => {
      this.errorMessage = `server status: ${err}`;
    });
  }

}
