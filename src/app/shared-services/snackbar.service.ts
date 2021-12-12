import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, action?: string, duration?: number): void {
    this.snackBar.open(message, action || '', {
      duration: duration || 2000,
    });
  }
}
