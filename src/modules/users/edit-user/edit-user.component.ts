import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {UserServerService} from "../../../services/user-server.service";
import {map, switchMap} from "rxjs/operators";
import {User} from "../../../entities/user";
import {CanComponentDeactivate} from "../../../guards/can-deactivate.guard";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, CanComponentDeactivate {
  user: User;
  userSaved = false

  constructor(private route: ActivatedRoute, private userServerService: UserServerService,
              private router: Router, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.user
      this.userSaved = false
    })
  }

  saveUser(user: User) {
    this.userServerService.saveUser(user).subscribe(() => {
      this.router.navigateByUrl("/users/extended")
      this.userSaved = true
    })
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userSaved) {
      return true;
    }
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Leaving?',
        message: 'Edited user is not saved, leave?'
      }
    })
    return dialogRef.afterClosed().pipe(map((result) => !!result))
  }
}
