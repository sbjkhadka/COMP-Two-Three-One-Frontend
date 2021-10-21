import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
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


}
