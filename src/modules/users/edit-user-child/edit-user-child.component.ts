import {Component, Input, OnChanges, Output, SimpleChanges, EventEmitter} from '@angular/core';
import {User} from "../../../entities/user";
import {
  AsyncValidatorFn, FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from "@angular/forms";
import {UserServerService} from "../../../services/user-server.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Group} from "../../../entities/group";

@Component({
  selector: 'app-edit-user-child',
  templateUrl: './edit-user-child.component.html',
  styleUrls: ['./edit-user-child.component.css']
})
export class EditUserChildComponent implements OnChanges {
  @Input() user: User;
  @Output() changed = new EventEmitter<User>();

  hide = true
  private groups: Group[];
  userEditForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)],
      this.serverConflictValidator('name')),

    email: new FormControl('', [Validators.required, Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
      this.serverConflictValidator('email')),

    password: new FormControl('',),
    password2: new FormControl(''),
    active: new FormControl(true),
    groups: new FormArray([])
  }, this.passwordsMatchValidator)

  constructor(private userServerService: UserServerService, private router: Router) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.user) {
      this.name.setValue(this.user.name)
      this.email.setValue(this.user.email)
      this.active.setValue(this.user.active)
      this.userServerService.getGroups().subscribe(groups => {
        this.groups = groups
        groups.forEach(group => {
          if (this.user.groups.some(ug => ug.id === group.id)) {
            this.groupsCB.push(new FormControl(true))
          } else {
            this.groupsCB.push(new FormControl(false))
          }
        })
      })
    }
  }

  get name() {
    return this.userEditForm.get('name') as FormControl;
  }

  get email() {
    return this.userEditForm.get('email') as FormControl;
  }

  get password() {
    return this.userEditForm.get('password') as FormControl;
  }

  get password2() {
    return this.userEditForm.get('password2') as FormControl;
  }

  get active() {
    return this.userEditForm.get('active') as FormControl;
  }

  get groupsCB() {
    return this.userEditForm.get('groups') as FormArray;
  }

  passwordsMatchValidator(control: FormGroup): ValidationErrors {
    const password = control.get('password');
    const password2 = control.get('password2');
    if (password.value === password2.value) {
      password2.setErrors(null);
      return null;
    } else {
      password2.setErrors({differentPasswords: 'Passwords do not match'});
      return {differentPasswords: 'Passwords do not match'};
    }
  }

  serverConflictValidator(conflictFieldName: string): AsyncValidatorFn {
    return (control: FormControl): Observable<ValidationErrors> => {
      const username = conflictFieldName === 'name' ? control.value : ''
      const email = conflictFieldName === 'email' ? control.value : ''
      const user = new User(username, email, this.user.id)
      return this.userServerService.userConflicts(user).pipe(
        map(conflictArray => {
          return conflictArray.includes(conflictFieldName) ?
            {conflictField: conflictFieldName + ' has been on the server'} : null
        })
      )
    }
  }

  onSubmit() {
    const user = new User(
      this.name.value,
      this.email.value,
      this.user.id,
      undefined /* last login */,
      this.password.value.trim() ? this.password.value.trim() : null,
      this.active.value,
      this.groups.filter((value, index) => this.groupsCB.at(index).value));

    this.changed.emit(this.user);
  }

}
