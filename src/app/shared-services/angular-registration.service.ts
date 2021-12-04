import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {environmentAngular} from '../../../environments/environment';
import {catchError} from 'rxjs/operators';
import {User} from '../../shared-models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AngularRegistrationService {

  constructor(private http: HttpClient) { }

  register(user: User): Observable<any> {
    return this.http.post<any>(`${environmentAngular.base_url}register`, user).pipe(catchError(error => {
      return throwError(error);
    }));
  }
}
