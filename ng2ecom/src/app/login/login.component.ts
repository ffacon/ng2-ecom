import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../beans/user';

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

  logUser() {
    this.userService.login(this.login,this.password).toPromise()
    .then((user:User) => {
      this.router.navigate(['home']);
    }).catch((err: Response) => {
      this.errorMessage = `server status: ${err.status}`;
      if (err.status === 401){
        this.errorMessage += '(unauthorized)'
      }
    });
  }

}
