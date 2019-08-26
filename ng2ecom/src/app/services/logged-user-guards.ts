import {Injectable} from '@angular/core';
import { UserService } from './user.service';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoggedUserGuards implements CanActivate {

 constructor(private userService: UserService, public router: Router ) {
 }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if ( this.userService.isLogged) {
      return true;
    } else {
        this.router.navigate(['/login']);
        return false;
     }
  }

}
