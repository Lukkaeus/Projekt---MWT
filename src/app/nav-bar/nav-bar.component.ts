import {Component, OnInit} from '@angular/core';
import {UserServerService} from "../../services/user-server.service";
import {Router} from "@angular/router";
import {AuthModel, AuthState} from "../../shared/auth.state";
import {Observable} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {Logout} from "../../shared/auth.actions";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  username: string = "";
  @Select(AuthState.username) username$: Observable<string>

  constructor(private userServerService: UserServerService, private router: Router, private store:Store) {
  }

  ngOnInit(): void {
    this.username$.subscribe(username =>
      this.username = username);
  }

  logout() {
    this.store.dispatch(new Logout()).subscribe(()=>this.router.navigateByUrl('/login'))
  }
}
