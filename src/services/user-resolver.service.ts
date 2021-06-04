import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {UserServerService} from "./user-server.service";
import {User} from "../entities/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<User> {
  constructor(private router: Router, private usersService: UserServerService) {
  }

  resolve(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<User> | Observable<never> {
    return this.usersService.getUser(+route.paramMap.get('id'));
  }
}
