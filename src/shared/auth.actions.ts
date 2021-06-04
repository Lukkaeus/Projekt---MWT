import {Auth} from "src/entities/auth";

export class Login {
  static readonly type = "[Login Page] login";

  constructor(public auth: Auth) {
  }
}

export class Logout {
  static readonly type = "[Navbar] logout";
}

export class UrlAfterLogin {
  static readonly type = "[AuthGuard] set url after login";

  constructor(public url: string) {
  }
}

export class TokenExpiredLogout {
  static readonly type = "[UserServer API] token expired";
}
