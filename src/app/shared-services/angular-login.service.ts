import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environmentAngular} from '../../../environments/environment';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AngularLoginService {

  constructor(private http: HttpClient) { }

  signIn(credentials: any): Observable<any> {
    return this.http.post<any>(`${environmentAngular.base_url}login`, credentials).pipe(catchError(error => {
      return throwError(error);
    }));
  }

  logout(): Observable<any> {
    return this.http.delete(`${environmentAngular.base_url}logout`).pipe(catchError(error => {
      return throwError(error);
    }));
  }

  getSecurityQuestionByEmail(email: string): Observable<any> {
    return this.http.post(`${environmentAngular.base_url}fetchSecurityQuestion`, {email} ).pipe(catchError(error => {
      return throwError(error);
    }));
  }

  checkIfSecurityAnswerIsOkay(query: any): Observable<any> {
    return this.http.post(`${environmentAngular.base_url}securityQuestion`, query ).pipe(catchError(error => {
      return throwError(error);
    }));
  }

  resetUserPassword(query: any): Observable<any> {
    return this.http.post(`${environmentAngular.base_url}resetPassword`, query ).pipe(catchError(error => {
      return throwError(error);
    }));
  }

}
