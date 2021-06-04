import {Injectable} from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanLoad,
  Route, UrlSegment
} from '@angular/router';
import {Observable} from 'rxjs';
import {UserServerService} from "../services/user-server.service";
import {Store} from "@ngxs/store";
import {UrlAfterLogin} from "../shared/auth.actions";
import {mapTo, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private usersService: UserServerService, private store: Store) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.can(state.url);
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
    return this.can(route.path);
  }

  private can(url: string): boolean | Observable<boolean> {
    if (this.store.selectSnapshot(state => state.auth.token)) {
      return true;
    }
    // this.usersService.redirectAfterLogin = url;
    return this.store.dispatch(new UrlAfterLogin(url)).pipe(
      tap(() => this.router.navigateByUrl('/login')),
      mapTo(false)
    )
  }
}
