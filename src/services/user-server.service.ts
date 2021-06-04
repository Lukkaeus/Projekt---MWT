import {Injectable} from '@angular/core';
import {User} from "../entities/user";
import {EMPTY, Observable, of, Subscriber, Subscription, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Auth} from "../entities/auth";
import {catchError, map, mapTo, tap} from "rxjs/operators";
import {SnackbarService} from "./snackbar.service";
import {Group} from "../entities/group";
import {Store} from "@ngxs/store";
import {TokenExpiredLogout} from "../shared/auth.actions";

@Injectable({
  providedIn: 'root'
})
export class UserServerService {
  localUsers = [new User('Peto', 'peto@upjs.sk'),
    new User('Jozo', 'jozo@upjs.sk', 2, new Date('2020-01-17')),
    {name: 'Jano', email: 'jano@upjs.sk', password: ''}]
  private url = 'http://localhost:8080/'

  constructor(private http: HttpClient, private snackBar: SnackbarService, private store: Store) {
  }

  checkToken(): Observable<void> {
    if (this.token === null) {
      return of(undefined)
    }
    this.http.get(this.url + 'check-token/' + this.token, {responseType: 'text'})
      .pipe(mapTo(undefined), catchError(err => this.httpError(err)))
  }

  get token(): string {
    return this.store.selectSnapshot(state => state.auth.token)
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + 'users')
      .pipe(catchError(err => this.httpError(err)))
  }

  getExtendedUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + 'users/' + this.token)
      .pipe(catchError(err => this.httpError(err)))
  }

  login(auth: Auth): Observable<string> {
    return this.http
      .post(this.url + 'login', auth, {responseType: 'text'})
      .pipe(tap(token => {
        this.snackBar.successMessage('Login successful')
      }), catchError(err => this.httpError(err)))
  }

  private httpError(err) {
    if (err instanceof HttpErrorResponse && err.status == 401) {
      this.httpErrorToMessage(err)
      return EMPTY;
    }
    return throwError(err);
  }

  private httpErrorToMessage(error: HttpErrorResponse): void {
    console.log(JSON.stringify(error));
    if (error.status === 0) {
      this.snackBar.errorMessage("Server unreachable");
      return;
    }
    if (error.status >= 400 && error.status < 500) {
      const message = error.error.errorMessage
        ? error.error.errorMessage
        : JSON.parse(error.error).errorMessage;

      if (error.status === 401 && message == "unknown token") {
        this.store.dispatch(new TokenExpiredLogout());
        this.snackBar.errorMessage("Session timeout");
        return;
      }
      this.snackBar.errorMessage(message);
      return;
    }
    this.snackBar.errorMessage("server error: " + error.message);
  }


  logout(token): Subscription {
    return this.http.get(this.url + 'logout/' + token)
      .pipe(
        mapTo(undefined),
        catchError(err => this.httpError(err))).subscribe();
  }

  userConflicts(user: User): Observable<string[]> {
    return this.http.post<string[]>(this.url + 'user-conflicts', user)
      .pipe(catchError(err => this.httpError(err)))
  }

  deleteUser(userId: number): Observable<boolean> {
    return this.http.delete(this.url + 'user/' + userId + '/' + this.token)
      .pipe(mapTo(true))
      .pipe(catchError(error => this.httpError(error)));
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.url + "register", user)
      .pipe(catchError(error => this.httpError(error)));
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.url + 'user/' + id + '/' + this.token)
      .pipe(catchError(err => this.httpError(err)))
  }

  getGroups(): Observable<Group[]> {
    return this.http
      .get<Group[]>(this.url + "groups")
      .pipe(catchError(error => this.httpError(error)));
  }

  saveUser(user: User): Observable<User> {
    return this.http.post<User>(this.url + "users/" + this.token, user)
      .pipe(catchError(error => this.httpError(error)));
  }
}
