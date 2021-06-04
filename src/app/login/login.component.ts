import {Component, OnInit} from '@angular/core';
import {Auth} from "../../entities/auth";
import {UserServerService} from "../../services/user-server.service";
import {Router} from "@angular/router";
import {Store} from "@ngxs/store";
import {Login} from "../../shared/auth.actions";
import {AuthState} from "../../shared/auth.state";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  auth: Auth = new Auth();
  hide = true;

  constructor(private userServerService: UserServerService,
              private router: Router,
              private store: Store) {
  }

  ngOnInit(): void {
  }

  get vypisAuth(): string {
    return JSON.stringify(this.auth);
  }

  onSubmit() {
    this.store.dispatch(new Login(this.auth)).subscribe(() => {
        console.log('Udalost login je spracovana')
        this.router.navigateByUrl(this.store.selectSnapshot(AuthState.redirectUrl))
      }
    )
    // this.userServerService.login(this.auth).subscribe(ok => {
    //   this.router.navigateByUrl(this.userServerService.redirectAfterLogin)
    //   this.userServerService.redirectAfterLogin = '/users/extended'
    // })
  }
}

