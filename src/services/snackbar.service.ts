import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  errorMessage(message:string) {
    this.snackBar.open(message, 'ERROR', {
      duration: 3000,
      panelClass: 'redSnackBar'
    })
  }

  successMessage(message:string) {
    this.snackBar.open(message, 'SUCCESS', {
      duration: 3000,
      panelClass: 'greenSnackBar'
    })
  }
}
