import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Login, Logout, TokenExpiredLogout, UrlAfterLogin} from "./auth.actions";
import {UserServerService} from "../services/user-server.service";
import {tap} from "rxjs/operators";
import {Injectable} from "@angular/core";

export interface AuthModel {
  username: string
  token: string
  redirectAfterLogin: string
}

const DEFAULT_REDIRECT_AFTER_LOGIN = '/users/extended';

@State<AuthModel>({
  name: "auth",
  defaults: {
    username: null,
    token: null,
    redirectAfterLogin: DEFAULT_REDIRECT_AFTER_LOGIN
  }
})
@Injectable()
export class AuthState {
  @Selector([state => state.auth.username])
  static username(username: string) {
    return username
  }

  @Selector([state => state.auth.redirectAfterLogin])
  static redirectUrl(redirectAfterLogin: string) {
    return redirectAfterLogin
  }

  constructor(private usersServerService: UserServerService) {
  }

  ngxsOnInit() {
    this.usersServerService.checkToken().subscribe();
  }

  @Action(Login)
  login(ctx: StateContext<AuthModel>, action: Login) {
    console.log("spracovavam udalost Login pre meno " + action.auth.name);
    return this.usersServerService.login(action.auth).pipe(
      tap(token => {
        ctx.patchState({
          username: action.auth.name,
          token
        });
      })
    );
  }

  @Action([Logout, TokenExpiredLogout], {cancelUncompleted: true})
  logout(ctx: StateContext<AuthModel>, action: Logout): Logout | TokenExpiredLogout {
    const token = ctx.getState().token;
    ctx.setState({
      username: null,
      token: null,
      redirectAfterLogin: DEFAULT_REDIRECT_AFTER_LOGIN
    });
    if (action instanceof Logout) {
      return this.usersServerService.logout(token);
    }
  }

  @Action(UrlAfterLogin)
  setUrlAfterLogin(ctx: StateContext<AuthModel>, action: UrlAfterLogin) {
    ctx.patchState({
      redirectAfterLogin: action.url
    });
  }
}
