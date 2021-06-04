import {Component, OnInit} from '@angular/core';
import {User} from "../../../entities/user";
import {UserServerService} from "../../../services/user-server.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  user: User = new User('', '');

  constructor(private userServerService: UserServerService, private router: Router) {
  }

  ngOnInit(): void {
  }

  saveUser(user: User) {
    this.userServerService.saveUser(user).subscribe(() => {
      this.router.navigateByUrl("/users/extended")
    })
  }
}
