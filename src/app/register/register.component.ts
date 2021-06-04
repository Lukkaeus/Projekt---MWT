import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import * as zxcvbn from "zxcvbn";
import {Observable} from "rxjs";
import {User} from "../../entities/user";
import {UserServerService} from "../../services/user-server.service";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = true
  passwordMessage = ''
  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)],
      this.serverConflictValidator('name')),

    email: new FormControl('', [Validators.required, Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
      this.serverConflictValidator('email')),

    password: new FormControl('', [this.passwordValidator()]),
    password2: new FormControl('')
  }, this.passwordsMatchValidator);

  constructor(private userServerService: UserServerService, private router: Router) {
  }

  ngOnInit(): void {
  }

  get name() {
    return this.registerForm.get('name') as FormControl;
  }

  get email() {
    return this.registerForm.get('email') as FormControl;
  }

  get password() {
    return this.registerForm.get('password') as FormControl;
  }

  get password2() {
    return this.registerForm.get('password2') as FormControl;
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      const test = zxcvbn(control.value);
      const message = 'Password strength: ' + test.score + ' / 4 – must be 3 or 4 ' + test.feedback.warning +
        ' crash on ' + test.crack_times_display.offline_slow_hashing_1e4_per_second;
      this.passwordMessage = message
      return test.score < 3 ? {weakPassword: message} : null;
    };
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
      const user = new User(username, email)
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
      undefined,
      undefined,
      this.password.value,
      undefined);

    this.userServerService.register(user).subscribe(user => {
      console.log(JSON.stringify(user));
      this.router.navigateByUrl("/login");
    });
  }
}
