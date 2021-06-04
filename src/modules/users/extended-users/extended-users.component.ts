import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserServerService} from "../../../services/user-server.service";
import {User} from "../../../entities/user";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-extended-users',
  templateUrl: './extended-users.component.html',
  styleUrls: ['./extended-users.component.css']
})
export class ExtendedUsersComponent implements OnInit, AfterViewInit {
  users: User[] = [];
  dataSource = new MatTableDataSource<User>()
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort
  columnsToDisplay = ['id', 'name', 'email', 'lastLogin', 'groups', 'permissions', 'actions'];

  constructor(private userServerService: UserServerService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort
    this.dataSource.sortingDataAccessor = (user: User, headerName: string) => {
      switch (headerName) {
        case 'groups':
          return user.groups[0]?.name
        default:
          return user[headerName]
      }
    }
    this.dataSource.filterPredicate = (user: User, filter: string) => {
      if (user.name.toLowerCase().includes(filter)) {
        return true
      }
      for (let group of user.groups) {
        if (group.permissions.some(value => value.toLowerCase().includes(filter))) {
          return true
        }
        if (group.name.toLowerCase().includes(filter)) {
          return true
        }
      }
      return false
    }
    this.userServerService.getExtendedUsers().subscribe(users => {
      this.dataSource.data = users
      this.paginator.length = users.length
    })
  }

  applyFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase()
    this.paginator.firstPage()
  }

  deleteUser(user: User) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Deleting user',
        message: 'Delete user ' + user.name + '?'
      }
    })
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userServerService.deleteUser(user.id).subscribe(
          ok => {
            if (ok) {
              this.dataSource.data = this.dataSource.data.filter(u => u.id !== user.id)
            }
          }
        )
      }
    })
  }
}
