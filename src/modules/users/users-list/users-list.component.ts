import {Component, OnInit} from '@angular/core';
import {User} from "../../../entities/user";
import {UserServerService} from "../../../services/user-server.service";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  users: User[];

  selectedUser: User;
  columnsToDisplay = ['name', 'email']

  constructor(private userServerService: UserServerService) {
  }

  ngOnInit(): void {
    this.userServerService.getUsers().subscribe(value => this.users = value,
        error => window.alert('Mame chybu: ' + JSON.stringify(error)));
  }

  selectUser(user) {
    this.selectedUser = user;
  }
}
